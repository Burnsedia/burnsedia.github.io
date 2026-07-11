# Content Silos for SEO

Status: draft
Owner: Bailey Burnsed
Feature ID: SEO-001
Last Updated: 2026-07-11
Related Issues: #6

## Context

The SEO cannibalization map at docs/seo-phase-1-cannibalization-map.md identifies 4 content clusters (AI Agents, Indie SaaS, Self-Hosting, Build in Public) with pillar posts and supporting posts. Currently the blog lists posts chronologically with no cluster organization. Posts in the same cluster don't link to each other, dispersing topical authority.

## Goal

Organize blog content into topical clusters with strong internal linking from supporting posts to pillar pages, improving topical authority signals for search engines.

## Non-Goals

- No changes to blog post content beyond adding internal links
- No deletion or consolidation of existing posts
- No changes to URL structure or redirects
- No changes to the existing tag system

## Requirements

- R1: Define 4 content clusters with pillar and supporting post mappings
- R2: Add contextual in-body links from supporting posts to their pillar post
- R3: Add "Part of the [Cluster Name] series" banner on supporting posts
- R4: Blog index page shows cluster navigation above the post list
- R5: Create ClusterNavigation component for blog sidebar/banner
- R6: No orphaned content — every post belongs to at least one cluster

## Acceptance Criteria

- All supporting blog posts have a contextual link to their pillar post
- Blog index shows 4 cluster sections with post counts
- Cluster navigation component renders on blog index and individual posts
- Pillar posts link to supporting posts in their content
- npm run build succeeds
- Internal link graph shows each cluster member pointing to its pillar

## Risks And Constraints

- Adding links to existing markdown files requires editing each post — 18 files total
- Some posts may naturally fit multiple clusters — pick one primary cluster to avoid dilution
- Over-linking can look spammy — limit to 1-2 contextual links per post

## Dependencies

- docs/seo-phase-1-cannibalization-map.md (cluster definitions)
- src/pages/blog/[...slug].astro (needs cluster banner)
- src/pages/blog/index.astro (needs cluster navigation)
- All existing blog posts (need internal links)

## Notes

- Clusters: AI Agents (3 posts), Indie SaaS (5 posts), Self-Hosting (6 posts), Build in Public (3 posts)
- Use getCollection in blog index to compute cluster membership from tag data
- Cluster mapping belongs in a utility file (src/utils/silos.ts)
- Link placement: ideally in the first third of the post body (after intro, before code/detail)
