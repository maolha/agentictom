#!/usr/bin/env node
/**
 * Content checks for content/blog/*.mdx, derived from EDITOR.md.
 *
 * Fails the build on the mechanical rules (frontmatter, link targets, excerpt
 * length, em dashes, banned words). Everything else in EDITOR.md needs a
 * reader. Run with `npm run lint:content`, or `--warn` to report without failing.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "content/blog");
const WARN_ONLY = process.argv.includes("--warn");

const THEMES = ["the-model", "escalation-and-autonomy", "demand-side", "in-practice"];
const MAX_EM_DASHES = 5;
const MAX_EXCERPT = 165;
const MAX_STANDFIRST = 320;

// From EDITOR.md "Kill on sight". Word boundaries where the word is short.
const BANNED = [
  /\bfundamentally\b/i,
  /\btransformative\b/i,
  /\bparadigm\b/i,
  /\bgame-changing\b/i,
  /\bunprecedented\b/i,
  /\brevolutioni[sz]e/i,
  /doing real work here/i,
  /distinction changes everything/i,
  /\bit is worth noting\b/i,
  /\bit bears mentioning\b/i,
  /\bin other words\b/i,
  /\blet that sink in\b/i,
  /\bread that again\b/i,
  /\bif this resonated\b/i,
  /results may be uncomfortable/i,
  /might surprise you/i,
  /\bresearch suggests\b/i,
  /\bstudies show\b/i,
  /\banalysts believe\b/i,
  /\bsources say\b/i,
  /\bmoat\b/i,
  /\bunlocks?\b/i,
  /\bleverage\b/i,
  /\bsynerg/i,
  /\becosystem\b/i,
  /\bdisruption\b/i,
  /\bnorth star\b/i,
  /\bdrive impact\b/i,
  /\baccelerate transformation\b/i,
  /\bfuture-proof/i,
  /\bact now\b/i,
  /\bthe window is closing\b/i,
];

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).sort();
const slugs = new Set(files.map((f) => f.replace(/\.mdx$/, "")));
const problems = [];
const warnings = [];

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const where = (msg) => `${file}: ${msg}`;

  // Frontmatter
  for (const key of ["title", "date", "excerpt", "standfirst", "theme"]) {
    if (typeof data[key] !== "string" || !data[key].trim()) problems.push(where(`missing frontmatter "${key}"`));
  }
  if (typeof data.date === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) problems.push(where(`date must be YYYY-MM-DD, got "${data.date}"`));
  if (typeof data.theme === "string" && !THEMES.includes(data.theme)) problems.push(where(`unknown theme "${data.theme}"`));
  if (typeof data.excerpt === "string" && data.excerpt.length > MAX_EXCERPT) {
    problems.push(where(`excerpt is ${data.excerpt.length} characters, maximum ${MAX_EXCERPT} (it doubles as the meta description)`));
  }
  if (typeof data.standfirst === "string" && data.standfirst.length > MAX_STANDFIRST) {
    warnings.push(where(`standfirst is ${data.standfirst.length} characters, aim for under ${MAX_STANDFIRST}`));
  }
  if (!/^# /m.test(content)) warnings.push(where("body has no H1 line (the page renders the title from frontmatter; keep an H1 for plain-text readers)"));

  // Em dashes in body and frontmatter
  const dashes = (raw.match(/—/g) ?? []).length;
  if (dashes > MAX_EM_DASHES) problems.push(where(`${dashes} em dashes, maximum ${MAX_EM_DASHES}`));

  // Banned words and phrases
  const lines = raw.split("\n");
  lines.forEach((line, i) => {
    for (const re of BANNED) {
      const m = line.match(re);
      if (m) problems.push(where(`line ${i + 1}: banned phrase "${m[0]}"`));
    }
  });

  // Internal links must point at existing posts, and not at posts published later than this one
  const links = [...content.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)].map((m) => m[1]);
  for (const target of new Set(links)) {
    if (!slugs.has(target)) {
      problems.push(where(`links to /blog/${target}, which does not exist`));
      continue;
    }
    const targetRaw = fs.readFileSync(path.join(DIR, `${target}.mdx`), "utf-8");
    const targetDate = matter(targetRaw).data.date;
    if (typeof targetDate === "string" && typeof data.date === "string" && targetDate > data.date) {
      warnings.push(where(`links to /blog/${target}, dated ${targetDate}, later than this post (${data.date}); fine once both are live`));
    }
  }

  // Figures embedded by comment must be known to BlogContent
  const embeds = [...content.matchAll(/^\s*<!-- ([a-z:-]+) -->\s*$/gm)].map((m) => m[1]);
  const known = fs.readFileSync(path.join(ROOT, "components/BlogContent.tsx"), "utf-8");
  for (const e of embeds) if (!known.includes(`"${e}"`)) problems.push(where(`embed "${e}" is not registered in components/BlogContent.tsx`));

  // Statistics without a hint of attribution: a soft check, warnings only
  const percentLines = lines.filter((l) => /\d+ percent|\d+%/.test(l) && !/\(|McKinsey|FINMA|MROS|SNB|BCG|IBM|KPMG|LexisNexis|Mandiant|Faros|Epoch|Mozilla|Brynjolfsson|Sinha|Garg|estimate|illustrative|author/i.test(l));
  if (percentLines.length) warnings.push(where(`${percentLines.length} line(s) with a percentage and no visible source or estimate label`));

  void slug;
}

for (const w of warnings) console.log(`warning  ${w}`);
for (const p of problems) console.log(`error    ${p}`);
console.log(`\n${files.length} posts checked: ${problems.length} error(s), ${warnings.length} warning(s)`);
if (problems.length && !WARN_ONLY) process.exit(1);
