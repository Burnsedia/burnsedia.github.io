# SEO Technical Pass

Status: draft
Owner: Bailey Burnsed
Feature ID: SEO-002
Last Updated: 2026-07-11
Related Issues: #10

## Context

Technical SEO has a good foundation (sitemap, canonical URLs, robots.txt, structured data) but is missing critical pieces: no custom 404 page, no explicit crawl directives, some pages may be missing from sitemap, and Lighthouse performance has room for improvement.

## Goal

Perform a targeted technical SEO pass to fix gaps: custom 404 page, optimized robots.txt, sitemap completeness, and performance optimizations.

## Non-Goals

- No major restructuring of existing pages
- No content changes or keyword research
- No backlink analysis or off-page SEO work
- No Core Web Vitals deep dive (performance is already good — incremental only)

## Requirements

- R1: Custom 404 page at /404 with terminal-themed "command not found" design
- R2: 404 page must return proper HTTP 404 status code (Astro handles this)
- R3: 404 page must have WebPage structured data so search engines treat it as a valid 404
- R4: robots.txt updated with crawl budget optimization
- R5: Verify sitemap includes /consulting, /free-guide, /newsletter, /about, /service, /tags, /socials
- R6: Add loading="lazy" to below-fold images and proper width/height to prevent CLS
- R7: Verify Content-Security-Policy headers in netlify.toml aren't blocking legitimate resources

## Acceptance Criteria

- /404 page renders with terminal theme and links to homepage, blog, and consulting
- 404 page returns HTTP 404 status (test with curl)
- robots.txt updated with priority crawl directives
- Sitemap includes all user-facing pages
- Images have width/height attributes where missing
- Lighthouse ≥ 90 desktop and mobile
- npm run build succeeds

## Risks And Constraints

- CSP headers are strict — adding new external resources (fonts, scripts) may need CSP updates
- Astro's static output handles 404 via 404.html — verify Netlify serves it correctly

## Dependencies

- TERM-001 (terminal aesthetic for 404 page design)
- netlify.toml (CSP and redirect context)
- Astro static output (404.html convention)

## Notes

- 404 page design: terminal window with "command not found: [url]", suggested commands (go to /, /blog, /consulting)
- robots.txt: keep clean but add # sections for readability; consider User-agent: GPTBot if desired
- Image optimization: use Astro's Image component where possible (already used in HeroLogo)
- Security: CSP currently allows 'unsafe-inline' for scripts/styles — acceptable for static site with inline JS
