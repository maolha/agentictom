"use client";

function FunnelSVG({
  title,
  titleColor,
  stages,
  conversionLabel,
  conversionColor,
}: {
  title: string;
  titleColor: string;
  stages: { label: string; value: string; pct: number }[];
  conversionLabel: string;
  conversionColor: string;
}) {
  const w = 400;
  const stageH = 48;
  const gap = 4;
  const totalH = stages.length * (stageH + gap) - gap;
  const padX = 10;

  return (
    <div>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: titleColor }}>{title}</p>
      <svg viewBox={`0 0 ${w} ${totalH + 10}`} width="100%" style={{ maxWidth: w }}>
        {stages.map((s, i) => {
          const y = i * (stageH + gap);
          const barW = (s.pct / 100) * (w - padX * 2);
          const x = (w - barW) / 2;
          const isBottom = i >= stages.length - 2;

          return (
            <g key={i}>
              {/* Trapezoid connecting to next stage */}
              {i < stages.length - 1 && (() => {
                const nextPct = stages[i + 1].pct;
                const nextBarW = (nextPct / 100) * (w - padX * 2);
                const nextX = (w - nextBarW) / 2;
                const nextY = (i + 1) * (stageH + gap);
                return (
                  <polygon
                    points={`${x},${y + stageH} ${x + barW},${y + stageH} ${nextX + nextBarW},${nextY} ${nextX},${nextY}`}
                    fill={isBottom ? "rgba(43,58,82,0.06)" : "rgba(43,58,82,0.03)"}
                  />
                );
              })()}
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barW}
                height={stageH}
                fill={isBottom ? "#2B3A52" : "rgba(43,58,82,0.1)"}
                rx={0}
              />
              {/* Label left */}
              <text
                x={x + 12}
                y={y + stageH / 2 - 6}
                fill={isBottom ? "#F7F4EF" : "#1A1A1A"}
                fontSize="11"
                fontFamily="var(--font-dm-sans), sans-serif"
              >
                {s.label}
              </text>
              {/* Value right-ish */}
              <text
                x={x + 12}
                y={y + stageH / 2 + 10}
                fill={isBottom ? "rgba(247,244,239,0.7)" : "#6B6B6B"}
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-dm-sans), sans-serif"
              >
                {s.value}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-xs mt-3" style={{ color: conversionColor, fontWeight: 700 }}>
        {conversionLabel}
      </p>
    </div>
  );
}

export default function MortgageFunnel() {
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <FunnelSVG
          title="Today"
          titleColor="#8B7355"
          stages={[
            { label: "Property seekers", value: "300'000+", pct: 100 },
            { label: "Mortgage inquiries", value: "500–850'000+", pct: 75 },
            { label: "Applications submitted", value: "200–300'000", pct: 45 },
            { label: "Mortgages originated", value: "~85'000", pct: 22 },
            { label: "Properties purchased", value: "~50–60'000", pct: 15 },
          ]}
          conversionLabel="Conversion: ~1 in 4"
          conversionColor="#6B6B6B"
        />
        <FunnelSVG
          title="Agent world"
          titleColor="#8B7355"
          stages={[
            { label: "Property seekers", value: "300'000+", pct: 30 },
            { label: "Mortgage inquiries", value: "Millions", pct: 100 },
            { label: "Applications submitted", value: "2–3 million+", pct: 85 },
            { label: "Mortgages originated", value: "~85'000", pct: 8 },
            { label: "Properties purchased", value: "~50–60'000", pct: 5 },
          ]}
          conversionLabel="Conversion: ~1 in 40+"
          conversionColor="#8B7355"
        />
      </div>
      <p className="text-xs mt-8 text-center" style={{ color: "#6B6B6B" }}>
        Illustrative. Based on SNB mortgage survey data, BFS/Wüest Partner transaction estimates, and platform quote-to-close ratios.
      </p>
    </div>
  );
}
