# Lead Magnet for Newsletter Growth

Status: draft
Owner: Bailey Burnsed
Feature ID: LEAD-001
Last Updated: 2026-07-11
Related Issues: #4

## Context

The newsletter signup currently offers "Weekly build notes" with no specific incentive. Generic signup prompts convert poorly. A concrete lead magnet — a specific, useful free resource — gives visitors a reason to subscribe immediately. The "Indie Developer Stack 2025" guide aligns with existing popular content and positions Bailey as an authority.

## Goal

Create a downloadable free guide that drives newsletter subscriptions and establishes the "practical systems" positioning from the first touchpoint.

## Non-Goals

- No complex email marketing platform integration (Netlify Forms is sufficient for now)
- No paid ad campaigns or lead magnet distribution beyond organic site traffic
- No multi-step email sequences (welcome email + lead magnet delivery is enough)
- No changes to the existing newsletter content strategy

## Requirements

- R1: Lead magnet must be a specific, useful resource — not generic "subscribe for updates"
- R2: Landing page at /free-guide with clear headline, bullet list of contents, and email form
- R3: Form must submit to Netlify Forms with hidden field identifying it as lead magnet signup
- R4: Thank-you page must provide the download link immediately
- R5: All newsletter CTAs across the site must reference the lead magnet
- R6: Lead magnet content must be useful enough that people would pay $5 for it

## Acceptance Criteria

- /free-guide/ page renders with lead magnet offer
- Email submission redirects to /thank-you with download link
- Lead magnet PDF or content is accessible
- Newsletter signup on homepage references the free guide
- Blog end-card CTA references the free guide
- npm run build succeeds

## Risks And Constraints

- Lead magnet can go stale — commit to reviewing/updating quarterly
- PDF hosting needs to be on Netlify or static file in public/
- Without dedicated email platform, welcome email delivery isn't automatic — document the manual process

## Dependencies

- Netlify Forms (already configured)
- Thank-you page (already exists at /thank-you)
- NewsletterCtaCard component (needs modification)
- Newsletter component (needs modification)

## Notes

- Guide outline: 10 tools Bailey uses daily across dev, AI, ops, and productivity
- Format options: single markdown page on site (easier to update) or downloadable PDF (higher perceived value)
- Recommend starting with a site page (no PDF friction) and graduating to PDF once template is built
- Hidden form field: <input type="hidden" name="source" value="lead-magnet" />
