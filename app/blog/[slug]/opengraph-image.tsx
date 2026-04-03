import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const alt = "Agentic TOM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "Agentic TOM";
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    title = data.title ?? title;
  }

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
            fontSize: 24,
            color: "#8B7355",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          agenticTOM — Writing
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 300,
            color: "#1A1A1A",
            lineHeight: 1.2,
            marginBottom: 40,
            maxWidth: 900,
          }}
        >
          {title}
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
