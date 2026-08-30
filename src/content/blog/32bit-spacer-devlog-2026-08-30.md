---
title: "32bit-Spacer Devlog — From Systems to a Business Plan"
description: "This cycle on 32bit-Spacer was about direction as much as code: per-app business planning docs, a FOSS marketing plan, and a systems refactor. Devlog, not marketing."
pubDate: "2026-08-30"
heroImage: "/opensourcesoftware-preview.png"
tags: ["32bit-spacer", "devlog", "game dev", "gamedev", "open source", "building in public", "foss"]
---

This cycle on 32bit-Spacer was split between code and, honestly, the more important work: deciding what the game is commercially before writing more of it.

## Business planning first

The two most consequential commits this cycle weren't gameplay code.

- Added per-app business planning docs
- Added a FOSS business and marketing plan

That matters for a building-in-public indie project. A game can chew years of your life and return nothing if the "why does this exist and how does it pay for itself" questions are deferred. Writing the plan down before the systems grow is how you keep an open-source game sustainable without living on fumes. I'll pull the actual docs into a future devlog.

## Systems refactor

- Reorganized the game's systems structure
- Removed the tutorial code from the NPC team-fight module
- Dropped unoptimized data branches that weren't pulling weight

## Data setup

The data plumbing was the tail of this cycle: setting up the projectile/stat data, tightening the ignore list so generated and local files stay out of the repo, and getting the resource structure in place. A lot of "setup" commits that read as noise but are the foundation everything else sits on.

## What's next

- Open the business + marketing plan into a readable build-in-public post
- Get a playable vertical slice from the refactored systems
- Iterate the data-driven pieces off the new structures

---

32bit-Spacer is built in public: https://github.com/Burnsedia/32bit-Spacer