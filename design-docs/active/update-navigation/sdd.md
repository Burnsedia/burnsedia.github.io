# Update Navigation

Status: draft
Owner: Bailey Burnsed
Feature ID: DESIGN-003
Last Updated: 2026-07-11
Related Issues: #10

## Context

The current nav has 6 items: Home (logo), Build Log, Newsletter, Socials, Legal, Work With Me. With the new pages (Products, Membership), the nav needs to be restructured to support the expanded site without becoming overwhelming. Newsletter and Legal don't need top-nav placement (they're linked from footer and blog).

## Goal

Restructure the main navigation to 5 items that prioritize products and membership while keeping build-in-public identity.

## Non-Goals

- No changes to the mobile hamburger menu structure
- No changes to the logo or branding in the nav
- No removal of links from footer

## Requirements

- R1: Nav must have Products, Blog, Membership, Socials links
- R2: Remove standalone Newsletter from top nav (linked from blog/footer)
- R3: Remove Legal from top nav (it's in footer)
- R4: Keep "Work With Me" CTA button (rename to "Products" or keep as secondary CTA)
- R5: Mobile hamburger must include all nav items
- R6: All existing data-track attributes must be preserved

## Acceptance Criteria

- Nav shows: [Logo] [Products] [Build Log] [Membership] [Socials]
- Mobile hamburger shows all items
- Newsletter and Legal only in footer (still reachable)
- npm run build succeeds

## Notes

- "Work With Me" button could stay if there's room, or become a "Products" CTA button
- Footer Site column gets Products and Membership added
- Newsletter signup is still prominent on blog pages and homepage sections
