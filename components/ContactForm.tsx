"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  if (submitted) {
    return (
      <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light" style={{ color: "#2B3A52" }}>
        Thank you. I will be in touch.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm" style={{ color: "#8B7355" }}>
        Something went wrong. Send a note directly to marc.oliver.hauser@gmail.com.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="speaking"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="flex flex-col gap-4 max-w-xl"
    >
      <input type="hidden" name="form-name" value="speaking" />
      <p className="hidden">
        <label>Do not fill this out: <input name="bot-field" /></label>
      </p>
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
        <label className="text-xs text-[#6B6B6B] uppercase tracking-widest">Format</label>
        <select
          name="format"
          required
          className="bg-transparent border-b border-[#D8D3CB] py-2 text-[#1A1A1A] focus:outline-none focus:border-[#2B3A52] transition-colors cursor-pointer"
        >
          <option value="">Select a format</option>
          <option value="keynote">Keynote (45 to 60 min)</option>
          <option value="board-briefing">Board briefing (90 min, interactive)</option>
          <option value="executive-workshop">Executive workshop (half day)</option>
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
        className="mt-2 self-start px-8 py-3 border border-[#2B3A52] text-[#2B3A52] text-sm uppercase tracking-widest hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
}
