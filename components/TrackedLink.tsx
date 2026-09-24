"use client";

import { track } from "@vercel/analytics";

/** An outbound link that reports a click, with the same styling hooks as a plain anchor. */
export default function TrackedLink({
  href,
  event,
  data,
  className,
  style,
  children,
}: {
  href: string;
  event: string;
  data?: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style} onClick={() => track(event, data)}>
      {children}
    </a>
  );
}
