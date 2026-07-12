# FAQ Schema for GEO

Status: draft
Owner: Bailey Burnsed
Feature ID: SEO-001
Last Updated: 2026-07-11
Related Issues: #5

## Context

Generative Engine Optimization (GEO) requires structured data that AI search engines can parse. FAQPage schema is one of the highest-impact schemas — when an AI like ChatGPT or Perplexity answers a user's question, it can pull directly from FAQPage marked content. Currently no FAQ schema exists on the site.

## Goal

Add FAQPage JSON-LD schema to service and product pages so AI search engines can cite them in generative answers.

## Non-Goals

- No changes to existing content (Q&A pairs are additive)
- No removal of existing schemas
- No FAQ schema on blog posts (those get HowTo or Article schema)

## Requirements

- R1: Create reusable FAQSchema component
- R2: Service page must have 5-8 FAQPage entries
- R3: Product pages (when created) must have 4-6 FAQPage entries each
- R4: FAQ questions must match real search queries users would type
- R5: FAQ answers must be self-contained (don't reference other answers)

## Acceptance Criteria

- FAQSchema component exists at src/components/shared/FAQSchema.astro
- Service page has FAQPage schema that validates at Google Rich Results Test
- FAQPage schema appears in the page source
- npm run build succeeds

## Notes

- FAQ topics for service page: what's included, how is it different from agency, cancellation, tech stack, client types, pricing
- Component should render nothing if items array is empty (YAGNI)
- Use JSON.stringify for schema output
