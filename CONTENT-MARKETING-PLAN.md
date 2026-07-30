# Content Marketing Plan — Burnsedia

> A cross-platform content strategy for Bailey Burnsed's indie builder projects.
> Created: 2026-07-30

---

## Current State

### Platforms
| Platform | Handle/Link | Status |
|----------|-------------|--------|
| **Website** | baileyburnsed.dev | 12 blog posts, 1 course (9 lessons), newsletter signup |
| **YouTube** | @baileyburnsed | ~80 videos — devlogs, neovim, linux, AI coding tools |
| **X/Twitter** | @baileyburnsed | Active, automated posting |
| **LinkedIn** | Bailey Burnsed | Connected from socials page |
| **GitHub** | Burnsedia | Active repos: boomerbill, 32bit-Spacer, Dracula, BulkPost, sherlock-mcp |
| **GitHub Sponsors** | /Burnsedia | Active |
| **Patreon** | /burnsedia | Active |

### Active Projects
- **Unlimited Dev Service** — $4k/mo productized development
- **boomerbill** — billing/labor tracking web app (TypeScript)
- **32bit-Spacer** — retro-futurist space game (Godot)
- **Dracula** — blood sugar & nutrition tracker (Flutter)
- **BulkPost** — content automation platform (Python/Astro)
- **sherlock-mcp** — OSINT MCP server (Python, 5 stars)

### Existing Content Themes (12 blog posts)
- Freelancing / indie dev journey (Going-Pro, freelancing-as-a-autistic-developer)
- Tech tutorials (Godot-for-Python, Pytest, Neovim, Static Sites)
- Opinions / manifestos (Cyberpunk, REDHAT-Nonsense, FOSS-LOVE)
- Case studies (PrivateCloud case study, SaaS checklist)
- Game design (Game-Design / The Hive)

---

## Content Pillars

### Pillar 1: Build Logs (60%)
The core differentiator. Nobody else is building these exact projects.

| Project | Content Ideas | Format | Cadence |
|---------|--------------|--------|---------|
| **32bit-Spacer** | AI pathfinding systems, weapon balancing, Blender→Godot pipeline | Devlog (10-20 min) + Shorts | Weekly |
| **Dracula** | Flutter state management, offline-first patterns, health data privacy | Devlog / technical deep-dive | Bi-weekly |
| **boomerbill** | Vibe-coding case study, what happens when users show up, billing system design | Postmortem / case study | One-off + updates |
| **BulkPost** | Agent architecture, cron→Celery migration, Twitter bot evolution | Devlog / architecture breakdown | Bi-weekly |

### Pillar 2: Tool/Workflow Content (25%)
Tools framed through Bailey's actual workflow, not generic tips.

| Topic | Content Ideas | Format | Cadence |
|-------|--------------|--------|---------|
| **Neovim + AI** | OpenCode agents, custom configs, AI-in-editor workflow | Tutorial / Short | Monthly |
| **Linux/DevOps** | VPS setup, Docker→Fly.io, cost optimization from real infra | Tutorial / Case study | Monthly |
| **Django patterns** | Multi-tenancy, API design, Celery patterns from real projects | Tutorial / deep-dive | Monthly |
| **Godot dev** | GDScript for Python devs, scene system, signals | Tutorial | Monthly |

### Pillar 3: Indie Builder Perspective (15%)
The business side — honest take on building products solo.

| Topic | Content Ideas | Format | Cadence |
|-------|--------------|--------|---------|
| **Bootstrapping** | Funding products through services, the $4k/month model | Opinion / essay | Monthly |
| **Building in public** | Why it works, what it actually looks like, transparency ROI | Essay / short-form | Monthly |
| **Autistic founder视角** | Honest take on being neurodivergent in tech | Personal essay | Occasional |

---

## Platform Strategy

### Website (baileyburnsed.dev)
**Role**: Long-form home base. Every platform feeds here.

| Content Type | Purpose | Cadence |
|-------------|---------|---------|
| Blog posts | Deep dives, tutorials, case studies, opinions | Weekly |
| Course lessons | Django SaaS foundations (existing 9 lessons) | Complete |
| Newsletter | Weekly build notes summary | Weekly |
| Service page | Consulting/Unlimited Dev Service offer | Static |

**Blog post SEO baseline:**
- Current: 12 posts, none optimized for search
- Target: Each post has description, tags, proper dates
- Opportunity: Most posts predate the product-builder pivot

### YouTube (@baileyburnsed)
**Role**: Primary video distribution. 80-video back catalog is the moat.

| Format | Length | Cadence | Production |
|--------|--------|---------|------------|
| Devlogs | 10-20 min | Weekly | Screen recording + narration |
| Shorts | 30-60 sec | 2-3x/week | Clip from devlog or standalone tip |
| Tutorials | 5-15 min | Bi-weekly | Screen recording + voiceover |

**Existing videos performing well:** AI coding tool content (1.6K, 1.2K, 1.1K views on shorts).
**Gap:** Inconsistent posting cadence. No upload schedule.

**Upload bottleneck:** YouTube has no free upload API. You upload manually. Automation handles everything before that point (script, audio, metadata, thumbnail concept).

### X/Twitter (@baileyburnsed)
**Role**: Daily presence. Short-form awareness.

| Post Type | Frequency | Content |
|-----------|-----------|---------|
| Build updates | Daily | What shipped today, mini devlog |
| Threads | 1-2x/week | Deep dive in thread form |
| Shitposts / hot takes | As needed | Personality builder |
| Cross-posts | Per video/blog | Link to new YouTube or blog content |

**Automation:** BulkPost cron handles scheduled posting. 12 tweets/day across 8 style categories.

### LinkedIn
**Role**: Professional authority. Lower frequency, higher polish.

| Post Type | Frequency | Content |
|-----------|-----------|---------|
| Project milestones | Weekly | What was built, framed as lesson |
| Case studies | Monthly | Real client/project outcomes |
| Cross-posts | Per blog | Link with summary |

**Tone:** More professional than X, less formal than a consulting page. Technical problem-solving framed as lessons learned.

### GitHub
**Role**: Proof of work. Lead generation by default.

| Action | Frequency | Purpose |
|--------|-----------|---------|
| Commit regularly | Daily | Visible activity = active builder |
| README updates | Per release | First impression for visitors |
| Issue/triage | Weekly | Community signal |
| Sponsors link | Always | README bottom → GitHub Sponsors |

---

## Cross-Platform Content Flow

A single build action produces content for every platform without extra work:

```
You ship a feature
    │
    ├──► Commit message → GitHub visible
    │
    ├──► Daily X post: "Shipped X today because Y"
    │
    ├──► Weekly blog post: deep-dive on what was built
    │         │
    │         ├──► LinkedIn summary (professional frame)
    │         └──► Newsletter excerpt
    │
    └──► Monthly devlog: screen recording of the build process
              │
              ├──► YouTube upload
              ├──► 2-3 shorts clipped from devlog
              └──► Blog post from transcript (YouTube→Blog pipeline)
```

**The pattern:** One build → multiple formats. Repurpose, don't recreate.

---

## Weekly Rhythm

| Day | Blog | YouTube | X/Twitter | LinkedIn |
|-----|------|---------|-----------|----------|
| Mon | — | — | Daily build post | — |
| Tue | Write draft | — | Daily + thread | — |
| Wed | — | Record devlog | Daily | — |
| Thu | Publish post | — | Daily + cross-post blog | Share blog post |
| Fri | — | Edit + upload | Daily | — |
| Sat | — | Clip 2-3 shorts | Daily | — |
| Sun | Newsletter prep | Schedule shorts | Weekly recap | Weekly milestone |

This is aspirational. Start with blog weekly + X daily, add YouTube when the rhythm sticks.

---

## Automation Opportunities

| Task | Tool | Status |
|------|------|--------|
| Daily X posting | BulkPost cron | Running (12/day) |
| Weekly content pack from git | cron + bulkpost skill | Set up, last ran Jul 13 |
| Daily SEO/GEO blog from commits | cron + daily-build-posts | Set up, never ran |
| YouTube→Blog transcript pipeline | cron + youtube-content skill | Not set up |
| Newsletter digest | cron | Not set up |
| Cross-post blog→X/LinkedIn | cron + xurl | Partial |

### Fix These First
1. **daily-build-posts cron** — Set to actually write to `src/content/blog/` and deliver to you
2. **Weekly content pack** — Change delivery from `local` to `origin` so you see it
3. **YouTube→Blog** — Set up if you have livestreams or regular uploads

---

## Growth Metrics to Track

| Metric | Current Baseline | Target (3 months) |
|--------|-----------------|-------------------|
| Blog posts | 12 | 25+ |
| YouTube uploads/week | Irregular | 1 devlog + 2 shorts |
| X followers | ? | +20% |
| Newsletter subscribers | ? | 100+ |
| GitHub Sponsors | Active | +3 new sponsors |
| Patreon | Active | +5 new patrons |

Track monthly. Don't optimize vanity metrics. "Views" don't pay bills — repeat readers and sponsors do.

---

## What to Do This Week

1. **Fix cron delivery** — Change weekly content pack from `deliver=local` to `deliver=origin`
2. **Record one devlog** — Pick a feature from 32bit-Spacer or Dracula. 10-15 min. Upload to YouTube.
3. **Write one blog post** — Deep-dive on something you built this week. Publish to the site.
4. **Post daily on X** — BulkPost handles this. Just review what it generated.
5. **Cross-post the blog to LinkedIn** — Summary paragraph + link.

---

## Notes

- Your autistic special-interest depth is the moat. Generic dev content channels can't compete with someone who genuinely obsesses over game AI pathfinding or Flutter offline architecture. Lean into that.
- "I build shit that works" is an authentic brand. Don't polish it away.
- Upload is the only bottleneck Hermes can't automate. Everything else — script, audio, metadata, thumbnails, cross-posting, scheduling — can be handled.
- The 80-video YouTube back catalog is already valuable. Even sporadic uploads on a channel with that many videos signal authority.
