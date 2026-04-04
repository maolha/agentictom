import { Metadata } from "next";
import AssessmentClient from "@/components/AssessmentClient";

export const metadata: Metadata = {
  title: "Agentic Readiness Assessment — Agentic TOM",
  description: "Five categories, fifteen questions. Assess how prepared your bank is for the agentic shift. Free, no registration, exportable as PDF.",
  openGraph: {
    title: "Agentic Readiness Assessment",
    description: "Assess how prepared your bank is for the agentic shift.",
    url: "https://agentictom.com/assessment",
    siteName: "Agentic TOM",
  },
};

export default function AssessmentPage() {
  return <AssessmentClient />;
}
