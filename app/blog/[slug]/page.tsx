import Link from "next/link";
import { notFound } from "next/navigation";

type Post = {
  title: string;
  date: string;
  paragraphs: string[];
};

const posts: Record<string, Post> = {
  "agentic-tom-introduction": {
    title: "What Is an Agentic Target Operating Model?",
    date: "March 2026",
    paragraphs: [
      "Most discussions about AI in banking focus on tools. The more consequential question is how the organisation itself must change to absorb what these tools make possible.",
      "An Agentic Target Operating Model is an organisational architecture. A description of how work gets done, who or what is accountable for which decisions, and how authority flows through a system that includes non-human actors.",
      "The term matters. We are describing agents: systems that pursue goals, operate in dynamic environments, make decisions under uncertainty, and learn from outcomes. That is a different thing from automation, which executes predefined rules on predefined inputs.",
      "That distinction changes everything about how you design organisations around them. A rule-based RPA bot can be governed like a piece of software. An agent that adapts, escalates, and improves must be governed like a member of staff, with onboarding, performance expectations, accountability structures, and an offboarding process.",
      "The agentic TOM rests on a clear taxonomy of the workforce it describes. Bots handle the industrial backbone: rule-based, auditable, deterministic. No judgment. By design. Agents operate as junior-to-mid knowledge workers at scale, pursuing goals and making probabilistic decisions within a policy envelope defined by humans. Humans hold board-level decision proxies within operations and own irreversible decisions, regulatory accountability, and relationship trust.",
      "The shift most organisations have not yet absorbed: human roles concentrate at the edges, exceptions, governance, relationships, and become correspondingly more consequential.",
      "A conventional bank organises around functions: operations, compliance, risk, client service. Each function optimises its own process. Handoffs between functions are the source of most operational risk and most of the cost. In an agentic TOM, the organising principle is the outcome. An agent system owns an end-to-end workflow and coordinates across what used to be functional boundaries.",
      "The implications for leadership, governance, and technology are substantial. The first step is conceptual: recognising that the right question is not where can we use AI, but what does our operating model look like when AI is a first-class participant in it.",
    ],
  },
  "escalation-by-design": {
    title: "Escalation by Design: Why Human Oversight Is an Architecture Decision",
    date: "February 2026",
    paragraphs: [
      "The failure mode of most automation projects is that nobody designed when and how the decision returns to a human. Machines making wrong decisions is rarely the root cause. Missing design is.",
      "Most organisations treat escalation as a residual. The thing that happens when the system cannot proceed. A queue fills up. Someone notices. A human intervenes. In this model, escalation is a failure state. The goal is to minimise it. Systems are judged on the percentage of cases they can handle end-to-end.",
      "For agentic systems, this model fails.",
      "When you deploy an intelligent agent into a consequential process, you are making a delegation decision. You are saying: this system is authorised to make decisions of this type, with these characteristics, up to this threshold of consequence. Everything beyond that threshold must come back to a human. The trigger is not I do not know. The trigger is the cost of being wrong here exceeds my authorisation level.",
      "If escalation is a design requirement, it must be designed, not left to emerge. Define authorisation levels explicitly. What types of decisions can the agent make autonomously? What requires human review? What requires human approval? These are policy questions, not technical ones.",
      "Design the escalation interface. When an agent escalates, what does it hand off? The context, the reasoning, the options it considered, its recommendation. A human receiving an escalation from a well-designed agent should be able to act in seconds.",
      "Measure escalation rates. An agent that escalates too rarely may be taking on decisions it should not. An agent that escalates too often signals a policy envelope that is too narrow. Escalation rate is a performance metric. When a human resolves an escalation, that resolution should flow back to the agent as signal.",
      "Organisations that design escalation well end up with something valuable: a real-time map of where human judgment is actually required. Not where it used to be required, or where the org chart says it is required. Where it is actually required, revealed by the behaviour of systems operating at scale.",
    ],
  },
  "swiss-banking-agentic-advantage": {
    title: "The Swiss Agentic Advantage",
    date: "January 2026",
    paragraphs: [
      "Switzerland has attributes that could make it a global leader in responsible agentic deployment. Most Swiss banking executives have not yet recognised this.",
      "The conventional narrative frames Switzerland as cautious, conservative, and late to adopt. There is evidence for this view. It misreads the structural position.",
      "Regulatory compliance is the first objection most Swiss banking executives raise when discussing agentic systems. The argument: we cannot deploy systems we cannot fully explain to regulators. This argument is weaker in Switzerland than it would be in the EU.",
      "FINMA's regulatory philosophy is principles-based. It governs outcomes and accountability. It does not, in general, prescribe the processes by which outcomes are achieved. Intelligent agents cannot be fully specified in advance. Their behaviour is emergent. In a rules-based framework, this creates a compliance problem. In a principles-based framework, it becomes a design question: how do you ensure the right outcomes and maintain clear accountability? These are questions Switzerland's regulatory framework is structurally better equipped to handle.",
      "For years, Swiss data residency requirements were treated as constraints. The global conversation has shifted. Jurisdictional control over data is now a geopolitical and strategic asset. Organisations that built local infrastructure under regulatory pressure have positioned themselves well for an era in which data sovereignty is a competitive differentiator. Switzerland's data position, properly understood, is infrastructure.",
      "Swiss private banking is built on a premise: the client relationship, maintained over decades and across generations, is the product. Agentic AI enables this premise, when the human at the centre uses the enhanced context well. An agent system operating across a client relationship can synthesise the full history of conversations, transactions, market events, life events, expressed preferences, and implied priorities into actionable context that no relationship manager could hold in their head.",
      "The relationship manager's role concentrates into the moments that require judgment, discretion, and the trust that only comes from human continuity. Those moments become more valuable when the surrounding context is perfectly prepared.",
      "The structural advantages exist. Most Swiss banking executives are not yet reading them as advantages. That is the window.",
    ],
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
        className="px-5 md:px-8 py-4 md:py-5"
        style={{ borderBottom: "1px solid #D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide"
            style={{ color: "#1A1A1A" }}
          >
            agenticTOM
          </Link>
          <Link
            href="/#writing"
            className="text-xs uppercase tracking-widest hover:underline"
            style={{ color: "#2B3A52" }}
          >
            Writing
          </Link>
        </div>
      </nav>

      <article className="px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-[680px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
            {post.date}
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-10 md:mb-12"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.2, color: "#1A1A1A" }}
          >
            {post.title}
          </h1>
          <div
            className="font-[family-name:var(--font-dm-sans)]"
            style={{ lineHeight: 1.8, color: "#1A1A1A", fontSize: "1rem" }}
          >
            {post.paragraphs.map((para, i) => (
              <p key={i} className="mb-6">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-16 pt-8" style={{ borderTop: "1px solid #D8D3CB" }}>
            <Link
              href="/#writing"
              className="text-xs uppercase tracking-widest hover:underline"
              style={{ color: "#2B3A52" }}
            >
              Back to Writing
            </Link>
          </div>
        </div>
      </article>

      <footer
        className="px-5 md:px-8 py-10 border-t"
        style={{ borderColor: "#D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            agentictom.com &copy; 2026 Marc Hauser
          </p>
        </div>
      </footer>
    </main>
  );
}
