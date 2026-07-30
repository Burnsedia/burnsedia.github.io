# SEO Foundations Specification

## Objective
Fix foundational SEO gaps across baileyburnsed.dev — meta tags, structured data, internal linking, and content freshness signals — to improve search ranking and click-through rate.

## North Star
Every page has a unique, descriptive title tag and meta description. Every page has appropriate JSON-LD structured data (FAQPage, HowTo, BreadcrumbList, Article). The site communicates content freshness through RSS and sitemap signals.

## Requirements

### 1. Fix Meta Description (SITE_DESCRIPTION)
- `src/consts.ts` has truncated placeholder: `SITE_DESCRIPTION = 'I Build Software for:  '`
- Update to a complete, keyword-rich description
- Example: `'Autistic hacker-builder shipping apps, games, and AI systems. Consulting on practical software, AI automation, and lean SaaS.'`
- Also update `SITE_META_DESCRIPTION` for stronger social/SEO copy
- Verify homepage `<meta name="description">` renders correctly

### 2. Add RSS Feed Link to `<head>`
- RSS feed is generated (`@astrojs/rss` in package.json) but no `<link>` tag exists
- Add to `src/components/shared/BaseHead.astro`:
  `<link rel="alternate" type="application/rss+xml" title="baileyburnsed.dev" href="/rss.xml">`
- Verify the actual RSS endpoint path first

### 3. Add FAQPage JSON-LD Schema
- Create `src/components/shared/FAQSchema.astro` — reusable component
- Accepts `items: {question: string, answer: string}[]` prop
- Renders `FAQPage` JSON-LD when items exist
- Wire into `src/pages/service.astro` with 5-8 Q&A pairs about Unlimited Dev Service
- Wire into product pages (retainer, skills, courses) when created
- FAQPage schema is the #1 GEO signal for AI search engines

### 4. Add HowTo JSON-LD Schema
- Create `src/components/shared/HowToSchema.astro` — reusable component
- Accepts `name, description, steps: {name, text, url?, image?}[]` props
- Renders `HowTo` JSON-LD when steps exist
- Wire into tutorial blog posts (Neovim, Godot, Python-Pytest, SaaS Checklist)
- Detection strategy: add `schema: "howto"` frontmatter field to eligible posts

### 5. Add BreadcrumbList Schema to All Interior Pages
- Blog posts ✓ (exists)
- Blog index ✓ (exists)
- Course pages ✓ (exists)
- Service page ✗ — needs BreadcrumbList
- Product pages ✗ — need BreadcrumbList (Home > Products > [Product])
- Page template: `{ "@type": "ListItem", position: N, name: "Page Name", item: "..." }`

### 6. Improve Page Title Tags
- Homepage: add descriptive keywords beyond brand name
- Service page: include offer and value proposition (`"Unlimited Dev Service — Flat-Rate $4k/mo Full-Stack Development | Bailey Burnsed"`)
- About page: include personal positioning
- Blog posts: use `seoTitle` frontmatter when available (see issue #121)

### 7. Add Article Schema Completeness
- Verify `BlogPosting` schema in `BaseHead.astro` includes:
  - `headline`, `description`, `image`, `datePublished`, `dateModified`
  - `author` (Person), `publisher` (Organization), `keywords` (tags)
  - `mainEntityOfPage`
- Run Google Rich Results Test to validate

### 8. Improve Internal Linking
- Blog posts about related topics should link to product pages
- Map: AI agents → skill bundle, Django/SaaS → course, cloud/case-study → retainer
- Add contextual links in blog post body content
- Ensure `relatedPosts` feature surfaces product pages when tag matches occur

### 9. Add Per-Post Open Graph Images
- Currently all pages use same OG image (`/CyberPunkLogo2.jpg`)
- Blog posts already have `heroImage` frontmatter — pass it through to OG meta tag
- When `image` prop is provided to `BaseLayout`, it sets `og:image`
- **Fix:** in `src/pages/blog/[...slug].astro`, pass `post.data.heroImage` as the `image` prop

## Acceptance Criteria
- [ ] `SITE_DESCRIPTION` and `SITE_META_DESCRIPTION` are complete, keyword-rich sentences
- [ ] Homepage `<meta name="description">` renders the updated description (not placeholder)
- [ ] `<link rel="alternate" type="application/rss+xml">` appears in `<head>` on all pages
- [ ] Service page has `FAQPage` JSON-LD schema (passes Rich Results Test)
- [ ] HowTo schema appears on tutorial posts (when steps are added)
- [ ] BreadcrumbList schema exists on service page and product pages
- [ ] Homepage `<title>` includes descriptive keywords
- [ ] Article schema on blog posts passes Google Rich Results Test
- [ ] Blog posts have contextual links to relevant product pages
- [ ] Blog posts pass their `heroImage` as the OG image
- [ ] `npm run build` succeeds
- [ ] No broken links or duplicate meta tags

## Files to Create
- `src/components/shared/FAQSchema.astro`
- `src/components/shared/HowToSchema.astro`

## Files to Modify
- `src/consts.ts` — SITE_DESCRIPTION, SITE_META_DESCRIPTION
- `src/components/shared/BaseHead.astro` — RSS link, title tag logic
- `src/layouts/BlogPost.astro` — FAQPage + HowTo rendering, seoTitle/seoDescription
- `src/pages/blog/[...slug].astro` — pass heroImage as image prop
- `src/pages/service.astro` — FAQPage schema, BreadcrumbList schema
- `src/pages/products/*.astro` — BreadcrumbList schema (when created)
- `src/content/blog/*.md` — internal links and FAQ frontmatter (content work)

## Issue References
- GitHub issues #110, #111, #112, #113, #114, #115, #116, #117, #118, #119

## Prioritization
| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Fix meta description (consts.ts) | 2 min | High |
| P0 | Add RSS link to BaseHead | 2 min | Medium |
| P1 | FAQPage schema component + service page | 15 min | High |
| P1 | Use seoTitle/seoDescription in head | 10 min | Medium |
| P2 | HowTo schema for tutorials | 30 min | Medium |
| P2 | Breadcrumb on service/products | 10 min | Low-Medium |
| P2 | Per-post OG images | 5 min | Medium |
| P3 | Internal linking blog→products | 20 min | Medium |
| P3 | Page title tag improvements | 10 min | Medium |
