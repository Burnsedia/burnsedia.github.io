# Live Build Status — Currently Building Widget

Status: draft
Owner: Bailey Burnsed
Feature ID: DASH-002
Last Updated: 2026-07-11
Related Issues: #5

## Context

The "building in public" brand pillar is a core part of the site identity, but there's no live signal that Bailey is actively working on something right now. The projects section is static and only updates when the site is rebuilt. A dynamic widget showing the currently active GitHub repo makes the "building in public" claim tangible and gives return visitors a reason to check back.

## Goal

Add a programmatically updated "currently building" widget to the homepage hero area that shows Bailey's most recently active GitHub repo in a terminal-style display.

## Non-Goals

- No changes to the existing projects section
- No backend or VPS dependency for this feature
- No login/authentication (GitHub API is public)
- No build-time integration (client-side is simpler)

## Requirements

- R1: Widget must fetch programmatically from GitHub API (no manual updates)
- R2: Display current project name, description, last push time, and star count
- R3: Terminal-window visual style matching the darksynthwave theme
- R4: Relative time display ("2 hours ago", "3 days ago")
- R5: Clickable link to the GitHub repo
- R6: Graceful fallback (hide on error, no broken UI)
- R7: Must not block page render (async fetch, no render-blocking JS)

## Acceptance Criteria

- Widget renders on homepage showing the most recently pushed non-fork repo
- Time display is relative and accurate
- Link opens the correct GitHub repo in a new tab
- On network error, widget hides cleanly (no broken state)
- Loading state shows a pulsing placeholder
- npm run build succeeds

## Risks And Constraints

- GitHub API rate limit: 60 unauthenticated requests/hour per IP — sufficient for single page load
- If the API is down, the widget hides itself
- No data for repos with no pushes — widget will be empty if no active repos
- Styling must match existing terminal theme (mockup-code from DaisyUI)

## Dependencies

- DaisyUI mockup-code component (already available in v5)
- GitHub public API (no key needed for public data)
- src/pages/index.astro (needs widget section)
- src/components/homepage/HomeHero.astro (needs container slot)

## Notes

- Uses GitHub's /users/{user}/repos?sort=pushed endpoint — returns repos ordered by push date
- Filters out forks and archived repos to show only active original work
- Inline <script> with async/IIFE — no module bundler needed
- The widget should sit below the hero CTAs but above the "About Bailey" section
- Future enhancement: cache the API response in localStorage with a 5-min TTL to reduce API calls
