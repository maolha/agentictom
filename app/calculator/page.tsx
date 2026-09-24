import { pageMetadata } from "@/lib/site";
import ChainCalculator from "@/components/ChainCalculator";

export const metadata = pageMetadata({
  title: "Where the Chain Breaks",
  description:
    "A calculator for error propagation in agentic process chains. Set the accuracy per step and the length of the chain, or model a real chain with mixed steps and checks, and share the result.",
  path: "/calculator",
  ogDescription:
    "How a small error rate per step compounds across a chain of steps, and what deterministic steps and checks do about it. Run your own chain and share the link.",
});

export default function CalculatorPage() {
  return <ChainCalculator />;
}
