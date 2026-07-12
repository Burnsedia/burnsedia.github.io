# Content Silos & Internal Linking

Status: draft
Owner: Bailey Burnsed
Feature ID: SEO-003
Last Updated: 2026-07-11
Related Issues: #7

## Context

The SEO cannibalization map (docs/seo-phase-1-cannibalization-map.md) defines 4 content clusters (AI Agents, Indie SaaS, Self-Hosting, Build in Public) with pillar posts and supporting posts. Currently posts within the same cluster don't link to each other, dispersing topical authority. No cluster navigation exists on the blog.

## Goal

Organize blog content into topical clusters with strong internal linking from supporting posts to pillar pages, improving topical authority signals for search engines.

## Non-Goals

- No changes to blog post content beyond adding links
- No deletion or consolidation of existing posts
- No changes to URL structure or redirects

## Requirements

- R1: Define 4 content clusters with pillar and supporting post mappings
- R2: Add contextual in-body links from supporting posts to their pillar post
- R3: Add "Part of the [Cluster Name] series" banner on supporting posts
- R4: Create cluster utility in src/utils/silos.ts
- R5: Blog index page shows cluster navigation above post list

## Acceptance Criteria

- All supporting posts have a contextual link to their pillar post
- Cluster banner renders on supporting posts
- Blog index shows cluster sections
- npm run build succeeds

## Notes

- Clusters: AI Agents (3 posts), Indie SaaS (5 posts), Self-Hosting (6 posts), Build in Public (3 posts)
- Link placement in first third of post body
- Use getCollection in blog index to compute cluster membership
