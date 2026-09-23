import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/blog");

/** Editorial themes. The key lives in each post's frontmatter as `theme`. */
export const THEMES = {
  "the-model": {
    label: "The model",
    line: "What an agentic operating model is, and who manages the agents.",
  },
  "escalation-and-autonomy": {
    label: "Escalation and autonomy",
    line: "How decisions return to humans, and how autonomy is earned.",
  },
  "demand-side": {
    label: "The demand side",
    line: "What happens when clients send agents.",
  },
  "in-practice": {
    label: "In practice",
    line: "The model applied to lending, compliance, software quality and the core.",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  theme: ThemeKey | null;
  readingTime: number;
};

export type Post = PostMeta & {
  content: string;
  standfirst?: string;
  /** Written on a specific day, in response to a specific event. Shown above the text. */
  dateline?: string;
  /** Show the standing employer disclosure at the end of the post. */
  disclosure?: boolean;
};

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

/** A post is live once its publication date has arrived, evaluated in UTC. */
export function isLive(date: string): boolean {
  return new Date(date).getTime() <= Date.now();
}

function readMeta(file: string): PostMeta & { content: string; data: Record<string, unknown> } {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
  const { data, content } = matter(raw);
  const theme = typeof data.theme === "string" && data.theme in THEMES ? (data.theme as ThemeKey) : null;
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    theme,
    readingTime: estimateReadingTime(content),
    content,
    data,
  };
}

/** All live posts, newest first. Posts on the same day sort by slug so the order is stable. */
export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map(readMeta)
    .filter((p) => isLive(p.date))
    .sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
    })
    .map(({ slug, title, date, excerpt, theme, readingTime }) => ({ slug, title, date, excerpt, theme, readingTime }));
}

/** A single live post. Returns null for unknown slugs and for posts whose date has not arrived. */
export function getPost(slug: string): Post | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const meta = readMeta(`${slug}.mdx`);
  if (!isLive(meta.date)) return null;
  const { data } = meta;
  return {
    slug: meta.slug,
    title: meta.title,
    date: meta.date,
    excerpt: meta.excerpt,
    theme: meta.theme,
    readingTime: meta.readingTime,
    content: meta.content,
    standfirst: typeof data.standfirst === "string" ? data.standfirst : undefined,
    dateline: typeof data.dateline === "string" ? data.dateline : undefined,
    disclosure: data.disclosure === true,
  };
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

/** Up to `limit` other live posts on the same theme, newest first. */
export function getRelatedPosts(slug: string, theme: ThemeKey | null, limit = 3): PostMeta[] {
  if (!theme) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.theme === theme)
    .slice(0, limit);
}

/** Live posts grouped by theme, in THEMES order. Themes with no posts are omitted. */
export function getPostsByTheme(): { key: ThemeKey; label: string; line: string; posts: PostMeta[] }[] {
  const posts = getAllPosts();
  return (Object.keys(THEMES) as ThemeKey[])
    .map((key) => ({ key, ...THEMES[key], posts: posts.filter((p) => p.theme === key) }))
    .filter((t) => t.posts.length > 0);
}

/** "18 September 2026", independent of the server's time zone. */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
