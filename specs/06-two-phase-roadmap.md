# Two-Phase Automated Portfolio Roadmap Specification

## Objective
Build burnsedia.dev in two phases: Phase 1 as a learning sandbox for AI-powered site automation, Phase 2 as the canonical business site with pre-built search authority.

## Why Two Phases

**Phase 1 goal:** Learn how to build AI-automated content pipelines. The site is the artifact, the learning is the point.

**Phase 2 goal:** Launch an already-ranking business site. No cold start — the domain has pages, structured data, and search authority from Phase 1.

Both phases use the same codebase, same infra, same automation.

## Phase 1: Learning Lab

### Learning Milestones
1. GitHub API data fetching at Astro build time
2. Dynamic route generation via `getStaticPaths`
3. Auto-injected JSON-LD structured data for SEO/GEO
4. Webhook-driven rebuild pipeline (GitHub → Netlify)
5. AI-generated content, metadata, and schema from raw data
6. Filtered view pages (games, apps, sponsorware)
7. Release aggregation from all repos

### What Generates Pages
Every non-fork, non-archived repo under Burnsedia (personal GitHub account) gets:
- Dedicated page at `/[repo-name]/` with README, stats, structured data
- Auto-generated meta title + description from repo description
- BreadcrumbList + WebPage schema
- FAQPage schema if README has Q&A patterns
- Sponsorware badge if funding links detected

### Aggregated Views
- `/` — dashboard with all repos and stats
- `/releases/` — all releases, newest first
- `/games/` — repos tagged as games
- `/apps/` — non-game repos
- `/sponsorware/` — repos with funding links
- `/about/` — from GitHub profile

### Technical Stack
- Domain: burnsedia.dev
- Framework: Astro 5 (same as baileyburnsed.dev)
- UI: Tailwind v4 + DaisyUI, darksynthwave theme
- Data: GitHub API (unauthenticated, build-time)
- Host: Netlify (static output)
- Rebuild trigger: GitHub webhook → Netlify build hook

## Phase 2: Business Site

### When to Activate
- Legal entity (LLC/corp) is formed
- Ready to accept business under Burnsedia entity
- Existing search authority needs a business storefront

### What Changes from Phase 1
| Aspect | Phase 1 | Phase 2 |
|--------|---------|---------|
| Data source | Personal GitHub account | Burnsedia GitHub org |
| Pages | All repos automatically | Curated products + services |
| Copy | Generated from README | Intentional, written |
| Purpose | Learning sandbox | Business storefront |
| SEO authority | Building up | Already warm |

### What Stays the Same
- Codebase, theme, layout, component structure
- Automation pipeline (webhook → rebuild → deploy)
- All structured data generation
- Sitemap, canonical URLs, meta tag generation
- Netlify hosting

### Migration Steps
1. Create Burnsedia GitHub org
2. Move repos under org (or create new ones)
3. Update data source in github.ts from `users/Burnsedia` to `orgs/Burnsedia`
4. Update site copy from experimental tone to business tone
5. Optionally redirect burnsedia.dev subpaths to specific product pages
6. Keep baileyburnsed.dev as personal blog pointing to the business

## Domain Strategy
```
burnsedia.dev           ─── Automated portfolio (Phase 1) → Business site (Phase 2)
baileyburnsed.dev       ─── Personal blog, hand-written content, newsletter
                          └── Links to burnsedia.dev for automated content
```

## Acceptance Criteria

### Phase 1
- [ ] `npm run build` pulls real data from GitHub API at build time
- [ ] Dashboard shows repos with accurate stats
- [ ] Each repo has a page at `/[repo-name]/`
- [ ] Releases page shows all releases
- [ ] Games/apps filtering works correctly
- [ ] Sponsorware page shows funded repos
- [ ] All pages have unique meta title + description
- [ ] All pages have BreadcrumbList + WebPage schema
- [ ] Google Rich Results Test passes
- [ ] Sitemap includes all generated pages
- [ ] Webhook rebuilds site on GitHub push
- [ ] Learning is documented (what worked, what didn't)

### Phase 2 Readiness
- [ ] Data source switched to Burnsedia org
- [ ] Business tone replaces experimental copy
- [ ] Product pages are intentional, curated
- [ ] Domain retains existing search rankings
- [ ] Redirects in place if needed
- [ ] baileyburnsed.dev links to burnsedia.dev

## Files to Create
### Core
- `src/lib/github.ts` — GitHub API utilities
- `src/utils/seo.ts` — structured data generation helpers

### Pages
- `src/pages/index.astro` — dashboard
- `src/pages/repos/[...repo].astro` — per-repo route
- `src/pages/releases.astro`
- `src/pages/games.astro`
- `src/pages/apps.astro`
- `src/pages/sponsorware.astro`
- `src/pages/about.astro`

### Components
- `src/components/GitHubCard.astro`
- `src/components/GitHubStats.astro`
- `src/components/ReleaseItem.astro`

### Config
- `netlify.toml` — build hook settings
- GitHub webhook → Netlify build hook setup

## Risk Register
| Risk | Phase | Impact | Mitigation |
|------|-------|--------|------------|
| Low-quality auto-generated content | 1 | Poor SEO, credibility hit | Quality filter: skip repos without READMEs |
| API changes break builds | 1-2 | Site doesn't deploy | Version-lock GitHub API calls |
| Phase 2 never executed | 1 | Learning still valuable | Document migration path regardless |
| Domain confusion with baileyburnsed.dev | 1-2 | Split authority | Clear role separation in nav/footer |
