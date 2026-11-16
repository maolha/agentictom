import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { questionOfTheWeek, QUIZ_COUNT_CAP } from "@/lib/guide";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import FadeUp from "@/components/FadeUp";
import NumberQuiz from "@/components/home/NumberQuiz";
import WeeklyQuestion from "@/components/home/WeeklyQuestion";
import ToolCards from "@/components/lab/ToolCards";
import FigureGallery, { FIGURE_COUNT } from "@/components/lab/FigureGallery";

// The question of the week changes on Monday without a redeploy.
export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "The Lab",
  description:
    "Work with the numbers behind the Agentic TOM: figures to estimate before you see them, a reliability calculator, a journey map, the readiness assessment and the charts from the essays.",
  path: "/lab",
});

const label = "text-xs uppercase tracking-widest";
const gold = { color: "#8B7355" } as const;
const serif = "font-[family-name:var(--font-cormorant)] font-light";

export default function LabPage() {
  const weekly = questionOfTheWeek();

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <SiteNav />

      {/* HERO */}
      <section className="px-5 md:px-8 pt-24 md:pt-36 pb-14 md:pb-20 overflow-hidden">
        <div className="max-w-[900px] mx-auto">
          <div
            className={`${serif} select-none pointer-events-none`}
            style={{ fontSize: "clamp(60px, 13vw, 140px)", lineHeight: 0.85, color: "#2B3A52", opacity: 0.12, marginLeft: "-0.05em", marginBottom: "2rem" }}
            aria-hidden="true"
          >
            OPERATE
          </div>
          <p className={`${label} mb-4`} style={gold}>The Lab &middot; Agentic TOM</p>
          <h1 className={`${serif} mb-8`} style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.15, color: "#1A1A1A", maxWidth: 760 }}>
            Work with the numbers yourself.
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.8, maxWidth: 620 }}>
            An argument about operating models should survive contact with your own figures. <strong style={{ fontWeight: 700 }}>Everything on this page can be operated</strong>: change an input, switch a view, enter your own process.
          </p>
          <div className={`flex flex-wrap gap-x-6 gap-y-2 mt-8 ${label}`}>
            <a href="#numbers" className="underline underline-offset-4" style={{ color: "#2B3A52" }}>{QUIZ_COUNT_CAP} numbers</a>
            <a href="#tools" className="underline underline-offset-4" style={{ color: "#2B3A52" }}>Four tools</a>
            <a href="#figures" className="underline underline-offset-4" style={{ color: "#2B3A52" }}>{FIGURE_COUNT} figures</a>
          </div>
        </div>
      </section>

      {/* THE NUMBERS */}
      <section id="numbers" className="px-5 md:px-8 py-14 md:py-20" style={{ background: "#F0ECE3", borderTop: "1px solid #D8D3CB", borderBottom: "1px solid #D8D3CB", scrollMarginTop: 64 }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className={`${label} mb-3`} style={gold}>The numbers that set the agenda</p>
            <h2 className={`${serif} mb-8`} style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "#1A1A1A", maxWidth: 620 }}>
              {QUIZ_COUNT_CAP} numbers. Estimate each one before you see it.
            </h2>
            <NumberQuiz place="lab" />
          </FadeUp>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="px-5 md:px-8 py-16 md:py-24" style={{ scrollMarginTop: 64 }}>
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <p className={`${label} mb-3`} style={gold}>Tools</p>
            <h2 className={`${serif} mb-4`} style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "#1A1A1A" }}>
              Four tools, each under five minutes
            </h2>
            <p className="mb-10" style={{ color: "#1A1A1A", lineHeight: 1.8, maxWidth: 620, fontSize: "0.95rem" }}>
              None of them asks for a registration. What you enter stays in your browser.
            </p>
            <ToolCards ids={["calculator", "journey", "assessment", "layers"]} tone="light" />
          </FadeUp>
        </div>
      </section>

      {/* FIGURES */}
      <section id="figures" className="px-5 md:px-8 py-16 md:py-24" style={{ background: "#F0ECE3", borderTop: "1px solid #D8D3CB", scrollMarginTop: 64 }}>
        <div className="max-w-[1040px] mx-auto">
          <p className={`${label} mb-3`} style={gold}>Figures</p>
          <h2 className={`${serif} mb-4`} style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "#1A1A1A" }}>
            The evidence, one figure at a time
          </h2>
          <p className="mb-10" style={{ color: "#1A1A1A", lineHeight: 1.8, maxWidth: 620, fontSize: "0.95rem" }}>
            The {FIGURE_COUNT} figures from the essays. Each one names its source, and each links to the argument it supports.
          </p>
          <FigureGallery />
        </div>
      </section>

      {/* WEEKLY QUESTION AND NEXT STEP */}
      <section className="px-5 md:px-8 py-16 md:py-24" style={{ borderTop: "1px solid #D8D3CB" }}>
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <WeeklyQuestion {...weekly} />
          <div>
            <p className={`${label} mb-3`} style={gold}>From the numbers to the argument</p>
            <h2 className={`${serif} mb-4`} style={{ fontSize: "clamp(24px, 3.5vw, 32px)", color: "#1A1A1A" }}>
              The figures support a model. The model is one page.
            </h2>
            <p className="mb-6 text-sm" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>
              Three layers of workforce, five operating principles and a ladder of autonomy, with one worked example from mortgage lending.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/framework" className="btn-slate">See the framework&nbsp;→</Link>
              <Link href="/blog" className="btn-outline-slate" style={{ padding: "12px 24px", fontSize: "0.75rem" }}>Read the essays</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
