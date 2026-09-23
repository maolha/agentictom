import AssessmentClient from "@/components/AssessmentClient";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Agentic Readiness Assessment",
  description: "Five categories, fifteen questions. Assess how prepared your bank is for the agentic shift. Free, no registration, exportable as PDF.",
  path: "/assessment",
  ogDescription: "Assess how prepared your bank is for the agentic shift.",
});

export default function AssessmentPage() {
  return <AssessmentClient />;
}
