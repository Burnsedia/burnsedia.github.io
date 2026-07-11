# Building in Public Dashboard

Status: draft
Owner: Bailey Burnsed
Feature ID: DASH-001
Last Updated: 2026-07-11
Related Issues: #5

## Context

The "build in public" brand pillar has blog posts about it but no live visual proof on the site. A dashboard widget showing current project, recent commits, and build status turns the "building in public" ethos from a claim into a visible feature. It also provides a constant reason for return visitors to check the site.

## Goal

Create a terminal-styled dashboard widget on the homepage that visually demonstrates that Bailey is actively building — with current project, status, and recent activity.

## Non-Goals

- No live GitHub API integration (manual JSON source reduces complexity and dependency)
- No real-time WebSocket or server-side rendering (static site constraint)
- No full activity feed or commit history display
- No user-customizable dashboard

## Requirements

- R1: Widget must look like a terminal window (title bar, green-on-dark code, monospace font)
- R2: Data sourced from a static JSON file at src/content/build-log/current.json
- R3: Fields: currentProject, status, lastCommit (ISO date), commitCount, eta
- R4: Widget must be responsive — full width on mobile, max-w-2xl on desktop
- R5: Uses mockup-code DaisyUI component as base
- R6: No JavaScript required — purely static rendering

## Acceptance Criteria

- NowBuilding component renders on homepage between HomeAbout and ProjectsSection
- JSON data file exists and is importable
- Terminal window styling renders correctly
- Date displays relative time (e.g., "Last commit: 2 days ago")
- npm run build succeeds
- Widget is visually consistent with the terminal aesthetic (TERM-001)

## Risks And Constraints

- Manual update required — widget goes stale if Bailey doesn't update the JSON
- Relative time requires build-time calculation — static at deploy
- ETA field is inherently speculative — phrase as "Target: [date]" not "Shipping: [date]"

## Dependencies

- TERM-001 (terminal aesthetic provides the visual foundation)
- DaisyUI mockup-code component (already available in v5)
- src/pages/index.astro (needs section added)

## Notes

- Mockup-code structure: <div class="mockup-code"> with <pre><code> inside
- Color coding: project name in secondary, status in primary, counts in accent
- Consider adding a "Last updated" timestamp at bottom so visitors know how fresh the data is
- Future enhancement: pull from GitHub API, but start manual to keep it simple
