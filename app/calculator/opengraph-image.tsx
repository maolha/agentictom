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

// Chat apps crop the image to a small centred square, so everything sits
// inside the middle 630 pixels.
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 300px",
          background: "#F7F4EF",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
          agenticTOM — Calculator
        </div>
        <div style={{ display: "flex", fontSize: 54, fontWeight: 300, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 22, textAlign: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          Where the Chain Breaks
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 22 }}>
          {ACCURACIES.map((a) => (
            <div key={a} style={{ display: "flex", gap: 5 }}>
              {STEPS.map((s) => (
                <div key={s} style={{ display: "flex", width: 36, height: 36, background: mix(Math.pow(a, s)) }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#6B6B6B", lineHeight: 1.4, textAlign: "center", justifyContent: "center", marginBottom: 10 }}>
          Ten steps at 98 percent: 18 percent of runs fail. Run your own chain.
        </div>
        <div style={{ position: "absolute", bottom: 34, display: "flex", fontSize: 20, color: "#2B3A52" }}>Marc Hauser</div>
        <div style={{ position: "absolute", top: 0, right: 0, width: 8, height: "100%", background: "#2B3A52" }} />
      </div>
    ),
    { ...size }
  );
}
