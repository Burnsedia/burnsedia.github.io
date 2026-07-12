# Product Hub Page

Status: draft
Owner: Bailey Burnsed
Feature ID: CONV-001
Last Updated: 2026-07-11
Related Issues: #3

## Context

The site currently has no unified product catalog. Revenue streams exist (Unlimited Dev Service, boomerbill, OpenClaw, games, skills, membership) but there's no single page where a visitor can see everything available and choose what fits. This means visitors have to navigate multiple pages to understand the full offering.

## Goal

Create a `/products/` hub page that lists every revenue stream with clear descriptions, pricing, and CTAs — serving as the main conversion landing page.

## Non-Goals

- No individual product page creation here (those are separate tasks)
- No backend or payment processing on this page (links to Stripe, Gumroad, etc.)
- No changes to existing pages

## Requirements

- R1: Page must have sections for each revenue type (services, SaaS, API, games, skills)
- R2: Each product card must show title, 1-line description, price, and type badge
- R3: Cards must link to individual product pages or external buy links
- R4: "Coming soon" or "Waitlist" badges for products not yet available
- R5: Bottom CTA: "Not sure? Book a 15-minute call"
- R6: Page must have unique meta title and description for SEO
- R7: BreadcrumbList schema

## Acceptance Criteria

- Page renders at /products/
- All cards have working links
- Grid layout is responsive (3 cols desktop, 2 tablet, 1 mobile)
- npm run build succeeds

## Notes

- ProductCard component should be reusable for other pages
- Categories: Productized Services, SaaS & API Services, Games & Digital Skills
- Products listed: Unlimited Dev, OpenClaw, Hermes Mgmt, boomerbill, BulkPost, API, MCP, 32bit-Spacer, Indie Dev Stack guide
