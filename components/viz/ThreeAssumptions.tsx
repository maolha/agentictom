const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const MUTED = "#6B6B6B";
const SUNK = "#F0ECE3";
const LINE2 = "#D8D3CB";

const ITEMS = [
  { says: "The client gets tired.", staff: "A staff follows up on the morning a promise expires." },
  { says: "The client forgets.", staff: "A staff keeps every statement, email and meeting note." },
  { says: "The bank is the expert in the room.", staff: "A staff has read the terms to the last clause." },
];

/** The three assumptions of "A Staff of Fifteen" at a glance, ahead of the paragraphs that argue them. */
export default function ThreeAssumptions() {
  return (
    <div className="my-8">
      <div className="p-5 md:p-6" style={{ background: SUNK, border: `1px solid ${LINE2}` }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: BROWN }}>
          At a glance
        </p>
        <ol className="grid sm:grid-cols-3" style={{ listStyle: "none", padding: 0, margin: 0, gap: 1, background: LINE2 }}>
          {ITEMS.map((it, i) => (
            <li key={it.says} className="py-3 sm:py-0 sm:px-4 first:sm:pl-0 last:sm:pr-0" style={{ background: SUNK }}>
              <span aria-hidden="true" className="font-[family-name:var(--font-cormorant)] font-light block" style={{ fontSize: "2.2rem", lineHeight: 1, color: BROWN }}>
                {i + 1}
              </span>
              <p className="font-[family-name:var(--font-cormorant)] mt-1.5" style={{ fontSize: "1.3rem", lineHeight: 1.2, color: SLATE }}>
                {it.says}
              </p>
              <p className="text-xs mt-2" style={{ color: MUTED, lineHeight: 1.55 }}>
                {it.staff}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
