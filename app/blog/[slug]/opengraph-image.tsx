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

  // Chat apps crop the image to a small centred square, so everything that matters
  // sits inside the middle 630 pixels, in large type, on a dark ground.
  const line = post.shareLine;
  const long = title.length > 34;
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
          background: "#2B3A52",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#B9A57E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28 }}>
          agenticTOM
        </div>
        <div
          style={{
            display: "flex",
            fontSize: long ? 60 : 76,
            fontWeight: 300,
            color: "#F7F4EF",
            lineHeight: 1.1,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {title}
        </div>
        {line ? (
          <div style={{ display: "flex", width: 72, height: 2, background: "#B9A57E", marginTop: 30, marginBottom: 26 }} />
        ) : null}
        {line ? (
          <div style={{ display: "flex", fontSize: 28, color: "#F7F4EF", opacity: 0.85, lineHeight: 1.3, textAlign: "center", justifyContent: "center" }}>
            {line}
          </div>
        ) : null}
        <div style={{ position: "absolute", bottom: 40, display: "flex", fontSize: 22, color: "#B9A57E" }}>Marc Hauser</div>
      </div>
    ),
    { ...size }
  );
}
