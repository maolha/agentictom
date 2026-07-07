import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPost, getAdjacentPosts, formatDate } from "@/lib/blog";
import BlogContent from "@/components/BlogContent";
import TracingBeam from "@/components/TracingBeam";
import { LinkedInIcon, XIcon } from "@/components/SocialIcons";
import StickyNav from "@/components/StickyNav";

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
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@marc_hauser",
      site: "@marc_hauser",
    },
    alternates: {
      canonical: `/blog/${slug}`,
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

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://agentictom.com" },
      { "@type": "ListItem", position: 2, name: "Thoughts", item: "https://agentictom.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://agentictom.com/blog/${slug}` },
    ],
  };

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <StickyNav>
        <div className="max-w-[900px] mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide"
            style={{ color: "#1A1A1A" }}
          >
            agenticTOM
          </Link>
          <div className="flex items-center gap-5 md:gap-8 text-xs md:text-sm tracking-widest uppercase text-[#6B6B6B]">
            <Link href="/framework" className="hover:text-[#2B3A52] transition-colors">Framework</Link>
            <Link href="/blog" className="hover:text-[#2B3A52] transition-colors">Thoughts</Link>
            <Link href="/assessment" className="hidden sm:inline hover:text-[#2B3A52] transition-colors">Assessment</Link>
            <Link href="/#about" className="hover:text-[#2B3A52] transition-colors">About</Link>
            <Link href="/#contact" className="hidden sm:inline-block px-4 py-2 border border-[#2B3A52] text-[#2B3A52] hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 text-xs tracking-widest">Let&apos;s talk</Link>
          </div>
        </div>
      </StickyNav>

      <article className="px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-[680px] mx-auto lg:pl-8">
          <TracingBeam>
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
            className="font-[family-name:var(--font-cormorant)] font-light mb-8 md:mb-10"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.2, color: "#1A1A1A" }}
          >
            {post.title}
          </h1>
          {post.standfirst && (
            <aside
              className="mb-10 md:mb-12 p-5 md:p-6"
              style={{ background: "#F0ECE3", borderLeft: "3px solid #8B7355" }}
            >
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
                In brief
              </p>
              <p className="text-sm" style={{ color: "#1A1A1A", lineHeight: 1.75 }}>
                {post.standfirst}
              </p>
            </aside>
          )}
          <BlogContent content={post.content} />

          {/* Follow */}
          <div className="print-hide mt-14 p-6 md:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ border: "1px solid #D8D3CB" }}>
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8B7355" }}>
                Stay with the argument
              </p>
              <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
                New essays land on LinkedIn first.
              </p>
            </div>
            <a
              href="https://linkedin.com/in/marcoliverhauser"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-slate shrink-0 text-center"
              style={{ fontSize: "0.7rem", padding: "10px 24px" }}
            >
              Follow Marc on LinkedIn
            </a>
          </div>

          {/* Next / Previous navigation */}
          <div className="print-hide mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-8" style={{ borderTop: "1px solid #D8D3CB" }}>
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
          </TracingBeam>
        </div>
      </article>

      <footer
        className="px-5 md:px-8 py-10 border-t"
        style={{ borderColor: "#D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            agentictom.com &copy; {new Date().getFullYear()} Marc Hauser
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm" style={{ color: "#6B6B6B" }}>
            <Link href="/framework" className="hover:text-[#2B3A52] transition-colors">Framework</Link>
            <Link href="/blog" className="hover:text-[#2B3A52] transition-colors">Thoughts</Link>
            <Link href="/assessment" className="hover:text-[#2B3A52] transition-colors">Assessment</Link>
            <Link href="/#about" className="hover:text-[#2B3A52] transition-colors">About</Link>
            <Link href="/#contact" className="hover:text-[#2B3A52] transition-colors">Contact</Link>
            <span aria-hidden="true" style={{ color: "#D8D3CB" }}>·</span>
            <a
              href="https://linkedin.com/in/marcoliverhauser"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#2B3A52] transition-colors inline-flex"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://x.com/marc_hauser"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:text-[#2B3A52] transition-colors inline-flex"
            >
              <XIcon />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
