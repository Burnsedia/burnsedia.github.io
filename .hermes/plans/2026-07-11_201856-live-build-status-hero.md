# Live Build Status — Currently Building Widget

> **For Hermes:** Use subagent-driven-development to implement task-by-task.

**Goal:** Show what Bailey is currently working on, pulled programmatically, displayed prominently on the homepage hero or nearby. Makes the "building in public" brand tangible and gives return visitors a reason to check back.

**Architecture:** Two approaches depending on how "programmatic" we want it:

---

## Option A: GitHub API (client-side JS, always current)

A small JS snippet on the homepage fetches from the public GitHub API:
- Most recently pushed-to repo (excluding forks)
- Last commit date
- Description or README line

Displayed as a terminal-style status line in the hero:
```
$ cat /proc/build-status
→ Currently: 32bit-Spacer (retro space game)
→ Last push: 2 hours ago
→ Status: Active development
→ Repo: github.com/Burnsedia/32bit-Spacer
```

**Pros:** Always current, zero manual updates, no build step
**Cons:** Requires client JS, GitHub API rate limit (60 unauthenticated req/hr — fine for a single page load)

## Option B: Build-time from git log + JSON file

Astro reads `src/content/status/current.json` at build time. A GitHub Action or cron job updates the JSON file automatically by querying GitHub's API and pushing the result.

**Pros:** No client JS, fully static
**Cons:** Requires a GitHub Action to keep it fresh, stale between deploys

---

I'd recommend **Option A** — it's simpler to implement, genuinely programmatic, and the rate limit is irrelevant for a single homepage visitor. We can always add caching later.

### Implementation

1. Create `src/components/homepage/NowBuilding.astro` — a terminal-style widget component
2. Create `src/lib/github-status.ts` — a small utility that fetches from GitHub API
3. Add the widget to the homepage hero area
4. Style it to match the darksynthwave theme (monospace, green-on-dark, terminal window)

### Files
- Create: `src/components/homepage/NowBuilding.astro`
- Create: `src/lib/github-status.ts`
- Modify: `src/pages/index.astro` (add widget near hero)
- Modify: `src/components/homepage/HomeHero.astro` (add container for widget)

### Component design

```
┌─ status.sh ──────────────────────────────────┐
│ $ cat /proc/build-status                     │
│ → Currently: 32bit-Spacer                    │
│ → Repository: github.com/Burnsedia/32bit-... │
│ → Updated: 2 hours ago                       │
│ → Stars: 3                                   │
└──────────────────────────────────────────────┘
```

### The GitHub status utility

```typescript
// src/lib/github-status.ts
export interface BuildStatus {
  currentProject: string;
  description: string;
  repoUrl: string;
  repoName: string;
  updatedAt: string;
  stars: number;
  language: string;
}

const GITHUB_USER = 'Burnsedia';
const GITHUB_API = 'https://api.github.com';

export async function fetchBuildStatus(): Promise<BuildStatus | null> {
  try {
    // Fetch repos sorted by most recently pushed
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USER}/repos?sort=pushed&per_page=10&type=owner`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) return null;
    const repos = await res.json();
    
    // Find the most recent non-fork repo
    const active = repos.find((r: any) => !r.fork && !r.archived);
    if (!active) return null;
    
    return {
      currentProject: active.name,
      description: active.description || 'No description',
      repoUrl: active.html_url,
      repoName: active.full_name,
      updatedAt: active.pushed_at,
      stars: active.stargazers_count,
      language: active.language || 'Unknown',
    };
  } catch {
    return null;
  }
}
```

### The NowBuilding widget

```astro
---
import { fetchBuildStatus, type BuildStatus } from '../../lib/github-status';
const status = Astro.props.status as BuildStatus | null;
if (!status) return;
---
<div class="mockup-code w-full max-w-lg mx-auto">
  <div class="mockup-code-toolbar">
    <span class="text-xs text-base-content/50 font-mono">status.sh</span>
  </div>
  <pre class="text-xs leading-relaxed"><code>$ cat /proc/build-status
<span class="text-secondary">→ Currently:</span> {status.currentProject}
<span class="text-base-content/70">→</span> {status.description}
<span class="text-accent">→ Repo:</span> <a href={status.repoUrl} target="_blank" rel="noopener noreferrer" class="link link-hover">{status.repoName}</a>
<span class="text-primary">→ Updated:</span> {formatRelativeTime(status.updatedAt)}</code></pre>
</div>
```

For the client-side approach, this component receives the status as a prop. The fetch happens in an inline `<script>` that replaces the placeholder content.

### Homepage integration

Add the widget below the hero text and CTAs on `index.astro`:

```astro
<!-- In HomeHero.astro or index.astro, after CTAs -->
<section class="w-full max-w-5xl mx-auto px-4 mt-8">
  <div id="now-building">
    <div class="mockup-code w-full max-w-lg mx-auto animate-pulse opacity-50">
      <pre class="text-xs"><code>Loading build status...</code></pre>
    </div>
  </div>
  <script is:inline>
    (async () => {
      const container = document.getElementById('now-building');
      if (!container) return;
      try {
        const res = await fetch('https://api.github.com/users/Burnsedia/repos?sort=pushed&per_page=10&type=owner');
        const repos = await res.json();
        const active = repos.find(r => !r.fork && !r.archived);
        if (!active) { container.innerHTML = ''; return; }
        const timeAgo = Math.floor((Date.now() - new Date(active.pushed_at).getTime()) / 3600000);
        const timeStr = timeAgo < 1 ? 'less than an hour ago' : timeAgo < 24 ? `${timeAgo} hours ago` : `${Math.floor(timeAgo / 24)} days ago`;
        container.innerHTML = `
          <div class="mockup-code w-full max-w-lg mx-auto">
            <div class="mockup-code-toolbar">
              <span class="text-xs text-base-content/50 font-mono">status.sh</span>
            </div>
            <pre class="text-xs leading-relaxed"><code>$ cat /proc/build-status
<span class="text-secondary">→ Currently:</span> ${active.name}
<span class="text-base-content/70">→</span> ${active.description || ''}
<span class="text-accent">→ Repo:</span> <a href="${active.html_url}" target="_blank" rel="noopener noreferrer" class="link link-hover">${active.full_name}</a>
<span class="text-primary">→ Updated:</span> ${timeStr}
<span class="text-warning">→ Stars:</span> ${active.stargazers_count}</code></pre>
          </div>
        `;
      } catch {
        container.innerHTML = '';
      }
    })();
  </script>
</section>
```

### Verification
- [ ] Widget loads on homepage
- [ ] Shows most recently pushed non-fork repo from Burnsedia
- [ ] Time display is relative (hours/days ago)
- [ ] Links to GitHub repo
- [ ] Falls back gracefully (hides on error)
- [ ] Matches darksynthwave theme (monospace, terminal colors)
- [ ] npm run build succeeds
