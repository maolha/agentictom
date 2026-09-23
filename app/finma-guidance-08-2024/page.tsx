import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = pageMetadata({
  title: "FINMA Guidance 08/2024 in three requirements",
  description:
    "What FINMA's guidance on the governance and risk management of AI asks of a Swiss bank that lets agents decide: accountability, proven reliability, and the expertise to override.",
  path: "/finma-guidance-08-2024",
});

const h2 = "font-[family-name:var(--font-cormorant)] font-light mt-12 mb-4";
const h2Style = { fontSize: "clamp(22px, 3.5vw, 32px)", color: "#2B3A52" } as const;
const p = { color: "#1A1A1A", lineHeight: 1.8, fontSize: "1rem" } as const;

const requirements = [
  {
    title: "Accountability cannot be delegated to AI",
    body: "A named person with authority and expertise answers for every decision an agent makes. That does not mean a human approves every decision. It means someone owns the outcomes, the way a team lead owns a team's output. The accountability is organisational, not transactional.",
  },
  {
    title: "Autonomous operation requires demonstrated reliability",
    body: "FINMA states that AI may be used autonomously once it is \"sufficiently reliable and this can ultimately be proven.\" This is a design requirement, not a prohibition. The bank must show that the agent operates reliably within its defined envelope: testing before deployment, monitoring in operation, and evidence a supervisor can inspect.",
  },
  {
    title: "The institution must retain the expertise to override",
    body: "The bank cannot become so dependent on a system that no one inside it understands or can challenge its decisions. Skilled staff must be able to review, explain and, if necessary, reverse any outcome an agent produced.",
  },
];

const posts = [
  { title: "Case Sketch: Mortgage Lending in an Agentic TOM", slug: "mortgage-lending-in-an-agentic-tom", line: "The three requirements applied to one end-to-end process." },
  { title: "Escalation by Design", slug: "escalation-by-design", line: "How a decision returns to the accountable human." },
  { title: "From ABS to Autopilot", slug: "from-abs-to-autopilot", line: "Reliability evidence as the permission slip for each level of autonomy." },
  { title: "Who Manages the Agents?", slug: "who-manages-the-agents", line: "Where accountability sits within the three lines of defence." },
  { title: "The Swiss Agentic Advantage", slug: "swiss-banking-agentic-advantage", line: "Why a principles-based regulator leaves room for agentic systems." },
];

export default function FinmaPage() {
  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <SiteNav />

      <article className="px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-[680px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
            Reference
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-8"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.2, color: "#1A1A1A" }}
          >
            FINMA Guidance 08/2024 in three requirements
          </h1>
          <p className="mb-6" style={p}>
            In December 2024 FINMA published Guidance 08/2024 on the governance and risk management of artificial
            intelligence in supervised institutions. The essays on this site cite it constantly, because it sets the
            conditions under which a Swiss bank may let an agent decide. The constraint is less restrictive than most
            bankers assume, and more specific than they expect. Three requirements matter for an agentic operating model.
          </p>

          <div className="flex flex-col mt-10">
            {requirements.map((r, i) => (
              <div key={r.title} className="py-7 grid md:grid-cols-[64px_1fr] gap-3 md:gap-8" style={{ borderTop: "1px solid #D8D3CB" }}>
                <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.6rem", color: "#8B7355" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-[family-name:var(--font-cormorant)] font-light mb-2" style={{ fontSize: "1.45rem", color: "#2B3A52" }}>
                    {r.title}
                  </h2>
                  <p className="text-sm" style={{ color: "#1A1A1A", lineHeight: 1.75 }}>{r.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className={h2} style={h2Style}>What this means in practice</h2>
          <p className="mb-6" style={p}>
            An agent may autonomously approve a standard mortgage within a defined policy envelope, provided the bank can
            prove the agent&apos;s reliability, name the accountable person, explain any individual decision and override it
            when needed. The guidance also expects an inventory of AI applications, documented and tested methodologies for
            applications in critical processes, and explainability proportionate to the decision. It prescribes none of the
            methods. It requires the bank to choose them and to defend the choice.
          </p>
          <p className="mb-6" style={p}>
            This is principles-based regulation applied to agentic systems. It sets the bar. It does not prohibit the model.
            The EU AI Act, by contrast, classifies credit assessment as high-risk and prescribes detailed requirements for it,
            which is why the comparison recurs on this site.
          </p>

          <h2 className={h2} style={h2Style}>Where the essays apply it</h2>
          <ul className="flex flex-col gap-4 mb-10">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="hover:underline" style={{ color: "#2B3A52" }}>
                  {post.title}
                </Link>
                <span className="text-sm" style={{ color: "#6B6B6B" }}>: {post.line}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>
            Source: FINMA, Guidance 08/2024 &ldquo;Governance and risk management when using artificial intelligence&rdquo;,
            18 December 2024. The summary above is the author&apos;s reading, written for an operating model discussion,
            not a legal opinion.
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
