import FadeUp from "@/components/FadeUp";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

const blogPosts = [
  {
    slug: "agentic-tom-introduction",
    title: "What Is an Agentic Target Operating Model?",
    date: "March 2026",
    excerpt:
      "Most discussions about AI in banking focus on tools. The more consequential question is how the organisation itself must change to absorb what these tools make possible.",
  },
  {
    slug: "escalation-by-design",
    title: "Escalation by Design: Why Human Oversight Is an Architecture Decision",
    date: "February 2026",
    excerpt:
      "The failure mode of most automation projects is not that machines make wrong decisions. It is that nobody designed when and how the decision returns to a human.",
  },
  {
    slug: "swiss-banking-agentic-advantage",
    title: "The Swiss Agentic Advantage",
    date: "January 2026",
    excerpt:
      "Switzerland has attributes that could make it a global leader in responsible agentic deployment. FINMA's principles-based framework, data sovereignty, and the depth of relationship banking all point in the same direction.",
  },
];

export default function Home() {
  return (
    <main
      style={{ background: "#F7F4EF", color: "#1A1A1A" }}
      className="font-[family-name:var(--font-dm-sans)]"
    >
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5" style={{ background: "#F7F4EF", borderBottom: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto flex justify-between items-center">
          <span className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-wide text-[#1A1A1A]">
            agentictom.com
          </span>
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-[#6B6B6B]">
            <a href="#about" className="hover:text-[#2B3A52] transition-colors">About</a>
            <a href="#speaking" className="hover:text-[#2B3A52] transition-colors">Speaking</a>
            <a href="#writing" className="hover:text-[#2B3A52] transition-colors">Writing</a>
            <a href="https://linkedin.com/in/marcoliverhauser" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B3A52] transition-colors">LinkedIn</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-24 px-8 overflow-hidden">
        <div className="max-w-[900px] mx-auto w-full">
          <FadeUp delay={0}>
            <div
              className="font-[family-name:var(--font-cormorant)] font-light select-none pointer-events-none"
              style={{
                fontSize: "clamp(120px, 22vw, 220px)",
                lineHeight: 0.85,
                color: "#2B3A52",
                opacity: 0.12,
                marginLeft: "-0.05em",
                marginBottom: "2rem",
              }}
              aria-hidden="true"
            >
              01
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light mb-6"
              style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.15, color: "#1A1A1A" }}
            >
              The ones that wait are not being prudent.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="font-[family-name:var(--font-dm-sans)] mb-4 max-w-[620px]"
              style={{ fontSize: "1.15rem", color: "#1A1A1A", lineHeight: 1.7 }}
            >
              They are deferring a structural reckoning while their window to shape it closes.
            </p>
            <p
              className="font-[family-name:var(--font-dm-sans)] mb-10 max-w-[580px]"
              style={{ fontSize: "1rem", color: "#6B6B6B", lineHeight: 1.7 }}
            >
              This is one possible future. Not a prediction. If you believe it is likely — and you want to act — the time to move is now. Change takes longer than you think.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <a href="#section01" className="btn-outline-slate">
              Read the framework
            </a>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 01 — THE SHIFT */}
      <section id="section01" className="py-24 px-8 border-t" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <div className="flex items-start gap-8 mb-12">
              <span
                className="font-[family-name:var(--font-cormorant)] font-light shrink-0"
                style={{ fontSize: "clamp(80px, 14vw, 140px)", lineHeight: 0.85, color: "#2B3A52", opacity: 0.1 }}
                aria-hidden="true"
              >
                01
              </span>
              <div className="pt-4">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>The Shift</p>
                <h2
                  className="font-[family-name:var(--font-cormorant)] font-light mb-6"
                  style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
                >
                  Work is no longer organised around functions.
                </h2>
                <p style={{ color: "#1A1A1A", lineHeight: 1.8, maxWidth: 580 }}>
                  A bank with an Agentic Target Operating Model looks nothing like today. Decision-making authority shifts from human-controlled workflows to dynamically orchestrated, machine-led execution systems — with humans governing exceptions, risk, and intent. The organising principle is not the department or the process. It is the outcome. And outcomes are owned end-to-end by systems that learn.
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <blockquote
              className="font-[family-name:var(--font-cormorant)] font-light italic"
              style={{
                fontSize: "clamp(22px, 3.5vw, 34px)",
                color: "#2B3A52",
                lineHeight: 1.35,
                maxWidth: 540,
                marginLeft: "-1rem",
                paddingLeft: "2rem",
                borderLeft: "2px solid #8B7355",
              }}
            >
              "If your mental model still has departments optimising steps, you are not there yet."
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 02 — THREE LAYERS */}
      <section id="section02" className="py-24 px-8 border-t" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Three Layers</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Not one workforce. Three.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-3 gap-0 mb-16">
              {[
                {
                  label: "Bots",
                  body: "The industrial backbone. Rule-based, repeatable, auditable. Reconciliations, KYC extraction, settlements. No judgment — by design.",
                },
                {
                  label: "Agents",
                  body: "Junior-to-mid knowledge workers at scale. Goal-driven, context-aware, probabilistic. They decide within a policy envelope humans defined. They escalate when the cost of being wrong exceeds their authorisation level.",
                },
                {
                  label: "Humans",
                  body: "Board-level decision proxies embedded in operations. They own irreversible decisions, regulatory accountability, and relationship trust. They never touch routine.",
                },
              ].map((col) => (
                <div
                  key={col.label}
                  className="pt-6 pr-8 pb-8"
                  style={{ borderTop: "1px solid #1A1A1A" }}
                >
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3"
                    style={{ fontSize: "1.5rem", color: "#2B3A52" }}
                  >
                    {col.label}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#1A1A1A", lineHeight: 1.75 }}>{col.body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div
              className="p-6"
              style={{ borderLeft: "3px solid #2B3A52", background: "rgba(43,58,82,0.04)" }}
            >
              <p
                className="font-[family-name:var(--font-dm-sans)]"
                style={{ color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}
              >
                Escalation is not a failure state. It is a design requirement. The trigger is not &lsquo;I do not know.&rsquo; The trigger is &lsquo;the cost of being wrong here exceeds my authorisation level.&rsquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 03 — HR FOR AGENTS */}
      <section id="section03" className="py-24 px-8 border-t" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>HR for Agents</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A", maxWidth: 640 }}
            >
              Deploying an agent is not a software rollout. It is a hiring decision.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col divide-y" style={{ borderColor: "#D8D3CB" }}>
              {[
                {
                  phase: "Onboarding",
                  body: "An agent needs context, scope, and constraints before it acts. This is not configuration. It is orientation. What decisions is it authorised to make? What must it escalate? What values does it carry into ambiguous situations? These are onboarding questions, not technical ones.",
                },
                {
                  phase: "Performance",
                  body: "How do you evaluate an agent that makes ten thousand micro-decisions per day? Not by auditing each one. By defining performance envelopes — expected error rates, escalation frequency, outcome distributions — and measuring against them. This is performance management, not monitoring.",
                },
                {
                  phase: "Decommissioning",
                  body: "Agents that hold institutional memory, relationship context, or audit trails cannot simply be switched off. Decommissioning requires knowledge transfer, accountability handoff, and regulatory notification in some jurisdictions. Treat it as an offboarding, not a deletion.",
                },
              ].map((item) => (
                <div key={item.phase} className="py-8 flex gap-8">
                  <div className="w-40 shrink-0">
                    <h3
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.4rem", color: "#2B3A52" }}
                    >
                      {item.phase}
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "#1A1A1A", lineHeight: 1.8 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 04 — THE SWISS ANGLE */}
      <section id="section04" className="py-24 px-8 border-t" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>The Swiss Angle</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A", maxWidth: 660 }}
            >
              Switzerland has a structural advantage. Most Swiss banks do not know it yet.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col divide-y" style={{ borderColor: "#D8D3CB" }}>
              {[
                {
                  label: "FINMA",
                  body: "FINMA&rsquo;s principles-based regulatory philosophy is more compatible with agentic systems than the rules-based frameworks of the EU. When the regulator governs outcomes and accountability rather than specifying processes, there is meaningful room to deploy systems that cannot be fully specified in advance — which is, by definition, what intelligent agents are.",
                },
                {
                  label: "Data residency",
                  body: "Swiss data sovereignty requirements that have historically been constraints are becoming advantages. Organisations that have been forced to build local infrastructure, local data management, and local governance are better positioned to operate agentic systems within defensible jurisdictional boundaries — a requirement that is only becoming more important globally.",
                },
                {
                  label: "Relationship banking",
                  body: "Swiss private banking and commercial banking are built on long-term relationships with high-value clients. Agentic systems excel precisely at synthesising deep longitudinal context — everything a client has said, done, and held — into coherent advisory actions. The relationship model is not threatened by agents. It is enabled by them, if the human at the centre uses the enhanced context well.",
                },
              ].map((item) => (
                <div key={item.label} className="py-8 flex gap-8">
                  <div className="w-40 shrink-0">
                    <h3
                      className="font-[family-name:var(--font-cormorant)] font-light"
                      style={{ fontSize: "1.4rem", color: "#2B3A52" }}
                    >
                      {item.label}
                    </h3>
                  </div>
                  <p
                    style={{ fontSize: "0.95rem", color: "#1A1A1A", lineHeight: 1.8 }}
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 05 — THE PROVOCATION */}
      <section id="section05" className="py-24 px-8 border-t overflow-hidden" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>The Provocation</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A", maxWidth: 660 }}
            >
              If your bank still scales by hiring, you are already structurally uncompetitive.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative mb-4">
              <span
                className="font-[family-name:var(--font-cormorant)] font-light select-none"
                style={{
                  fontSize: "clamp(100px, 20vw, 180px)",
                  lineHeight: 0.85,
                  color: "#2B3A52",
                  opacity: 0.12,
                  display: "block",
                  marginLeft: "-0.03em",
                }}
                aria-hidden="true"
              >
                97%
              </span>
            </div>
            <p className="mb-20 text-sm" style={{ color: "#6B6B6B", maxWidth: 480 }}>
              The approximate cost reduction required to absorb a 30x volume increase without proportional headcount growth.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light text-center"
              style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "#1A1A1A", lineHeight: 1.45, maxWidth: 680, margin: "0 auto" }}
            >
              The decision you are not making today is already costing you the optionality you will need in 24 months.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 06 — ABOUT */}
      <section id="about" className="py-24 px-8 border-t" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>About</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-8"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Marc Hauser
            </h2>
            <p className="mb-6" style={{ maxWidth: 580, color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}>
              I have spent twenty years at the intersection of financial services, technology, and institutional change — at UBS, Trust Square, Tenity, and now UiPath, where I lead banking and financial services in Switzerland. I write this site because I believe the agentic shift is real, consequential, and moving faster than most Swiss banking executives currently assume. This is not vendor material. It is a framework I use in my own work, offered here as a basis for serious conversation.
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

      {/* SECTION 07 — SPEAKING */}
      <section id="speaking" className="py-24 px-8 border-t" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Speaking</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Speaking and workshops
            </h2>
            <p className="mb-12" style={{ maxWidth: 560, color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}>
              I speak on agentic AI, operating model transformation, and the future of financial services — for executive audiences who want provocation, not reassurance.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-3 gap-0 mb-16">
              {[
                {
                  format: "Keynote",
                  duration: "45–60 min",
                  desc: "A focused provocation for leadership audiences. Structured argument, no slides-as-documents, room for one question that changes the room.",
                },
                {
                  format: "Board briefing",
                  duration: "90 min, interactive",
                  desc: "Structured to move from orientation to decision-readiness. Designed around the questions boards are already asking but not finding answers to.",
                },
                {
                  format: "Executive workshop",
                  duration: "Half day, working session",
                  desc: "Hands-on. We map your current model against an agentic target state. You leave with a gap analysis and a short list of decisions to make.",
                },
              ].map((item) => (
                <div
                  key={item.format}
                  className="pt-6 pr-8 pb-8"
                  style={{ borderTop: "1px solid #1A1A1A" }}
                >
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light mb-1"
                    style={{ fontSize: "1.4rem", color: "#2B3A52" }}
                  >
                    {item.format}
                  </h3>
                  <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
                    {item.duration}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#1A1A1A", lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <ContactForm />
          </FadeUp>
        </div>
      </section>

      {/* SECTION 08 — WRITING */}
      <section id="writing" className="py-24 px-8 border-t" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Writing</p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-12"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
            >
              Writing
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col divide-y" style={{ borderColor: "#D8D3CB" }}>
              {blogPosts.map((post) => (
                <article key={post.slug} className="py-8">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
                    {post.date}
                  </p>
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3"
                    style={{ fontSize: "clamp(20px, 3vw, 26px)", color: "#1A1A1A" }}
                  >
                    {post.title}
                  </h3>
                  <p className="mb-4" style={{ fontSize: "0.9rem", color: "#6B6B6B", maxWidth: 600, lineHeight: 1.7 }}>
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm uppercase tracking-widest hover:underline"
                    style={{ color: "#2B3A52" }}
                  >
                    Read →
                  </Link>
                </article>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-8 border-t" style={{ borderColor: "#D8D3CB" }}>
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            agentictom.com — © 2026 Marc Hauser
          </p>
          <div className="flex gap-6 text-sm" style={{ color: "#6B6B6B" }}>
            <a href="#about" className="hover:text-[#2B3A52] transition-colors">About</a>
            <a href="#speaking" className="hover:text-[#2B3A52] transition-colors">Speaking</a>
            <a href="#writing" className="hover:text-[#2B3A52] transition-colors">Writing</a>
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
