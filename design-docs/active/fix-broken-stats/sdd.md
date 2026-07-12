# Fix Broken Stats Section

Status: draft
Owner: Bailey Burnsed
Feature ID: DESIGN-002
Last Updated: 2026-07-11
Related Issues: #2

## Context

The "Building in public" stats section has two problems: 1) The stat values aren't credible ("Client projects shipped: 100%", "Public repos maintained: 95+") and invite skepticism. 2) There are 6 empty article wrappers visible in the DOM that contain no content — likely placeholder cards that were never filled in.

## Goal

Replace unconvincing stats with real, verifiable metrics and remove empty/broken elements.

## Non-Goals

- No changes to the stats animation JS (it works fine)
- No changes to the section's visual design (layout, colors, spacing stay)
- No removal of the section itself (it's a good brand signal)

## Requirements

- R1: All stat values must be real and verifiable (or use text like "Growing weekly")
- R2: Zero empty DOM elements in the section
- R3: Stats animation must still work after data changes
- R4: Remove or reduce the disclaimer footnote about MVP speed

## Acceptance Criteria

- No empty article elements in the "Building in public" section
- Stats are verifiable (years coding, blog posts, GitHub stars, subscribers)
- npm run build succeeds

## Notes

- Suggested replacements: "15+ years coding", "18 blog posts", "150+ GitHub stars", "PyATL co-organizer since 2023", "Weekly newsletter", "12+ apps and tools built"
- Remove the 6 empty `<article>` elements entirely
- Remove the "* MVP speed reflects typical time..." disclaimer footnote — it undermines credibility
