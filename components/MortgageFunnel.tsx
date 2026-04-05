"use client";

export default function MortgageFunnel() {
  const today = [
    { label: "Property seekers", value: "300'000+", width: 100 },
    { label: "Mortgage inquiries", value: "500-850'000+", width: 85 },
    { label: "Applications submitted", value: "200-300'000", width: 55 },
    { label: "Mortgages originated", value: "~85'000", width: 30 },
    { label: "Properties purchased", value: "~50-60'000", width: 20 },
  ];

  const agent = [
    { label: "Property seekers", value: "300'000+", width: 100 },
    { label: "Mortgage inquiries", value: "Millions", width: 100 },
    { label: "Applications submitted", value: "2-3M+", width: 90 },
    { label: "Mortgages originated", value: "~85'000", width: 12 },
    { label: "Properties purchased", value: "~50-60'000", width: 8 },
  ];

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Today */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#8B7355" }}>Today</p>
          <div className="flex flex-col gap-2">
            {today.map((step, i) => (
              <div key={i} className="flex flex-col">
                <div
                  className="py-3 px-4 mx-auto transition-all"
                  style={{
                    width: `${step.width}%`,
                    minWidth: 140,
                    background: i === today.length - 1 ? "#2B3A52" : "rgba(43,58,82,0.08)",
                    color: i === today.length - 1 ? "#F7F4EF" : "#1A1A1A",
                  }}
                >
                  <div className="flex justify-between items-baseline gap-2">
                    <span style={{ fontSize: "0.75rem", lineHeight: 1.4 }}>{step.label}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>{step.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 text-center" style={{ color: "#6B6B6B" }}>
            Conversion: ~1 in 4
          </p>
        </div>

        {/* Agent world */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#8B7355" }}>Agent world</p>
          <div className="flex flex-col gap-2">
            {agent.map((step, i) => (
              <div key={i} className="flex flex-col">
                <div
                  className="py-3 px-4 mx-auto transition-all"
                  style={{
                    width: `${step.width}%`,
                    minWidth: 140,
                    background: i >= 3 ? "#2B3A52" : i <= 2 ? "rgba(139,115,85,0.15)" : "rgba(43,58,82,0.08)",
                    color: i >= 3 ? "#F7F4EF" : "#1A1A1A",
                  }}
                >
                  <div className="flex justify-between items-baseline gap-2">
                    <span style={{ fontSize: "0.75rem", lineHeight: 1.4 }}>{step.label}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>{step.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 text-center" style={{ color: "#8B7355", fontWeight: 700 }}>
            Conversion: ~1 in 40+
          </p>
        </div>
      </div>

      <p className="text-xs mt-6 text-center" style={{ color: "#6B6B6B" }}>
        Illustrative. Based on SNB mortgage survey data, BFS/Wüest Partner transaction estimates, and platform quote-to-close ratios.
      </p>
    </div>
  );
}
