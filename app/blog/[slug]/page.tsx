import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPost, getAdjacentPosts, formatDate } from "@/lib/blog";
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
    alternates: {
      types: {
        "application/rss+xml": "/feed.xml",
      },
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

  const { prev, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Marc Hauser",
      url: "https://linkedin.com/in/marcoliverhauser",
      jobTitle: "Head of Banking & Financial Services, UiPath Switzerland",
    },
    publisher: {
      "@type": "Organization",
      name: "Agentic TOM",
      url: "https://agentictom.com",
    },
    url: `https://agentictom.com/blog/${slug}`,
  };

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <Link href="/#thoughts" className="hover:text-[#2B3A52] transition-colors">Thoughts</Link>
            <Link href="/#speaking" className="hover:text-[#2B3A52] transition-colors">Speaking</Link>
            <Link href="/#about" className="hover:text-[#2B3A52] transition-colors">About</Link>
            <a href="https://linkedin.com/in/marcoliverhauser" target="_blank" rel="noopener noreferrer" className="hidden sm:inline hover:text-[#2B3A52] transition-colors">LinkedIn</a>
            <Link href="/#speaking" className="hidden sm:inline-block px-4 py-2 border border-[#2B3A52] text-[#2B3A52] hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 text-xs tracking-widest">Enquire</Link>
          </div>
        </div>
      </nav>

      <article className="px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-[680px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
              {formatDate(post.date)}
            </p>
            <span style={{ color: "#D8D3CB" }}>&middot;</span>
            <p className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
              {post.readingTime} min read
            </p>
          </div>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-10 md:mb-12"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.2, color: "#1A1A1A" }}
          >
            {post.title}
          </h1>
          <BlogContent content={post.content} />

          {/* Next / Previous navigation */}
          <div className="mt-16 pt-8 flex flex-col sm:flex-row justify-between gap-8" style={{ borderTop: "1px solid #D8D3CB" }}>
            <div>
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="group block">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
                    Previous
                  </p>
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light group-hover:underline"
                    style={{ fontSize: "1.1rem", color: "#2B3A52" }}
                  >
                    {prev.title}
                  </p>
                </Link>
              )}
            </div>
            <div className="sm:text-right">
              {next && (
                <Link href={`/blog/${next.slug}`} className="group block">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
                    Next
                  </p>
                  <p
                    className="font-[family-name:var(--font-cormorant)] font-light group-hover:underline"
                    style={{ fontSize: "1.1rem", color: "#2B3A52" }}
                  >
                    {next.title}
                  </p>
                </Link>
              )}
            </div>
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
