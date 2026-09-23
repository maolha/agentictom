import Link from "next/link";
import { getAllPosts, getPostsByTheme, formatDate, THEMES } from "@/lib/blog";
import { pageMetadata, LINKEDIN_URL } from "@/lib/site";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

// Re-render at most hourly so a scheduled post appears on its day without a redeploy.
export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Thoughts",
  description: "Writing on agentic AI, target operating models, and the future of financial services by Marc Hauser.",
  path: "/blog",
});

const label = "text-xs uppercase tracking-widest";
const gold = { color: "#8B7355" } as const;

const startHere = [
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
    title: "The Six Percent Club",
    slug: "the-six-percent-club",
    line: "What the few companies with a measurable EBIT effect do differently.",
  },
];

export default function BlogIndex() {
  const posts = getAllPosts();
  const themes = getPostsByTheme();

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <SiteNav />

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
          <p className={`${label} mb-4`} style={gold}>
            Thoughts &middot; Agentic TOM
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-8"
            style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.15, color: "#1A1A1A", maxWidth: 760 }}
          >
            The questions banks are not yet asking.
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.8, maxWidth: 620 }}>
            Essays on agentic AI, operating model transformation, and the structural shifts arriving faster than most institutions assume.
          </p>
        </div>
      </section>

      {/* START HERE */}
      <section className="px-5 md:px-8 py-14 md:py-20" style={{ background: "#F0ECE3", borderBottom: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <p className={`${label} mb-3`} style={gold}>New here?</p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light mb-10"
            style={{ fontSize: "clamp(24px, 3.5vw, 34px)", color: "#1A1A1A" }}
          >
            Three essays to start with
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {startHere.map((s) => (
              <Link key={s.slug} href={`/blog/${s.slug}`} className="group block">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.5rem", color: "#8B7355" }}>
                    {s.step}
                  </span>
                  <span className={label} style={gold}>{s.tag}</span>
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

      {/* BY THEME */}
      <section className="px-5 md:px-8 py-14 md:py-20" style={{ borderBottom: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <p className={`${label} mb-3`} style={gold}>By theme</p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light mb-10"
            style={{ fontSize: "clamp(24px, 3.5vw, 34px)", color: "#1A1A1A" }}
          >
            Four threads run through the archive
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {themes.map((t) => (
              <div key={t.key} id={t.key} style={{ scrollMarginTop: 96 }}>
                <h3
                  className="font-[family-name:var(--font-cormorant)] font-light mb-1"
                  style={{ fontSize: "1.35rem", color: "#2B3A52" }}
                >
                  {t.label}
                </h3>
                <p className="text-sm mb-4" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>{t.line}</p>
                <ul className="flex flex-col gap-2">
                  {t.posts.map((p) => (
                    <li key={p.slug} className="text-sm" style={{ lineHeight: 1.5 }}>
                      <Link href={`/blog/${p.slug}`} className="hover:underline" style={{ color: "#1A1A1A" }}>
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL POSTS */}
      <div className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-[680px] mx-auto">
          <p className={`${label} mb-2`} style={gold}>All essays, newest first</p>
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block py-8 group"
                style={i > 0 ? { borderTop: "1px solid #D8D3CB" } : {}}
              >
                <article>
                  <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 ${label}`} style={gold}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true" style={{ color: "#D8D3CB" }}>&middot;</span>
                    <span>{post.readingTime} min read</span>
                    {post.theme && (
                      <>
                        <span aria-hidden="true" style={{ color: "#D8D3CB" }}>&middot;</span>
                        <span>{THEMES[post.theme].label}</span>
                      </>
                    )}
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
              <p className={`${label} mb-1`} style={gold}>
                Stay in touch
              </p>
              <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
                Questions, disagreement, or a case from your institution: find Marc on LinkedIn. New essays also appear in the{" "}
                <a href="/feed.xml" className="underline underline-offset-4">RSS feed</a>.
              </p>
            </div>
            <a
              href={LINKEDIN_URL}
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

      <SiteFooter />
    </main>
  );
}
