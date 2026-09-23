import Link from "next/link";
import StickyNav from "@/components/StickyNav";

/**
 * The site-wide navigation. On the homepage the About and Contact links are
 * in-page anchors; everywhere else they point back to the homepage sections.
 */
export default function SiteNav({ home = false }: { home?: boolean }) {
  const aboutHref = home ? "#about" : "/#about";
  const contactHref = home ? "#contact" : "/#contact";
  const linkClass = "hover:text-[#2B3A52] transition-colors";

  return (
    <StickyNav>
      <div className="max-w-[900px] mx-auto flex justify-between items-center">
        {home ? (
          <a href="#top" className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide text-[#1A1A1A]">
            agenticTOM
          </a>
        ) : (
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide"
            style={{ color: "#1A1A1A" }}
          >
            agenticTOM
          </Link>
        )}
        <div className="flex items-center gap-5 md:gap-8 text-xs md:text-sm tracking-widest uppercase text-[#6B6B6B]">
          <Link href="/framework" className={linkClass}>Framework</Link>
          <Link href="/blog" className={linkClass}>Thoughts</Link>
          <Link href="/assessment" className={`hidden sm:inline ${linkClass}`}>Assessment</Link>
          {home ? (
            <a href={aboutHref} className={linkClass}>About</a>
          ) : (
            <Link href={aboutHref} className={linkClass}>About</Link>
          )}
          {home ? (
            <a href={contactHref} className="hidden sm:inline-block px-4 py-2 border border-[#2B3A52] text-[#2B3A52] hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 text-xs tracking-widest">
              Let&apos;s talk
            </a>
          ) : (
            <Link href={contactHref} className="hidden sm:inline-block px-4 py-2 border border-[#2B3A52] text-[#2B3A52] hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 text-xs tracking-widest">
              Let&apos;s talk
            </Link>
          )}
        </div>
      </div>
    </StickyNav>
  );
}
