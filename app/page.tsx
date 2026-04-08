import FadeUp from "@/components/FadeUp";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marc Hauser",
  url: "https://agentictom.com",
  sameAs: ["https://linkedin.com/in/marcoliverhauser", "https://x.com/marc_hauser"],
  jobTitle: "Head of Banking & Financial Services, UiPath Switzerland",
  knowsAbout: ["Agentic AI", "Target Operating Models", "Swiss Banking", "Financial Services"],
};

export default function Home() {
  const blogPosts = getAllPosts();
  return (
    <main
      id="top"
      style={{ background: "#F7F4EF", color: "#1A1A1A" }}
      className="font-[family-name:var(--font-dm-sans)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-4" style={{ background: "#F7F4EF", borderBottom: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto flex justify-between items-center">
          <a href="#top" className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide text-[#1A1A1A]">
            agenticTOM
          </a>
          <div className="flex items-center gap-5 md:gap-8 text-xs md:text-sm tracking-widest uppercase text-[#6B6B6B]">
            <Link href="/blog" className="hover:text-[#2B3A52] transition-colors">Thoughts</Link>
            <a href="#contact" className="hover:text-[#2B3A52] transition-colors">Contact</a>
            <a href="#about" className="hover:text-[#2B3A52] transition-colors">About</a>
            <a href="https://linkedin.com/in/marcoliverhauser" target="_blank" rel="noopener noreferrer" className="hidden sm:inline hover:text-[#2B3A52] transition-colors">LinkedIn</a>
            <a href="#contact" className="hidden sm:inline-block px-4 py-2 border border-[#2B3A52] text-[#2B3A52] hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 text-xs tracking-widest">Let&apos;s talk</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 md:pb-24 px-5 md:px-8 overflow-hidden">
        <div className="max-w-[900px] mx-auto w-full">
          <FadeUp delay={0}>
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
              RETHINK
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light mb-6"
              style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.15, color: "#1A1A1A" }}
            >
              Waiting is not a strategy. It is a default.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="font-[family-name:var(--font-dm-sans)] mb-4 max-w-[620px]"
              style={{ fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.8 }}
            >
              Defaults do not survive structural shifts. The banks that redesign their operating model around AI as a workforce will set the terms. The rest will adapt to theirs.
            </p>
            <p
              className="font-[family-name:var(--font-dm-sans)] mb-10 max-w-[580px]"
              style={{ fontSize: "0.85rem", color: "#8B7355", lineHeight: 1.7, letterSpacing: "0.03em" }}
            >
              A framework for Swiss banking and financial services leadership.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <a href="#the-argument" className="btn-outline-slate">
                See the argument
              </a>
              <Link href="/assessment" className="btn-outline-slate" style={{ background: "#2B3A52", color: "#F7F4EF", borderColor: "#2B3A52" }}>
                Take the assessment
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE ARGUMENT ── condensed framework intro */}
      <section id="the-argument" className="py-20 md:py-32 px-5 md:px-8" style={{ borderTop: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>The Argument</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-8"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A", maxWidth: 660 }}
            >
              Your bank already has a target operating model. It was designed for a workforce that was entirely human.
            </h2>
            <p className="mb-12" style={{ color: "#1A1A1A", lineHeight: 1.8, maxWidth: 620, fontSize: "0.95rem" }}>
              An Agentic Target Operating Model describes what the organisation looks like when AI is a participant: <strong style={{ fontWeight: 700 }}>three layers of workforce</strong> (bots, agents, humans), each with different governance. <strong style={{ fontWeight: 700 }}>Escalation designed in</strong>, with triggers based on the cost of being wrong. <strong style={{ fontWeight: 700 }}>Outcomes owned end-to-end</strong> by agent systems that coordinate across what used to be functional boundaries.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
              {[
                {
                  label: "The framework",
                  desc: "Three layers. Bots handle the deterministic. Agents decide within policy envelopes. Humans govern the edges.",
                  link: "/framework",
                  cta: "View the model",
                },
                {
                  label: "The Swiss advantage",
                  desc: "FINMA's principles-based regulation, data sovereignty, and relationship banking create structural space for agentic systems.",
                  link: "/blog/swiss-banking-agentic-advantage",
                  cta: "Read the argument",
                },
                {
                  label: "The pressure",
                  desc: "Customer AI agents will query 30 banks simultaneously. Your inbound volume increases tenfold. Your revenue does not.",
                  link: "/blog/the-tsunami-is-not-coming-from-inside-the-bank",
                  cta: "See the numbers",
                },
              ].map((item) => (
                <Link key={item.label} href={item.link} className="group">
                  <div className="mb-4" style={{ width: 32, height: 2, background: "#8B7355" }} />
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3 group-hover:text-[#2B3A52] transition-colors"
                    style={{ fontSize: "1.3rem", color: "#2B3A52" }}
                  >
                    {item.label}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>{item.desc}</p>
                  <span className="text-xs uppercase tracking-widest group-hover:underline" style={{ color: "#2B3A52" }}>
                    {item.cta}
                  </span>
                </Link>
              ))}
            </div>
          </FadeUp>

          {/* Pull quote */}
          <FadeUp delay={0.15}>
            <div className="py-12 md:py-16" style={{ borderTop: "1px solid #D8D3CB" }}>
              <blockquote
                className="font-[family-name:var(--font-cormorant)] font-light text-center mx-auto"
                style={{
                  fontSize: "clamp(22px, 3.5vw, 36px)",
                  color: "#2B3A52",
                  lineHeight: 1.3,
                  maxWidth: 640,
                }}
              >
                &ldquo;If your mental model still has departments optimising steps, you are not there yet.&rdquo;
              </blockquote>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ASSESSMENT CTA ── dark section */}
      <section className="py-20 md:py-28 px-5 md:px-8" style={{ background: "#2B3A52" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Assessment</p>
                <h2
                  className="font-[family-name:var(--font-cormorant)] font-light mb-4"
                  style={{ fontSize: "clamp(24px, 3.5vw, 36px)", color: "#F7F4EF" }}
                >
                  How ready is your bank?
                </h2>
                <p className="text-sm" style={{ color: "rgba(247,244,239,0.6)", maxWidth: 420, lineHeight: 1.7 }}>
                  Fifteen questions across five dimensions. Five minutes. Exportable as PDF for your leadership team.
                </p>
              </div>
              <Link
                href="/assessment"
                className="shrink-0 inline-block px-8 py-3 border text-xs uppercase tracking-widest transition-colors duration-300 hover:bg-[#F7F4EF] hover:text-[#2B3A52]"
                style={{ borderColor: "#F7F4EF", color: "#F7F4EF" }}
              >
                Begin assessment
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THOUGHTS ── */}
      <section id="thoughts" className="py-20 md:py-32 px-5 md:px-8" style={{ background: "#F0ECE3" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Thoughts</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-12"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Recent thinking
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col">
              {blogPosts.slice(0, 3).map((post, i) => (
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
                    <h3
                      className="font-[family-name:var(--font-cormorant)] font-light mb-3 group-hover:text-[#2B3A52] transition-colors"
                      style={{ fontSize: "clamp(20px, 3vw, 26px)", color: "#1A1A1A" }}
                    >
                      {post.title}
                    </h3>
                    <p className="mb-4" style={{ fontSize: "0.9rem", color: "#6B6B6B", maxWidth: 600, lineHeight: 1.7 }}>
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
            {blogPosts.length > 3 && (
              <div className="mt-8 pt-8" style={{ borderTop: "1px solid #D8D3CB" }}>
                <Link
                  href="/blog"
                  className="text-sm uppercase tracking-widest hover:underline"
                  style={{ color: "#2B3A52" }}
                >
                  View all writing
                </Link>
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 md:py-32 px-5 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>About</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-8"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Marc Hauser
            </h2>
            <p className="mb-4" style={{ maxWidth: 620, color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Twenty years across digital banking, fintech, and emerging technologies. Multiple director-level roles at UBS covering digital channels, wealth management, and investment products across international markets. CEO of Trust Square, Z&uuml;rich&apos;s blockchain ecosystem. Managing Partner at Tenity, leading early-stage fintech investment and open innovation partnerships with Julius B&auml;r, UBS, and others. Co-founded an ETH AI spin-off. Now heading banking and financial services for UiPath in Switzerland.
            </p>
            <p className="mb-8" style={{ maxWidth: 620, color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Based in Z&uuml;rich. One daughter who will be agent-native before she is old enough to open a bank account. This site is a framework I use in my own thinking, offered here as a basis for serious conversation with people working on the same questions.
            </p>
            <a
              href="https://linkedin.com/in/marcoliverhauser"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: "#2B3A52" }}
            >
              linkedin.com/in/marcoliverhauser
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 md:py-32 px-5 md:px-8" style={{ background: "#F0ECE3" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Let&apos;s talk</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Start a conversation.
            </h2>
            <p className="mb-12" style={{ maxWidth: 580, color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}>
              I work with leaders in the field on what the agentic shift means for their institution. Most conversations start as a keynote, a closed leadership briefing, or a working session &mdash; tell me the setting and I&apos;ll shape the rest to fit.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ContactForm />
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-5 md:px-8" style={{ borderTop: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            agentictom.com &copy; {new Date().getFullYear()} Marc Hauser
          </p>
          <div className="flex gap-6 text-sm" style={{ color: "#6B6B6B" }}>
            <Link href="/blog" className="hover:text-[#2B3A52] transition-colors">Thoughts</Link>
            <a href="#about" className="hover:text-[#2B3A52] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#2B3A52] transition-colors">Contact</a>
            <a
              href="https://linkedin.com/in/marcoliverhauser"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B3A52] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/marc_hauser"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B3A52] transition-colors"
            >
              X
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
