# Automated Portfolio Site (burnsedia.dev) Specification

## Objective
Build a fully automated JAMStack portfolio site at burnsedia.dev that generates SEO/GEO-optimized pages from GitHub data. Every repo, release, and push becomes discoverable content — no manual editing required.

## North Star
Pushing a new repo to GitHub automatically creates a new SEO-optimized landing page on burnsedia.dev without touching the site or writing any content.

## Architecture
- Astro static site on Netlify
- GitHub webhooks trigger Netlify rebuilds
- Build-time data fetch from GitHub API
- Pages generated programmatically via `getStaticPaths`
- All pages get auto-injected JSON-LD structured data
- No CMS, no manual content

```
GitHub Activity ──> Webhook ──> Netlify Rebuild ──> Astro Build ──> Static Site
(Burnsedia repos)   (push event)                     │
                                                     ├── Pull repos + metadata from GitHub API
                                                     ├── Generate pages per repo
                                                     ├── Inject SEO/GEO structured data
                                                     └── Deploy to Netlify CDN
```

## Requirements

### 1. GitHub Data Layer (`src/lib/github.ts`)
- `fetchRepos()` — all non-fork, non-archived repos, sorted by pushed date
- `fetchReleases()` — all releases across all repos, sorted by date
- `fetchProfile()` — GitHub user profile (bio, avatar, links)
- All calls use unauthenticated GitHub API
- Error handling: return empty array on failure (site still builds)

### 2. Auto-Generated Pages

**Homepage (`/`) — Dashboard**
- Grid of active repos with cards
- Stats: total repos, stars, forks, releases
- "Currently building" widget (from Live Build Status spec)
- All data from GitHub API at build time

**Per-Repo Pages (`/[repo]/`)**
- Generated for every non-fork, non-archived repo
- Repo name + description (from README or repo metadata)
- Stats: stars, forks, last push date, language
- README rendered as markdown content
- Latest release notes
- Link to GitHub
- Sponsorware badge if funding links detected
- Auto-generated: FAQPage schema, BreadcrumbList, meta title/description

**Releases Page (`/releases/`)**
- Every release across all repos, newest first
- Filterable by repo name
- Each entry: repo name, version, release notes, date
- ItemList schema

**Filtered Views**
- `/games/` — repos tagged as games (name contains "game" or `game-*` pattern)
- `/apps/` — non-game, non-fork repos
- `/sponsorware/` — repos with FUNDING.yml or sponsor links

**About Page (`/about/`)**
- Generated from GitHub profile bio + README
- Links to baileyburnsed.dev (personal blog)
- Links to Patreon, GitHub Sponsors

### 3. SEO/GEO Automation
Every generated page gets:
- Unique meta title + description (from repo data)
- BreadcrumbList schema
- WebPage schema
- FAQPage schema (for repos with Q&A in README)
- ItemList schema (aggregated pages)
- Open Graph + Twitter card tags
- Canonical URLs
- Sitemap inclusion

### 4. Automation Pipeline
- GitHub webhook: on push to any Burnsedia repo
- Webhook target: Netlify build hook URL
- Build triggers: full Astro build with fresh GitHub API data
- Deploy: Netlify CDN

### 5. Relation to baileyburnsed.dev
| Feature | burnsedia.dev | baileyburnsed.dev |
|---------|--------------|-------------------|
| Content | Auto-generated from GitHub | Hand-written blog posts |
| Blog | Release notes / changelog | Build log, opinions |
| Voice | Generated / factual | "I build shit that works" |
| Updates | Webhook → auto-rebuild | Manual write + deploy |

## Acceptance Criteria
- [ ] `npm run build` succeeds with live data from GitHub API
- [ ] Homepage shows dashboard with repos and stats
- [ ] Each non-fork repo has its own page at `/[repo-name]/`
- [ ] Releases page shows all releases chronologically
- [ ] Games page shows only game-related repos
- [ ] Apps page shows only app/tool repos
- [ ] Sponsorware page shows repos with funding links
- [ ] All pages have unique meta title + description
- [ ] All pages have BreadcrumbList + WebPage schema
- [ ] FAQPage schema generated for repos with Q&A READMEs
- [ ] Sitemap includes all generated pages
- [ ] Google Rich Results Test passes on sample pages
- [ ] Webhook rebuilds site on GitHub push
- [ ] Links to baileyburnsed.dev for personal blog content

## Files to Create
- `src/lib/github.ts` — GitHub API utilities
- `src/utils/seo.ts` — structured data generation helpers
- `src/pages/index.astro` — dashboard homepage
- `src/pages/repos/[...repo].astro` — per-repo route (catch-all)
- `src/pages/releases.astro` — release changelog
- `src/pages/games.astro` — game projects filter
- `src/pages/apps.astro` — app/tool projects filter
- `src/pages/sponsorware.astro` — sponsorware projects
- `src/pages/about.astro` — generated from GitHub profile
- `src/components/GitHubCard.astro` — repo card component
- `src/components/GitHubStats.astro` — stats dashboard
- `src/components/ReleaseItem.astro` — release entry component

## Files to Reuse
- Theme/global.css (darksynthwave) from baileyburnsed.dev
- BaseHead.astro (schema generation, adapted for dynamic data)
- Layout components

## Risk Register
| Risk | Impact | Mitigation |
|------|--------|------------|
| GitHub API rate limit at build time | Build fails or returns stale data | Unauthenticated: 60 req/hr, one build <10 req. Add caching if needed |
| README contains broken markdown | Page renders poorly | Use Astro markdown renderer with error boundary |
| Webhook spam (many pushes) | Excessive rebuilds | Netlify has built-in deploy limiting |
| Repo renamed or deleted | Broken page / 404 | 404 page handling; sitemap auto-regenerates |
