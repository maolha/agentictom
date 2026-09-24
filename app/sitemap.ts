import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0] ? new Date(posts[0].date) : new Date();

  const blogEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/assessment`, lastModified: new Date("2026-09-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calculator`, lastModified: new Date("2026-09-24"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/framework`, lastModified: new Date("2026-09-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/finma-guidance-08-2024`, lastModified: new Date("2026-09-23"), changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date("2026-09-23"), changeFrequency: "yearly", priority: 0.2 },
    ...blogEntries,
  ];
}
