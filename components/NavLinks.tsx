"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/framework", title: "Framework" },
  { href: "/blog", title: "Thoughts" },
  { href: "/lab", title: "Lab" },
  { href: "/assessment", title: "Assessment" },
];

/** The section links of the bar. The current section is marked, so a reader always knows where they are. */
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {LINKS.map((l) => {
        const current = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link key={l.href} href={l.href} className="nav-link" aria-current={current ? "page" : undefined}>
            {l.title}
          </Link>
        );
      })}
    </>
  );
}
