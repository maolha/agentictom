"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

/** A quiet text button that copies a line to the clipboard and confirms it. */
export default function CopyButton({
  text,
  event,
  data,
  tone = "light",
  className = "",
  children,
}: {
  text: string;
  event: string;
  data?: Record<string, string>;
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      track(event, data);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard access was refused: nothing to confirm.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`text-xs uppercase tracking-widest underline underline-offset-4 ${className}`}
      style={{
        color: tone === "dark" ? "#F7F4EF" : "#2B3A52",
        background: "none",
        border: 0,
        padding: 0,
        cursor: "pointer",
      }}
    >
      <span aria-live="polite">{copied ? "Copied ✓" : children}</span>
    </button>
  );
}
