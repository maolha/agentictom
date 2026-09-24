"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

/**
 * Share actions for a post: LinkedIn, email, and copy the link.
 * The audience forwards by LinkedIn and email, so the copy action matters most.
 * Each link carries a UTM tag so traffic from a share is attributed to the post.
 */
export default function ShareLinks({ url, title, slug }: { url: string; title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const tagged = (source: string) => `${url}?utm_source=${source}&utm_medium=share&utm_campaign=${encodeURIComponent(slug)}`;
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tagged("linkedin"))}`;
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${tagged("email")}`)}`;
  const linkClass = "text-xs uppercase tracking-widest hover:underline";
  const style = { color: "#2B3A52" } as const;

  async function copy() {
    track("post_share", { channel: "copy", slug });
    try {
      await navigator.clipboard.writeText(tagged("copy"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the reader can still copy from the address bar.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <a href={linkedIn} target="_blank" rel="noopener noreferrer" className={linkClass} style={style} onClick={() => track("post_share", { channel: "linkedin", slug })}>
        Share on LinkedIn
      </a>
      <a href={mail} className={linkClass} style={style} onClick={() => track("post_share", { channel: "email", slug })}>
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
