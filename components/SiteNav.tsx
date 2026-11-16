import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import NavLinks from "@/components/NavLinks";
import NavMenus from "@/components/NavMenus";

/**
 * The site-wide navigation. From 1024px up the bar carries every section, the
 * search and the contact button. Below that it carries the name, the search
 * and a menu button that opens the full list.
 *
 * On the homepage the About and Contact links are in-page anchors; everywhere
 * else they point back to the homepage sections.
 */
export default function SiteNav({ home = false }: { home?: boolean }) {
  const aboutHref = home ? "#about" : "/#about";
  const contactHref = home ? "#contact" : "/#contact";
  const talkClass =
    "hidden lg:inline-block px-4 py-2 border border-[#2B3A52] text-[#2B3A52] hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 text-xs tracking-widest";

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
        <div className="flex items-center gap-4 lg:gap-6 text-xs tracking-widest uppercase text-[#6B6B6B]">
          <div className="hidden lg:flex items-center gap-6">
            <NavLinks />
            {home ? (
              <a href={aboutHref} className="nav-link">About</a>
            ) : (
              <Link href={aboutHref} className="nav-link">About</Link>
            )}
          </div>
          <NavMenus home={home} />
          {home ? (
            <a href={contactHref} className={talkClass}>Let&apos;s talk</a>
          ) : (
            <Link href={contactHref} className={talkClass}>Let&apos;s talk</Link>
          )}
        </div>
      </div>
    </StickyNav>
  );
}
