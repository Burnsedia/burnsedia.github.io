# Brand Identity & Consulting Site Specification

## Objective
Transform baileyburnsed.dev into a brand-driven business site that positions the owner as an autistic hacker-builder who ships practical systems — optimized for SEO, GEO (Generative Engine Optimization), and consulting/newsletter conversions.

## North Star
Every page on the site is recognizably written by the same person: direct, anti-hype, practical. Visitors immediately understand who, what, and whether it's for them.

## Current State
- Dark synthwave theme (`darksynthwave`) with cyberpunk logo
- Blog with ~20 posts, RSS, sitemap, tag system
- Basic structured data (Person, Organization, Service, LocalBusiness, BlogPosting)
- Newsletter signup (Netlify Forms)
- Basic SEO: geo tags, canonical URLs, OG/Twitter cards
- Brand docs exist in `business/brand.md` and `business/message.md`

## Gaps
- Brand docs not reflected in actual site copy
- No dedicated consulting page with process/case studies
- Newsletter has no lead magnet
- No "building in public" live dashboard
- Terminal aesthetic could be pushed harder
- No FAQ schema or AI-friendly structured data (GEO gap)
- No explicit autistic entrepreneur brand narrative
- No content silos aligned to SEO cluster map
- No conversion analytics beyond GA4 pageviews
- No "Start Here" path for new visitors

## Requirements

### 1. Terminal Aesthetic
- TerminalPrompt component: monospace prompt with blinking cursor, configurable prefix
- AsciiDivider component: configurable repeating character divider
- CRT scanline overlay effect (CSS, pointer-events: none)
- Terminal-style blockquote for markdown content
- StatusBar showing build-time or last-commit timestamp

### 2. Brand Copy
- SITE_TITLE includes "Autistic Hacker-Builder" positioning
- SITE_DESCRIPTION references autistic entrepreneur, practical systems, anti-hype
- HomeHero subhead: "Autistic hacker-builder shipping apps, games, and AI systems. No hype. No lock-in. No vaporware."
- HomeAbout explicitly states autistic identity and building philosophy
- HomeCTA reflects direct, anti-hype voice
- All page meta descriptions updated to brand voice

### 3. Consulting Page (`/consulting`)
- Hero: "I help founders and small businesses ship practical systems."
- Process section: discovery → architecture → build → handoff
- Offer types: Technical consulting (strategy/audit), Implementation sprint (build), Retainer (ongoing)
- Pricing: Fixed-scope sprints, clear tiers, no hourly billing
- FAQ with FAQPage JSON-LD schema for GEO
- Case studies: anonymized outcomes from previous work
- CTA: Calendly booking + newsletter fallback
- Nav link between "Build Log" and "Newsletter"

### 4. Newsletter Lead Magnet
- Free resource: "The Indie Developer Stack 2025" — concise guide
- Landing page at `/free-guide/` with email capture
- All newsletter CTAs reference the free guide
- Thank-you page delivers download link

### 5. Building-in-Public Dashboard
- NowBuilding widget on homepage: terminal-styled status window
- Current project name, status, last commit, GitHub stars
- Data source: `src/content/build-log/current.json` (manually updated)
- Section between HomeAbout and ProjectsSection on homepage

### 6. Content Silos (SEO)
- Four content clusters: AI Agents, Indie SaaS, Self-Hosting/Infra, Building in Public
- Each cluster has a pillar page (hub) and supporting posts
- Cluster navigation banner on blog posts showing "Part of [Cluster] series"
- Internal links from supporting posts to pillar pages
- Silo utility in `src/utils/silos.ts`

### 7. GEO Optimization
- Reusable FAQSchema component (`FAQPage` JSON-LD)
- Reusable HowToSchema component (`HowTo` JSON-LD)
- FAQ schema on service/consulting/product pages
- HowTo schema on tutorial-style blog posts
- Author expertise signals in Person schema (sameAs, knowsAbout, hasCredential)
- Question-style `<h2>` headings in blog posts
- Front-loaded answers in first paragraph

### 8. Newsletter Content Engine
- Welcome email delivering lead magnet
- Newsletter archive page (social proof)
- Benefit-driven CTA copy across site

### 9. Conversion Analytics
- `src/utils/analytics.ts` with gtag event helper
- Track: newsletter_signup, work_with_me_click, guide_download, social_follow_click, patreon_click, github_sponsor_click
- GA4 conversion events documented for dashboard setup

### 10. Technical SEO
- 404 page with terminal-themed "command not found"
- robots.txt optimized for blog crawling
- Sitemap includes all new pages (consulting, free-guide, products/*)
- All pages pass Google Rich Results Test

## Acceptance Criteria
- [ ] `npm run build` succeeds
- [ ] `npm run astro -- check` passes (no new errors)
- [ ] Homepage reads as brand-consistent: direct, anti-hype, practical
- [ ] Consulting page renders at `/consulting` with all sections
- [ ] FAQ schema validates on Google Rich Results Test
- [ ] Newsletter signup includes lead magnet offer
- [ ] NowBuilding widget renders on homepage
- [ ] Content clusters have pillar pages with proper internal linking
- [ ] All new pages have unique meta title + description
- [ ] Sitemap includes consulting, free-guide, products pages
- [ ] 404 page renders with terminal theme

## Files to Create
- `src/components/shared/TerminalPrompt.astro`
- `src/components/shared/AsciiDivider.astro`
- `src/components/shared/StatusBar.astro`
- `src/components/shared/FAQSchema.astro`
- `src/components/shared/HowToSchema.astro`
- `src/components/shared/LeadMagnetCTA.astro`
- `src/components/shared/SiloNavigation.astro`
- `src/components/homepage/NowBuilding.astro`
- `src/components/consulting/ConsultingProcess.astro`
- `src/components/consulting/ConsultingPricing.astro`
- `src/components/consulting/ConsultingFAQ.astro`
- `src/components/consulting/ConsultingCaseStudies.astro`
- `src/pages/consulting.astro`
- `src/pages/free-guide.astro`
- `src/pages/404.astro`
- `src/content/build-log/current.json`
- `src/content/lead-magnets/the-indie-dev-stack-2025.md`
- `src/utils/silos.ts`
- `src/utils/analytics.ts`

## Files to Modify
- `src/consts.ts` — brand-aligned copy
- `src/components/homepage/HomeHero.astro`
- `src/components/homepage/HomeAbout.astro`
- `src/components/homepage/HomeCTA.astro`
- `src/components/shared/Header.astro` — add consulting link
- `src/components/shared/newsletter.astro`
- `src/components/shared/NewsletterCtaCard.astro`
- `src/pages/about.astro`
- `src/pages/index.astro` — add NowBuilding section
- `src/pages/blog/index.astro` — silo navigation
- `src/pages/blog/[...slug].astro` — cluster banner
- `src/layouts/BlogPost.astro` — HowTo schema, content upgrades
- `src/layouts/BaseLayout.astro` — StatusBar (optional)
- `src/styles/global.css` — CRT scanlines, terminal styles
- `public/robots.txt`
- `netlify.toml`
