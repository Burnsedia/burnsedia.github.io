# Homepage Hero & Metadata SEO Specification

## Objective
Align the homepage's SERP snippet with its on-page hero promise, and ensure the animated hero copy degrades to fully crawlable static HTML so search engines and no-JS users see identical core messaging.

## North Star
View-source of the homepage shows the complete hero headline, subheadline, and CTAs without JavaScript. The `<title>` and `<meta name="description">` reflect the hero promise. The canonical URL is singular and correct.

## Current State
- `src/pages/index.astro` sets `title = SITE_TITLE` ("baileyburnsed.dev") and a hardcoded `description = "I build shit that works. Apps, games, and open tools."` — it does not use `SITE_DESCRIPTION` / `SITE_META_DESCRIPTION` from `src/consts.ts`.
- `src/consts.ts`: `SITE_DESCRIPTION` is still the broken placeholder `"I Build Software for:  "` (issue #110). `SITE_META_DESCRIPTION` is populated and keyword-rich.
- `src/components/homepage/HomeHero.astro`: static H1 "I build shit that works." + subheadline, plus a `HeroTyping` component. `HeroTyping` already renders the first phrase statically and keeps rotating phrases in data attributes with an inline-JS animation, so the static HTML currently contains the full H1/subheadline plus the first typed phrase.
- `src/components/shared/BaseHead.astro`: canonical is derived from `Astro.url.pathname` (singular on homepage → `https://baileyburnsed.dev/`); robots default to `index, follow`.

## Requirements

### 1. Homepage metadata ↔ hero intent (issue #74)
- Title should reflect the hero value proposition (brand + descriptive keywords), not just the bare domain.
- Meta description should match the hero promise and come from `SITE_META_DESCRIPTION` (or a rewritten `SITE_DESCRIPTION`), not a divergent hardcoded string.
- Confirm canonical is `https://baileyburnsed.dev/` and singular (no trailing-slash duplicate).

### 2. Static-first hero copy parity (issue #73)
- Preserve that the H1 and subheadline are fully present in static HTML.
- Keep the animated `HeroTyping` layer as enhancement-only: the static fallback text must convey the full meaning when JS is disabled.
- Optional: expose the rotating phrase list as a static, comma-joined string for no-JS/SEO completeness.

## Acceptance Criteria
- [ ] Homepage `<title>` contains brand + descriptive keywords (not only "baileyburnsed.dev")
- [ ] Homepage `<meta name="description">` matches the hero promise and is a complete sentence
- [ ] Local view-source (or `curl` of the built site) shows complete H1 / subheadline / CTAs without JS
- [ ] Canonical on homepage is singular: `https://baileyburnsed.dev/`
- [ ] No conflicting title/description across layout and page head layers
- [ ] `npm run build` succeeds

## Files to Modify
- `src/pages/index.astro` — title + description
- `src/consts.ts` — `SITE_DESCRIPTION` / `SITE_META_DESCRIPTION` (shared with #110)
- `src/components/homepage/HomeHero.astro` — optional static fallback for rotating phrases
- `src/components/shared/HeroTyping.astro` — optional no-JS fallback text

## Issue References
- #73 (static-first hero copy parity)
- #74 (homepage metadata + canonical rules)

## Prioritization
| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| P1 | Homepage title + description alignment | 10 min | Medium |
| P2 | Static hero copy parity audit/fix | 15 min | Low-Medium |
