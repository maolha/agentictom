import Link from "next/link";
import { LinkedInIcon, XIcon, RssIcon } from "@/components/SocialIcons";
import { LINKEDIN_URL, X_URL } from "@/lib/site";

export default function SiteFooter({ home = false }: { home?: boolean }) {
  const linkClass = "hover:text-[#2B3A52] transition-colors";
  const aboutHref = home ? "#about" : "/#about";
  const contactHref = home ? "#contact" : "/#contact";

  return (
    <footer className="px-5 md:px-8 py-10 md:py-12 border-t" style={{ borderColor: "#D8D3CB" }}>
      <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="text-sm" style={{ color: "#6B6B6B" }}>
          agentictom.com &copy; {new Date().getFullYear()} Marc Hauser
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm" style={{ color: "#6B6B6B" }}>
          <Link href="/framework" className={linkClass}>Framework</Link>
          <Link href="/blog" className={linkClass}>Thoughts</Link>
          <Link href="/assessment" className={linkClass}>Assessment</Link>
          {home ? <a href={aboutHref} className={linkClass}>About</a> : <Link href={aboutHref} className={linkClass}>About</Link>}
          {home ? <a href={contactHref} className={linkClass}>Contact</a> : <Link href={contactHref} className={linkClass}>Contact</Link>}
          <Link href="/privacy" className={linkClass}>Privacy</Link>
          <span aria-hidden="true" style={{ color: "#D8D3CB" }}>·</span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${linkClass} inline-flex`}
          >
            <LinkedInIcon />
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className={`${linkClass} inline-flex`}
          >
            <XIcon />
          </a>
          <a href="/feed.xml" aria-label="RSS feed" className={`${linkClass} inline-flex`}>
            <RssIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
