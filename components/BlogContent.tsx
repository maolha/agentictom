import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Interactive figures are client components, loaded only on the posts that embed them.
const MortgageFunnel = dynamic(() => import("@/components/MortgageFunnel"));
const ExponentialSteps = dynamic(() => import("@/components/viz/ExponentialSteps"));
const JCurve = dynamic(() => import("@/components/viz/JCurve"));
const ExploitWindow = dynamic(() => import("@/components/viz/ExploitWindow"));
const MrosChart = dynamic(() => import("@/components/viz/MrosChart"));
const ReliabilityMatrix = dynamic(() => import("@/components/viz/ReliabilityMatrix"));

/** A post embeds a figure with a comment on its own line: `<!-- viz:j-curve -->`. */
const EMBEDS: Record<string, React.ComponentType> = {
  "funnel:mortgage": MortgageFunnel,
  "viz:exponential-steps": ExponentialSteps,
  "viz:j-curve": JCurve,
  "viz:exploit-window": ExploitWindow,
  "viz:mros-series": MrosChart,
  "viz:reliability-matrix": ReliabilityMatrix,
};

const EMBED_LINE = /^[ \t]*<!-- ([a-z:-]+) -->[ \t]*$/gm;

const serif = "font-[family-name:var(--font-cormorant)] font-light";

const components: Components = {
  // The page renders the title from frontmatter; the h1 in the body is skipped.
  h1: () => null,
  h2: ({ children }) => (
    <h2 className={`${serif} mt-12 mb-4`} style={{ fontSize: "clamp(22px, 3.5vw, 32px)", color: "#2B3A52" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className={`${serif} mt-8 mb-3`} style={{ fontSize: "1.3rem", color: "#2B3A52" }}>
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-6">{children}</p>,
  strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  hr: () => <hr style={{ border: "none", borderTop: "1px solid #D8D3CB", margin: "2rem 0" }} />,
  a: ({ href, children }) => {
    const style = { color: "#2B3A52", textDecoration: "underline", textUnderlineOffset: "3px" } as const;
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} style={style}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} style={style} rel="noopener">
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="-mt-3 mb-6 flex flex-col gap-2" style={{ paddingLeft: "1.25rem", listStyleType: "disc" }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="-mt-3 mb-6 flex flex-col gap-2" style={{ paddingLeft: "1.25rem", listStyleType: "decimal" }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#1A1A1A" }}>{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className={`${serif} my-8 pl-5`}
      style={{ borderLeft: "3px solid #8B7355", fontSize: "1.25rem", lineHeight: 1.5, color: "#2B3A52" }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code style={{ fontSize: "0.9em", background: "#F0ECE3", padding: "0.1em 0.35em" }}>{children}</code>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 -mx-5 px-5 md:mx-0 md:px-0">
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className="text-left text-xs uppercase tracking-widest py-3 pr-4"
      style={{ borderBottom: "2px solid #2B3A52", color: "#2B3A52", fontWeight: 700, whiteSpace: "nowrap" }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-3 pr-4" style={{ borderBottom: "1px solid #D8D3CB", color: "#1A1A1A", lineHeight: 1.6, verticalAlign: "top" }}>
      {children}
    </td>
  ),
  // Footnotes (remark-gfm): a small "Notes" section at the end of the post.
  section: ({ children, ...props }) => {
    const isFootnotes = "data-footnotes" in props;
    if (!isFootnotes) return <section>{children}</section>;
    return (
      <section className="mt-12 pt-6 text-sm" style={{ borderTop: "1px solid #D8D3CB", color: "#6B6B6B" }}>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>
          Notes
        </p>
        {children}
      </section>
    );
  },
  sup: ({ children }) => <sup style={{ fontSize: "0.7em", lineHeight: 0 }}>{children}</sup>,
};

/** Splits the markdown into text segments and embed keys, in document order. */
function segment(md: string): ({ kind: "md"; value: string } | { kind: "embed"; value: string })[] {
  const out: ({ kind: "md"; value: string } | { kind: "embed"; value: string })[] = [];
  let last = 0;
  for (const m of md.matchAll(EMBED_LINE)) {
    if (!(m[1] in EMBEDS)) continue;
    if (m.index! > last) out.push({ kind: "md", value: md.slice(last, m.index) });
    out.push({ kind: "embed", value: m[1] });
    last = m.index! + m[0].length;
  }
  if (last < md.length) out.push({ kind: "md", value: md.slice(last) });
  return out;
}

export default function BlogContent({ content }: { content: string }) {
  return (
    <div className="font-[family-name:var(--font-dm-sans)]" style={{ lineHeight: 1.8, color: "#1A1A1A", fontSize: "1rem" }}>
      {segment(content).map((s, i) => {
        if (s.kind === "embed") {
          const Embed = EMBEDS[s.value];
          return <Embed key={i} />;
        }
        return (
          <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={components}>
            {s.value}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
