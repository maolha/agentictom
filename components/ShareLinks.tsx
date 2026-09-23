"use client";

import { useState } from "react";

/**
 * Share actions for a post: LinkedIn, copy the link, and the feed.
 * The audience forwards by LinkedIn and email, so the copy action matters most.
 */
export default function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${url}`)}`;
  const linkClass = "text-xs uppercase tracking-widest hover:underline";
  const style = { color: "#2B3A52" } as const;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the reader can still copy from the address bar.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <a href={linkedIn} target="_blank" rel="noopener noreferrer" className={linkClass} style={style}>
        Share on LinkedIn
      </a>
      <a href={mail} className={linkClass} style={style}>
        Email
      </a>
      <button
        type="button"
        onClick={copy}
        className={linkClass}
        style={{ ...style, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}
        aria-live="polite"
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
