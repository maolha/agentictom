import { ImageResponse } from "next/og";

export const alt = "Agentic TOM — Marc Hauser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F7F4EF",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#8B7355",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Framework
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: "#1A1A1A",
            lineHeight: 1.15,
            marginBottom: 40,
          }}
        >
          agenticTOM
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6B6B6B",
            lineHeight: 1.6,
            maxWidth: 800,
          }}
        >
          A framework for the Agentic Target Operating Model in Swiss banking and financial services.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            fontSize: 22,
            color: "#2B3A52",
          }}
        >
          Marc Hauser
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 8,
            height: "100%",
            background: "#2B3A52",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
