"use client";

import { useSyncExternalStore } from "react";

/**
 * What this browser remembers about its reader: which essays were opened, how
 * far each was read, and when the last visit was. It lives in localStorage and
 * is never sent anywhere. Every access is guarded, because storage can be
 * blocked or cleared, and the site has to work the same without it.
 */

const KEY = "agentictom:reading:v1";
const EVENT = "agentictom:reading";

export type ReadingState = {
  /** Furthest point reached per essay, 0 to 1. */
  progress: Record<string, number>;
  /** ISO time of the last scroll in each essay. */
  touched: Record<string, string>;
  /** The visit before this one, as an ISO date: essays newer than it are new. */
  previousVisit: string | null;
  /** The start of the current visit. */
  thisVisit: string | null;
};

const EMPTY: ReadingState = { progress: {}, touched: {}, previousVisit: null, thisVisit: null };

/** A visit ends after six hours without a page view. */
const VISIT_GAP_MS = 6 * 60 * 60 * 1000;

/** An essay counts as read once the reader is nearly through it. */
export const READ_AT = 0.9;

let cache: ReadingState = EMPTY;
let cacheRaw: string | null = null;

function load(): ReadingState {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  if (!raw) {
    cache = EMPTY;
    return cache;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<ReadingState>;
    cache = {
      progress: parsed.progress && typeof parsed.progress === "object" ? parsed.progress : {},
      touched: parsed.touched && typeof parsed.touched === "object" ? parsed.touched : {},
      previousVisit: typeof parsed.previousVisit === "string" ? parsed.previousVisit : null,
      thisVisit: typeof parsed.thisVisit === "string" ? parsed.thisVisit : null,
    };
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function save(next: ReadingState) {
  try {
    const raw = JSON.stringify(next);
    window.localStorage.setItem(KEY, raw);
    cache = next;
    cacheRaw = raw;
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // Storage is unavailable: the site simply remembers nothing.
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** The reading memory, empty during server rendering and until hydration. */
export function useReading(): ReadingState {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

/** Called once per page view. Rolls the visit over after a long enough pause. */
export function markVisit() {
  const state = load();
  const now = new Date();
  const last = state.thisVisit ? new Date(state.thisVisit).getTime() : 0;
  if (state.thisVisit && now.getTime() - last < VISIT_GAP_MS) return;
  save({ ...state, previousVisit: state.thisVisit, thisVisit: now.toISOString() });
}

/** Records the furthest point reached in an essay. Progress never moves backwards. */
export function recordProgress(slug: string, progress: number) {
  const state = load();
  const before = state.progress[slug] ?? 0;
  const value = Math.round(Math.min(1, Math.max(0, progress)) * 100) / 100;
  if (value <= before) return;
  save({
    ...state,
    progress: { ...state.progress, [slug]: value },
    touched: { ...state.touched, [slug]: new Date().toISOString() },
  });
}

export function forgetReading() {
  try {
    window.localStorage.removeItem(KEY);
    cache = EMPTY;
    cacheRaw = null;
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // Nothing to forget.
  }
}

export function isRead(state: ReadingState, slug: string): boolean {
  return (state.progress[slug] ?? 0) >= READ_AT;
}

/** Published after the reader's previous visit. False on a first visit. */
export function isNewSince(state: ReadingState, date: string): boolean {
  if (!state.previousVisit) return false;
  return new Date(date).getTime() > new Date(state.previousVisit).getTime();
}

/** The essay most recently left unfinished, if any. */
export function unfinished(state: ReadingState): { slug: string; progress: number } | null {
  let best: { slug: string; progress: number; at: string } | null = null;
  for (const [slug, progress] of Object.entries(state.progress)) {
    if (progress < 0.08 || progress >= READ_AT) continue;
    const at = state.touched[slug] ?? "";
    if (!best || at > best.at) best = { slug, progress, at };
  }
  return best ? { slug: best.slug, progress: best.progress } : null;
}
