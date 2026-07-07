import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";
import { LinkedInIcon, XIcon } from "@/components/SocialIcons";
import StickyNav from "@/components/StickyNav";

export const metadata: Metadata = {
  title: "Thoughts — Agentic TOM",
  description: "Writing on agentic AI, target operating models, and the future of financial services by Marc Hauser.",
  openGraph: {
    title: "Thoughts — Agentic TOM",
    description: "Writing on agentic AI, target operating models, and the future of financial services by Marc Hauser.",
    url: "https://agentictom.com/blog",
    siteName: "Agentic TOM",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <StickyNav>
        <div className="max-w-[900px] mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide"
            style={{ color: "#1A1A1A" }}
          >
            agenticTOM
          </Link>
          <div className="flex items-center gap-5 md:gap-8 text-xs md:text-sm tracking-widest uppercase text-[#6B6B6B]">
            <Link href="/framework" className="hover:text-[#2B3A52] transition-colors">Framework</Link>
            <Link href="/blog" className="hover:text-[#2B3A52] transition-colors">Thoughts</Link>
            <Link href="/assessment" className="hidden sm:inline hover:text-[#2B3A52] transition-colors">Assessment</Link>
            <Link href="/#about" className="hover:text-[#2B3A52] transition-colors">About</Link>
            <Link href="/#contact" className="hidden sm:inline-block px-4 py-2 border border-[#2B3A52] text-[#2B3A52] hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 text-xs tracking-widest">Let&apos;s talk</Link>
          </div>
        </div>
      </StickyNav>

      {/* HERO */}
      <section
        className="px-5 md:px-8 pt-24 md:pt-36 pb-20 md:pb-28 overflow-hidden"
        style={{ borderBottom: "1px solid #D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto">
          <div
            className="font-[family-name:var(--font-cormorant)] font-light select-none pointer-events-none"
            style={{
              fontSize: "clamp(60px, 13vw, 140px)",
              lineHeight: 0.85,
              color: "#2B3A52",
              opacity: 0.12,
              marginLeft: "-0.05em",
              marginBottom: "2rem",
            }}
            aria-hidden="true"
          >
            THOUGHTS
          </div>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
            Writing &middot; Agentic TOM
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-8"
            style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.15, color: "#1A1A1A", maxWidth: 760 }}
          >
            The questions banks are not yet asking.
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.8, maxWidth: 620 }}>
            Writing on agentic AI, operating model transformation, and the structural shifts arriving faster than most institutions assume.
          </p>
        </div>
      </section>

      {/* START HERE */}
      <section className="px-5 md:px-8 py-14 md:py-20" style={{ background: "#F0ECE3", borderBottom: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>New here?</p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light mb-10"
            style={{ fontSize: "clamp(24px, 3.5vw, 34px)", color: "#1A1A1A" }}
          >
            Three essays to start with
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                step: "01",
                tag: "The concept",
                title: "What Is an Agentic Target Operating Model?",
                slug: "agentic-tom-introduction",
                line: "Three layers of workforce, escalation designed in, outcomes owned end-to-end.",
              },
              {
                step: "02",
                tag: "The pressure",
                title: "The Tsunami Is Not Coming from Inside the Bank",
                slug: "the-tsunami-is-not-coming-from-inside-the-bank",
                line: "When every client sends an agent, volume multiplies and revenue does not.",
              },
              {
                step: "03",
                tag: "The habits",
                title: "The 6% Club",
                slug: "the-six-percent-club",
                line: "What the few companies with a measurable EBIT effect do differently.",
              },
            ].map((s) => (
              <Link key={s.slug} href={`/blog/${s.slug}`} className="group block">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.5rem", color: "#8B7355" }}>
                    {s.step}
                  </span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>{s.tag}</span>
                </div>
                <h3
                  className="font-[family-name:var(--font-cormorant)] font-light mb-2 group-hover:underline"
                  style={{ fontSize: "1.25rem", color: "#2B3A52", lineHeight: 1.3 }}
                >
                  {s.title}
                </h3>
                <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>{s.line}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS */}
      <div className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-[680px] mx-auto">
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block py-8 group"
                style={i > 0 ? { borderTop: "1px solid #D8D3CB" } : {}}
              >
                <article>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
                      {formatDate(post.date)}
                    </p>
                    <span style={{ color: "#D8D3CB" }}>&middot;</span>
                    <p className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
                      {post.readingTime} min read
                    </p>
                  </div>
                  <h2
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3 group-hover:text-[#2B3A52] transition-colors"
                    style={{ fontSize: "clamp(22px, 3.5vw, 30px)", color: "#1A1A1A" }}
                  >
                    {post.title}
                  </h2>
                  <p className="mb-4" style={{ fontSize: "0.9rem", color: "#6B6B6B", lineHeight: 1.7 }}>
                    {post.excerpt}
                  </p>
                  <span
                    className="text-sm uppercase tracking-widest group-hover:underline"
                    style={{ color: "#2B3A52" }}
                  >
                    Read
                  </span>
                </article>
              </Link>
            ))}
          </div>

          {/* Follow */}
          <div className="mt-10 p-6 md:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ border: "1px solid #D8D3CB" }}>
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8B7355" }}>
                Stay in touch
              </p>
              <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
                Questions, disagreement, or a case from your institution: find Marc on LinkedIn.
              </p>
            </div>
            <a
              href="https://linkedin.com/in/marcoliverhauser"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-slate shrink-0 text-center"
              style={{ fontSize: "0.7rem", padding: "10px 24px" }}
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      <footer
        className="px-5 md:px-8 py-10 border-t"
        style={{ borderColor: "#D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            agentictom.com &copy; {new Date().getFullYear()} Marc Hauser
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm" style={{ color: "#6B6B6B" }}>
            <Link href="/framework" className="hover:text-[#2B3A52] transition-colors">Framework</Link>
            <Link href="/blog" className="hover:text-[#2B3A52] transition-colors">Thoughts</Link>
            <Link href="/assessment" className="hover:text-[#2B3A52] transition-colors">Assessment</Link>
            <Link href="/#about" className="hover:text-[#2B3A52] transition-colors">About</Link>
            <Link href="/#contact" className="hover:text-[#2B3A52] transition-colors">Contact</Link>
            <span aria-hidden="true" style={{ color: "#D8D3CB" }}>·</span>
            <a
              href="https://linkedin.com/in/marcoliverhauser"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#2B3A52] transition-colors inline-flex"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://x.com/marc_hauser"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:text-[#2B3A52] transition-colors inline-flex"
            >
              <XIcon />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
