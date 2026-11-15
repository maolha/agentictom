/**
 * Data for the journey map in "The Staff of Fifteen Buys a House".
 *
 * One household, one property, twelve stages. Each stage carries four lanes:
 * what the client does alone today, what the staff does, where the bank is
 * touched today, and what changes for the bank. Workload ratings (0 to 5) are
 * the author's judgement of how much work reaches the bank per client.
 */

export type RoleId =
  | "lawyer" | "tax" | "analyst" | "planner" | "pension" | "insurance" | "mortgage" | "negotiator"
  | "strategist" | "assistant" | "scout" | "valuer" | "building" | "marketer" | "monitor";

/** The ten specialists from "A Staff of Fifteen", then the five a property adds. */
export const ROSTER: { id: RoleId; name: string; short: string }[] = [
  { id: "lawyer", name: "Lawyer", short: "Lawyer" },
  { id: "tax", name: "Tax adviser", short: "Tax adviser" },
  { id: "analyst", name: "Investment analyst", short: "Analyst" },
  { id: "planner", name: "Wealth planner", short: "Wealth planner" },
  { id: "pension", name: "Pension specialist", short: "Pension specialist" },
  { id: "insurance", name: "Insurance expert", short: "Insurance expert" },
  { id: "mortgage", name: "Mortgage specialist", short: "Mortgage specialist" },
  { id: "negotiator", name: "Negotiator", short: "Negotiator" },
  { id: "strategist", name: "Strategist", short: "Strategist" },
  { id: "assistant", name: "Assistant", short: "Assistant" },
  { id: "scout", name: "Scout", short: "Scout" },
  { id: "valuer", name: "Valuer", short: "Valuer" },
  { id: "building", name: "Building expert", short: "Building expert" },
  { id: "marketer", name: "Marketer", short: "Marketer" },
  { id: "monitor", name: "Monitor", short: "Monitor" },
];

export type Assumption = "tired" | "forgets" | "expert";

export const ASSUMPTIONS: Record<Assumption, string> = {
  tired: "The client gets tired",
  forgets: "The client forgets",
  expert: "The bank is the expert",
};

export type Phase = "Buy" | "Own" | "Leave";

export type Stage = {
  phase: Phase;
  name: string;
  /** Short name for the map. */
  short: string;
  shift: string;
  /** Bank workload today and with the staff, 0 to 5. */
  today: number;
  withStaff: number;
  breaks: Assumption[];
  alone: string[];
  /** Who acts, and what they do. An empty list of roles means the whole staff. */
  staff: { who: RoleId[]; does: string }[];
  bankToday: string[];
  bankThen: string[];
};

export const STAGES: Stage[] = [
  {
    phase: "Buy",
    name: "Finding",
    short: "Finding",
    shift: "From three portals in the evening to every source, all day.",
    today: 1,
    withStaff: 3,
    breaks: ["expert"],
    alone: [
      "Sets alerts on two or three portals and checks them after work.",
      "Guesses the budget with one bank's online calculator.",
      "Rarely hears of properties sold without a listing.",
    ],
    staff: [
      { who: ["scout"], does: "watches every portal, building notice and direct channel." },
      { who: ["strategist"], does: "turns the household's ten year plan into a search brief." },
      { who: ["mortgage"], does: "computes the budget under each lender's own affordability rules." },
      { who: ["pension"], does: "maps the equity: savings, pillar 3a, second pillar withdrawal or pledge." },
    ],
    bankToday: ["Anonymous visits to the calculator.", "Sometimes a first meeting and a general statement of what is possible."],
    bankThen: [
      "Your affordability policy is known to the decimal before anyone speaks to you.",
      "Lenders with stricter rules are dropped from the list at this stage, unseen.",
      "First requests for a financing statement arrive before a property exists.",
    ],
  },
  {
    phase: "Buy",
    name: "Exploring",
    short: "Exploring",
    shift: "From ten viewings to written due diligence on every candidate.",
    today: 0,
    withStaff: 3,
    breaks: ["tired", "expert"],
    alone: [
      "Visits five to ten properties and reads the sales brochure.",
      "Relies on what the seller's broker says.",
      "Skips the minutes of the owners' meetings.",
    ],
    staff: [
      { who: ["lawyer"], does: "reads the land registry extract, easements, condominium rules, minutes and the state of the renewal fund." },
      { who: ["building"], does: "estimates the renovation backlog and the cost of an energy retrofit." },
      { who: ["tax"], does: "compares the tax bill by municipality." },
      { who: ["assistant"], does: "books viewings and sends the broker 40 written questions." },
    ],
    bankToday: ["Usually none.", "Occasionally a request for an indicative valuation."],
    bankThen: [
      "An indicative valuation and a first check are requested for every shortlisted property, ten to twenty per buyer.",
      "Most of them never close.",
      "Your valuation is compared with three others and the differences are questioned.",
    ],
  },
  {
    phase: "Buy",
    name: "Evaluating",
    short: "Evaluating",
    shift: "From gut feeling and the bank's number to a model with comparables.",
    today: 1,
    withStaff: 2,
    breaks: ["expert"],
    alone: [
      "Compares price per square metre and trusts a feeling.",
      "Takes the bank's valuation as the truth.",
      "Seldom computes the full cost of ownership.",
    ],
    staff: [
      { who: ["valuer"], does: "delivers a price range with comparables." },
      { who: ["analyst"], does: "models buying against renting over 10, 20 and 30 years." },
      { who: ["tax"], does: "models the tax treatment of the home over the whole holding period, planned reforms included." },
      { who: ["insurance", "pension"], does: "show the cost of cover and the effect of a withdrawal on retirement benefits." },
    ],
    bankToday: ["Advice meeting.", "Affordability calculation and product brochure."],
    bankThen: [
      "The advice meeting starts where it used to end.",
      "The client arrives with a model. The adviser adds something to it or is asked only for a price.",
      "Tax arguments for keeping a high mortgage are tested against the numbers, year by year.",
    ],
  },
  {
    phase: "Buy",
    name: "Deciding",
    short: "Deciding",
    shift: "From the adviser's proposal to a financing specification.",
    today: 1,
    withStaff: 2,
    breaks: ["expert", "forgets"],
    alone: ["Decides under time pressure.", "Follows the adviser on fixed or SARON, terms, tranches and the way to amortise."],
    staff: [
      { who: ["strategist"], does: "writes the decision memo with scenarios: rates at 3 percent, one income lost, children, retirement." },
      { who: ["planner"], does: "fixes the structure before any lender is asked." },
      { who: ["lawyer"], does: "lists the contract terms the household requires: transfer, exit formula, notice." },
      { who: ["assistant"], does: "files the reasons, so the decision can be checked in ten years." },
    ],
    bankToday: ["Adviser recommends a product mix."],
    bankThen: [
      "The structure reaches you as a specification.",
      "Product advice differentiates less. Contract terms become part of the price comparison.",
      "What your adviser said today is on record with the client for the life of the loan.",
    ],
  },
  {
    phase: "Buy",
    name: "Negotiating the price",
    short: "Price",
    shift: "From one nervous bid to an unconditional bid with proof of financing.",
    today: 1,
    withStaff: 4,
    breaks: ["tired"],
    alone: ["One or two rounds with the seller's broker.", "Does not see the other bids.", "Bids subject to financing."],
    staff: [
      { who: ["negotiator"], does: "argues with comparables, the renovation backlog and days on the market." },
      { who: ["mortgage"], does: "holds binding financing commitments from several lenders, so the bid carries no condition." },
      { who: ["assistant"], does: "checks every claim of the broker in writing." },
    ],
    bankToday: ["A financing confirmation, issued within days."],
    bankThen: [
      "A binding confirmation is needed within hours, for a named property and price, and again in each bidding round.",
      "The slow lender is out before price is discussed.",
      "Many of the bidders on the same property ask you at once.",
    ],
  },
  {
    phase: "Buy",
    name: "Negotiating the loan",
    short: "Loan",
    shift: "From three quotes to a tender among a hundred lenders.",
    today: 3,
    withStaff: 5,
    breaks: ["tired", "forgets", "expert"],
    alone: ["Asks the house bank and one or two others, or a broker.", "Compares the headline rate.", "Accepts on the phone."],
    staff: [
      { who: ["mortgage"], does: "sends one complete file to 100 banks, insurers and pension funds on the same morning, so every quote carries the same date." },
      { who: ["negotiator"], does: "runs rounds and tells each lender its rank and the gap to the best." },
      { who: ["lawyer"], does: "compares the contracts clause by clause." },
      { who: ["analyst"], does: "prices each offer over the expected holding period, exit costs included." },
    ],
    bankToday: ["Days to weeks per application.", "About CHF 1'500 of processing cost (industry estimate).", "Discount at the adviser's discretion."],
    bankThen: [
      "You are one of a hundred. The win rate falls and the cost per mortgage won rises.",
      "The distance between published and negotiated rate disappears.",
      "Every clause is read and priced.",
    ],
  },
  {
    phase: "Buy",
    name: "Closing",
    short: "Closing",
    shift: "From document chasing to one complete file, and a contract that gets read.",
    today: 3,
    withStaff: 2,
    breaks: ["tired", "expert"],
    alone: [
      "Collects documents piece by piece.",
      "Signs the frame agreement without reading the general terms.",
      "Coordinates notary, pension fund and bank alone.",
    ],
    staff: [
      { who: ["assistant"], does: "delivers the complete file once and tracks every promised date." },
      { who: ["lawyer"], does: "reads the frame agreement to the last clause and asks for changes." },
      { who: ["pension"], does: "arranges the withdrawal or pledge." },
      { who: ["insurance"], does: "places the cover." },
    ],
    bankToday: ["Reminders for missing documents.", "Contract production, payout, mortgage note and land registry."],
    bankThen: [
      "The easiest closing you have had, if you can take a structured file.",
      "The hardest, if a clause only works unread.",
      "Requests to amend standard terms become routine.",
    ],
  },
  {
    phase: "Own",
    name: "Owning",
    short: "Owning",
    shift: "From ten quiet years to a yearly review of everything.",
    today: 1,
    withStaff: 3,
    breaks: ["forgets", "tired"],
    alone: ["Pays interest and amortisation.", "Files the tax return.", "Looks at the mortgage again when it matures."],
    staff: [
      { who: ["monitor"], does: "checks market rates and the margin on the loan every day." },
      { who: ["tax"], does: "uses every deduction the current rules allow and replans when they change." },
      { who: ["planner"], does: "reviews amortise or invest each year." },
      { who: ["assistant"], does: "files every statement and requests the bank's data on the household once a year." },
    ],
    bankToday: ["Interest and tax statements.", "Little contact started by the bank."],
    bankThen: [
      "The quiet years end. Questions on statements, access requests and challenges to the margin arrive on a schedule.",
      "Requests for extra amortisation and for a change of product increase.",
      "The relationship is tested every year. It used to be tested every ten.",
    ],
  },
  {
    phase: "Own",
    name: "Renewing",
    short: "Renewing",
    shift: "From rollover to a full tender at every maturity.",
    today: 2,
    withStaff: 5,
    breaks: ["tired", "forgets"],
    alone: [
      "Receives a renewal offer shortly before maturity.",
      "Often misses the notice period and rolls over.",
      "Stays with the house bank.",
    ],
    staff: [
      { who: ["assistant"], does: "has held every end date and notice period in the diary since signing, and gives notice on the first possible day." },
      { who: ["mortgage"], does: "tenders to 100 lenders well ahead of maturity and uses forward mortgages." },
      { who: ["planner"], does: "aligns the tranches so the whole loan can move." },
    ],
    bankToday: ["Renewal offer.", "Retention helped by inertia and by tranches with different end dates."],
    bankThen: [
      "Every maturity is a new tender. Retention through inertia ends.",
      "The back book reprices towards new business.",
      "The offer that wins is the one sent before the tender starts.",
    ],
  },
  {
    phase: "Own",
    name: "Changing",
    short: "Changing",
    shift: "From surprise to a plan made years ahead.",
    today: 2,
    withStaff: 3,
    breaks: ["expert", "tired"],
    alone: [
      "Asks for an increase when the roof needs work.",
      "Handles separation or loss of income as it comes.",
      "Learns at 60 that affordability is recalculated on pension income.",
    ],
    staff: [
      { who: ["building"], does: "plans the renovation and the subsidies." },
      { who: ["pension"], does: "runs the retirement test ten years early and sets the amortisation path to pass it." },
      { who: ["lawyer"], does: "separates ownership and liability in a divorce." },
      { who: ["strategist"], does: "reruns the plan at every life event." },
    ],
    bankToday: ["An increase reruns the whole credit process.", "Retirement check at 60 or at renewal."],
    bankThen: [
      "Requests for change and hardship arrive early, documented, with a proposed solution.",
      "The staff asks for your position on retirement in writing, years ahead.",
      "A bank that only has a refusal loses the loan at the next maturity.",
    ],
  },
  {
    phase: "Leave",
    name: "Selling",
    short: "Selling",
    shift: "From one broker to every platform and thousands of buyers' agents.",
    today: 1,
    withStaff: 4,
    breaks: ["tired", "forgets", "expert"],
    alone: ["Mandates one broker for a commission.", "Lists on the main portals.", "Pays the early repayment penalty as quoted."],
    staff: [
      { who: ["marketer"], does: "prepares listing, images and documents, publishes on every platform and writes to matching searchers and their agents." },
      { who: ["negotiator"], does: "runs structured bidding and accepts only bids with verified financing." },
      { who: ["tax"], does: "computes property gains tax and the best date." },
      { who: ["lawyer"], does: "audits the penalty, or arranges a transfer of the mortgage to the buyer or to the next property." },
    ],
    bankToday: ["Payoff statement and penalty quote.", "Release of the mortgage note."],
    bankThen: [
      "One listing produces financing checks for every bidder, each sent to many lenders.",
      "Penalty quotes are audited line by line and negotiated.",
      "A buyer who takes over the mortgage is a client you did not choose. A transfer to the next property keeps the loan.",
    ],
  },
  {
    phase: "Leave",
    name: "Passing on",
    short: "Passing on",
    shift: "From a box of papers to a file the heirs can act on.",
    today: 2,
    withStaff: 3,
    breaks: ["forgets", "expert"],
    alone: [
      "Heirs search for documents after the death.",
      "The community of heirs decides slowly.",
      "The bank waits for the certificate of inheritance.",
    ],
    staff: [
      { who: ["planner", "lawyer"], does: "prepare years ahead: advance on inheritance, right of residence or usufruct, equalisation among siblings." },
      { who: ["assistant"], does: "hands the heirs a complete file on the day." },
      { who: [], does: "Each heir has a staff. They take over the mortgage if affordability holds, or tender it." },
    ],
    bankToday: ["Estate desk.", "Blocked accounts and waiting."],
    bankThen: [
      "Estate cases arrive prepared and fast, with several represented parties.",
      "The loan is tendered at the moment of transfer.",
      "The bank that helped plan the succession meets the next generation first.",
    ],
  },
];

/** The journey as the bank's process map draws it today: four entries. */
export const BANK_STEPS: { stage: number; title: string; note: string }[] = [
  { stage: 5, title: "Application and offer", note: "The map starts here. Five stages of the household's journey are already over." },
  { stage: 6, title: "Closing and payout", note: "The main line of the map ends here. The household will own the property for decades." },
  { stage: 8, title: "Renewal offer", note: "The next entry, years later. In between: a statement a year." },
  { stage: 10, title: "Payoff", note: "The last entry. The sale that caused it was decided without the bank." },
];

/** The checks the bank runs between application and payout, shown when the map is zoomed in. */
export const BANK_TICKS = ["Affordability", "Valuation", "Credit decision", "Contract"];
