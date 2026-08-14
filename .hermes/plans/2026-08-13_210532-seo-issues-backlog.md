# SEO Issues Backlog Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Clear the full `seo`-labeled issue backlog (18 open issues) — foundation metadata, structured data (GEO), content optimization, analytics, and local SEO services pages.

**Architecture:** Static Astro 5 site. Most work is head/metadata + JSON-LD additions in shared components/layouts, plus content frontmatter edits. Local SEO adds a `/services/` namespace (new content source + 3 route templates).

**Tech Stack:** Astro 5, TypeScript (strict), Tailwind v4 + DaisyUI, `astro:content` collections, JSON-LD structured data.

---

## Issue Inventory (label: seo)

**Open (18):** #110, #112, #113, #116, #117, #118, #119, #120, #121, #122, #123, #124, #125, #74, #73, #31, #33, #34
**Closed duplicates (skip):** #111 (dup #110), #114 (dup #122), #115 (dup #96)

**Spec coverage:**
- `specs/09-seo-foundations.md` → #110, #112, #113, #116, #117, #118, #119
- `specs/10-tutorial-content-seo-geo.md` → #120, #121, #122, #123, #124, #125
- `specs/12-local-seo-services-pages.md` → #31, #33, #34
- `specs/13-homepage-hero-and-metadata-seo.md` → #73, #74

---

## Phase 1 — Foundation metadata (highest leverage, lowest effort)

### Task 1.1 — Fix broken SITE_DESCRIPTION (#110)
**Objective:** Replace the truncated `SITE_DESCRIPTION` placeholder in `src/consts.ts` and align `SITE_META_DESCRIPTION`.
**Files:** Modify `src/consts.ts`.
**Steps:**
1. Update `SITE_DESCRIPTION` to a complete, keyword-rich sentence.
2. Confirm `SITE_META_DESCRIPTION` reads as a strong social/SEO snippet.
3. Verify homepage still renders via `src/pages/index.astro` (see Task 1.2 — the two interact).
**Verify:** `npm run build`; inspect built `dist/index.html` for a complete `<meta name="description">`.

### Task 1.2 — Homepage title + description alignment (#74)
**Objective:** Make homepage `<title>` and `<meta name="description">` reflect the hero promise and use the constants.
**Files:** Modify `src/pages/index.astro`, `src/components/homepage/HomeHero.astro` (as needed).
**Steps:**
1. Set a descriptive title (brand + keywords) instead of bare `SITE_TITLE`.
2. Point description at `SITE_META_DESCRIPTION` (or a rewritten `SITE_DESCRIPTION`) rather than a hardcoded string.
3. Confirm canonical is singular (`https://baileyburnsed.dev/`).
**Verify:** `npm run build`; inspect `dist/index.html` for title, description, canonical.

### Task 1.3 — Add RSS `<link>` to head (#112)
**Objective:** Expose the existing `/rss.xml` feed via an alternate link.
**Files:** Modify `src/components/shared/BaseHead.astro`.
**Steps:** Add the `application/rss+xml` alternate link. Confirm the endpoint path is `/rss.xml` (from `src/pages/rss.xml.js`).
**Verify:** `npm run build`; confirm the link appears in `<head>` on a built page.

### Task 1.4 — Per-post Open Graph images (#116)
**Objective:** Ensure blog posts use a unique OG image rather than the shared default.
**Files:** Verify `src/layouts/BlogPost.astro` and `src/pages/blog/[...slug].astro`; modify blog frontmatter `heroImage` values in `src/content/blog/*.md`.
**Steps:**
1. Confirm the `image={heroImage}` → `BaseLayout` → `BaseHead` chain is intact (it is; `BlogPost.astro` passes `image={heroImage}`).
2. Set distinct `heroImage` per post where a real image exists; otherwise decide on Option B (auto-generated OG) as a follow-up.
**Verify:** `npm run build`; confirm `og:image` differs across posts.

### Task 1.5 — Page title tag improvements (#118)
**Objective:** Improve `<title>` copy on homepage, service, and about pages.
**Files:** Modify `src/pages/index.astro`, `src/pages/service.astro`, `src/pages/about.astro`.
**Steps:** Apply descriptive, intent-matching titles per issue #118 proposals.
**Verify:** `npm run build`; inspect each page's `<title>`.

### Task 1.6 — Use seoTitle/seoDescription in head (#121)
**Objective:** Honor `seoTitle`/`seoDescription` frontmatter for `<title>` and meta description.
**Files:** Modify `src/layouts/BlogPost.astro`.
**Steps:**
1. Add `seoTitle`/`seoDescription` to the `Props` interface and destructuring.
2. Compute `pageTitle = seoTitle || title` and `pageDescription = seoDescription || description`, pass to `BaseLayout`.
**Verify:** `npm run build`; confirm `/blog/python-pytest/` and the case-study post render their `seoTitle`/`seoDescription`.

### Task 1.7 — Article schema completeness audit (#119)
**Objective:** Verify/fix the `BlogPosting` JSON-LD emitted in `BaseHead.astro` (headline, description, image, datePublished, dateModified, author, publisher, keywords, mainEntityOfPage).
**Files:** Modify `src/components/shared/BaseHead.astro` if gaps found.
**Steps:** Audit the existing schema block; fix any missing/incorrect fields (e.g., `dateModified` fallback to `datePublished`, `keywords` from tags).
**Verify:** Google Rich Results Test on a blog post URL (post-deploy), or validate JSON-LD locally.

### Task 1.8 — Static-first hero copy parity (#73)
**Objective:** Guarantee hero H1/subheadline/CTAs are complete in static HTML; animation is enhancement-only.
**Files:** Modify `src/components/homepage/HomeHero.astro`, `src/components/shared/HeroTyping.astro` (optional).
**Steps:**
1. Confirm H1 + subheadline already render statically (they do — preserve).
2. Add a static no-JS fallback for the rotating phrase list if desired.
**Verify:** `npm run build`; view-source `dist/index.html` to confirm full hero messaging without JS.

---

## Phase 2 — Structured data / GEO (specs 09 + 10)

### Task 2.1 — Render FAQPage schema from existing `faq` frontmatter (#120)
**Objective:** Emit `FAQPage` JSON-LD for the two posts that already have FAQ data.
**Files:** Modify `src/layouts/BlogPost.astro`.
**Steps:**
1. Add `faq` to `Props` + destructuring (note: `[...slug].astro` already spreads `{...post.data}`, so `faq` is available as a prop).
2. Render `FAQPage` JSON-LD when `faq` is non-empty.
**Verify:** `npm run build`; confirm FAQPage JSON-LD on `/blog/python-pytest/` and the case-study post.

### Task 2.2 — Add FAQPage schema to service/product pages (#113)
**Objective:** Create a reusable `FAQSchema` component and wire it into the service page (and product pages when they exist).
**Files:** Create `src/components/shared/FAQSchema.astro`; modify `src/pages/service.astro`.
**Steps:**
1. Build the reusable component (accepts `items: {question, answer}[]`).
2. Add 5–8 Q&A pairs to the service page.
**Verify:** `npm run build`; confirm FAQPage JSON-LD on `/service/`.

### Task 2.3 — Add HowTo schema for tutorial posts (#122)
**Objective:** Emit `HowTo` JSON-LD for tutorial posts.
**Files:** Create `src/components/shared/HowToSchema.astro`; modify `src/content.config.ts`, `src/layouts/BlogPost.astro`, and tutorial post frontmatter.
**Steps:**
1. Add `schema` (enum `article|howto`, default `article`) and `steps` (`{name, text, image?}[]`) to the blog schema.
2. Build the reusable component.
3. Conditionally render in `BlogPost.astro` when `schema === "howto"`.
4. Populate `steps` frontmatter on eligible posts (Neovim, Godot, Pytest, SaaS Checklist).
**Verify:** `npm run build`; `npm run astro -- sync`; confirm HowTo JSON-LD on tutorial posts.

### Task 2.4 — Add FAQ frontmatter to remaining posts (#123)
**Objective:** Add 3–5 Q&A pairs to the 5 eligible posts lacking FAQ data.
**Files:** Modify `src/content/blog/neovim-made-me-twice-as-fast.md`, `godot-for-python-programmers.md`, `saas-checklist.md`, `tl-dr-static-sites.md`, `freelancing-as-a-autistic-developer.md`.
**Steps:** Add `faq:` frontmatter matching the suggested questions in issue #123.
**Verify:** `npm run build`; `npm run astro -- sync`; confirm all 7 eligible posts now have FAQ data.

---

## Phase 3 — Content optimization (specs 09 + 10)

### Task 3.1 — Internal linking: blog → product pages (#117)
**Objective:** Add contextual links from blog posts to relevant product/service pages.
**Files:** Modify `src/content/blog/*.md` (AI-agent, Django/SaaS, freelancing, cloud posts).
**Steps:** Add contextual product links per issue #117 mapping; ensure `relatedPosts` still works.
**Verify:** `npm run build`; spot-check rendered links.

### Task 3.2 — Improve section headings for AI extraction (#124)
**Objective:** Make headings question-phrased and keyword-rich on tutorial posts.
**Files:** Modify `src/content/blog/tl-dr-static-sites.md`, `godot-for-python-programmers.md`, `saas-checklist.md`, `freelancing-as-a-autistic-developer.md`, `neovim-made-me-twice-as-fast.md`.
**Steps:** Apply heading rewrites per issue #124 (e.g., single-word headings → descriptive phrases); preserve h1→h2→h3 hierarchy.
**Verify:** `npm run build`; view-source to confirm heading structure.

---

## Phase 4 — Analytics (#125)

### Task 4.1 — GA event tracking for tutorial engagement (#125)
**Objective:** Track scroll depth and CTA clicks on tutorial posts via existing gtag.
**Files:** Modify `src/layouts/BlogPost.astro` (inline script); reuse existing `data-track-*` attributes where present.
**Steps:** Add IntersectionObserver scroll-depth tracking + wire existing CTA `data-track-*` attributes to `gtag` events.
**Verify:** `npm run build`; confirm script is inert in non-prod and fires in prod.

---

## Phase 5 — Local SEO services pages (spec 12)

### Task 5.1 — Resolve route naming decision (#31/#33/#34)
**Objective:** Decide `/service/` vs `/services/` namespace (see spec 12 Open Decision).
**Steps:** Confirm Recommendation A (new `/services/` namespace; keep `/service/` then 301-redirect) or B.

### Task 5.2 — Services content source + directory page (#34)
**Files:** Create `src/data/services.ts` (or services collection); create `src/pages/services/index.astro`.
**Verify:** `npm run build`; `/services/` lists all services with links.

### Task 5.3 — Service detail template (#31)
**Files:** Create `src/pages/services/[id].astro`.
**Verify:** `npm run build`; detail page renders with Service + BreadcrumbList schema.

### Task 5.4 — Local landing pages (#33)
**Files:** Create `src/pages/services/location/[slug].astro`; add content for East Point, Atlanta, Hapeville, College Park.
**Verify:** `npm run build`; each location page renders unique copy + Service/GeoPage schema.

---

## Verification (final gate)
- `npm run build` succeeds (baseline: succeeds with warnings/hints).
- `npm run astro -- check` — report delta vs. baseline (baseline already has pre-existing errors; confirm no NEW diagnostics in touched files).
- Google Rich Results Test on: `/`, `/service/`, `/blog/python-pytest/`, case-study post, and (post-Phase-5) a `/services/` detail + location page.
- View-source spot checks for: complete meta description, RSS link, per-post OG image, FAQPage/HowTo JSON-LD, homepage static hero copy.

## Risks / Open Questions
- `/service/` vs `/services/` route collision (spec 12 Open Decision) — resolve before Phase 5.
- `npm run astro -- check` has pre-existing failures — isolate new diagnostics from baseline.
- FAQPage schema spam risk — keep Q&A natural and content-derived, not keyword-stuffed.
- Closed duplicates (#111, #114, #115) must not be reopened; their work is tracked by the superseding issues (#110, #122, #96).
