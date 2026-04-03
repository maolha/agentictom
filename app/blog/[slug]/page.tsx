import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; date: string; content: string }> = {
  "agentic-tom-introduction": {
    title: "What Is an Agentic Target Operating Model?",
    date: "March 2026",
    content: `Most discussions about AI in banking focus on tools. The more consequential question is how the organisation itself must change to absorb what these tools make possible.

An Agentic Target Operating Model (TOM) is not a technology architecture. It is an organisational architecture — a description of how work gets done, who (or what) is accountable for which decisions, and how authority flows through a system that includes non-human actors.

The term "agentic" matters. We are not describing automation — systems that execute predefined rules on predefined inputs. We are describing agents: systems that pursue goals, operate in dynamic environments, make decisions under uncertainty, and learn from outcomes.

That distinction changes everything about how you design organisations around them.

The agentic TOM rests on a clear taxonomy of the workforce it describes. Bots handle the industrial backbone: rule-based, auditable, deterministic. Agents operate as junior-to-mid knowledge workers at scale. Humans hold board-level decision proxies within operations — they own irreversible decisions, regulatory accountability, and relationship trust.

In a conventional bank, the operating model is organised around functions. In an agentic TOM, the organising principle is the outcome. This is not incremental process improvement. It is a different theory of how the firm is organised.`,
  },
  "escalation-by-design": {
    title: "Escalation by Design: Why Human Oversight Is an Architecture Decision",
    date: "February 2026",
    content: `The failure mode of most automation projects is not that machines make wrong decisions. It is that nobody designed when and how the decision returns to a human.

This is not a technology failure. It is a design failure.

Most organisations treat escalation as a residual — the thing that happens when the system cannot proceed. In this model, escalation is a failure state. The goal is to minimise it.

This model is wrong for agentic systems.

When you deploy an intelligent agent into a consequential process, you are making a delegation decision. You are saying: this system is authorised to make decisions of this type, up to this threshold of consequence. Everything beyond that threshold must come back to a human — not because the system failed, but because the system correctly identified that the cost of being wrong exceeds its authorisation level.

The trigger is not "I do not know." The trigger is "the cost of being wrong here exceeds my authorisation level."

If escalation is a design requirement, it must be designed — not left to emerge. This means defining authorisation levels explicitly, designing the escalation interface, measuring escalation rates as a performance metric, and closing the feedback loop.

Organisations that design escalation well end up with something valuable: a real-time map of where human judgment is actually required.`,
  },
  "swiss-banking-agentic-advantage": {
    title: "The Swiss Agentic Advantage",
    date: "January 2026",
    content: `Switzerland has attributes that could make it a global leader in responsible agentic deployment. Most Swiss banking executives have not yet recognised this.

FINMA's regulatory philosophy is principles-based. It governs outcomes and accountability. It does not prescribe the processes by which outcomes are achieved. This matters for agentic systems because intelligent agents, by definition, cannot be fully specified in advance. In a rules-based framework, this is a compliance problem. In a principles-based framework, it is a design question.

For years, Swiss data residency requirements were treated as constraints. The global conversation has shifted. Jurisdictional control over data is now a geopolitical and strategic asset. Organisations that built local infrastructure under regulatory pressure have, inadvertently, positioned themselves well for an era in which data sovereignty is a competitive differentiator.

Swiss private banking is built on a premise: the client relationship, maintained over decades, across generations, is the product. This premise is not threatened by agentic AI. It is enabled by it — if the human at the centre uses the enhanced context well.

The structural advantages exist. Most Swiss banking executives are not yet reading them as advantages. That is the window.`,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <nav
        className="px-8 py-5"
        style={{ borderBottom: "1px solid #D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-wide"
            style={{ color: "#1A1A1A" }}
          >
            agentictom.com
          </Link>
          <Link
            href="/#writing"
            className="text-sm uppercase tracking-widest hover:underline"
            style={{ color: "#2B3A52" }}
          >
            ← Writing
          </Link>
        </div>
      </nav>

      <article className="px-8 py-20">
        <div className="max-w-[680px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
            {post.date}
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-12"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.2, color: "#1A1A1A" }}
          >
            {post.title}
          </h1>
          <div
            className="font-[family-name:var(--font-dm-sans)]"
            style={{ lineHeight: 1.8, color: "#1A1A1A", fontSize: "1rem" }}
          >
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="mb-6">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      <footer
        className="px-8 py-10 border-t"
        style={{ borderColor: "#D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            agentictom.com — © 2026 Marc Hauser
          </p>
        </div>
      </footer>
    </main>
  );
}
