---
title: "BoomerBill Devlog — Dashboard Refactor & PWA Cutover"
description: "What shipped this month on boomerbill: the PWA cutover (no login, no backend), the dashboard redesign, and the refactor. A changelog, not a marketing post."
pubDate: "2026-08-30"
heroImage: "/opensourcesoftware-preview.png"
tags: ["boomerbill", "devlog", "vue", "astro", "pwa", "building in public", "local-first"]
---

What shipped on BoomerBill this cycle. BoomerBill is the local-first app that tracks the time you quietly give away doing free tech support for friends and family. This is a changelog, not a sales pitch.

## The PWA cutover

The big structural move this cycle was killing the backend entirely.

- Removed the login flow
- Removed the backend endpoint config
- Removed the auth/session dependency in the app shell

The app is now a pure front-end local-first tool: no accounts, no server, no telemetry. State lives in a single Pinia store. If it breaks, you own it. If the data disappears, you know why. That is the whole point of the product, so this cutover is the product working as intended.

## Dashboard redesign

- Refactored the DashboardPage for a cleaner layout
- Made the theme consistent across pages (Vue + DaisyUI dark synthwave)
- Fixed the nav-scroll-container markup
- Cleaned up styling and removed a signup drive

## The refactor

- Restructured App.vue to remove the login path "until I'm ready for it"
- Exported the `HARD_DEFAULT` constant to resolve a build error
- Fixed test assertions to match the updated UI text and Teleport component

## One honest note

The commit history has a real scar in it: a commit from May that says, plainly, "I am not ever again using AI, it completely fucked my codebase." It stays in the log. That is what building in public looks like when you're being honest. Tools are tools; the review is on me.

## What's next

- Verify the PWA registers and installs cleanly across the dashboards
- Reintroduce auth only if a synced workflow actually needs it (the local-first story is the point)
- Polish the time/money dashboard math (daily / weekly / yearly averages)

---

BoomerBill is open: https://github.com/Burnsedia/boomerbill