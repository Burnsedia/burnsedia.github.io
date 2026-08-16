---
title: "Dracula Devlog — Aug 15, 2026"
description: "Today's standup: app lock, TIR fixes, delete-by-swipe, quick-log, TXT export, and log filters. What shipped and what's next for the privacy-first blood sugar app."
pubDate: "Aug 15 2026"
heroImage: "/opensourcesoftware-preview.png"
tags: ["dracula", "devlog", "flutter", "privacy", "open source", "building in public"]
---

Today's standup for Dracula — the blood-sugar logbook that never leaves your phone. All on-device, no accounts, no telemetry.

## What I worked on

A polish-and-ship sprint: security hardening, trends correctness, and logging ergonomics. Closed out PRs #74 through #91 (35 commits today).

## What got done

**Security — app lock shipped (#75)**
- Hashed PIN storage, plus a PIN setup and change UI
- PIN fallback when biometrics aren't available
- Track `last_active` on pause

**Trends correctness (#76, #83, #84)**
- New reading-band classifier service; fixed time-in-range band classification
- Chart Y-axis now derived from the data instead of hardcoded
- Distinct feed dot colors for high vs carb

**Navigation (#79, #82)**
- Tab state now survives with IndexedStack
- Fixed hero-tag and trends-refresh regressions

**Logging ergonomics (#80, #81, #85, #88, #90)**
- Delete entries from edit screens, and swipe-to-delete
- Log refreshes after add/edit
- Empty-state CTAs on the log
- One-tap quick-log for glucose
- Premade meal presets fill macros

**Today screen (#77, #89)**
- Labeled sparkline + streak badge
- Latest-reading timestamp in the KPI

**Onboarding & export (#87, #91)**
- Guided setup with a working restore
- TXT export wired into Settings

**Settings fix (#78)**
- Target-range dialog prefills with a bare number

**Docs**
- Rewrote AGENTS.md for the current architecture; ticked off the completed MVP 1 user stories

## In progress

- **Log filters** (date-range + category) — branch is open with tests written, not merged yet.

## What's next

- Merge the log-filters branch
- App Store and Google Play submission
- CGM import (longer term)
- Keep the countdown moving toward the $500/mo sponsorware goal — hit it and the source opens

---

*Not medical advice. Dracula is a logbook and a calculator — insulin decisions are yours and your care team's.*
