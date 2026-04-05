import FadeUp from "@/components/FadeUp";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marc Hauser",
  url: "https://agentictom.com",
  sameAs: ["https://linkedin.com/in/marcoliverhauser"],
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
            <a href="#thoughts" className="hover:text-[#2B3A52] transition-colors">Thoughts</a>
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
              Defaults do not survive structural shifts. The banks that redesign their operating model around AI — not as a tool, but as a workforce — will set the terms. The rest will adapt to theirs.
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
              <a href="#the-shift" className="btn-outline-slate">
                See the argument
              </a>
              <Link href="/assessment" className="btn-outline-slate" style={{ background: "#2B3A52", color: "#F7F4EF", borderColor: "#2B3A52" }}>
                Take the assessment
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE SHIFT ── */}
      <section id="the-shift" className="py-20 md:py-32 px-5 md:px-8" style={{ borderTop: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>The Shift</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-8"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Work is no longer organised around functions.
            </h2>
            <p style={{ color: "#1A1A1A", lineHeight: 1.8, maxWidth: 620, fontSize: "0.95rem" }}>
              A bank with an Agentic Target Operating Model looks nothing like today. Decision-making authority moves from human-controlled workflows to dynamically orchestrated, machine-led execution systems, with humans governing exceptions, risk, and intent. <strong style={{ fontWeight: 700 }}>The organising principle is no longer the department or the process. It is the outcome.</strong> Outcomes are owned end-to-end by systems that learn.
            </p>
          </FadeUp>
        </div>
        {/* Pull quote — full width feel */}
        <div className="max-w-[900px] mx-auto mt-16 md:mt-24">
          <FadeUp delay={0.15}>
            <blockquote
              className="font-[family-name:var(--font-cormorant)] font-light text-center mx-auto"
              style={{
                fontSize: "clamp(24px, 4vw, 40px)",
                color: "#2B3A52",
                lineHeight: 1.3,
                maxWidth: 700,
              }}
            >
              &ldquo;If your mental model still has departments optimising steps, you are not there yet.&rdquo;
            </blockquote>
            <div className="flex justify-center mt-6">
              <span style={{ width: 40, height: 2, background: "#8B7355", display: "block" }} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THREE LAYERS ── warm tinted background */}
      <section id="three-layers" className="py-20 md:py-32 px-5 md:px-8" style={{ background: "#F0ECE3" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>The Workforce</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Three workforces.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-3 gap-0 mb-16">
              {[
                {
                  label: "Bots",
                  body: "The industrial backbone. Rule-based, repeatable, auditable. Reconciliations, KYC extraction, settlements. <strong>No judgment. By design.</strong>",
                },
                {
                  label: "Agents",
                  body: "Junior-to-mid knowledge workers at scale. Goal-driven, context-aware, probabilistic. They decide within a policy envelope humans defined. <strong>They escalate when the cost of being wrong exceeds their authorisation level.</strong>",
                },
                {
                  label: "Humans",
                  body: "Board-level decision proxies embedded in operations. They own <strong>irreversible decisions, regulatory accountability, and relationship trust</strong>. They never touch routine.",
                },
              ].map((col) => (
                <div
                  key={col.label}
                  className="pt-6 pb-8 md:pr-8"
                  style={{ borderTop: "2px solid #2B3A52" }}
                >
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3"
                    style={{ fontSize: "1.5rem", color: "#2B3A52" }}
                  >
                    {col.label}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#1A1A1A", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: col.body }} />
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div
              className="p-6 md:p-8"
              style={{ borderLeft: "3px solid #2B3A52", background: "rgba(247,244,239,0.7)" }}
            >
              <p
                className="font-[family-name:var(--font-dm-sans)]"
                style={{ color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}
              >
                <strong style={{ fontWeight: 700 }}>Escalation is a design requirement.</strong> The trigger: &lsquo;the cost of being wrong here exceeds my authorisation level.&rsquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── HR FOR AGENTS ── numbered phases */}
      <section id="hr-for-agents" className="py-20 md:py-32 px-5 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Governance</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A", maxWidth: 640 }}
            >
              Deploying an agent is a hiring decision.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-0">
              {[
                {
                  num: "01",
                  phase: "Onboarding",
                  body: "An agent needs context, scope, and constraints before it acts. <strong>Think orientation, not configuration.</strong> What decisions is it authorised to make? What must it escalate? What values does it carry into ambiguous situations? These are onboarding questions. The hiring manager is the process owner, not IT.",
                },
                {
                  num: "02",
                  phase: "Performance",
                  body: "An agent making ten thousand micro-decisions per day cannot be evaluated by auditing each one. <strong>Define performance envelopes</strong>: expected error rates, escalation frequency, outcome distributions. Measure against them continuously. A quarterly human review of agent performance is a governance requirement under any serious reading of DORA or FINMA operational risk principles.",
                },
                {
                  num: "03",
                  phase: "Decommissioning",
                  body: "An agent trained on a regulatory environment that has since changed is a liability. Decommissioning requires evidence that the decision history has been reviewed, open cases transferred, and the model archived in retrievable format for audit. <strong>Closer to retiring a trader than switching off software.</strong>",
                },
              ].map((item) => (
                <div key={item.phase} className="py-8 md:py-10 flex flex-col md:flex-row gap-4 md:gap-8" style={{ borderTop: "1px solid #D8D3CB" }}>
                  <div className="md:w-48 md:shrink-0 flex items-baseline gap-4">
                    <span
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "2.5rem", color: "#2B3A52", opacity: 0.2, lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {item.num}
                    </span>
                    <h3
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.4rem", color: "#2B3A52" }}
                    >
                      {item.phase}
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "#1A1A1A", lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE SWISS ANGLE ── right-offset heading */}
      <section id="swiss-angle" className="py-20 md:py-32 px-5 md:px-8" style={{ background: "#F0ECE3" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <div className="md:ml-auto md:max-w-[660px]">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>The Swiss Angle</p>
              <h2
                className="font-[family-name:var(--font-cormorant)] font-light mb-16"
                style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
              >
                Switzerland has a structural advantage. Most Swiss banks do not know it yet.
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  label: "FINMA",
                  body: "FINMA's principles-based regulatory philosophy is <strong>more compatible with agentic systems than the rules-based frameworks of the EU</strong>. When the regulator governs outcomes and accountability rather than specifying processes, there is meaningful room to deploy systems that cannot be fully specified in advance. Banks that treat compliance as a design input will move faster.",
                },
                {
                  label: "Data residency",
                  body: "Swiss data sovereignty requirements have historically been seen as constraints. <strong>They are becoming advantages.</strong> Organisations forced to build local infrastructure, local data management, and local governance are better positioned to operate agentic systems within defensible jurisdictional boundaries. That requirement is only growing globally.",
                },
                {
                  label: "Relationship banking",
                  body: "Swiss private banking is built on long-term relationships with high-value clients. Agentic systems excel at synthesising deep longitudinal context into coherent advisory actions. The relationship model is strengthened by agents, when the human at the centre uses the enhanced context well. <strong>The best private banks will feel more attentive to clients, not more automated.</strong>",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-4" style={{ width: 32, height: 2, background: "#8B7355" }} />
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3"
                    style={{ fontSize: "1.4rem", color: "#2B3A52" }}
                  >
                    {item.label}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#1A1A1A", lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE PROVOCATION ── dark section */}
      <section id="the-provocation" className="py-24 md:py-36 px-5 md:px-8 overflow-hidden" style={{ background: "#2B3A52" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#8B7355" }}>The Provocation</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-20"
              style={{ fontSize: "clamp(28px, 4vw, 46px)", color: "#F7F4EF", maxWidth: 700 }}
            >
              If your bank still scales by hiring, you are already structurally uncompetitive.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative mb-6">
              <span
                className="font-[family-name:var(--font-cormorant)] font-light select-none"
                style={{
                  fontSize: "clamp(120px, 25vw, 240px)",
                  lineHeight: 0.85,
                  color: "#F7F4EF",
                  opacity: 0.1,
                  display: "block",
                  marginLeft: "-0.03em",
                }}
                aria-hidden="true"
              >
                56%
              </span>
            </div>
            <p className="mb-24 text-sm" style={{ color: "rgba(247,244,239,0.5)", maxWidth: 480 }}>
              Illustrative cost reduction per application required to break even when inbound volume increases tenfold without a corresponding increase in revenue. Based on Swiss mortgage market estimates.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex justify-center">
              <span style={{ width: 40, height: 2, background: "#8B7355", display: "block", marginBottom: "2rem" }} />
            </div>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light text-center"
              style={{ fontSize: "clamp(20px, 3vw, 30px)", color: "#F7F4EF", lineHeight: 1.45, maxWidth: 680, margin: "0 auto" }}
            >
              The decision you are not making today is already costing you the optionality you will need in 24 months.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── ASSESSMENT + FRAMEWORK CTA ── */}
      <section className="py-16 md:py-24 px-5 md:px-8" style={{ background: "#F7F4EF" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/assessment"
                className="group p-8 transition-colors duration-300 hover:bg-[rgba(43,58,82,0.06)]"
                style={{ border: "1px solid #D8D3CB" }}
              >
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Assessment</p>
                <h3
                  className="font-[family-name:var(--font-cormorant)] font-light mb-3 group-hover:text-[#2B3A52] transition-colors"
                  style={{ fontSize: "1.3rem", color: "#1A1A1A" }}
                >
                  How ready is your bank?
                </h3>
                <p className="text-sm mb-4" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>
                  Fifteen questions. Five minutes. Exportable as PDF.
                </p>
                <span className="text-xs uppercase tracking-widest group-hover:underline" style={{ color: "#2B3A52" }}>
                  Begin assessment
                </span>
              </Link>
              <Link
                href="/framework"
                className="group p-8 transition-colors duration-300 hover:bg-[rgba(43,58,82,0.06)]"
                style={{ border: "1px solid #D8D3CB" }}
              >
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Framework</p>
                <h3
                  className="font-[family-name:var(--font-cormorant)] font-light mb-3 group-hover:text-[#2B3A52] transition-colors"
                  style={{ fontSize: "1.3rem", color: "#1A1A1A" }}
                >
                  The three-layer model
                </h3>
                <p className="text-sm mb-4" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>
                  Bots, Agents, Humans: each with different governance, accountability, and escalation design.
                </p>
                <span className="text-xs uppercase tracking-widest group-hover:underline" style={{ color: "#2B3A52" }}>
                  View the framework
                </span>
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
              Twenty years across digital banking, fintech, and emerging technologies. Multiple director-level roles at UBS — digital channels, wealth management, investment products across international markets. CEO of Trust Square, Zurich&apos;s blockchain ecosystem. Managing Partner at Tenity, leading early-stage fintech investment and open innovation partnerships with Julius B&auml;r, UBS, and others. Co-founded an ETH AI spin-off. Now heading banking and financial services for UiPath in Switzerland, where the agentic shift is the work, not theory.
            </p>
            <p className="mb-8" style={{ maxWidth: 620, color: "#6B6B6B", lineHeight: 1.8, fontSize: "0.9rem" }}>
              This site is a framework I use in my own thinking, offered here as a basis for serious conversation with people who are working on the same questions.
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
              I speak to boards, brief leadership teams, and advise executives on what the agentic shift means for their institution. Whether that leads to a keynote, a board briefing, or a working conversation depends on what you need.
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
          </div>
        </div>
      </footer>
    </main>
  );
}
