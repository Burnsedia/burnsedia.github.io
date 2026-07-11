# GEO Optimization — AI-Friendly Structured Data

Status: draft
Owner: Bailey Burnsed
Feature ID: GEO-001
Last Updated: 2026-07-11
Related Issues: #7

## Context

Generative Engine Optimization (GEO) is the practice of making content discoverable and extractable by AI search engines like ChatGPT, Perplexity, Claude, and Gemini. Traditional SEO (sitemaps, meta tags) doesn't fully address how these tools consume content. FAQ schema, HowTo schema, clear Q&A headings, and front-loaded answers all improve the chances that an AI tool will cite the site as a source.

## Goal

Add structured data and content patterns optimized for AI search engine discovery, making the site a reliable citation source for generative answers.

## Non-Goals

- No changes to existing content meaning (just structure and markup)
- No removal of existing structured data
- No changes to the existing HTML structure beyond adding schema scripts
- No integration with specific AI search APIs

## Requirements

- R1: Reusable FAQSchema component that injects FAQPage JSON-LD
- R2: Reusable HowToSchema component for tutorial/playbook posts
- R3: Consulting page must have FAQ schema with 5-8 high-intent Q&A pairs
- R4: Author expertise signals in Person schema: sameAs expansion, knowsAbout, hasCredential
- R5: Service page FAQ schema (existing service, reorganized as FAQPage type)
- R6: Front-load content answers — put the key answer in the first paragraph of each section
- R7: Use <h2> question headings in blog posts that match FAQ question patterns

## Acceptance Criteria

- FAQPage schema validates on consulting page
- HowTo schema validates on at least 2 tutorial blog posts
- Person schema includes knowsAbout with URI references
- Rich Results Test passes all structured data with no errors
- npm run build succeeds
- Content follows GEO best practices (answer-first paragraphs, Q&A headings)

## Risks And Constraints

- HowTo schema requires clear steps with images or instructions — not suitable for all posts
- Over-schema-marking can trigger manual review flags — only mark appropriate pages
- GEO standards are evolving — review quarterly for changes

## Dependencies

- CONSULT-001 (consulting page hosts the primary FAQ schema)
- src/components/shared/BaseHead.astro (Person schema modification)
- astro.config.mjs (sitemap integration already configured)

## Notes

- knowsAbout values: https://schema.org/SoftwareDevelopment, https://schema.org/ArtificialIntelligence, https://schema.org/CloudComputing
- FAQ topics for consulting: pricing, timeline, process, outcomes, tech stack, client types
- Blog posts suitable for HowTo: "ai-agents-for-solo-teams-playbook", "self-hosting-playbook-for-small-saas", "indie-saas-growth-playbook"
- Reference: Google's structured data documentation, GEO best practices from Search Engine Land
