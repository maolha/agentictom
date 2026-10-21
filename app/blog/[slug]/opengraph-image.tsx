import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/blog";

export const alt = "Agentic TOM, by Marc Hauser";
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

  // Chat apps crop the image to a small centred square, so the title sits
  // centred inside the middle 630 pixels, in type large enough to read small.
  const fontSize = title.length > 60 ? 46 : title.length > 34 ? 56 : 68;
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
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#8B7355",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          agenticTOM — Thoughts
        </div>
        <div
          style={{
            display: "flex",
            fontSize,
            fontWeight: 300,
            color: "#1A1A1A",
            lineHeight: 1.15,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {title}
        </div>
        <div style={{ position: "absolute", bottom: 56, display: "flex", fontSize: 22, color: "#2B3A52" }}>Marc Hauser</div>
        <div style={{ position: "absolute", top: 0, right: 0, width: 8, height: "100%", background: "#2B3A52" }} />
      </div>
    ),
    { ...size }
  );
}
