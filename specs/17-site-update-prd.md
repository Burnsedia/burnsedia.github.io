# PRD — burnsedia.github.io Site Update

> **Status:** Draft
> **Owner:** Burnsedia
> **Last updated:** 2026-11-12
> **Source backlog:** GitHub issues #47–#151 (all OPEN)
> **Design authority:** `DESIGN.md` (dark terminal, flat, system fonts, content-first)
> **Strategy authority:** `design-docs/ROADMAP.md`

---

## 1. Summary

burnsedia.github.io is a static Astro site serving as the digital storefront for an indie developer pivoting to a content + productized-service business. The GitHub issue backlog (100+ items) is large but well-documented — the bottleneck is **execution and prioritization**, not planning.

This PRD defines a **phased plan** that:
1. First enforces the existing brand system (design hygiene).
2. Then installs the SEO/GEO foundations that make content discoverable.
3. Then builds the revenue-generating storefront surface.
4. Finally adds media and motion polish.

The ordering optimizes for **lowest risk → highest leverage → business impact**, so each phase ships a working, coherent site rather than a pile of half-integrated features.

---

## 2. Background & Context

### 2.1 Current State
- **Stack:** Astro 5, static output, TypeScript strict, Tailwind v4 + DaisyUI. React integration present but should be removed (see Phase A).
- **Content:** `blog`, `courses`, `projects` collections; 18 route files.
- **Design:** `DESIGN.md` defines a "darksynthwave terminal" identity — pure-black background, one electric pink interaction color, flat (no shadows), system sans-serif, monospace for terminal elements.
- **Strategy:** Two-site plan — `baileyburnsed.dev` (live blog/storefront now), `burnsedia.dev` (future business site, no cold start later).
- **Docs:** 28 active SDDs in `design-docs/active/`, brand-reset plans in `plans/brand-reset/`.

### 2.2 Problem Statement
The backlog reads as 100+ independent tasks across design, SEO, payments, music, and conversion. Without sequencing:
- Design fixes will contradict each other (e.g. shadows vs. `DESIGN.md` forbidding them).
- New pages will ship on top of broken SEO foundations.
- Revenue work will fragment attention across too many products.
- Motion/media work will compound visual debt before the system is consistent.

### 2.3 Opportunity
A disciplined, phased rollout turns the backlog from noise into a coherent product trajectory: a fast, accessible, SEO-optimized, revenue-ready site that matches the documented brand.

---

## 3. Goals

| # | Goal | How we know it's met |
|---|------|---------------------|
| G1 | Brand system enforced | No shadow-based elevation, dark-only theme, no dead CSS classes, hero components deduped |
| G2 | SEO/GEO foundations in place | Meta descriptions fixed, JSON-LD (Article/FAQ/HowTo) present, OG images, clean titles/headings |
| G3 | Revenue surface ships | One flagship product page live, reusable `/products/[slug]` template, Stripe/store links wired |
| G4 | Stack simplified | React integration removed; typing done in Vue only |
| G5 | Premium feel | Consistent radius/palette, gallery, 3D viewer, animations, music player (Phase D) |

## 4. Non-Goals
- No new frameworks or build tooling.
- No migration of content collections or route slugs (preserve existing URLs).
- No re-architecting the two-site strategy.
- No redesign of the hexagon logo / core brand mark.

---

## 5. Phased Plan

### PHASE A — Design System Hygiene (fastest ROI, low risk)
**Why first:** These are small, safe, and make every later phase look coherent. They also directly enforce `DESIGN.md`.

| Issue | Task | Notes |
|-------|------|-------|
| #147 | Remove `light` from DaisyUI themes | Site is dark-only per `DESIGN.md` |
| #146 | Remove dead CSS classes (`shadow-pink`, `shadow-glow`, `.noise`) | Verify no refs before deleting |
| #145 | Replace `shadow-xl` on cards with border-based depth | `DESIGN.md` forbids shadows |
| #108 | Lock shadow-depth strategy | Document "flat = borders + surface layering" |
| #151 | Consolidate duplicate sales/newsletter hero components | Shared vs. legacy |
| #101 | Fix hero typing animation truncation | Add min-width / layout fix |
| #103 | Fix mobile hamburger menu visibility | Check visibility + contrast |
| #105 | Fix footer separator border visibility | Ensure `base-content/10` border renders |
| #106 | Reduce primary-color overload | Diversify accent usage, stay in palette |
| #150 | Untangle blog-hero spacing (`mt-25`, inconsistent gaps) | Use 4px scale |
| #149 | Clarify `mask-hexagon` usage | Brand mark vs. photo treatment |
| #148 | Replace random Unsplash hotlink in `PhoneApp.astro` | Local asset, meaningful alt |
| #109 | Add SVG noise filter for section texture | Optional texture, per spec |
| #102 | Add alternating section backgrounds | Only via surface layering, not shadows |

**Definition of Done:** Build passes with no new shadow classes; dark-only verified; hero components deduped; all fixes pass `npm run astro -- check`.

---

### PHASE B — Frontend Tech Debt
**Why now:** Removes a whole framework from the stack before adding more framework components, so new work stays Vue-only.

| Issue | Task | Notes |
|-------|------|-------|
| #72 | Remove React integration and dependencies | Keep Vue; audit `package.json` |
| #71 | Replace React typing usage with Vue typing in all heroes | |
| #70 | Harden `Typing.vue` | a11y, reduced-motion, stable layout |

**Definition of Done:** No React runtime in production bundle; all typing animations in Vue; `Typing.vue` respects `prefers-reduced-motion` and has stable layout (no CLS).

---

### PHASE C — SEO / GEO Foundations (highest leverage backend work)
**Why next:** Makes all existing content discoverable. No new pages required — pure compounding value.

| Issue | Task | Notes |
|-------|------|-------|
| #110, #111 | Fix meta description + broken `SITE_DESCRIPTION` placeholder | Bug |
| #118 | Improve page `<title>` tag formatting | Consistent pattern |
| #121 | Use `seoTitle` / `seoDescription` frontmatter in page head | Extend schema |
| #119 | Add JSON-LD **Article** schema to blog posts | Full metadata |
| #120 | Render **FAQPage** JSON-LD from `faq` frontmatter | GEO |
| #122 | Add **HowTo** JSON-LD schema | Tutorials |
| #123 | Add `faq` frontmatter to remaining how-to posts | |
| #124 | Audit/improve section headings on tutorial posts | AI extraction |
| #116 | Add per-post Open Graph images | Social sharing |
| #117 | Internal linking: blog → product pages | Silos |
| #125 | Add GA4 event tracking for tutorial engagement | See Phase E |

**Definition of Done:** Validated JSON-LD via Google Rich Results test; meta descriptions unique per page; OG images present; heading order audited.

---

### PHASE D — Storefront / Revenue (business impact)
**Why next:** This is where the site earns money. Sequenced around **one** flagship to avoid fragmentation.

| Issue | Task | Notes |
|-------|------|-------|
| #137 | **Pick the ONE app to push to revenue this quarter** | Decision first; ship its landing page |
| #138 | Build reusable `/products/[slug]` landing page template | Reusable, per spec |
| #141 | Create `/products/openclaw/` productized-service page | If OpenClaw is the pick |
| #140 | Productize the hermes-skills bundle (instant-download) | Digital product |
| #139 | Wire Stripe Payment Links + store links into `/products`, `/service` | itch.io, Gumroad, etc. |
| #142 | Align newsletter offer with "Agents in Production" positioning | |
| #143 | Add public roadmap + changelog pages | Sponsorware trust layer |

**Definition of Done:** Flagship product page live via the template; checkout/store links functional; newsletter offer aligned; roadmap/changelog published.

---

### PHASE E — Media & Motion Polish
**Why last:** Visual enhancements that depend on a consistent, finished design system.

| Issue | Task | Notes |
|-------|------|-------|
| #131 | Refine border-radius system | Premium utilitarian feel |
| #100 | Load custom brand fonts (JetBrains Mono + Inter) | ⚠️ **Conflicts with `DESIGN.md` system-font rule — needs a decision** |
| #126 | Create art gallery page (Blender render grid + lightbox) | |
| #127 | Add 3D model viewer for interactive Blender models | |
| #130 | Add homepage gallery preview section | Featured art |
| #128 | Add View Transitions API for smooth page navigation | |
| #129 | Add scroll-triggered reveal animations | |
| #132 | Add synthwave music player page + ambient gallery player | |
| #133 | Add homepage music player card (Now Playing) | |

**Definition of Done:** Fonts (if approved) ship with fallback + fail-safe; gallery/viewer render on static fallback; animations respect reduced-motion.

---

### PHASE F — Conversion Layer (fold into phases as applicable)
| Issue | Task | Notes |
|-------|------|-------|
| #47–#58 | Week 1/2 conversion tasks (newsletter hub, `/socials`, support module, GA4 events) | Overlaps Phase C & D |
| #67–#79 | CTA hierarchy, service IA, thank-you flow, projects support CTA | |

**Note:** Much of this overlaps Phases C/D and can be executed as it becomes relevant rather than as a standalone phase.

---

## 6. Key Decisions & Open Questions

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| Q1 | **Fonts (#100)** — custom vs. system? | A) Keep system (current `DESIGN.md`) B) Amend doc to allow JetBrains Mono + Inter | Confirm; if B, update `DESIGN.md` typography section first |
| Q2 | **Flagship product for #137** | Pick ONE app | Decide with business input; gates Phases D |
| Q3 | **Shadow strategy (#108)** | A) Keep flat (current) B) Allow subtle shadows | Keep flat — it's core to the brand |
| Q4 | **Ordering** | A) Phased above (recommended) B) Group by workstream only | Phased — lowest risk, coherent site each phase |

---

## 7. Definition of Done (whole program)
- `npm run astro -- check` passes with no new diagnostics.
- `npm run build` succeeds (Netlify build unaffected).
- Dark-only, flat, no dead CSS (Phase A).
- No React runtime (Phase B).
- JSON-LD + meta + OG valid (Phase C).
- Flagship product page + store links live (Phase D).
- All animation/font work respects reduced-motion and fails safe.

## 8. Verification (per AGENTS.md)
- Typecheck (primary gate): `npm run astro -- check`
- Build: `npm run build`
- Preview: `npm run preview`
- No test framework configured — use build/typecheck as the gate.

## 9. Suggested Execution Order
`A → B → C → D → E → F`. Each phase ships a coherent, buildable subset; nothing in a later phase depends on unshipped earlier work except the design system (A) being consistent first.
