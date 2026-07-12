# Automated Portfolio — burnsedia.dev

Status: draft
Owner: Bailey Burnsed
Feature ID: AUTO-001
Last Updated: 2026-07-11
Related Issues: None

## Context

burnsedia.dev is a learning sandbox for exploring AI-powered automated site creation. The point is not to build a canonical portfolio or business site — it's to learn how to build systems that generate SEO/GEO-optimized pages automatically from source data. The site is the artifact, but the learning is the point. This lives alongside baileyburnsed.dev, which remains the primary site.

## Goal

As a learning exercise, create a fully automated Astro static site on Netlify at burnsedia.dev that generates SEO/GEO-optimized pages from GitHub API data. Every repo, release, and sponsorware project gets its own discoverable page. The site rebuilds automatically via webhook whenever GitHub activity happens.

## Non-Goals

- No manual content management or CMS
- No blog or newsletter on this domain (those stay on baileyburnsed.dev)
- No VPS dependency (Netlify static)
- No real-time features (build-time generation only)
- No user accounts or auth

## Architecture

```
GitHub Push → Webhook → Netlify Build Hook → Astro Build
                                                │
                                        Astro fetches:
                                        ├── repos (name, desc, stars, lang, pushed_at)
                                        ├── releases (tag, notes, date)
                                        ├── profile (bio, avatar, links)
                                        │
                                        Generates:
                                        ├── / (dashboard)
                                        ├── /[repo]/ (per-project page)
                                        ├── /releases/ (changelog)
                                        ├── /games/ (filtered)
                                        ├── /apps/ (filtered)
                                        └── /sponsorware/ (funded projects)
                                        │
                                        Injects per page:
                                        ├── Unique meta title/description
                                        ├── BreadcrumbList schema
                                        ├── WebPage schema
                                        ├── FAQPage schema (from README Q&A)
                                        └── ItemList schema (aggregate pages)
                                        │
                                        Outputs static HTML → Netlify CDN
```

## Requirements

- R1: Homepage must show a dashboard of all repos with live stats
- R2: Each non-fork, non-archived repo gets its own page at /[repo-name]
- R3: Releases page must aggregate all releases across all repos
- R4: Games and apps must be filterable views based on repo patterns
- R5: Sponsorware page must show repos with funding/sponsor links
- R6: All pages must have unique, auto-generated SEO metadata
- R7: All pages must have auto-injected JSON-LD structured data
- R8: Netlify build hook must trigger on GitHub push to rebuild
- R9: Site must link to baileyburnsed.dev for personal blog content

## Acceptance Criteria

- Site deploys at burnsedia.dev
- Homepage shows repo dashboard with counts and stats
- Every Burnsedia repo has a page with README, stats, and structured data
- Releases page shows every release across all repos
- Push to any repo triggers rebuild (tested)
- All pages pass Google Rich Results Test for schema
- Sitemap includes all generated pages
- No manual content editing required for site to stay current
- npm run build succeeds
- All generated pages have unique meta title + description

## Risks And Constraints

- GitHub API rate limit: 60 req/hr unauthenticated. Build may fail if multiple repos with many releases. Mitigation: cache API responses within the build process, or use a token for 5,000 req/hr
- Repo names with special characters may need slug normalization for URLs
- README parsing for FAQ generation is heuristic — may miss or misparse
- Build time scales with number of repos. Mitigation: limit to repos sorted by push date, skip stale ones if needed

## Dependencies

- burnsedia.dev domain (DNS pointed to Netlify)
- Netlify site + build hook configured
- GitHub webhook configured per repo (or org-level webhook)
- The same Astro theme/Tailwind config as baileyburnsed.dev (shared CSS)

## Notes

- Theme should match the darksynthwave palette for brand consistency
- Repo pages render README as markdown (use Astro's markdown rendering)
- Filter games by checking for "game" in repo topics or name prefix "game-"
- Filter sponsorware by checking for FUNDING.yml or github_sponsors link in repo
- Future: add repo topics/tags as filters on the dashboard