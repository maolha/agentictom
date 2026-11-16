import { getAllPosts, THEMES } from "@/lib/blog";

// The essay index behind the site search. Fetched when the search is first
// opened, so no page carries it. Scheduled essays appear on their day.
export const revalidate = 3600;

export function GET() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    theme: p.theme ? THEMES[p.theme].label : "",
    minutes: p.readingTime,
  }));
  return Response.json(posts);
}
