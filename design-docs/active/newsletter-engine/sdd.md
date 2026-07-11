# Newsletter Content Engine

Status: draft
Owner: Bailey Burnsed
Feature ID: NL-001
Last Updated: 2026-07-11
Related Issues: #8

## Context

The newsletter signup exists and works (Netlify Forms), but there's no lead magnet, no welcome sequence, no archive page, and the CTA copy is generic. This means conversion rates are lower than they could be and subscribers don't get an immediate "why this is valuable" experience on signup.

## Goal

Turn the newsletter from a generic signup form into a complete content engine with a lead magnet, welcome flow, and clear value proposition at every touchpoint.

## Non-Goals

- No migration to a dedicated email platform (Mailchimp, ConvertKit, etc.) — that's a future step
- No automated email sequences beyond a manual welcome email
- No paid newsletter promotion
- No changes to newsletter content itself (writing quality is independent)

## Requirements

- R1: Every newsletter CTA across the site must include the lead magnet as the incentive
- R2: Social proof in CTA copy: "Join 50+ founders reading the Weekly Build Notes"
- R3: Signup forms must have data-track attributes for conversion analytics
- R4: Welcome email content must be documented and ready to send manually
- R5: Newsletter archive page at /newsletter/archive showing past issues with dates and descriptions
- R6: Thank-you page must include the lead magnet download link and set expectations for future emails

## Acceptance Criteria

- Homepage newsletter hero references lead magnet
- Blog end-card newsletter CTA references lead magnet
- All newsletter forms have data-track-event attributes
- Welcome email template exists
- /newsletter/archive page renders (even if empty initially)
- Thank-you page shows lead magnet link and welcome info
- npm run build succeeds

## Risks And Constraints

- Manual welcome email is a fragile process — document clearly and set a calendar reminder
- No analytics on email opens without dedicated platform — accept this limitation for now
- Archive page will be empty initially — add placeholder text explaining it's new

## Dependencies

- LEAD-001 (lead magnet landing page and content)
- ANALYTICS-001 (data-track attributes from conversion analytics)
- /thank-you page (already exists)
- newsletter component (already exists)

## Notes

- Welcome email should deliver the lead magnet, link to top 3 blog posts, link to consulting
- Archive page format: chronological list with month/year, issue title, 1-sentence summary
- Future: when migrating to email platform, this archive can be auto-generated from sent campaigns
