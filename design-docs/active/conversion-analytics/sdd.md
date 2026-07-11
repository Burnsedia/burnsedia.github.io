# Conversion Analytics

Status: draft
Owner: Bailey Burnsed
Feature ID: ANALYTICS-001
Last Updated: 2026-07-11
Related Issues: #9

## Context

GA4 is configured but only captures pageviews. There's no event tracking for key conversion actions: newsletter signup, CTA clicks, lead magnet downloads, consulting page interactions. Without event data, it's impossible to measure funnel performance or know which CTAs are working.

## Goal

Implement GA4 event tracking across all conversion points so that every meaningful user action is measurable in GA4.

## Non-Goals

- No other analytics platform (GA4 only)
- No custom event tracking tool (use GA4's built-in gtag)
- No changes to existing GA4 configuration
- No server-side tracking or API-based event sending

## Requirements

- R1: Create a reusable analytics utility function in src/utils/analytics.ts
- R2: Newsletter signup form submission must fire 'newsletter_signup' event
- R3: All "Work With Me" CTAs must fire 'work_with_me_click' event with source, placement, label
- R4: "Book a call" links must fire 'book_call_click' event
- R5: Lead magnet download must fire 'guide_download' event
- R6: Social profile clicks must fire 'social_follow_click' event with platform
- R7: All events must include event_category, event_label, and descriptive metadata
- R8: data-track-event attributes already exist on many CTAs — normalize the naming convention

## Acceptance Criteria

- analytics.ts utility file exists and is importable
- All existing data-track-* attribute naming is audited and consolidated into a single pattern
- GA4 debug view shows events firing on all documented interactions
- Event names follow GA4 naming conventions (snake_case)
- npm run build succeeds
- Documentation of which GA4 events to mark as conversions in dashboard

## Risks And Constraints

- GA4 data attribution is last-click by default — conversion attribution settings must be adjusted
- data-track attributes already exist with varying naming — audit first before adding more
- Ad blockers can prevent GA4 from loading — accept this limitation

## Dependencies

- BaseHead.astro (GA4 config lives here)
- All CTA elements across the site (need data-track attributes)
- Netlify Forms (form submissions happen server-side — use hidden redirect tracking or thank-you page load event)

## Notes

- GA4 events to mark as conversions: newsletter_signup, work_with_me_click, book_call_click, guide_download
- Form submissions need special handling: Netlify Forms POST doesn't fire JS events. Use thank-you page load as proxy for form submission count, supplemented by data-track on the submit button
- data-track naming audit: standardize as data-track-event, data-track-source, data-track-placement, data-track-label
