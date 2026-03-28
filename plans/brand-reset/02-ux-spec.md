# UX Specification

## Goal
Improve clarity, trust, and conversion without overdesigning.

## Primary User Journeys

### New Visitor
Home -> understand identity -> choose a path -> subscribe or follow.

### Returning Builder
Home or blog -> check current build status -> consume latest artifact -> deeper engagement.

### Buyer
Service page -> fit criteria -> clear scope -> contact or book.

## Information Architecture

### Top Navigation
- Home
- Projects
- Blog
- Newsletter
- Service

### Footer Essentials
- About
- Contact
- GitHub
- X
- RSS

## Page-Level UX Requirements

## Home (`src/pages/index.astro`)
- Hero with one identity line and one primary CTA.
- "Now Building" section with exactly 3 cards: App, Game, CLI.
- Recent shipping proof (changelog snippets, metrics, or release links).
- Secondary CTA block for newsletter.

## About (`src/pages/about.astro`)
- Personal story with constraints and operating philosophy.
- "How I work" section for expectations.
- Link to active projects and build logs.

## Service (`src/pages/service.astro`)
- Position as limited productized sprint.
- Scope table: includes, excludes, timeline.
- Fit and anti-fit criteria.
- One contact CTA only.

## Blog Index (`src/pages/blog/index.astro`)
- Start Here block with three tracks: Godot, Neovim, Build in Public.
- Featured posts at top.
- Topic tags/filters.
- Strong newsletter CTA after first content block.

## Blog Post Template (`src/layouts/BlogPost.astro`)
- Quick summary near top.
- Internal links to related pillar content.
- End-of-post CTA (newsletter or projects).

## Projects (`src/pages/projects/index.astro`)
- Consistent card schema: problem, status, next milestone, action.
- Group by lane: App, Game, Tool.
- Trust elements: stars, users, or release date.

## Newsletter (`src/pages/newsletter.astro`)
- Clear value proposition.
- Minimal form fields.
- Concrete cadence expectation.
- Thank-you path with next actions.

## Conversion Rules
- One primary CTA per page.
- Keep key actions above the fold on mobile.
- Reduce decision fatigue; no conflicting CTA clusters.

## Accessibility and Readability
- Maintain strong contrast.
- Keep paragraphs short and scannable.
- Maintain semantic heading order.
- Ensure mobile-first spacing and touch targets.

## Success Criteria
- Users can identify site purpose in under 5 seconds.
- Blog and projects are discoverable in one click from home.
- Newsletter and follow CTAs are visible but not noisy.
