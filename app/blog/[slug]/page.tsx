import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPost, getAdjacentPosts, getRelatedPosts, formatDate, THEMES } from "@/lib/blog";
import { SITE_URL, SITE_NAME, AUTHOR, AUTHOR_TITLE, LINKEDIN_URL, RSS_ALTERNATE, X_HANDLE } from "@/lib/site";
import BlogContent from "@/components/BlogContent";
import TracingBeam from "@/components/TracingBeam";
import ShareLinks from "@/components/ShareLinks";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

// Posts are published by date. Re-render at most hourly so a scheduled post
// appears on its day without a redeploy; unknown or not-yet-live slugs 404.
export const revalidate = 3600;

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
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: `${post.title} — ${SITE_NAME}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "article",
      publishedTime: post.date,
      authors: [AUTHOR],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: X_HANDLE,
      site: X_HANDLE,
    },
    alternates: {
      canonical: `/blog/${slug}`,
      types: RSS_ALTERNATE,
    },
  };
}

const label = "text-xs uppercase tracking-widest";
const gold = { color: "#8B7355" } as const;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug, post.theme);
  const url = `${SITE_URL}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${url}/opengraph-image`,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: AUTHOR,
      url: LINKEDIN_URL,
      jobTitle: AUTHOR_TITLE,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: url,
    url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Thoughts", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
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
      <SiteNav />

      <article className="px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-[680px] mx-auto lg:pl-8">
          <TracingBeam>
          {/* Byline. Shown in print as well, so a forwarded copy names its author. */}
          <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 ${label}`} style={gold}>
            <span style={{ color: "#1A1A1A" }}>{AUTHOR}</span>
            <span aria-hidden="true" style={{ color: "#D8D3CB" }}>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true" style={{ color: "#D8D3CB" }}>&middot;</span>
            <span>{post.readingTime} min read</span>
            {post.theme && (
              <>
                <span aria-hidden="true" style={{ color: "#D8D3CB" }}>&middot;</span>
                <Link href={`/blog#${post.theme}`} className="hover:underline">
                  {THEMES[post.theme].label}
                </Link>
              </>
            )}
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
              <p className={`${label} mb-2`} style={gold}>
                In brief
              </p>
              <p className="text-sm" style={{ color: "#1A1A1A", lineHeight: 1.75 }}>
                {post.standfirst}
              </p>
            </aside>
          )}
          {post.dateline && (
            <p className="mb-8 text-sm" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>
              {post.dateline}
            </p>
          )}
          <BlogContent content={post.content} />

          {post.disclosure && (
            <p className="mt-10 text-xs" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>
              Disclosure: {AUTHOR} heads banking and financial services at UiPath in Switzerland, a vendor of automation
              software. The views on this site are his own and no product is endorsed here.
            </p>
          )}

          {/* Share and follow */}
          <div className="print-hide mt-14 p-6 md:p-7 flex flex-col gap-6" style={{ border: "1px solid #D8D3CB" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className={`${label} mb-1`} style={gold}>
                  Forward this
                </p>
                <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
                  Written to be sent to a colleague or a board member.
                </p>
              </div>
              <ShareLinks url={url} title={post.title} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6" style={{ borderTop: "1px solid #D8D3CB" }}>
              <div>
                <p className={`${label} mb-1`} style={gold}>
                  Stay in touch
                </p>
                <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
                  Questions, disagreement, or a case from your institution: find Marc on LinkedIn. New posts also appear in the{" "}
                  <a href="/feed.xml" className="underline underline-offset-4">RSS feed</a>.
                </p>
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-slate shrink-0 text-center"
                style={{ fontSize: "0.7rem", padding: "10px 24px" }}
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Related, by theme */}
          {related.length > 0 && post.theme && (
            <div className="print-hide mt-12 pt-8" style={{ borderTop: "1px solid #D8D3CB" }}>
              <p className={`${label} mb-6`} style={gold}>
                More on {THEMES[post.theme].label.toLowerCase()}
              </p>
              <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                    <p className={`${label} mb-2`} style={gold}>
                      {formatDate(r.date)}
                    </p>
                    <p
                      className="font-[family-name:var(--font-cormorant)] font-light group-hover:underline"
                      style={{ fontSize: "1.15rem", color: "#2B3A52", lineHeight: 1.3 }}
                    >
                      {r.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Older / newer */}
          <div className="print-hide mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-8" style={{ borderTop: "1px solid #D8D3CB" }}>
            <div>
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="group block">
                  <p className={`${label} mb-2`} style={gold}>
                    Older
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
                  <p className={`${label} mb-2`} style={gold}>
                    Newer
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

      <SiteFooter />
    </main>
  );
}
