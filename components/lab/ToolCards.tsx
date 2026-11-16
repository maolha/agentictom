import Link from "next/link";
import { TOOLS } from "@/components/lab/tools";

const label = "text-xs uppercase tracking-widest";

/** The working tools as a row of cards, on the slate band of the homepage or on paper in the Lab. */
export default function ToolCards({ ids, tone }: { ids: string[]; tone: "dark" | "light" }) {
  const dark = tone === "dark";
  const tools = ids.map((id) => TOOLS.find((t) => t.id === id)!).filter(Boolean);
  const cols = tools.length >= 5 ? "sm:grid-cols-2 lg:grid-cols-3" : tools.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";

  return (
    <ul className={`grid gap-4 ${cols}`} style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {tools.map((t) => (
        <li key={t.id} className="flex">
          <Link
            href={t.href}
            className="lift group flex flex-col w-full p-5"
            style={
              dark
                ? { background: "rgba(247,244,239,0.06)", border: "1px solid rgba(247,244,239,0.18)", color: "#F7F4EF" }
                : { background: "#F7F4EF", border: "1px solid #D8D3CB", color: "#1A1A1A" }
            }
          >
            <div className="mb-4" style={{ maxWidth: 200 }}>
              <t.Glyph ink={dark ? "#F7F4EF" : "#2B3A52"} accent={dark ? "#C4AE8C" : "#8B7355"} />
            </div>
            <p className={`${label} mb-2`} style={{ color: dark ? "#C4AE8C" : "#8B7355" }}>
              {t.kind}
            </p>
            <p className="font-[family-name:var(--font-cormorant)] font-light mb-2 group-hover:underline" style={{ fontSize: "1.35rem", lineHeight: 1.2, color: dark ? "#F7F4EF" : "#2B3A52" }}>
              {t.title}
            </p>
            <p className="text-sm mb-4" style={{ color: dark ? "rgba(247,244,239,0.72)" : "#6B6B6B", lineHeight: 1.6 }}>
              {t.line}
            </p>
            <span className={`${label} mt-auto flex items-baseline justify-between gap-3`}>
              <span style={{ color: dark ? "#F7F4EF" : "#2B3A52" }}>Open&nbsp;→</span>
              <span style={{ color: dark ? "rgba(247,244,239,0.55)" : "#6B6B6B" }}>{t.time}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
