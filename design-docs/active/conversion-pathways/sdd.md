# Conversion Pathway Polish

Status: draft
Owner: Bailey Burnsed
Feature ID: CONV-005
Last Updated: 2026-07-11
Related Issues: #12

## Context

The current CTA structure is repetitive — "Work With Me" appears everywhere but leads to the same service page regardless of context. There's no path from a blog post about AI agents to the OpenClaw product page. Visitors should be able to go from any page to a relevant product or purchase in ≤ 3 clicks.

## Goal

Add contextual purchase pathways so every page has a clear next action that matches the visitor's current context.

## Non-Goals

- No changes to blog post content
- No popups, modals, or intrusive CTAs
- No changes to existing CTA tracking attributes

## Requirements

- R1: Homepage CTA must lead to /products/ hub, not just /service/
- R2: Blog post end-card CTAs should be context-aware (related product)
- R3: Blog index should have subtle product tag associations
- R4: Every page must have a clear "next action" — no dead ends
- R5: ≤ 3 clicks from any page → purchase page

## Acceptance Criteria

- HomeCTA links to /products/ as primary option
- Blog posts about AI topics link to OpenClaw
- Blog posts about dev workflow link to Unlimited Dev Service or skills
- No page ends without a relevant CTA
- npm run build succeeds

## Notes

- Map blog topics to products: AI→OpenClaw, self-hosting→Dev Service, indie dev→Dev Service, tools→skills
- Use conditional logic in blog layout to show relevant CTAs based on post tags
- This is additive — existing CTAs stay, new contextual ones are added alongside
