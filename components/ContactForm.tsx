"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      organisation: (form.elements.namedItem("organisation") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value, // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        track("contact_submit", { interest: data.interest });
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light" style={{ color: "#2B3A52" }}>
        Thank you. I will be in touch.
      </p>
    );
  }

  const fallbackEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  if (error) {
    return (
      <p className="text-sm" style={{ color: "#8B7355" }}>
        Something went wrong.{" "}
        {fallbackEmail ? (
          <>Send a note directly to <a href={`mailto:${fallbackEmail}`} className="underline">{fallbackEmail}</a>.</>
        ) : (
          <>Please try again in a moment.</>
        )}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
      {/* Honeypot: hidden from users, visible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <div className="flex flex-col gap-1">
        <label className="text-xs text-[#6B6B6B] uppercase tracking-widest">Name</label>
        <input
          name="name"
          required
          className="bg-transparent border-b border-[#D8D3CB] py-2 text-[#1A1A1A] focus:outline-none focus:border-[#2B3A52] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-[#6B6B6B] uppercase tracking-widest">Organisation</label>
        <input
          name="organisation"
          required
          className="bg-transparent border-b border-[#D8D3CB] py-2 text-[#1A1A1A] focus:outline-none focus:border-[#2B3A52] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-[#6B6B6B] uppercase tracking-widest">Email</label>
        <input
          name="email"
          type="email"
          required
          className="bg-transparent border-b border-[#D8D3CB] py-2 text-[#1A1A1A] focus:outline-none focus:border-[#2B3A52] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-[#6B6B6B] uppercase tracking-widest">I am interested in</label>
        <select
          name="interest"
          required
          className="bg-transparent border-b border-[#D8D3CB] py-2 text-[#1A1A1A] focus:outline-none focus:border-[#2B3A52] transition-colors cursor-pointer"
        >
          <option value="">Select</option>
          <option value="conversation">A conversation about the agentic shift</option>
          <option value="keynote">A keynote or speaking engagement</option>
          <option value="board-briefing">A board briefing</option>
          <option value="assessment">Discussing our assessment results</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-[#6B6B6B] uppercase tracking-widest">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          className="bg-transparent border-b border-[#D8D3CB] py-2 text-[#1A1A1A] focus:outline-none focus:border-[#2B3A52] transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-2 self-start px-8 py-3 border border-[#2B3A52] text-[#2B3A52] text-sm uppercase tracking-widest hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
