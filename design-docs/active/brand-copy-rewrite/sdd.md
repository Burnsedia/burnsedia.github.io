# Brand Copy Rewrite

Status: draft
Owner: Bailey Burnsed
Feature ID: BRAND-001
Last Updated: 2026-07-11
Related Issues: #2

## Context

The `business/brand.md` and `business/message.md` documents define a clear brand identity — "autistic hacker-builder", "practical systems", "anti-hype", "build in public" — but the actual site copy doesn't fully reflect it. The homepage hero says "I build shit that works" which is good, but the meta descriptions, About page, and CTAs use generic language that doesn't communicate the unique brand positioning.

## Goal

Rewrite all page copy across the site to consistently reflect the brand playbook — every page should sound like it comes from Bailey Burnsed, not a generic developer portfolio.

## Non-Goals

- No layout or structural changes to any page
- No changes to components beyond their text content
- No changes to blog post content (those will be addressed in content silos task)
- No new pages (consulting page is separate task)

## Requirements

- R1: Homepage hero subhead must include "autistic hacker-builder" or equivalent brand phrase
- R2: SITE_DESCRIPTION and SITE_META_DESCRIPTION in consts.ts must be brand-aligned
- R3: Every page's meta description must be unique and keyword-optimized
- R4: About page must explicitly frame autistic traits as business strengths
- R5: HomeAbout section must include the "building in public" and "autistic entrepreneur" identity
- R6: HomeCTA must use the brand's direct, anti-hype voice
- R7: All page descriptions must include primary keywords for SEO

## Acceptance Criteria

- consts.ts updated with brand-aligned constants
- HomeHero subhead includes brand identity markers
- HomeAbout references autistic entrepreneur identity
- HomeCTA uses anti-hype brand voice
- About page explicitly connects autistic traits to business value
- All 14 pages have unique, keyword-rich meta descriptions
- npm run build succeeds
- Brand voice is consistent — someone should be able to identify it as "Bailey's writing"

## Risks And Constraints

- Brand voice shift needs to feel authentic, not performative
- SEO keywords must not compromise voice authenticity
- Existing visitors may notice the tone shift — ensure the core "I build shit that works" remains

## Dependencies

- src/consts.ts (source of truth for meta constants)
- Business/brand.md (brand voice guide)
- Business/message.md (manifesto)

## Notes

- Key phrases to weave in: "autistic entrepreneur", "hacker-builder", "practical systems", "building in public", "no hype", "shipped"
- Homepage is the most important page — get that right first
- About page is the second most important — that's where the autistic entrepreneur story lives
