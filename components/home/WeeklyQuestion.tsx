import Link from "next/link";
import CopyButton from "@/components/CopyButton";

const label = "text-xs uppercase tracking-widest";

/**
 * One of the fifteen assessment questions, changed every Monday. A reason to
 * come back, and a line that can go straight onto an agenda.
 */
export default function WeeklyQuestion({ category, question, context }: { category: string; question: string; context: string }) {
  return (
    <aside className="p-6 md:p-7" style={{ background: "#F7F4EF", border: "1px solid #D8D3CB", borderTop: "3px solid #8B7355" }}>
      <p className={`${label} mb-1`} style={{ color: "#8B7355" }}>
        This week&apos;s question
      </p>
      <p className={`${label} mb-4`} style={{ color: "#6B6B6B" }}>
        {category}
      </p>
      <p className="font-[family-name:var(--font-cormorant)] font-light mb-4" style={{ fontSize: "1.45rem", lineHeight: 1.25, color: "#2B3A52" }}>
        {question}
      </p>
      {context && (
        <p className="text-sm mb-5" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
          {context}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <CopyButton text={`${question}\n\nFrom agentictom.com`} event="weekly_question_copy">
          Copy for the agenda
        </CopyButton>
        <Link href="/assessment" className={`${label} underline underline-offset-4`} style={{ color: "#6B6B6B" }}>
          All fifteen questions
        </Link>
      </div>
      <p className="text-xs mt-5" style={{ color: "#6B6B6B", lineHeight: 1.5 }}>
        A new question every Monday.
      </p>
    </aside>
  );
}
