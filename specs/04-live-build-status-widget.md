# Live Build Status Widget Specification

## Objective
Show what Bailey is currently building on GitHub, displayed prominently on the homepage hero area. Makes the "building in public" brand tangible and gives return visitors a reason to check back.

## North Star
Every homepage visitor sees a real-time (or near-real-time) status window showing exactly what's being built right now — with zero manual updates required.

## Approach
**Recommended: Client-side JavaScript (Option A)** — simpler, always current, no build pipeline needed. GitHub API rate limit (60 unauthenticated req/hr) is irrelevant for a single homepage visitor.

Fallback: Build-time from git log + JSON file (Option B) if client JS is undesirable.

## Requirements

### Widget Display
- Terminal-style window with title bar ("status.sh")
- Monospace font, darksynthwave colors
- Shows:
  - `→ Currently:` — most recently pushed non-fork repo name
  - `→ Description:` — repo description (or second line with more detail)
  - `→ Repo:` — clickable link to GitHub
  - `→ Updated:` — relative time (hours/days ago)
  - `→ Stars:` — star count
- Loading state: skeleton with pulse animation, "Loading build status..."
- Error state: gracefully hidden (no broken UI)
- Max width: `max-w-lg mx-auto`

### Data Source
- GitHub API endpoint: `https://api.github.com/users/Burnsedia/repos?sort=pushed&per_page=10&type=owner`
- First non-fork, non-archived repo in the response
- Client-side fetch on homepage load
- No authentication required

### Placement
- Below hero text and CTAs on homepage
- Between hero section and HomeAbout section
- Contained within `index.astro`

### Styling
- Mockup code window (DaisyUI `mockup-code` class)
- Text colors: secondary (label), base-content/70 (description), accent (repo), primary (time), warning (stars)
- Animate-pulse on loading skeleton
- Responsive: full width on mobile, max-w-lg on desktop

## Acceptance Criteria
- [ ] Widget loads on homepage
- [ ] Shows most recently pushed non-fork repo from Burnsedia account
- [ ] Time display is relative (e.g., "2 hours ago", "3 days ago")
- [ ] Repo name links to GitHub
- [ ] Loading skeleton shows while fetching
- [ ] Falls back gracefully (hidden) on API error or no repos found
- [ ] Matches darksynthwave theme (monospace, terminal colors)
- [ ] `npm run build` succeeds
- [ ] No layout shift when widget loads/mounts (use fixed-height placeholder)

## Files to Create
- `src/lib/github-status.ts` — TypeScript utility for GitHub API fetch + type (optionally used at build time)
- `src/components/homepage/NowBuilding.astro` — widget component (client-side version)

## Files to Modify
- `src/pages/index.astro` — add widget below hero (inline `<script>` approach or import component)
- `src/components/homepage/HomeHero.astro` — add container/slot for widget

## Technical Notes
- Option A (client-side JS): inline `<script is:inline>` in index.astro or a small client-visible component. No build-time data dependency.
- Option B (build-time): Astro fetches from GitHub API during build, stores in content collection or JSON. Requires GitHub Action or cron for freshness.
- Rate limiting: 60 req/hr unauthenticated — one page load per visitor is negligible.
- Future improvement: cache in localStorage with 1-hour TTL to reduce API calls.
