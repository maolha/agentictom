import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/blog";

export const alt = "Agentic TOM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // getPost applies the publication date, so a scheduled post has no card before its day.
  const post = getPost(slug);
  if (!post) notFound();
  const title = post.title;

  if (post.card && post.card.length > 0) {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "56px 72px", background: "#F7F4EF" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ display: "flex", fontSize: 20, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase" }}>agenticTOM — Thoughts</div>
            <div style={{ display: "flex", fontSize: 20, color: "#6B6B6B" }}>Marc Hauser</div>
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 300, color: "#1A1A1A", lineHeight: 1.15, marginBottom: 26 }}>{title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {post.card.map((line, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                <div style={{ display: "flex", justifyContent: "flex-end", width: 34, fontSize: 27, lineHeight: 1.3, color: "#2B3A52", fontWeight: 300 }}>{String(i + 1)}</div>
                <div style={{ display: "flex", fontSize: 27, color: "#1A1A1A", lineHeight: 1.3 }}>{line}</div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", top: 0, right: 0, width: 8, height: "100%", background: "#2B3A52" }} />
        </div>
      ),
      { ...size }
    );
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
          agenticTOM — Thoughts
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
