---
title: "BulkPost Devlog — The Spec, the Waitlist, and the Learning Track"
description: "What's real in the BulkPost rebuild this cycle: the new spec work, the waitlist frontend, the backend model cleanup, and the PydanticAI track that feeds the agent core. A changelog."
pubDate: "2026-08-30"
heroImage: "/opensourcesoftware-preview.png"
tags: ["bulkpost", "devlog", "ai agents", "django", "building in public"]
---

BulkPost is headed somewhere specific: an agentic AI that plans, writes, posts, and learns across social platforms, built to be self-hostable. Eventually a SaaS. Right now it is being prototyped as a skill and workflow before it becomes one. This devlog is the current truthful state, from the repo, not from the vision doc.

## What's actually in the repo now

The structure tells you where the product is headed:

- `backend/` — Django API (models, admin, pyproject/uv). This is the agent core's host.
- `frontend/` — Astro app (the future dashboard/queue).
- `waitinglist/` — a standalone Astro + Netlify waitlist (the thing capturing demand before there's a product), Docker-ready.
- `specs/` — the real planning artifacts: mvp.md, crm-cms-mvp.md, autopilot.md.

So the repo is ahead of the code in one important sense: the positioning (spec + waitlist) shipped before the engine did. That is the right order for a building-in-public SaaS proto. Get the demand and the plan locked before over-building.

## Spec work (the meaningful commits this cycle)

- `docs(Spec): I am creating a spec` — carving out the agent architecture doc.
- `docs(README): removing AI tash` — cleaning the README of the AI-generated noise. Worth calling out because it's the recurring theme: the tool writes, but a human has to keep the repo honest.

## Backend (the tail end of the model sprint)

- Model/type cleanup in `api/models` (typos, types)
- `api/admin` work to bring old models back if they're still needed
- Dependabot bump for urllib3

The honest tell: most of BulkPost's recent backend commits are April. The engine hasn't moved much since, and the momentum shifted to the learning track rather than the shipping track. More on that below.

## The frontend + waitlist

- Astro frontend scaffolded
- Standalone waitlist as its own Netlify app, capturing signups before the SaaS exists

## The learning track that feeds it

The agent core for BulkPost is being built on PydanticAI, and that's a real prerequisite, not a vanity stack choice. The `PydanticAI-Twitter-bot` repo is where the learning actually lands: a working bot with a PostingAgent built on PydanticAI's Agent with tools, a main-loop, Alembic migrations, dependency-injection for the fetchers/DB, and comprehensive tests. That repo's January sprint is the exact foundation BulkPost's agent registry will run on.

I'll fold those lessons into the bulkpost spec rather than re-derive them.

## Why building-in-public matters here

BulkPost is the tool doing the thing it sells. If the devlog engine works, it writes posts like this one from git truth automatically. That is the product and the content engine being the same thing, which is the whole point.

## What's next

- Open `specs/autopilot.md` into a readable post so the agent architecture is public
- Move the backend off the April model sprint into the agent registry build
- Promote the PydanticAI-Twitter-bot patterns (DI + tested agents) into bulkpost

---

BulkPost is open: https://github.com/Burnsedia/BulkPost
The agent-learning parent: https://github.com/Burnsedia/PydanticAI-Twitter-bot