# Fix Hero Layout

Status: draft
Owner: Bailey Burnsed
Feature ID: DESIGN-001
Last Updated: 2026-07-11
Related Issues: #1

## Context

The homepage hero section has a layout issue where the hexagon logo (mask-hexagon) takes ~2/3 of the container width, leaving the text column cramped. The typing animation truncates — the live site shows "Fou" instead of "Founders" because the min-width calculation doesn't account for the prefix text and the text column runs out of space.

## Goal

Fix the hero layout so the typing animation displays full phrases, the hexagon and text balance properly, and CTAs are clearly visible on all screen sizes.

## Non-Goals

- No visual redesign of the hero (keep the hexagon, keep the tagline)
- No changes to the typing animation logic beyond the width calculation
- No changes to the HeroLogo or HeroTyping components beyond necessary fixes

## Requirements

- R1: Typing animation must display full phrase text without truncation
- R2: Hexagon logo must not dominate the layout at the expense of text
- R3: CTAs must be visible without scrolling on desktop
- R4: Must work on mobile (stacked layout)
- R5: All existing data-track attributes on CTAs must be preserved

## Acceptance Criteria

- Typing animation shows "Founders" fully, not "Fou"
- Hero renders cleanly on 375px, 768px, and 1440px widths
- npm run build succeeds

## Risks And Constraints

- The hexagon is a visual signature — don't shrink it too aggressively
- DaisyUI's mask-hexagon may have intrinsic sizing that fights with width constraints

## Notes

- Fix: change hexagon container from `w-2/3 sm:w-full md:w-2/3` to `w-full max-w-xs mx-auto`
- Fix: HeroTyping min-width calculation should include prefix length
- CTA buttons should be center-aligned below both columns
