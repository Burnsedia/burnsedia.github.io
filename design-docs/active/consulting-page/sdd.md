# Dedicated Consulting Page

Status: draft
Owner: Bailey Burnsed
Feature ID: CONSULT-001
Last Updated: 2026-07-11
Related Issues: #3

## Context

Currently `/service` is the only offer page — it's a catch-all for all service types. There's no dedicated consulting page that walks visitors through process, pricing, and outcomes. For someone landing from search to evaluate Bailey as a consultant, the path isn't clear. A dedicated consulting page with FAQ schema, process breakdown, and case studies will improve conversion and GEO visibility.

## Goal

Create a standalone `/consulting` page that clearly communicates the consulting offer, process, pricing, and social proof — optimized for both human buyers and AI search engines.

## Non-Goals

- No changes to the existing `/service` page
- No replacement of the unlimited dev service offer
- No booking/payment integration (Calendly link is sufficient)
- No client portal or login system

## Requirements

- R1: Page must have a clear hero section with value proposition and primary CTA
- R2: Process section showing 4-step consulting flow (Discovery → Architecture → Build → Handoff)
- R3: Offer tiers section (Technical Audit, Implementation Sprint, Retainer)
- R4: FAQ section with FAQPage JSON-LD schema markup for GEO
- R5: Case studies section with anonymized client outcomes
- R6: Calendly booking CTA at top and bottom of page
- R7: "Not ready? Join the newsletter" secondary CTA
- R8: BreadcrumbList schema for navigation context

## Acceptance Criteria

- Page renders at /consulting
- FAQ schema validates at Google Rich Results Test
- Calendly link opens in new tab with correct pre-fill parameters
- All sections render correctly on mobile
- npm run build succeeds
- Page appears in sitemap

## Risks And Constraints

- Public pricing limits negotiation flexibility — use range tiers instead of exact prices
- Case studies must be anonymized enough for client confidentiality
- Consulting page competes with /service — need clear differentiation (consulting = strategy/audit, service = implementation)

## Dependencies

- Calendly account (existing)
- FAQSchema component (will be created in GEO task)
- Header.astro (needs nav link added)

## Notes

- Suggested URL: /consulting/
- Offer tiers: Technical Strategy Audit ($2.5k), Implementation Sprint ($5k-15k), Monthly Retainer ($4k/mo)
- FAQ topics: "What does AI consulting include?", "How long does a typical engagement last?", "Do you work with early-stage startups?", "What's your tech stack?", "How is this different from an agency?"
- Process: 1) Discovery Call → 2) Architecture & Scope → 3) Build Sprint → 4) Handoff & Docs
