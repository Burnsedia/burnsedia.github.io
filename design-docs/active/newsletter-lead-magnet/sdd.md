# Newsletter Lead Magnet

Status: draft
Owner: Bailey Burnsed
Feature ID: CONV-004
Last Updated: 2026-07-11
Related Issues: #11

## Context

The newsletter signup offers "Weekly build notes" with no specific incentive. Generic signup prompts convert poorly. A concrete free resource ("The Indie Dev Stack 2025" guide) gives visitors an immediate reason to subscribe.

## Goal

Create a lead magnet landing page and update all newsletter CTAs to reference the free guide, increasing signup conversion.

## Non-Goals

- No paid ad campaigns or lead distribution beyond site traffic
- No changes to the existing newsletter content strategy
- No email platform migration

## Requirements

- R1: Lead magnet landing page at /free-guide/
- R2: Page must have email form + description of what's inside the guide
- R3: Form submits to Netlify Forms with hidden source field
- R4: Thank-you page provides download link
- R5: All newsletter CTAs across the site reference the free guide

## Acceptance Criteria

- /free-guide/ page renders with guide offer and signup form
- Form submission redirects to /thank-you/ with download link
- Homepage newsletter section references the guide
- Blog end-card newsletter CTA references the guide
- npm run build succeeds

## Notes

- Guide content: 10 tools in Bailey's stack with configs and reasoning
- Format: single markdown page on site (no PDF friction)
- Lead magnet is the incentive — the weekly emails are the retention mechanism
