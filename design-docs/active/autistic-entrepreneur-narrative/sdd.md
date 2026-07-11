# Autistic Entrepreneur Brand Narrative

Status: draft
Owner: Bailey Burnsed
Feature ID: BRAND-002
Last Updated: 2026-07-11
Related Issues: #11

## Context

The brand position as an autistic entrepreneur is documented in business/brand.md and mentioned briefly in the About page ("I am an autistic hacker nerd"), but it's not woven into the site's narrative as a strength signal. Many neurodivergent entrepreneurs and developers would resonate with this identity — making it explicit builds community and differentiation.

## Goal

Explicitly and proudly weave the autistic entrepreneur identity into the site's narrative, framing autistic traits (pattern recognition, deep focus, systematization, direct communication) as business strengths.

## Non-Goals

- No medical or diagnostic language that could be exclusionary
- No "inspiration porn" framing — this is about capability, not overcoming adversity
- No forced mentions on every page — natural placement in About and homepage bio
- No changes to the consulting or service pages (those are outcome-focused)

## Requirements

- R1: About page must have a section explicitly connecting autistic traits to professional strengths
- R2: Homepage bio section must reference autistic entrepreneur identity
- R3: Language must be proud and matter-of-fact — not apologetic or disclaimer-like
- R4: Frame autistic traits as advantages: pattern recognition → architecture, hyperfocus → delivery, systematization → repeatable services, directness → clear scope
- R5: Update HomeStats with concrete, authentic metrics rather than generic "X years experience"
- R6: Create optional NeurodiversityStatement component that can be shown on relevant pages

## Acceptance Criteria

- About page has explicit autistic entrepreneur section with strength framing
- Homepage references autistic identity in bio
- No apologetic or disclaimer language
- Stats section shows real, verifiable metrics
- npm run build succeeds
- Tone reads as proud and confident, not defensive

## Risks And Constraints

- Some potential clients may be biased against neurodivergent professionals — this is a feature, not a bug (it filters misaligned clients)
- Must balance authenticity with professionalism — the site is still a business site
- "Autistic" language preferences vary — Bailey already uses this language in brand docs, so continue that pattern

## Dependencies

- BRAND-001 (brand copy rewrite provides consistent voice foundation)
- business/brand.md (brand identity source)
- business/message.md (manifesto)

## Notes

- Strength framing examples:
  - Pattern recognition → I see system flaws before they break
  - Hyperfocus → I deliver faster because I don't context-switch
  - Systematization → I build services that are repeatable and scalable
  - Direct communication → No scope creep, no polite ambiguity, just clear delivery
- Stats: "Coding since 9yo", "X blog posts", "X GitHub stars", "Y newsletter subscribers"
- Consider adding to blog index too: "Written by an autistic entrepreneur who ships"
