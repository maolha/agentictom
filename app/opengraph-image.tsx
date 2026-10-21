import { ImageResponse } from "next/og";

export const alt = "Agentic TOM — Marc Hauser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "60px 300px",
          background: "#F7F4EF",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
          Framework
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 300, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 28 }}>
          agenticTOM
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6B6B6B", lineHeight: 1.45, textAlign: "center", justifyContent: "center" }}>
          The Agentic Target Operating Model for Swiss banking and financial services.
        </div>
        <div style={{ position: "absolute", bottom: 56, display: "flex", fontSize: 22, color: "#2B3A52" }}>Marc Hauser</div>
        <div style={{ position: "absolute", top: 0, right: 0, width: 8, height: "100%", background: "#2B3A52" }} />
      </div>
    ),
    { ...size }
  );
}
