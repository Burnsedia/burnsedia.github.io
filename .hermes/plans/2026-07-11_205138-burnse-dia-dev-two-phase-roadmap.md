# burnsedia.dev — Two-Phase Automated Portfolio Plan

> **For Hermes:** Use subagent-driven-development to implement task-by-task.

**Goal:** Build burnsedia.dev as a fully automated AI-driven site that generates SEO/GEO-optimized pages from GitHub data. Phase 1 is a learning sandbox for AI site automation. Phase 2 transitions it to the canonical business site once the legal entity is formed — with existing rankings and authority already built.

**Architecture:** Astro static site on Netlify. Data pulled from GitHub API at build time. Webhook triggers rebuild on push. All pages get auto-injected structured data. No manual content management.

**Tech Stack:** Astro 5, Tailwind v4 + DaisyUI, GitHub API (unauthenticated), Netlify build hooks, JSON-LD structured data generation

---

## Why Two Phases

**Phase 1 goal:** Learn how to build AI-automated content pipelines. The site is the artifact, the learning is the point.

**Phase 2 goal:** Launch an already-ranking business site. No cold start — the domain has pages, structured data, and search authority from Phase 1.

Both phases use the same codebase, same infra, same automation. The only difference is the data source and the copy.

---

## Phase 1: Learning Lab (Now)

Primary goal is learning. The technical output is a working automated site, but the real output is understanding:
- How to pull data from the GitHub API at Astro build time
- How to generate pages programmatically from dynamic data (getStaticPaths)
- How to auto-inject JSON-LD structured data for SEO/GEO
- How to set up webhook-driven rebuild pipelines (GitHub → Netlify)
- How AI can be used to generate content, metadata, and schema from raw data

### What generates pages

Every non-fork, non-archived repo under Burnsedia (personal account) gets:
- A dedicated page at /[repo-name]/ with README, stats, and structured data
- Auto-generated meta title + description from repo description
- BreadcrumbList schema
- WebPage schema
- FAQPage schema if README has Q&A patterns
- Sponsorware badge if repo has funding links

### Aggregated views

- / — dashboard showing all repos with stats
- /releases/ — every release across all repos, newest first
- /games/ — repos tagged as games
- /apps/ — non-game repos
- /sponsorware/ — repos with funding links

### Learning milestones

1. GitHub API data fetching at build time (src/lib/github.ts)
2. Dynamic route generation (src/pages/[...repo].astro)
3. README rendering as markdown content
4. Auto-generated SEO metadata from repo data
5. JSON-LD schema injection per page
6. Webhook setup (GitHub → Netlify)
7. Filtered view pages (games, apps, sponsorware)
8. Release aggregation from all repos

---

## Phase 2: Business Site (When Legally Formed)

### What changes from Phase 1

| Aspect | Phase 1 | Phase 2 |
|--------|---------|---------|
| Data source | Personal GitHub account | Burnsedia GitHub org |
| Pages | All repos automatically | Curated products + services |
| Copy | Generated from README | Intentional, written |
| Purpose | Learning sandbox | Business storefront |
| SEO authority | Building up | Already warm |

### What stays the same

- Codebase, theme, layout, component structure
- Automation pipeline (webhook → rebuild → deploy)
- All structured data generation
- Sitemap, canonical URLs, meta tag generation
- Netlify hosting infrastructure

### Migration steps

1. Create Burnsedia GitHub org
2. Move repos under org (or create new ones there)
3. Update data source in github.ts from users/Burnsedia to orgs/Burnsedia
4. Update site copy from learning/experimental tone to business tone
5. Optionally redirect burnsedia.dev subpaths to specific product pages
6. Keep baileyburnsed.dev as personal blog pointing people to the business

---

## Files to Create

### Core infrastructure
- `src/lib/github.ts` — GitHub API utilities (fetchRepos, fetchReleases, fetchProfile)
- `src/utils/seo.ts` — structured data generation helpers

### Pages (auto-generated routes)
- `src/pages/index.astro` — dashboard homepage
- `src/pages/repos/[...repo].astro` — per-repo page with dynamic route
- `src/pages/releases.astro` — aggregated release changelog
- `src/pages/games.astro` — filtered game repos
- `src/pages/apps.astro` — filtered app/tool repos
- `src/pages/sponsorware.astro` — funded/sponsorware repos
- `src/pages/about.astro` — generated from GitHub profile

### Components
- `src/components/GitHubCard.astro` — repo card
- `src/components/GitHubStats.astro` — stats bar
- `src/components/ReleaseItem.astro` — release entry

### Config
- Update `astro.config.mjs` if needed (static output is fine)
- `netlify.toml` — build hook settings
- GitHub webhook → Netlify build hook

---

## Verification

### Phase 1
- [ ] npm run build pulls real data from GitHub API
- [ ] Dashboard shows repos with accurate stats
- [ ] Each repo has a page at /[repo-name]/
- [ ] Releases page shows all releases
- [ ] Games/apps filtering works
- [ ] Sponsorware page shows funded repos
- [ ] All pages have unique meta title + description
- [ ] All pages have BreadcrumbList + WebPage schema
- [ ] Google Rich Results Test passes
- [ ] Sitemap includes all generated pages
- [ ] Webhook rebuilds site on GitHub push
- [ ] The learning is documented (what worked, what didn't)

### Phase 2 (when ready)
- [ ] Data source switched to Burnsedia org
- [ ] Business tone replaces experimental copy
- [ ] Product pages intentional, not auto-generated
- [ ] Domain still has existing search rankings
- [ ] Redirects in place if needed
