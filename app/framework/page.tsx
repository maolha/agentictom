import { Metadata } from "next";
import Link from "next/link";
import { LinkedInIcon, XIcon } from "@/components/SocialIcons";
import StickyNav from "@/components/StickyNav";
import FadeUp from "@/components/FadeUp";
import ThreeLayerDiagram from "@/components/ThreeLayerDiagram";

export const metadata: Metadata = {
  title: "The Framework — Agentic TOM",
  description:
    "Three layers of workforce, five operating principles, and an autonomy ladder: the agentic target operating model for Swiss banking, with a worked example.",
  openGraph: {
    title: "The Framework — Agentic TOM",
    description: "Three layers, five principles, one autonomy ladder. The agentic operating model for banking.",
    url: "https://agentictom.com/framework",
    siteName: "Agentic TOM",
  },
};

const principles = [
  {
    number: "01",
    title: "Escalation is designed by cost of error",
    body: "The trigger for human involvement is the cost of being wrong, calibrated per decision type. A fee waiver and a CHF 2 million lending exception should never share the same path.",
    link: { title: "Escalation by Design", slug: "escalation-by-design" },
  },
  {
    number: "02",
    title: "Humans govern outcomes, not tasks",
    body: "People concentrate where judgement and accountability live: exceptions, envelope design, relationships. Routine work in the human layer is a design failure.",
    link: { title: "What Is an Agentic TOM?", slug: "agentic-tom-introduction" },
  },
  {
    number: "03",
    title: "Every agent has a job description",
    body: "Scope, policy envelope, escalation rules, a named owner, and a review cadence. An agent without a job description is unmanaged headcount.",
    link: { title: "The Job Description No One Has Written", slug: "the-job-description-no-one-has-written" },
  },
  {
    number: "04",
    title: "Autonomy is earned in levels",
    body: "No board approves a jump from supervised recommendations to autonomous decisions. Evidence at each level is the permission slip for the next.",
    link: { title: "From ABS to Autopilot", slug: "from-abs-to-autopilot" },
  },
  {
    number: "05",
    title: "The demand side sets the clock",
    body: "When clients send agents, response time and unit cost stop being service metrics and become conversion drivers. The pace of redesign is set outside the bank.",
    link: { title: "The Tsunami Is Not Coming from Inside the Bank", slug: "the-tsunami-is-not-coming-from-inside-the-bank" },
  },
];

const ladder = [
  { level: "0", name: "Fully manual", line: "Paper, spreadsheets, manual approvals.", marker: null },
  { level: "1", name: "Assistance", line: "Bots extract, check, route. Deterministic.", marker: "most banks" },
  { level: "2", name: "Partial automation", line: "AI recommends, a human reviews every output.", marker: "most banks" },
  { level: "3", name: "Conditional autonomy", line: "Agents decide within envelopes, escalate beyond.", marker: "advantage begins" },
  { level: "4", name: "High autonomy", line: "Agents run whole domains. Humans govern envelopes.", marker: null },
  { level: "5", name: "Full autonomy", line: "Direction of travel. Regulatory, and later.", marker: null },
];

const mortgageLayers = [
  {
    label: "Bot layer",
    body: "Ingestion. Eligibility checks. Data enrichment. Sanctions screening.",
    meta: "Time: seconds. Cost: near zero.",
  },
  {
    label: "Agent layer",
    body: "Risk assessment. Pricing. Offer generation. Escalation decisions within the policy envelope.",
    meta: "Time: minutes. Cost: low.",
  },
  {
    label: "Human layer",
    body: "Exception review. Relationship calls. Policy governance. Quarterly performance review of agents.",
    meta: "Time: where it matters. Cost: where it matters.",
  },
];

const applied = [
  {
    domain: "Lending operations",
    title: "Mortgage Lending in an Agentic TOM",
    slug: "mortgage-lending-in-an-agentic-tom",
    line: "One end-to-end process, redesigned across the three layers, grounded in FINMA's expectations.",
  },
  {
    domain: "Financial crime compliance",
    title: "Eighty-Four Reports a Day",
    slug: "eighty-four-reports-a-day",
    line: "A workload compounding at 32 percent a year meets a labour pool that cannot grow.",
  },
  {
    domain: "Software quality",
    title: "Your Software Will Be Tested at Machine Speed",
    slug: "tested-at-machine-speed",
    line: "The control function that decides how fast everything else is allowed to move.",
  },
];

export default function FrameworkPage() {
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

      {/* Hero */}
      <div className="px-5 md:px-8 pt-20 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Framework</p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light mb-8"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15, color: "#1A1A1A" }}
            >
              The agentic operating model
            </h1>
            <p className="mb-6" style={{ fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.8, maxWidth: 660 }}>
              Your operating model was designed for a workforce that was entirely human. <strong style={{ fontWeight: 700 }}>The agentic TOM replaces that assumption with three layers</strong>: bots that execute, agents that decide, humans who govern. Each layer is governed differently, fails differently, and answers for different decisions.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-widest" style={{ color: "#6B6B6B" }}>
              <span>Three layers</span>
              <span aria-hidden="true" style={{ color: "#D8D3CB" }}>·</span>
              <span>Five principles</span>
              <span aria-hidden="true" style={{ color: "#D8D3CB" }}>·</span>
              <span>One ladder</span>
              <span aria-hidden="true" style={{ color: "#D8D3CB" }}>·</span>
              <span>One worked example</span>
            </div>
            <a
              href="/agentic-tom-one-pager.pdf"
              className="inline-block mt-6 text-xs uppercase tracking-widest hover:underline"
              style={{ color: "#2B3A52" }}
            >
              Download the framework as a one-pager (PDF) →
            </a>
          </FadeUp>
        </div>
      </div>

      {/* The interactive diagram */}
      <div className="px-5 md:px-8 pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto">
          <FadeUp delay={0.1}>
            <ThreeLayerDiagram />
          </FadeUp>
        </div>
      </div>

      {/* Five principles */}
      <section className="px-5 md:px-8 py-20 md:py-28" style={{ background: "#F0ECE3" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Operating principles</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Five principles carry the model
            </h2>
            <p className="mb-12 text-sm" style={{ color: "#6B6B6B", maxWidth: 560, lineHeight: 1.7 }}>
              The layers describe the structure. The principles decide how it behaves under load. Each one is explored in depth in its own essay.
            </p>
          </FadeUp>
          <div className="flex flex-col">
            {principles.map((p, i) => (
              <FadeUp key={p.number} delay={i * 0.05}>
                <div
                  className="py-7 md:py-8 grid md:grid-cols-[64px_1fr_auto] gap-3 md:gap-8 items-baseline"
                  style={{ borderTop: "1px solid #D8D3CB" }}
                >
                  <span
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "1.6rem", color: "#8B7355" }}
                  >
                    {p.number}
                  </span>
                  <div>
                    <h3
                      className="font-[family-name:var(--font-cormorant)] font-light mb-2"
                      style={{ fontSize: "1.45rem", color: "#2B3A52" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#1A1A1A", lineHeight: 1.7, maxWidth: 560 }}>
                      {p.body}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${p.link.slug}`}
                    className="text-xs uppercase tracking-widest hover:underline whitespace-nowrap"
                    style={{ color: "#2B3A52" }}
                  >
                    The essay →
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Autonomy ladder */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>The ladder</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Autonomy is a progression
            </h2>
            <p className="mb-12 text-sm" style={{ color: "#6B6B6B", maxWidth: 560, lineHeight: 1.7 }}>
              Borrowed from driving automation, applied to banking. Most Swiss institutions operate at Level 1 to 2. The structural advantage begins at Level 3.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-6" style={{ borderLeft: "1px solid #D8D3CB", borderTop: "1px solid #D8D3CB" }}>
              {ladder.map((step) => (
                <div
                  key={step.level}
                  className="p-4 md:p-5 flex flex-col gap-2"
                  style={{
                    borderRight: "1px solid #D8D3CB",
                    borderBottom: "1px solid #D8D3CB",
                    background: step.marker === "advantage begins" ? "rgba(43,58,82,0.06)" : "transparent",
                  }}
                >
                  <span
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "1.8rem", color: step.marker === "advantage begins" ? "#2B3A52" : "#D8D3CB", lineHeight: 1 }}
                  >
                    {step.level}
                  </span>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "#2B3A52", fontWeight: 600 }}>
                    {step.name}
                  </p>
                  <p className="text-xs" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
                    {step.line}
                  </p>
                  {step.marker && (
                    <p className="text-[10px] uppercase tracking-widest mt-auto pt-2" style={{ color: "#8B7355" }}>
                      {step.marker}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs mt-6" style={{ color: "#6B6B6B", maxWidth: 620, lineHeight: 1.7 }}>
              FINMA Guidance 08/2024 permits autonomous use once systems are &ldquo;sufficiently reliable and this can ultimately be proven.&rdquo; The evidence generated at each level is the permission slip for the next.{" "}
              <Link href="/blog/from-abs-to-autopilot" className="hover:underline" style={{ color: "#2B3A52" }}>
                How trust accumulates →
              </Link>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Worked example */}
      <section className="px-5 md:px-8 py-20 md:py-28" style={{ background: "#F0ECE3" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Worked example</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-8"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              What changes when you apply it
            </h2>
            <p className="mb-12" style={{ maxWidth: 620, color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Take mortgage origination, the process every Swiss bank runs the same way. The three-layer model redesigns it without changing what FINMA requires.
            </p>
          </FadeUp>
          <div className="grid md:grid-cols-3" style={{ borderLeft: "1px solid #D8D3CB", borderTop: "1px solid #D8D3CB" }}>
            {mortgageLayers.map((layer, i) => (
              <FadeUp key={layer.label} delay={i * 0.07}>
                <div className="p-6 md:p-7 h-full flex flex-col gap-3" style={{ borderRight: "1px solid #D8D3CB", borderBottom: "1px solid #D8D3CB" }}>
                  <h3 className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.3rem", color: "#2B3A52" }}>
                    {layer.label}
                  </h3>
                  <p className="text-sm" style={{ color: "#1A1A1A", lineHeight: 1.7 }}>
                    {layer.body}
                  </p>
                  <p className="text-xs uppercase tracking-widest mt-auto" style={{ color: "#8B7355" }}>
                    {layer.meta}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.15}>
            <div className="mt-10">
              <p className="text-sm mb-4" style={{ color: "#1A1A1A", maxWidth: 620, lineHeight: 1.7 }}>
                Same process. Same FINMA requirements, designed in. Different cost structure, different speed, different accountability boundaries.
              </p>
              <Link
                href="/blog/mortgage-lending-in-an-agentic-tom"
                className="text-xs uppercase tracking-widest hover:underline"
                style={{ color: "#2B3A52" }}
              >
                Read the full case sketch →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Applied elsewhere */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Beyond lending</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-12"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              The same model, other domains
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {applied.map((a, i) => (
              <FadeUp key={a.slug} delay={i * 0.07}>
                <Link href={`/blog/${a.slug}`} className="group block h-full">
                  <div className="mb-4" style={{ width: 32, height: 2, background: "#8B7355" }} />
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>
                    {a.domain}
                  </p>
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3 group-hover:underline"
                    style={{ fontSize: "1.35rem", color: "#2B3A52", lineHeight: 1.3 }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>
                    {a.line}
                  </p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="px-5 md:px-8 py-20 md:py-28" style={{ background: "#2B3A52" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>Next step</p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", color: "#F7F4EF", lineHeight: 1.3 }}
          >
            Where does your institution stand today?
          </h2>
          <p className="mb-4 text-sm" style={{ color: "rgba(247,244,239,0.6)", maxWidth: 480, margin: "0 auto 1rem", lineHeight: 1.7 }}>
            Fifteen questions across the five dimensions this framework defines. About five minutes. Exportable as a PDF for your leadership team.
          </p>
          <p className="mb-10 text-xs" style={{ color: "rgba(247,244,239,0.45)" }}>
            No registration. Individual answers stay in your browser.
          </p>
          <Link
            href="/assessment"
            className="inline-block px-8 py-3 border text-xs uppercase tracking-widest transition-colors duration-300 hover:bg-[#F7F4EF] hover:text-[#2B3A52]"
            style={{ borderColor: "#F7F4EF", color: "#F7F4EF" }}
          >
            Take the assessment
          </Link>
          <p className="mt-8">
            <a
              href="/agentic-tom-one-pager.pdf"
              className="text-xs uppercase tracking-widest hover:underline"
              style={{ color: "rgba(247,244,239,0.6)" }}
            >
              Or take the framework with you: the one-pager (PDF) →
            </a>
          </p>
        </div>
      </section>

      <footer className="px-5 md:px-8 py-10 border-t" style={{ borderColor: "#D8D3CB" }}>
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
