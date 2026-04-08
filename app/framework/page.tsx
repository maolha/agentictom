import { Metadata } from "next";
import Link from "next/link";
import { LinkedInIcon, XIcon } from "@/components/SocialIcons";

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

export default function FrameworkPage() {
  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <nav className="px-5 md:px-8 py-4 md:py-5" style={{ borderBottom: "1px solid #D8D3CB" }}>
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
      </nav>

      {/* Hero */}
      <div className="px-5 md:px-8 pt-20 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-[900px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Framework</p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15, color: "#1A1A1A" }}
          >
            The three-layer model
          </h1>
          <p style={{ fontSize: "1rem", color: "#6B6B6B", lineHeight: 1.7, maxWidth: 580 }}>
            An agentic workforce has three distinct layers, each with different capabilities, governance requirements, and accountability structures.
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
                      Own irreversible decisions, regulatory accountability, and relationship trust. Operate at the edges — exceptions, governance, judgment calls. Never touch routine.
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

          {/* Key principles */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                label: "Governed like staff",
                body: "Agents are onboarded, monitored, and decommissioned — like staff, not like software.",
              },
              {
                label: "Escalation is designed",
                body: "The trigger: the cost of being wrong here exceeds my authorisation level.",
              },
              {
                label: "Outcome-driven",
                body: "The organising principle is the end-to-end outcome, not the department or the process step.",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-4" style={{ width: 32, height: 2, background: "#8B7355" }} />
                <h3
                  className="font-[family-name:var(--font-cormorant)] font-light mb-3"
                  style={{ fontSize: "1.3rem", color: "#2B3A52" }}
                >
                  {item.label}
                </h3>
                <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 pt-12 text-center" style={{ borderTop: "1px solid #D8D3CB" }}>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light mb-6"
              style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "#1A1A1A", lineHeight: 1.4 }}
            >
              Assess where your bank stands today
            </p>
            <Link href="/assessment" className="btn-outline-slate">
              Take the assessment
            </Link>
          </div>
        </div>
      </div>

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
