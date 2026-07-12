# Fix Broken Stats Section

Status: draft
Owner: Bailey Burnsed
Feature ID: DESIGN-002
Last Updated: 2026-07-11
Related Issues: #2

## Context

The "Building in public" stats section has two issues: 1) Some stat values are ambiguous ("Client projects shipped: 100%" — 100% of what?) which undermines the transparency that "building in public" promises. 2) There are 6 empty article wrappers in the DOM that were likely placeholder cards never filled in.

## Goal

Replace ambiguous stats with specific, verifiable milestones that link to public proof points (GitHub repos, blog posts, subscriber counts). Remove empty DOM elements.

## Non-Goals

- No changes to the stats animation JS (it works fine)
- No changes to the section's visual design (layout, colors, spacing stay)
- No removal of the section itself (it's a good brand signal)

## Requirements

- R1: Each stat should reference a public artifact that proves it (GitHub link, blog post count, subscriber number)
- R2: Zero empty DOM elements in the section
- R3: Stats animation must still work after data changes
- R4: Ambiguous values (percentages without context, unverifiable claims) should be made specific

## Acceptance Criteria

- No empty article elements in the "Building in public" section
- Each stat references a public artifact or is self-evidently verifiable
- npm run build succeeds

## Notes

- Suggested replacements: "15+ years coding", "18 blog posts", "150+ GitHub stars", "PyATL co-organizer since 2023", "Weekly newsletter", "12+ apps and tools built"
- Remove the 6 empty `<article>` elements entirely
- Remove the "* MVP speed reflects typical time..." disclaimer footnote — it undermines confidence