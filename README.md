# agentictom.com

The site behind the Agentic Target Operating Model: a framework for Swiss banking and financial services leadership, written by Marc Hauser. Next.js 16 (App Router), React 19, Tailwind 4, deployed on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint and the content checks
npm run lint:content
```

Node 20 or later. The contact form needs `GMAIL_USER`, `GMAIL_APP_PASSWORD` and optionally `CONTACT_EMAIL` and `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local`; without them the form returns an error and everything else works.

## Where things live

| Path | What it is |
|---|---|
| `content/blog/*.mdx` | One file per essay. The file name is the URL slug. |
| `lib/blog.ts` | Reads the essays: publication gating, themes, related posts, date formatting. |
| `lib/site.ts` | Site constants and the per-page metadata helper. |
| `app/fonts.css`, `public/fonts/` | The two site fonts, kept in the repo so the build downloads nothing. |
| `components/BlogContent.tsx` | Renders an essay: GitHub-flavoured markdown via react-markdown, plus the interactive figures. |
| `components/viz/*` | The interactive figures embedded in essays. |
| `lib/assessment.ts` | Questions, scoring and result copy for the readiness assessment. |
| `lib/guide.ts` | The ways in that are not the essay list: the numbers to estimate, the reading path per seat, the question of the week. |
| `lib/reading.ts` | What the browser remembers about its reader (essays read, progress, last visit). localStorage only, never sent. |
| `components/home/*` | Homepage pieces: the estimate game, the seat paths, the returning reader strip, the weekly question. |
| `components/lab/*` | The Lab: tool cards and the gallery that shows the essay figures one at a time. |
| `components/blog/*` | The archive filters and the reading progress with its section list. |
| `components/NavMenus.tsx` | Site search and the full menu for narrow screens, both native dialogs. |
| `app/search.json/` | The essay index the search fetches when it is first opened. |
| `app/finma-guidance-08-2024/` | The canonical explainer the essays link to instead of repeating it. |
| `scripts/lint-content.mjs` | Mechanical checks derived from EDITOR.md. |
| `EDITOR.md` | The editorial standard. Read it before writing or editing any text on the site. |

## Writing an essay

Create `content/blog/<slug>.mdx`:

```yaml
---
title: "The Six Percent Club"
date: "2026-07-07"          # publication day. The essay is invisible before it.
theme: "the-model"          # the-model | escalation-and-autonomy | demand-side | in-practice
excerpt: "One sentence for the index and search results. Under 160 characters."
standfirst: "The argument in two or three sentences. Shown in the In brief box."
dateline: "Written on 8 April 2026, the morning of ..."   # optional, for pieces tied to a day
disclosure: true            # optional, adds the employer disclosure at the end
updated: "2026-11-16"       # optional, the day figures or text were revised after publication
updateNote: "What changed, and what the first version said."   # required with updated
---

# The Six Percent Club

Body in markdown. Bold the takeaway, not the setup.
```

Supported in the body: headings from `##` down, paragraphs, bold, links, bullet and numbered lists, tables, horizontal rules, blockquotes, inline code and footnotes (`[^1]`, rendered as Notes at the end). A blockquote that opens with `> [!CLOSING]` on its own line is set as a closing card: use it once, for the last words of an essay. The `# Title` line is kept for plain-text readers and skipped by the renderer.

Embed an interactive figure with a comment on its own line:

```
<!-- viz:j-curve -->
```

Available: `viz:exponential-steps`, `viz:j-curve`, `viz:exploit-window`, `viz:mros-series`, `viz:reliability-matrix`, `viz:journey-map`, `viz:three-assumptions`, `funnel:mortgage`, and the film `video:staff-of-fifteen-house` (files in `public/videos/`). To add one, create a client component under `components/viz/` and register it in `components/BlogContent.tsx`.

A new figure also belongs in the Lab: add it to `GROUPS` in `components/lab/FigureGallery.tsx` with one line on what the reader can find out with it.

### Ways in: numbers, seats, the weekly question

`lib/guide.ts` holds three lists that need an editor when the essays change:

- `QUIZ`: the figures the reader estimates before seeing them. Each carries its source and the essay it comes from. A figure that is modelled says so in `source`. Headlines and buttons take the count from the list, so adding or removing a figure needs no other edit.
- `SEATS`: one reading path per role, as three essay slugs in order, one tool and one question. Slugs that are not live are dropped from the path.
- `questionOfTheWeek`: rotates through the assessment questions in `lib/assessment.ts`, changing every Monday (UTC).

### Revising a published essay

When figures in a published essay are replaced by newer ones, set `updated` to the day of the revision and say in `updateNote` what changed and what the first version said. The essay then shows "Updated on" with the note above the text and the date in its byline, the archive marks it, and the sitemap and the structured data carry the new date. The publication date and the place in the archive stay as they were.

### Publishing and scheduling

`getAllPosts` and `getPost` only return essays whose `date` has arrived (UTC). The homepage, index, feed, sitemap, search index and essay pages revalidate hourly, so an essay dated in the future goes live on its day without a redeploy, as long as the file was deployed before then. Its URL and Open Graph card return 404 until that day.

### Before you commit

```bash
npm run lint:content
```

It checks frontmatter, excerpt length, em dash count, the banned word list from EDITOR.md, internal link targets and figure names. The rest of EDITOR.md (attribution, illustrative figures labelled, one "not X, it is Y" per essay, strong opening and closing lines) needs a reader.

## Pages

`/` homepage, `/framework`, `/lab`, `/calculator`, `/assessment`, `/blog` and `/blog/<slug>`, `/finma-guidance-08-2024`, `/privacy`, plus `/feed.xml`, `/sitemap.xml`, `/robots.txt` and generated Open Graph images.
