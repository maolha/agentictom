import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiter: 3 requests per 10 minutes per IP.
// Resets on cold start; sufficient as a first line of defence against casual spam.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) {
    hits.set(ip, arr);
    return false;
  }
  arr.push(now);
  hits.set(ip, arr);
  // Opportunistic cleanup
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
    }
  }
  return true;
}

function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  if (req.headers.get("content-type")?.includes("application/json") !== true) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; silently accept and drop.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 120);
  const organisation = str(body.organisation, 200);
  const email = str(body.email, 200);
  const interest = str(body.interest, 60);
  const message = str(body.message, 5000);

  if (!name || !organisation || !email || !interest || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const recipient = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;
  if (!recipient || !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return NextResponse.json({ error: "Mail not configured" }, { status: 500 });
  }

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"agenticTOM" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `agenticTOM: ${interest} — ${name}, ${organisation}`,
      text: `Name: ${name}\nOrganisation: ${organisation}\nEmail: ${email}\nInterested in: ${interest}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Organisation:</strong> ${escape(organisation)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Interested in:</strong> ${escape(interest)}</p>
        <hr/>
        <p>${escape(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
