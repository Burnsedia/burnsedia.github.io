# burnsedia.dev — Automated Portfolio Site

> For Hermes: Use subagent-driven-development to implement task-by-task.

**Goal:** Build a fully automated JAMStack portfolio at burnsedia.dev that generates SEO/GEO-optimized pages from GitHub data. Every repo, release, star, and sponsorware push becomes discoverable content — no manual editing required.

**Architecture:** Astro static site on Netlify. GitHub webhooks trigger rebuilds. At build time, the site pulls from GitHub's API to generate product pages, project pages, release notes, and a live dashboard. All pages have auto-generated structured data for SEO/GEO.

**Tech Stack:** Astro 5, Tailwind v4 + DaisyUI, GitHub API (unauthenticated for public data), Netlify build hooks, JSON-LD structured data generator

---

## How It Works

```
GitHub Activity ──> Webhook ──> Netlify Rebuild ──> Astro Build ──> Static Site
(Burnsedia repos)   (push event)                     │
                                                     ├── Pull repos + metadata from GitHub API
                                                     ├── Generate pages per repo
                                                     ├── Inject SEO/GEO structured data
                                                     └── Deploy to Netlify CDN
```

No CMS. No manual content. The site generates itself from what you ship.

---

## Pages Generated Automatically

### / — Home Dashboard
- Grid of pinned repos / most active repos
- Live stats: total repos, stars, forks, releases, sponsorware projects
- "Currently building" pulled from most recently pushed repo (same widget from DASH-002)
- All data from GitHub API at build time

### /[repo] — Per-Project Page (Automated)
Generated for every non-fork, non-archived repo:
- Repo name + description from README
- Stats: stars, forks, last push, language
- README rendered as content
- Latest release notes
- Link to GitHub
- Auto-generated FAQPage schema from README content
- Auto-generated BreadcrumbList schema
- Meta title + description from repo description
- Sponsorware badge if repo has sponsorer link

### /releases — Changelog
- Every release across all repos, newest first
- Filterable by repo
- Each: repo name, version, release notes, date
- Auto-generated ItemList schema

### /games — Game Projects
- Filtered view of repos tagged with "game" or in the game-* naming pattern
- Links to Itch.io if detected in profile

### /apps — SaaS / Tool Projects
- Filtered view of non-game, non-fork repos
- Visual: demo GIF from repo if available, else just card

### /sponsorware — Sponsorware Projects
- Repos with FUNDING.yml or sponsor links
- Each: badge, description, sponsor link
- Auto-generated FAQ: "What is sponsorware?" "How do I get access?"

### /about — About Burnsedia
- Generated from GitHub profile bio + README
- Links to baileyburnsed.dev (the personal blog)
- Links to Patreon, GitHub Sponsors

---

## SEO/GEO Automation

Every generated page gets:
- Unique meta title + description (generated from repo name + description)
- BreadcrumbList schema
- WebPage schema
- FAQPage schema for repos with READMEs containing Q&A patterns
- ItemList schema for aggregate pages (releases, games, apps)
- Open Graph and Twitter card tags
- Proper canonical URLs
- Sitemap inclusion (all pages)

This means pushing a new repo to GitHub automatically creates a new SEO-optimized landing page on burnsedia.dev without touching the site.

---

## Automation Pipeline

### GitHub Webhook → Netlify Build Hook
1. On push to any Burnsedia repo, GitHub sends a webhook
2. Webhook hits Netlify's build hook URL
3. Netlify triggers a new deploy
4. Astro build runs, fetches fresh data from GitHub API
5. Static site deploys with all new content

### Build-time Data Fetch (Astro)
```typescript
// src/lib/github.ts
const GITHUB_USER = 'Burnsedia';

export async function fetchRepos() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=pushed`);
  const repos = await res.json();
  return repos.filter(r => !r.fork && !r.archived);
}

export async function fetchReleases() {
  const repos = await fetchRepos();
  const releases = await Promise.all(
    repos.map(async repo => {
      const res = await fetch(repo.releases_url.replace('{/id}', '?per_page=5'));
      return (await res.json()).map(r => ({ ...r, repo: repo.name, repoUrl: repo.html_url }));
    })
  );
  return releases.flat().sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
}

export async function fetchProfile() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
  return res.json();
}
```

### Static Paths Generation
```typescript
// src/pages/[...repo].astro
export async function getStaticPaths() {
  const repos = await fetchRepos();
  return repos.map(repo => ({
    params: { repo: repo.name.toLowerCase() },
    props: { repo },
  }));
}
```

---

## Files to Create

- `src/lib/github.ts` — GitHub API utilities
- `src/pages/index.astro` — dashboard homepage
- `src/pages/repos/[repo].astro` — per-repo page (catch-all for all repos)
- `src/pages/releases.astro` — release changelog
- `src/pages/games.astro` — filtered game projects
- `src/pages/apps.astro` — filtered app projects
- `src/pages/sponsorware.astro` — sponsorware projects
- `src/pages/about.astro` — generated about page
- `src/components/GitHubCard.astro` — repo card component
- `src/components/GitHubStats.astro` — stats dashboard
- `src/components/ReleaseItem.astro` — release entry component
- `src/utils/seo.ts` — auto-generate SEO/GEO metadata from repo data
- `netlify.toml` — build hook config (if not already)

## Files to Reuse from baileyburnsed.dev

- Theme / global.css (darksynthwave)
- BaseHead.astro (schema generation, but with dynamic data)
- Layout components
- Card.astro (adapt for GitHub data)

---

## Verification

- [ ] npm run build succeeds with data from GitHub API
- [ ] Homepage shows dashboard with repos and stats
- [ ] Each repo has its own page at /[repo-name]
- [ ] Releases page shows all releases chronologically
- [ ] Games page shows only game-related repos
- [ ] Apps page shows only app/tool repos
- [ ] Sponsorware page shows repos with funding links
- [ ] All pages have unique meta title + description
- [ ] All pages have BreadcrumbList + WebPage schema
- [ ] FAQPage schema generated for repos with Q&A READMEs
- [ ] Sitemap includes all generated pages
- [ ] Netlify build hook triggers on GitHub push
- [ ] Deploy completes and site updates automatically
- [ ] Links to baileyburnsed.dev for personal blog content

---

## Relation to baileyburnsed.dev

| Feature | burnsedia.dev | baileyburnsed.dev |
|---------|--------------|-------------------|
| Content | Auto-generated from GitHub | Hand-written blog posts |
| Products | Listed with GitHub data | Individual product pages |
| Blog | Release notes / changelog | Build log, opinions |
| Art gallery | Detected from Blender repos | Personal gallery |
| Newsletter | — | Lead magnet + weekly |
| Membership | GitHub Sponsors link | Full /membership page |
| Updates | Webhook → auto-rebuild | Manual write + deploy |
| Voice | Generated / factual | "I build shit that works" |
