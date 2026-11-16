/** Section headings of an essay: the anchors behind the "In this essay" list. */

export type Heading = { id: string; text: string };

/** "Why 99 percent is a poor number" becomes "why-99-percent-is-a-poor-number". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The `##` headings of a markdown body, in order, with inline markup removed. */
export function extractHeadings(markdown: string): Heading[] {
  const out: Heading[] = [];
  for (const m of markdown.matchAll(/^## +(.+?)\s*$/gm)) {
    const text = m[1]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    const id = slugify(text);
    if (id) out.push({ id, text });
  }
  return out;
}
