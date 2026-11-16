import { questions } from "@/lib/assessment";

/**
 * The ways into the site that are not the essay list: a few figures to estimate,
 * a reading path per seat at the table, the working tools, and the question of
 * the week. Text here follows EDITOR.md like everything else on the site.
 */

/* ── The numbers ─────────────────────────────────────────────────────────── */

type QuizBase = {
  id: string;
  /** Two or three words for the progress row and the summary. */
  short: string;
  prompt: string;
  /** The figure as it is printed once revealed. */
  answerLabel: string;
  reveal: string;
  source: string;
  essay: { slug: string; title: string };
  /** A tool that lets the reader take the number further. */
  tool?: { href: string; label: string };
};

export type QuizSlider = QuizBase & {
  kind: "slider";
  min: number;
  max: number;
  start: number;
  answer: number;
  /** What the number counts: "runs in 100". */
  unit: string;
};

export type QuizChoice = QuizBase & {
  kind: "choice";
  options: string[];
  correct: number;
};

export type QuizItem = QuizSlider | QuizChoice;

export const QUIZ: QuizItem[] = [
  {
    id: "chain",
    kind: "slider",
    short: "The chain",
    prompt: "A process has ten steps. Each step is right 90 percent of the time. Out of 100 runs, how many finish without an error?",
    min: 0,
    max: 100,
    start: 70,
    answer: 35,
    unit: "runs in 100",
    answerLabel: "35",
    reveal:
      "0.9 to the power of ten is 0.35. Lift every step to 99 percent and 90 runs finish. Stretch the chain to 100 steps and 99 percent per step falls back to 37.",
    source: "Arithmetic, no survey required",
    essay: { slug: "ninety-nine-percent-is-a-failing-grade", title: "99 Percent Is a Failing Grade" },
    tool: { href: "/calculator", label: "Run your own chain" },
  },
  {
    id: "mros",
    kind: "slider",
    short: "The reports",
    prompt: "How many suspicious activity reports reach MROS on an average working day?",
    min: 0,
    max: 200,
    start: 30,
    answer: 84,
    unit: "reports a day",
    answerLabel: "84",
    reveal:
      "The Money Laundering Reporting Office Switzerland received 21'087 reports in 2025. That is one every six minutes of a working day, and almost four times the 2020 volume.",
    source: "MROS Annual Report 2025",
    essay: { slug: "eighty-four-reports-a-day", title: "Eighty-Four Reports a Day" },
  },
  {
    id: "exploit",
    kind: "choice",
    short: "The window",
    prompt:
      "In 2018 a newly published software vulnerability took 2.3 years on average to be exploited. By 2025 it was three weeks. How long in 2026?",
    options: ["About two weeks", "About one week", "About three days", "Less than a day"],
    correct: 3,
    answerLabel: "< 1 day",
    reveal:
      "The median in 2026 is one day after disclosure, and around 80 percent of exploitations fall on the day of disclosure or earlier. The mean has moved between plus 20 and minus 23 hours during the year, where minus means before the flaw was published. The essay, written in July, cites the mean at that point: about three hours.",
    source:
      "Zero Day Clock (CISA KEV and VulnCheck KEV), as reported by StackHawk, 21 August 2026, and SIG, October 2026; J.P. Morgan, Eye on the Market, 22 July 2026",
    essay: { slug: "tested-at-machine-speed", title: "Your Software Will Be Tested at Machine Speed" },
  },
  {
    id: "ebit",
    kind: "slider",
    short: "The club",
    prompt: "Out of 100 companies, how many report a significant EBIT effect from AI?",
    min: 0,
    max: 100,
    start: 40,
    answer: 6,
    unit: "companies in 100",
    answerLabel: "6",
    reveal:
      "Six. The other 94 are still looking for one, most of them with models in production, a strategy document and a growing inventory of pilots.",
    source: "McKinsey, State of AI survey, 2025",
    essay: { slug: "the-six-percent-club", title: "The Six Percent Club" },
  },
  {
    id: "patch",
    kind: "slider",
    short: "The patches",
    prompt:
      "Through 2025 Microsoft fixed an average of 94 security flaws a month. How many did it fix on the single Patch Tuesday of October 2026?",
    min: 0,
    max: 2000,
    start: 300,
    answer: 1411,
    unit: "flaws fixed",
    answerLabel: "1'411",
    reveal:
      "A record, and 15 times the 2025 monthly average. 70 of the flaws were critical and one was already being exploited. Trackers differ slightly on the total because Microsoft now counts Azure Linux and Chromium components.",
    source: "BleepingComputer, 13 October 2026; 2025 average from Tenable, 2025 year in review",
    essay: { slug: "who-patches-it-on-tuesday", title: "Who Patches It on Tuesday?" },
  },
  {
    id: "mortgage",
    kind: "choice",
    short: "The application",
    prompt:
      "Processing one mortgage application costs a bank roughly CHF 1'500. Today about one in four is won. When client agents query many banks at once, one in forty is won. What is one application then worth to the bank?",
    options: ["A gain of CHF 3'500", "A gain of CHF 500", "Break-even", "A loss of CHF 1'000"],
    correct: 3,
    answerLabel: "CHF −1'000",
    reveal:
      "Assume a won mortgage is worth CHF 20'000 over its life. At one in forty the expected value per application is CHF 500, against a cost of CHF 1'500. Volume rises tenfold and revenue does not.",
    source: "Illustrative calculation, based on industry estimates of processing cost",
    essay: {
      slug: "the-tsunami-is-not-coming-from-inside-the-bank",
      title: "The Tsunami Is Not Coming from Inside the Bank",
    },
  },
];

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** How many numbers there are, spelled out as the site spells numbers up to ten: "six". */
export const QUIZ_COUNT = WORDS[QUIZ.length] ?? String(QUIZ.length);
/** The same with a capital, for the start of a headline: "Six". */
export const QUIZ_COUNT_CAP = QUIZ_COUNT.charAt(0).toUpperCase() + QUIZ_COUNT.slice(1);

/** A slider estimate counts as close within a tenth of the scale. */
export function isClose(item: QuizItem, guess: number): boolean {
  if (item.kind === "choice") return guess === item.correct;
  return Math.abs(guess - item.answer) <= (item.max - item.min) / 10;
}

/* ── A reading path per seat ──────────────────────────────────────────────── */

export type Seat = {
  id: string;
  /** The button. */
  label: string;
  /** What reaches this desk first. */
  desk: string;
  /** Three essays, in reading order. Slugs that are not live are dropped. */
  essays: string[];
  tool: { href: string; label: string; line: string };
  /** One question to carry into the next meeting. */
  question: string;
};

export const SEATS: Seat[] = [
  {
    id: "ceo",
    label: "CEO or board",
    desk: "You set the pace and sign the plan. Start with the model, the evidence on who earns from AI, and the scenario your clients will run against you.",
    essays: ["agentic-tom-introduction", "the-six-percent-club", "a-staff-of-fifteen"],
    tool: {
      href: "/assessment",
      label: "Readiness assessment",
      line: "Fifteen questions, five minutes, a PDF for the executive committee.",
    },
    question: "Could you draw the escalation architecture for your three most critical processes right now?",
  },
  {
    id: "coo",
    label: "COO",
    desk: "Volume, unit cost and response time are yours. Start with the demand that arrives from outside, one process redesigned end to end, and the arithmetic of long chains.",
    essays: [
      "the-tsunami-is-not-coming-from-inside-the-bank",
      "mortgage-lending-in-an-agentic-tom",
      "ninety-nine-percent-is-a-failing-grade",
    ],
    tool: {
      href: "/calculator",
      label: "Where the Chain Breaks",
      line: "Enter your own process steps and see where the errors leave the chain.",
    },
    question: "What is your cost per processed application, and what would it need to be if volume increased 10×?",
  },
  {
    id: "cro",
    label: "CRO or compliance",
    desk: "Under FINMA Guidance 08/2024, responsibility for decisions cannot be delegated to AI. Start with escalation as architecture, the workload that compounds at 32 percent a year, and the three lines of defence.",
    essays: ["escalation-by-design", "eighty-four-reports-a-day", "who-manages-the-agents"],
    tool: {
      href: "/finma-guidance-08-2024",
      label: "FINMA Guidance 08/2024",
      line: "What the guidance asks of a bank that lets agents decide.",
    },
    question: "When was the last time you reviewed an AI agent's decision quality, rather than its uptime?",
  },
  {
    id: "cio",
    label: "CIO or CTO",
    desk: "The model is the commodity. Start with the loop into the core banking system, the cost of the years after the first version, and testing as a control.",
    essays: ["the-easy-part-is-the-ai", "who-patches-it-on-tuesday", "tested-at-machine-speed"],
    tool: {
      href: "/lab#figures",
      label: "The figures",
      line: "Patch volumes, exploit windows and handoff counts, each one to operate.",
    },
    question: "If you hired 500 new AI agents tomorrow, who would onboard them?",
  },
  {
    id: "client",
    label: "Head of wealth or retail",
    desk: "Your clients will arrive with help. Start with the staff of 15, what it does to service segmentation, and what it does to fees.",
    essays: [
      "a-staff-of-fifteen",
      "the-family-office-for-everyone",
      "when-every-client-negotiates-like-an-institution",
    ],
    tool: {
      href: "/blog/the-staff-of-fifteen-buys-a-house",
      label: "The journey map and film",
      line: "One household, one property, twelve stages, seen from both sides.",
    },
    question: "If a client's AI agent benchmarked your fees against ten competitors today, what would it find?",
  },
];

/* ── The question of the week ─────────────────────────────────────────────── */

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
/** Weeks change on Monday, 00:00 UTC. 5 January 1970 was the first Monday of the epoch. */
const FIRST_MONDAY_MS = 4 * 24 * 60 * 60 * 1000;

/** One of the fifteen assessment questions, the same for every reader in a given week. */
export function questionOfTheWeek(now: number = Date.now()): { category: string; question: string; context: string } {
  const week = Math.floor((now - FIRST_MONDAY_MS) / WEEK_MS);
  // Step by four so that consecutive weeks move to a different dimension.
  const q = questions[(week * 4) % questions.length];
  return { category: q.category, question: q.question, context: q.context ?? "" };
}
