import { Metadata } from "next";
import Link from "next/link";
import { LinkedInIcon, XIcon } from "@/components/SocialIcons";
import StickyNav from "@/components/StickyNav";

export const metadata: Metadata = {
  title: "The Three-Layer Model — Agentic TOM",
  description: "The agentic workforce has three layers: Bots, Agents, and Humans, each with different governance, accountability, and escalation design.",
  openGraph: {
    title: "The Three-Layer Model — Agentic TOM",
    description: "Bots, Agents, and Humans — the three-layer workforce model for agentic banking.",
    url: "https://agentictom.com/framework",
    siteName: "Agentic TOM",
  },
};

const layerLinks = [
  {
    label: "Bots",
    tag: "Deterministic backbone",
    summary: "Where an agent's decision becomes a posted transaction in the system of record, with full audit trail.",
    posts: [
      { title: "The Easy Part Is the AI", slug: "the-easy-part-is-the-ai" },
    ],
  },
  {
    label: "Agents",
    tag: "Knowledge workers at scale",
    summary: "Goal-driven and probabilistic, escalating when the cost of being wrong exceeds the authorisation level.",
    posts: [
      { title: "Escalation by Design", slug: "escalation-by-design" },
      { title: "From ABS to Autopilot", slug: "from-abs-to-autopilot" },
    ],
  },
  {
    label: "Humans",
    tag: "Concentrated at the edges",
    summary: "Exceptions, governance, relationships, irreversible decisions. Never routine.",
    posts: [
      { title: "Who Manages the Agents?", slug: "who-manages-the-agents" },
      { title: "The Job Description No One Has Written", slug: "the-job-description-no-one-has-written" },
    ],
  },
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
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Framework</p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-8"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15, color: "#1A1A1A" }}
          >
            The three-layer model
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.8, maxWidth: 660 }}>
            Your operating model was designed for a workforce that was entirely human. <strong style={{ fontWeight: 700 }}>The agentic TOM replaces that assumption with three layers</strong>, each governed differently, each accountable for different decisions.
          </p>
        </div>
      </div>

      {/* The Diagram */}
      <div className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[900px] mx-auto">
          {/* Governance wrapper */}
          <div
            className="p-6 md:p-10"
            style={{ border: "2px solid #2B3A52" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span style={{ width: 24, height: 2, background: "#2B3A52", display: "block" }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: "#2B3A52", fontWeight: 700 }}>
                Governance layer
              </p>
            </div>
            <p className="mb-10 text-sm" style={{ color: "#6B6B6B", maxWidth: 520, lineHeight: 1.7 }}>
              Accountability, risk ownership, and regulatory responsibility. Humans set the boundaries within which all three layers operate.
            </p>

            {/* Three layers */}
            <div className="flex flex-col gap-0">
              {/* Humans */}
              <div
                className="p-6 md:p-8"
                style={{ background: "#2B3A52", color: "#F7F4EF" }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="md:w-48 md:shrink-0">
                    <h2
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.6rem" }}
                    >
                      Humans
                    </h2>
                    <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "#8B7355" }}>
                      Decision proxies
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-4" style={{ lineHeight: 1.8, opacity: 0.85 }}>
                      Own irreversible decisions, regulatory accountability, and relationship trust. Operate at the edges: exceptions, governance, judgment calls. Never touch routine.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["Irreversible decisions", "Regulatory accountability", "Relationship trust", "Exception handling"].map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1" style={{ border: "1px solid rgba(247,244,239,0.3)", color: "rgba(247,244,239,0.7)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Escalation indicator */}
              <div className="flex items-center justify-center py-3" style={{ background: "rgba(43,58,82,0.06)" }}>
                <span className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
                  ↑ Escalation by design ↓
                </span>
              </div>

              {/* Agents */}
              <div
                className="p-6 md:p-8"
                style={{ background: "rgba(43,58,82,0.08)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="md:w-48 md:shrink-0">
                    <h2
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.6rem", color: "#2B3A52" }}
                    >
                      Agents
                    </h2>
                    <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "#8B7355" }}>
                      Knowledge workers at scale
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-4" style={{ lineHeight: 1.8, color: "#1A1A1A" }}>
                      Goal-driven, context-aware, probabilistic. Make decisions within a policy envelope defined by humans. Escalate when the cost of being wrong exceeds their authorisation level.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["Goal pursuit", "Context awareness", "Policy envelopes", "Probabilistic decisions", "Escalation triggers"].map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1" style={{ border: "1px solid #D8D3CB", color: "#6B6B6B" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delegation indicator */}
              <div className="flex items-center justify-center py-3" style={{ background: "rgba(43,58,82,0.03)" }}>
                <span className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
                  ↑ Delegation ↓
                </span>
              </div>

              {/* Bots */}
              <div
                className="p-6 md:p-8"
                style={{ border: "1px solid #D8D3CB" }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="md:w-48 md:shrink-0">
                    <h2
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.6rem", color: "#2B3A52" }}
                    >
                      Bots
                    </h2>
                    <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "#8B7355" }}>
                      Industrial backbone
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-4" style={{ lineHeight: 1.8, color: "#1A1A1A" }}>
                      Rule-based, deterministic, auditable. Execute predefined processes on predefined inputs. Reconciliations, extractions, routing. No judgment. By design.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["Rule-based", "Deterministic", "Auditable", "No judgment"].map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1" style={{ border: "1px solid #D8D3CB", color: "#6B6B6B" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drill into each layer */}
      <section className="px-5 md:px-8 py-20 md:py-28" style={{ background: "#F0ECE3" }}>
        <div className="max-w-[900px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>By layer</p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light mb-12"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
          >
            Read deeper
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {layerLinks.map((layer) => (
              <div key={layer.label}>
                <div className="mb-4" style={{ width: 32, height: 2, background: "#8B7355" }} />
                <h3
                  className="font-[family-name:var(--font-cormorant)] font-light"
                  style={{ fontSize: "1.4rem", color: "#2B3A52" }}
                >
                  {layer.label}
                </h3>
                <p className="text-xs uppercase tracking-widest mt-1 mb-4" style={{ color: "#8B7355" }}>
                  {layer.tag}
                </p>
                <p className="text-sm mb-6" style={{ color: "#1A1A1A", lineHeight: 1.7 }}>
                  {layer.summary}
                </p>
                <ul className="flex flex-col gap-2">
                  {layer.posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-xs uppercase tracking-widest hover:underline"
                        style={{ color: "#2B3A52" }}
                      >
                        {p.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What changes when you apply it */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
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
          <div className="flex flex-col">
            {mortgageLayers.map((layer, i) => (
              <div
                key={layer.label}
                className="py-6 md:py-8 flex flex-col md:flex-row gap-3 md:gap-8"
                style={i > 0 ? { borderTop: "1px solid #D8D3CB" } : { borderTop: "1px solid #D8D3CB" }}
              >
                <div className="md:w-40 md:shrink-0">
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light"
                    style={{ fontSize: "1.3rem", color: "#2B3A52" }}
                  >
                    {layer.label}
                  </h3>
                </div>
                <div>
                  <p className="text-sm mb-2" style={{ color: "#1A1A1A", lineHeight: 1.7 }}>
                    {layer.body}
                  </p>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
                    {layer.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid #D8D3CB" }}>
            <p className="text-sm mb-4" style={{ color: "#1A1A1A", maxWidth: 620, lineHeight: 1.7 }}>
              Same process. Same FINMA requirements, designed in. Different cost structure. Different speed. Different accountability boundaries.
            </p>
            <Link
              href="/blog/mortgage-lending-in-an-agentic-tom"
              className="text-xs uppercase tracking-widest hover:underline"
              style={{ color: "#2B3A52" }}
            >
              Read the full case sketch →
            </Link>
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
            Where does your bank stand today?
          </h2>
          <p className="mb-10 text-sm" style={{ color: "rgba(247,244,239,0.6)", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Fifteen questions across five dimensions. Five minutes. Exportable as PDF for your leadership team.
          </p>
          <Link
            href="/assessment"
            className="inline-block px-8 py-3 border text-xs uppercase tracking-widest transition-colors duration-300 hover:bg-[#F7F4EF] hover:text-[#2B3A52]"
            style={{ borderColor: "#F7F4EF", color: "#F7F4EF" }}
          >
            Take the assessment
          </Link>
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
