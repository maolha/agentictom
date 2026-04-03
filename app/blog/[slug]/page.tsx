import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import BlogContent from "@/components/BlogContent";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Agentic TOM`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://agentictom.com/blog/${slug}`,
      siteName: "Agentic TOM",
      type: "article",
      publishedTime: post.date,
      authors: ["Marc Hauser"],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <nav
        className="px-5 md:px-8 py-4 md:py-5"
        style={{ borderBottom: "1px solid #D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide"
            style={{ color: "#1A1A1A" }}
          >
            agenticTOM
          </Link>
          <div className="flex items-center gap-5 md:gap-8 text-xs md:text-sm tracking-widest uppercase text-[#6B6B6B]">
            <Link href="/#about" className="hidden sm:inline hover:text-[#2B3A52] transition-colors">About</Link>
            <Link href="/#speaking" className="hover:text-[#2B3A52] transition-colors">Speaking</Link>
            <Link href="/#writing" className="hover:text-[#2B3A52] transition-colors">Writing</Link>
          </div>
        </div>
      </nav>

      <article className="px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-[680px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
            {formatDate(post.date)}
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-10 md:mb-12"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.2, color: "#1A1A1A" }}
          >
            {post.title}
          </h1>
          <BlogContent content={post.content} />
          <div className="mt-16 pt-8" style={{ borderTop: "1px solid #D8D3CB" }}>
            <Link
              href="/#writing"
              className="text-xs uppercase tracking-widest hover:underline"
              style={{ color: "#2B3A52" }}
            >
              Back to Writing
            </Link>
          </div>
        </div>
      </article>

      <footer
        className="px-5 md:px-8 py-10 border-t"
        style={{ borderColor: "#D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            agentictom.com &copy; {new Date().getFullYear()} Marc Hauser
          </p>
        </div>
      </footer>
    </main>
  );
}
