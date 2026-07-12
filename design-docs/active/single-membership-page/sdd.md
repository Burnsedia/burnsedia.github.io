# Single Membership Page

Status: draft
Owner: Bailey Burnsed
Feature ID: CONV-003
Last Updated: 2026-07-11
Related Issues: #9

## Context

GitHub Sponsors and Patreon links exist in the footer and socials page, but there's no dedicated page explaining what each tier gets you. Sponsorware (early access code) and memberships (discord, calls, content) are the same funnel with different perk flavors — they belong on one page.

## Goal

Create a single `/membership/` page listing all support tiers from $5-$100/mo across Patreon and GitHub Sponsors, with clear perk breakdowns and FAQ.

## Non-Goals

- No changes to Patreon or GitHub Sponsors pages themselves
- No payment processing on the site (links to external platforms)
- No replacement of the socials page support section

## Requirements

- R1: Single page listing all tiers from $5/mo to $100/mo
- R2: Each tier card shows: price, perks list, platform logo, and external link
- R3: Include FAQ section with FAQPage schema
- R4: Explain sponsorware model (early code access, public later)
- R5: Explain the difference between Patreon and GitHub Sponsors

## Acceptance Criteria

- Page renders at /membership/
- All 6 tiers listed with correct links
- FAQ schema validates
- npm run build succeeds

## Notes

- Tiers: Insider $5 (Patreon), Early Access $10 (GitHub), Member $15 (Patreon), Builder $25 (GitHub), Patron $50 (Patreon), Sponsor $100 (GitHub)
- FAQ: What is sponsorware? How does early access work? Patreon vs GitHub? Can I switch tiers? Where does money go?
