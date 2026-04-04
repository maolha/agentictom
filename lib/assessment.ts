export type AssessmentOption = {
  text: string;
  score: number;
};

export type AssessmentQuestion = {
  category: string;
  question: string;
  options: AssessmentOption[];
};

export type CategoryScore = {
  category: string;
  score: number;
  max: number;
};

export type AssessmentLevel = {
  name: string;
  threshold: number;
  description: string;
  implication: string;
};

export const questions: AssessmentQuestion[] = [
  // Category 1: Workforce Design
  {
    category: "Workforce Design",
    question: "If an AI agent made 10'000 decisions in your bank today, who would be accountable for each one?",
    options: [
      { text: "Nobody — we have not considered this", score: 0 },
      { text: "IT or the vendor", score: 1 },
      { text: "The business unit that deployed it", score: 2 },
      { text: "Named decision owners with defined accountability per agent type", score: 3 },
    ],
  },
  {
    category: "Workforce Design",
    question: "How does your organisation distinguish between bots, agents, and AI tools?",
    options: [
      { text: "We do not — it is all called AI", score: 0 },
      { text: "Informally, in conversation", score: 1 },
      { text: "We have a taxonomy but it is not operationalised", score: 2 },
      { text: "Different governance, onboarding, and monitoring for each type", score: 3 },
    ],
  },
  {
    category: "Workforce Design",
    question: "Where do humans sit in your operating model relative to automated processes?",
    options: [
      { text: "Humans do the work, automation assists", score: 0 },
      { text: "Automation handles routine, humans handle the rest", score: 1 },
      { text: "Humans focus on exceptions and complex decisions", score: 2 },
      { text: "Humans govern outcomes, agents execute, bots handle deterministic tasks", score: 3 },
    ],
  },

  // Category 2: Escalation Architecture
  {
    category: "Escalation Architecture",
    question: "When an automated process encounters a situation it was not designed for, what happens?",
    options: [
      { text: "It stops and someone notices eventually", score: 0 },
      { text: "It creates an alert or ticket", score: 1 },
      { text: "It escalates to a defined human with context", score: 2 },
      { text: "It escalates with full reasoning, options considered, and a recommendation", score: 3 },
    ],
  },
  {
    category: "Escalation Architecture",
    question: "Are the escalation thresholds for your automated systems explicitly defined?",
    options: [
      { text: "No — escalation is ad hoc", score: 0 },
      { text: "Defined for some processes", score: 1 },
      { text: "Defined across most processes with clear authorisation levels", score: 2 },
      { text: "Defined, measured, and regularly reviewed as a governance metric", score: 3 },
    ],
  },
  {
    category: "Escalation Architecture",
    question: "When a human resolves an escalated decision, does the system learn from it?",
    options: [
      { text: "No — the resolution stays with the human", score: 0 },
      { text: "Sometimes, if someone manually updates the rules", score: 1 },
      { text: "Resolutions are logged and reviewed periodically", score: 2 },
      { text: "Resolutions feed back into the system automatically as training signal", score: 3 },
    ],
  },

  // Category 3: Speed & Automation
  {
    category: "Speed & Automation",
    question: "How long does it take your bank to respond to a standard product request (e.g. mortgage, loan, account opening)?",
    options: [
      { text: "Days to weeks", score: 0 },
      { text: "Within 24 hours", score: 1 },
      { text: "Within a few hours", score: 2 },
      { text: "Minutes — largely automated with human oversight on exceptions", score: 3 },
    ],
  },
  {
    category: "Speed & Automation",
    question: "If your inbound application volume increased 10× tomorrow, what would happen?",
    options: [
      { text: "The process would break — we would need to hire", score: 0 },
      { text: "We could handle some increase but quality would suffer", score: 1 },
      { text: "Our core processes could scale, but edge cases would queue", score: 2 },
      { text: "Our cost per application is low enough to absorb the volume profitably", score: 3 },
    ],
  },
  {
    category: "Speed & Automation",
    question: "What is the marginal cost of processing one additional application or request?",
    options: [
      { text: "Roughly the same as every other — it requires a person", score: 0 },
      { text: "Lower than average but still significant", score: 1 },
      { text: "Low — most of the process is automated", score: 2 },
      { text: "Near zero — fully automated with human review only on flagged cases", score: 3 },
    ],
  },

  // Category 4: Agent Governance
  {
    category: "Agent Governance",
    question: "Do you have a formal process for onboarding a new AI agent into a business process?",
    options: [
      { text: "No — deployment is handled by IT as a software release", score: 0 },
      { text: "There is a review process but no structured onboarding", score: 1 },
      { text: "We define scope, constraints, and authorisation levels before deployment", score: 2 },
      { text: "Full onboarding: scope, constraints, escalation design, performance envelope, and an owner", score: 3 },
    ],
  },
  {
    category: "Agent Governance",
    question: "How do you monitor the performance of deployed AI agents?",
    options: [
      { text: "We do not — they run until someone reports a problem", score: 0 },
      { text: "Basic monitoring: uptime and error rates", score: 1 },
      { text: "Performance dashboards tracking output quality and escalation rates", score: 2 },
      { text: "Continuous monitoring against defined envelopes with automated alerts and quarterly reviews", score: 3 },
    ],
  },
  {
    category: "Agent Governance",
    question: "Do you have a process for decommissioning an AI agent?",
    options: [
      { text: "No — we have not thought about this", score: 0 },
      { text: "We would switch it off and archive the code", score: 1 },
      { text: "We would review its decision history and transfer open cases", score: 2 },
      { text: "Full offboarding: decision audit, case transfer, model archival, regulatory documentation", score: 3 },
    ],
  },

  // Category 5: Demand Exposure
  {
    category: "Demand Exposure",
    question: "How prepared is your bank for customers using AI agents to interact with you?",
    options: [
      { text: "We have not considered this scenario", score: 0 },
      { text: "We are aware it is coming but have not acted", score: 1 },
      { text: "We are assessing the impact on specific product lines", score: 2 },
      { text: "We have modelled the volume and unit economics impact and are redesigning processes", score: 3 },
    ],
  },
  {
    category: "Demand Exposure",
    question: "If a client's AI agent submitted a structured complaint based on portfolio analysis, how would your bank handle it?",
    options: [
      { text: "The same way we handle any complaint — manually", score: 0 },
      { text: "We would escalate it but the process would be slow", score: 1 },
      { text: "We have a process for structured complaints but not at scale", score: 2 },
      { text: "We proactively audit our own book for the issues an agent would find", score: 3 },
    ],
  },
  {
    category: "Demand Exposure",
    question: "Could a client's AI agent benchmark your fees against competitors in real time?",
    options: [
      { text: "Yes — and we have not prepared for that", score: 0 },
      { text: "Probably — our pricing is not easily comparable but an agent would figure it out", score: 1 },
      { text: "Yes — we are aware and reviewing our fee defensibility", score: 2 },
      { text: "Yes — and our fees are defensible because our service is genuinely differentiated", score: 3 },
    ],
  },
];

export const levels: AssessmentLevel[] = [
  {
    name: "Unaware",
    threshold: 0,
    description: "Your organisation has not yet framed the agentic shift as an operating model question. AI is seen as a tool, not a participant.",
    implication: "The risk is not that you are behind — it is that the gap between your current model and the required model is growing without visibility.",
  },
  {
    name: "Aware",
    threshold: 12,
    description: "You recognise that agentic AI changes more than technology. Some conversations are happening, but they have not yet reached operating model design.",
    implication: "Awareness without architecture creates a false sense of readiness. The next step is to design, not just discuss.",
  },
  {
    name: "Designing",
    threshold: 24,
    description: "Your organisation is actively redesigning processes around agentic capabilities. Governance structures are emerging. The conversation has moved from IT to the business.",
    implication: "You are ahead of most. The risk now is designing too slowly while the demand side accelerates.",
  },
  {
    name: "Operating",
    threshold: 38,
    description: "Your bank operates with a clear agentic TOM. Agents are governed like staff. Escalation is designed. Demand-side exposure is modelled and managed.",
    implication: "You are building the moat. The question now is how to extend the advantage before others catch up.",
  },
];

export const categories = [
  "Workforce Design",
  "Escalation Architecture",
  "Speed & Automation",
  "Agent Governance",
  "Demand Exposure",
];

export type CategoryInsight = {
  category: string;
  low: string;
  mid: string;
  high: string;
  question: string;
};

export const categoryInsights: CategoryInsight[] = [
  {
    category: "Workforce Design",
    low: "Your organisation treats AI as a tool, not a workforce participant. There is no clear taxonomy distinguishing bots from agents, and accountability for automated decisions is undefined.",
    mid: "You have started thinking about different types of AI actors, but the taxonomy is not yet operationalised in governance or accountability structures.",
    high: "Your workforce design recognises bots, agents, and humans as distinct layers with different governance. Accountability is clear per actor type.",
    question: "If you hired 500 new AI agents tomorrow, who would onboard them?",
  },
  {
    category: "Escalation Architecture",
    low: "Escalation in your organisation is accidental — it happens when something breaks, not by design. There is no architecture for how decisions return to humans.",
    mid: "Some escalation paths exist, but they are inconsistent. The trigger for human involvement is often 'the system failed' rather than 'the cost of being wrong exceeds the authorisation level.'",
    high: "Escalation is designed into your processes with explicit authorisation levels, structured handoffs, and feedback loops from human resolutions.",
    question: "Could you draw the escalation architecture for your three most critical processes right now?",
  },
  {
    category: "Speed & Automation",
    low: "Your processing model is human-speed. A 10× increase in inbound volume would require proportional headcount growth — the unit economics would collapse.",
    mid: "Some processes are automated, but end-to-end response times are still measured in days and marginal costs remain significant.",
    high: "Your core processes can scale non-linearly. Marginal cost per application is low and response times are measured in hours or less.",
    question: "What is your cost per processed application — and what would it need to be if volume increased 10×?",
  },
  {
    category: "Agent Governance",
    low: "AI agents are deployed and managed as software — not as decision-making actors with lifecycle governance. There is no onboarding, performance monitoring, or decommissioning process.",
    mid: "Some governance exists, but it is inconsistent. Agent performance is monitored technically (uptime, errors) rather than operationally (decision quality, escalation patterns).",
    high: "Agents are governed like staff: onboarded with defined scope, monitored against performance envelopes, and decommissioned with full audit trails.",
    question: "When was the last time you reviewed an AI agent's decision quality — not its uptime?",
  },
  {
    category: "Demand Exposure",
    low: "Your bank has not modelled what happens when customers use AI agents to interact with you. The volume, pricing, and complaint implications are unexamined.",
    mid: "You are aware that customer-side AI agents will change demand patterns, but have not yet redesigned processes or economics around it.",
    high: "You have modelled demand-side exposure and are actively preparing: fee defensibility, volume economics, and structured complaint readiness.",
    question: "If a client's AI agent benchmarked your fees against ten competitors today, what would it find?",
  },
];

export function calculateResults(answers: (number | null)[]) {
  const categoryScores: CategoryScore[] = categories.map((cat) => ({
    category: cat,
    score: 0,
    max: 9,
  }));

  questions.forEach((q, i) => {
    const answer = answers[i];
    if (answer !== null) {
      const catIndex = categories.indexOf(q.category);
      categoryScores[catIndex].score += q.options[answer].score;
    }
  });

  const totalScore = categoryScores.reduce((sum, c) => sum + c.score, 0);
  const maxScore = 45;

  let level = levels[0];
  let levelIndex = 0;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalScore >= levels[i].threshold) {
      level = levels[i];
      levelIndex = i;
      break;
    }
  }

  return { categoryScores, totalScore, maxScore, level, levelIndex };
}
