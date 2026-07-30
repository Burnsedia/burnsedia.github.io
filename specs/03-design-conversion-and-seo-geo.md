# Design, Conversion & SEO/GEO Improvement Specification

## Objective
Fix design issues that hurt credibility and conversion, add structured data for SEO/GEO discoverability, and create clear purchase pathways — all while keeping the existing theme, logo, and assets.

## Current Design Issues (from live audit)
- Hero layout cuts off typing animation text on desktop
- Stats section has non-credible numbers ("Client projects shipped: 100%")
- 6 empty article wrappers in "building in public" section
- Every interior page repeats the same hero template
- Service page voice doesn't match the rest of the site (generic sales vs first-person)
- No product catalog or membership page
- No newsletter lead magnet
- No FAQ or HowTo schema for GEO
- No 404 page
- No content cluster internal linking

## Requirements

### 1. Hero Layout Fix
- Hexagon logo container: `w-full max-w-xs mx-auto` (not `w-2/3`)
- HeroTyping min-width calculation includes prefix length
- CTAs moved below hero block for cleaner separation
- Primary CTA: "See What I Build" → `/products`
- Secondary CTA: "Follow My Builds" → `/blog`

### 2. Stats Section
- Replace non-credible stats with verifiable metrics
- Examples: years coding, blog posts count, GitHub stars, newsletter subs
- Remove empty article wrappers from DOM
- Reduce to 3-4 cards if 6 real stats aren't available

### 3. Product Hub Page (`/products`)
- Serves as main conversion landing page
- ProductCard component with type label, title, description, price, badge
- Sections: Productized Services, SaaS & API, Games & Skills
- Bottom CTA: Calendly booking for unsure visitors
- BreadcrumbList schema

### 4. Service Page Rewrite
- Title: "Unlimited Dev Service | baileyburnsed.dev"
- Meta: "Flat-rate full-stack development. $4,000/month."
- Hero: "Flat-rate development, no bullshit."
- First-person voice matching homepage
- Q&A format: "What do I get?", "How is this different?", "What if I need less?"
- Remove irrelevant old projects (Edudate, Dracula, FullerIT, NerdTime, etc.)
- Replace third-person bio with first-person voice

### 5. FAQ Schema (GEO)
- Reusable FAQSchema component: injects `FAQPage` JSON-LD
- Service page gets 5-8 high-intent Q&A pairs
- Product pages get 4-6 product-specific Q&A pairs
- Each Q: question as text, A: answer as text
- Passes Google Rich Results Test

### 6. HowTo Schema (GEO)
- Reusable HowToSchema component: injects `HowTo` JSON-LD
- Steps: name, text, optional url/image
- Applied to tutorial-style blog posts:
  - Neovim productivity post
  - Godot for Python Programmers
  - Python Pytest tutorial
  - SaaS Checklist
- Detection: tag-based or frontmatter field

### 7. Content Silos & Internal Linking
- Four content clusters:
  - AI Agents for Solo Teams
  - Indie SaaS Growth
  - Self-Hosting & Infrastructure
  - Building in Public
- Each cluster has a designated pillar post
- Cluster banner on non-pillar posts: "Part of [Cluster] series. Start here →"
- Internal links from supporting posts to pillar pages
- Silo mapping in `src/utils/silos.ts`

### 8. Interior Page Schema
- Every page gets BreadcrumbList + WebPage JSON-LD
- Blog posts get BlogPosting schema
- Service/product pages get Service + FAQPage schema
- All images get proper alt text
- Canonical URLs on all pages

## Acceptance Criteria
- [ ] `npm run build` succeeds
- [ ] Typing animation shows full phrases on desktop + mobile
- [ ] Stats section shows real, verifiable metrics
- [ ] No empty DOM elements in stats section
- [ ] Product page renders at `/products/` with all sections
- [ ] Service page reads in first-person brand voice
- [ ] FAQ schema passes Google Rich Results Test
- [ ] HowTo schema validates on tutorial posts
- [ ] All supporting posts link to their cluster pillar
- [ ] No orphaned content (every post has at least one internal link)
- [ ] All interior pages have BreadcrumbList + WebPage schema
- [ ] No build warnings related to our changes

## Files to Create
- `src/components/products/ProductCard.astro`
- `src/components/shared/FAQSchema.astro`
- `src/components/shared/HowToSchema.astro`
- `src/pages/products/index.astro`
- `src/utils/silos.ts`

## Files to Modify
- `src/components/homepage/HomeHero.astro` — fix hexagon sizing, CTA layout
- `src/components/shared/HeroTyping.astro` — fix min-width calc
- `src/components/homepage/HomeStats.astro` — real metrics, remove empties
- `src/pages/service.astro` — rewrite voice, simplify components
- `src/components/marketing/Hero.astro` — replace with direct headline
- `src/layouts/BlogPost.astro` — conditionally render HowTo schema
- `src/pages/blog/[...slug].astro` — add cluster banner
- `src/content/blog/*.md` — add internal links to pillar posts

## Risk Register
| Risk | Impact | Mitigation |
|------|--------|------------|
| Hero change breaks existing layout | Visual regression | Test on mobile + desktop before deploy |
| Stats reduction looks sparse | Perceived lack of activity | 4 strong stats > 6 weak ones |
| Service page rewrite loses existing SEO | SERP drop | Keep same URL, update structured data |
| FAQ schema flagged as spam | Google penalty | Keep Q&A natural, not keyword-stuffed |
