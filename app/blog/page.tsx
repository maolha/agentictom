import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Thoughts — Agentic TOM",
  description: "Writing on agentic AI, target operating models, and the future of financial services by Marc Hauser.",
  openGraph: {
    title: "Thoughts — Agentic TOM",
    description: "Writing on agentic AI, target operating models, and the future of financial services by Marc Hauser.",
    url: "https://agentictom.com/blog",
    siteName: "Agentic TOM",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

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
            <Link href="/blog" className="hover:text-[#2B3A52] transition-colors">Thoughts</Link>
            <Link href="/#contact" className="hover:text-[#2B3A52] transition-colors">Contact</Link>
            <Link href="/#about" className="hover:text-[#2B3A52] transition-colors">About</Link>
            <a href="https://linkedin.com/in/marcoliverhauser" target="_blank" rel="noopener noreferrer" className="hidden sm:inline hover:text-[#2B3A52] transition-colors">LinkedIn</a>
            <Link href="/#contact" className="hidden sm:inline-block px-4 py-2 border border-[#2B3A52] text-[#2B3A52] hover:bg-[#2B3A52] hover:text-[#F7F4EF] transition-colors duration-300 text-xs tracking-widest">Let&apos;s talk</Link>
          </div>
        </div>
      </nav>

      <div className="px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-[680px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Thoughts</p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-6"
            style={{ fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.2, color: "#1A1A1A" }}
          >
            The questions banks are not yet asking
          </h1>
          <p className="mb-16" style={{ fontSize: "1rem", color: "#6B6B6B", lineHeight: 1.7, maxWidth: 540 }}>
            Writing on agentic AI, operating model transformation, and the structural shifts arriving faster than most institutions assume.
          </p>
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block py-8 group"
                style={i > 0 ? { borderTop: "1px solid #D8D3CB" } : {}}
              >
                <article>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
                      {formatDate(post.date)}
                    </p>
                    <span style={{ color: "#D8D3CB" }}>&middot;</span>
                    <p className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>
                      {post.readingTime} min read
                    </p>
                  </div>
                  <h2
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3 group-hover:text-[#2B3A52] transition-colors"
                    style={{ fontSize: "clamp(22px, 3.5vw, 30px)", color: "#1A1A1A" }}
                  >
                    {post.title}
                  </h2>
                  <p className="mb-4" style={{ fontSize: "0.9rem", color: "#6B6B6B", lineHeight: 1.7 }}>
                    {post.excerpt}
                  </p>
                  <span
                    className="text-sm uppercase tracking-widest group-hover:underline"
                    style={{ color: "#2B3A52" }}
                  >
                    Read
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer
        className="px-5 md:px-8 py-10 border-t"
        style={{ borderColor: "#D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            agentictom.com &copy; {new Date().getFullYear()} Marc Hauser
          </p>
          <div className="flex gap-6 text-sm" style={{ color: "#6B6B6B" }}>
            <a href="https://linkedin.com/in/marcoliverhauser" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B3A52] transition-colors">LinkedIn</a>
            <a href="https://x.com/marc_hauser" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B3A52] transition-colors">X</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
