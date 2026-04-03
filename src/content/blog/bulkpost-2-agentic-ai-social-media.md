---
title: "BulkPost 2.0 — Turning My Twitter Bot Into an Agentic AI Social Media System"
description: "How I'm rebuilding my old BulkPost codebase into an open-source, agentic AI that plans, writes, posts, and learns across multiple social media platforms — including a tiny 81-line Twitter bot tested via cron."
seoTitle: "BulkPost 2.0: Build an Agentic AI Social Media System"
seoDescription: "How BulkPost 2.0 uses Django, Celery, and AI agents to plan, publish, and improve social content from real performance data."
pubDate: "Dec 9 2025"
updatedDate: "2026-04-02"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["AI", "automation", "social media", "BulkPost", "Django", "indie dev", "agentic", "Twitter"]
faq:
  - question: "Can I start an agentic social system with a simple bot first?"
    answer: "Yes. Start with a tiny cron bot to validate cadence and format, then promote winning patterns into a larger agent pipeline."
  - question: "How do I keep AI social automation from going off-brand?"
    answer: "Split planning, writing, and analysis into separate agents, then enforce tone and output constraints with typed schemas and review rules."
  - question: "What stack is practical for AI social automation?"
    answer: "Django, Celery, Postgres, and structured agent outputs are enough to run a reliable system before adding extra complexity."
---

# BulkPost 2.0 — Turning My Twitter Bot Into an Agentic AI Social Media System

## Quick answer

This is not a "fully autonomous marketing machine." It is a layered system: test ideas with a tiny bot, promote winners into agent workflows, and iterate on metrics that actually matter.

## Context

Years ago, I built a tool called **BulkPost** — a Django app that scheduled social media posts.
It was simple: queue posts, schedule them, push them out.
It worked, but it wasn’t smart.

Then I built a **Twitter bot** that could post, reply, and even generate content automatically.
That’s when I realized something: BulkPost could evolve into more than just a scheduler.
It could become **agentic** — a system that thinks, plans, and adapts on its own.

Now I’m rebuilding BulkPost as an open-source, AI-driven automation engine for creators and developers who want to grow without burning out.
## Who this is for

- Solo builders who need consistent social output without content burnout
- Small teams that want repeatable posting workflows with feedback loops
- Developers who prefer open-source systems over black-box SaaS lock-in

## What Makes BulkPost 2.0 Different

### Agentic Core
Instead of one big monolithic app, BulkPost 2.0 runs **modular AI agents**:
- **Planner Agent**: builds content calendars.
- **Writer Agent**: writes posts in your tone.
- **Analyst Agent**: studies engagement metrics.
- **Engagement Agent**: replies to comments and DMs.

Each agent communicates via a registry, so the system can evolve — or even run different models (OpenAI, Ollama, Claude, Mistral).

### Rebuilt on Django + Celery + PydanticAI
The backend is fully event-driven.
Each agent runs asynchronously, scheduled by Celery, and interacts through Django REST APIs.
Using **PydanticAI**, every agent has a typed prompt schema — structured reasoning without prompt chaos.

### Self-Host or Scale to the Cloud
I still start every project on a **VPS** — low-cost, predictable, and fully under my control.
When I need to scale, I push the same Docker containers to **Fly.io**, which handles load balancing and edge deployment automatically.
Start small, scale global.

### Learning From Engagement
BulkPost doesn’t just post — it learns.
Agents read engagement data (likes, replies, click-throughs) and adjust their strategy over time.
That means the system gets better the longer it runs.

### Multi-Platform, Open Source
Twitter (X) comes first, but the new architecture is API-agnostic.
LinkedIn, Mastodon, and Instagram are next.
Everything stays open-source, so other developers can fork, self-host, and extend it.

## 3 Experiments: Testing Twitter Growth Strategies With an 81-Line Bot

Before wiring full agentic behavior into BulkPost, I validate ideas with the smallest possible tool:
a **single-file, ~81-line Python Twitter bot** triggered by **cron**.

### What the tiny bot tests
- **Content cadence:** 3–10 posts/day vs. 1/day.
- **Format mix:** text-only, image+caption, micro-threads (2–4 tweets).
- **Topical rotation:** code tips, indie dev stories, case studies, CTAs.
- **Reply-first strategy:** prioritize thoughtful replies to mid-tier accounts (1k–50k followers).
- **Hashtag minimalism:** 0–1 niche tag; no hashtag stuffing.
- **Posting windows:** local-time bursts (8–10am, 12–2pm, 6–8pm).

### Minimal file layout
```
bots/
 twitter81.py # ~81 lines; posts, optionally replies, logs metrics
 prompts/
 seeds.txt # topic seeds (one per line)
```

### Cron setup (runs every hour)
```

### Cron setup (runs every 2 hours and 40 minutes)
# Edit with: crontab -e
# This schedule posts 12 times per day (every 160 minutes)
*/160 * * * * /usr/bin/env bash -lc 'cd /home/twitterbot/bots && /usr/bin/python3 bot.py >> twitter81.log 2>&1'

```

### What the bot actually does (outline)
- Loads **one** seed/topic.
- Generates/post formats (text, text+image, mini-thread) using a configured model API.
- Posts via Twitter API (v2 or v1.1 endpoints).
- Optionally finds one relevant tweet to **reply** to (keyword + account filter).
- Logs results locally (timestamp, type, likes, replies, URL).
- Exits — cron handles scheduling.

> The point isn’t complexity — it’s **fast feedback**.
> Winners from the bot flow straight into BulkPost’s **Planner** as “promoted patterns.”

### Metrics to track (even in a CSV)
- `post_type, hour_local, likes, replies, profile_clicks, link_clicks`
- 7-day moving averages per content type
- Win conditions (e.g., >1.5× baseline engagement): elevate pattern
## Implementation Approach

### Step 1 — Modernize the Old Codebase
Audit the original Django project.
Keep what works (models, auth, Celery config), remove everything else.
Add `.env` support and Docker Compose.

### Step 2 — Integrate the Twitter Bot
Your 81-line bot becomes the first “Posting Service.”
Wrap its logic in a Django task for scheduling and scaling.
Promote winning formats (from bot logs) to BulkPost **queues** automatically.

### Step 3 — Add the AI Agents
Use PydanticAI to define agent behavior.
Start with:
- `planner_agent.py`
- `writer_agent.py`
- `analyst_agent.py`

Agent registry sketch:
```python
class AgentRegistry:
 def __init__(self):
 self.agents = {}

 def register(self, name, agent):
 self.agents[name] = agent

 def run(self, name, *args, **kwargs):
 return self.agents[name].execute(*args, **kwargs)
```

### Step 4 — Build the Frontend Dashboard
Use **Vue.js** or **Astro + Vue** for a clean dashboard:
- Queue view
- Analytics graphs
- AI activity logs
- Manual override for scheduled posts

### Step 5 — Deploy and Iterate
- **VPS:** Postgres + Redis + API (low-cost, full control).
- **Fly.io:** Scale API/Celery workers globally when traffic grows.

## Work With Me

Follow the rebuild. BulkPost 2.0 stays open-source and self-hostable.

## Next step

Use [boomerbill](https://boomerbill.net) to tie social output to pipeline and invoice outcomes.

Get weekly implementation notes from this rebuild on the [newsletter](/newsletter).

Need this architecture implemented for your team? Start on the [service page](/service).
