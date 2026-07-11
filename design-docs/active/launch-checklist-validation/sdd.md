# Launch Checklist & Validation

Status: draft
Owner: Bailey Burnsed
Feature ID: LAUNCH-001
Last Updated: 2026-07-11
Related Issues: #12

## Context

After implementing 11 feature tasks across the site, a systematic validation pass is needed to ensure everything works correctly before pushing to production. This is the final quality gate.

## Goal

Systematically verify all changes across the site: builds pass, all pages render, all links work, structured data validates, analytics events fire, SEO checks pass, and brand voice is consistent.

## Non-Goals

- No additional feature work or content changes
- No performance optimization beyond validation
- No testing beyond what's listed in the checklist

## Requirements

- R1: npm run build must succeed with no errors
- R2: npm run astro -- check must report no new issues (document any baseline issues)
- R3: All 14+ user-facing pages must render without runtime errors
- R4: All internal links must resolve (no broken links or 404s)
- R5: Structured data must validate on Google Rich Results Test
- R6: Sitemap must include all pages
- R7: Newsletter form must submit successfully (Netlify test submission)
- R8: Lead magnet download must work
- R9: Lighthouse ≥ 90 on desktop and mobile
- R10: Brand voice must be consistent across all copy
- R11: All CTAs must have data-track-event attributes
- R12: Internal links from supporting posts to pillar pages must exist
- R13: All new components must exist at their expected paths
- R14: 404 page must return proper HTTP status

## Acceptance Criteria

- All checklist items pass
- Full site walkthrough on production preview confirms everything works
- No regressions from pre-change baseline
- Deployment to Netlify succeeds
- Post-deployment smoke test passes

## Risks And Constraints

- astro check may have baseline failures unrelated to this work — document as known issues
- Some validations (structured data, Lighthouse) require the production URL or a deployed preview
- Timing: this is the last task before deploy — do not start new work after this

## Dependencies

- ALL — depends on every task (TERM-001 through BRAND-002)

## Notes

- Run in order: local build → astro check → link check → page by page review → structured data → deploy preview → final smoke test
- Create a validation script or checklist document that can be re-used for future launches
- Screenshot key pages for before/after comparison
- Consider using a tool like broken-link-checker or html-proofer for automated link checking
