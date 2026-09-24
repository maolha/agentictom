import { ImageResponse } from "next/og";

export const alt = "Where the Chain Breaks — a calculator for error propagation in agentic process chains";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCURACIES = [0.9, 0.95, 0.99, 0.999];
const STEPS = [5, 10, 25, 50, 100];

function mix(t: number): string {
  const a = [247, 244, 239];
  const b = [43, 58, 82];
  const c = a.map((x, i) => Math.round(x + (b[i] - x) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "80px",
          background: "#F7F4EF",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 24, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
            agenticTOM — Calculator
          </div>
          <div style={{ fontSize: 68, fontWeight: 300, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 28 }}>
            Where the Chain Breaks
          </div>
          <div style={{ fontSize: 26, color: "#6B6B6B", lineHeight: 1.4 }}>
            Ten steps at 98 percent: 18 percent of runs fail. Run your own chain.
          </div>
          <div style={{ fontSize: 22, color: "#2B3A52", marginTop: 40 }}>Marc Hauser</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {ACCURACIES.map((a) => (
            <div key={a} style={{ display: "flex", gap: 6 }}>
              {STEPS.map((s) => (
                <div key={s} style={{ width: 62, height: 62, background: mix(Math.pow(a, s)) }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", top: 0, right: 0, width: 8, height: "100%", background: "#2B3A52" }} />
      </div>
    ),
    { ...size }
  );
}
