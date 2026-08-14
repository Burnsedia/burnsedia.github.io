# Design System, Motion & Media Enhancements Specification

## Objective
Complete the darksynthwave design system by resolving the open design decisions (#108, #131), adding motion and texture, and building the media-forward features (terminal hero, gallery, 3D viewer, music player) — all without changing the pink/black brand identity or regressing the Lighthouse/SEO work.

## North Star
The site ships a coherent terminal / cyberpunk identity: sharp utilitarian corners, subtle depth + grain, smooth but accessible motion, and media sections that reinforce "artist who codes" — while every page still builds cleanly and keeps the primary pink reserved for the one or two things that matter.

## Current State (verified against the repo)
- **Theme** (`src/styles/global.css`, `darksynthwave`): `--depth: 0` (all DaisyUI shadows disabled), `--noise: 0` (grain disabled), `--radius-box: 0.5rem`, `--radius-selector: 1rem`, `--radius-field: 0.5rem`.
- **Typography:** no web fonts loaded. Body uses the system `font-sans` stack; headings inherit the same sans (no mono identity).
- **`noise` class is a no-op.** DaisyUI 5.5.5 has no `.noise` utility class. `--noise` only modulates the grain DaisyUI bakes into *components* (btn, badge, alert, menu, checkbox, radio, toggle, fileinput) via `background-size: auto, calc(var(--noise)*100%)`. Applying `class="noise"` to a `<section>` does nothing today.
- **Homepage sections** (`HomeAbout`, `ProjectsSection`, `HomeBlogPreview`, `HomeStats`, `HomeCTA`) are all transparent on pure black — no visual separation.
- **View transitions are not active:** `ClientRouter` is imported in `BaseHead.astro` but never rendered, so page navigations are full hard loads.
- **Blog index** (`PostsList.astro`) renders non-featured posts as a divider list (`border-t border-primary/40`) — inconsistent with the homepage card pattern.
- **Color overload:** stat values and project "Status:" lines both use `text-primary` (pink), the same color as the primary CTAs.
- **No gallery, music, or 3D-viewer routes exist.** The hero uses a rotating-word typewriter (`HeroTyping.astro`), not a terminal-input mockup.

## Corrections to specs/08-visual-design-polish.md
These two points in specs/08 are factually wrong and would mislead an implementer:

1. **Req 10 + Req 3 Option B — `--noise` value.** The theme variable is a **0/1 toggle**, not a 0–30 scale. It is consumed as `calc(var(--noise) * 100%)`; setting `30` produces `3000%` background-size (broken). The correct activation value is **`--noise: 1`**.
2. **Req 10 — "the `noise` class is applied everywhere."** That class is a no-op. Section grain requires defining a real `.noise` rule (see Requirement 2 below).
3. **Req 9 — shadow depth decision.** Recommend **Option B: `--depth: 1`** (subtle), matching DaisyUI's own `dark` theme default.

## Open Decisions (resolve before implementing)

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | Border-radius system (#131) | Current 8–16px vs sharp 4px | **Sharp 4px** — matches the terminal/OpenCode identity already chosen (maximal-terminal variant). Do it via theme tokens, not `!important`. |
| 2 | Shadow depth (#108) | Flat (borders only) vs subtle | **Subtle (`--depth: 1`)** — gives interactive elements weight on pure black. |
| 3 | View transitions (#128) | Enable vs skip | **Enable only with the GA fix** (Requirement 8) — otherwise SPA nav silently drops page-view tracking. |

## Requirements

### 1. Border-radius system (#131)
- In `darksynthwave`: `--radius-box: 0.25rem`, `--radius-field: 0.25rem`, `--radius-selector: 0.25rem` (4px buttons/cards/badges).
- Replace `rounded-2xl` (16px) usages with `rounded-box` (or remove) so cards read uniformly: `HomeCTA.astro`, `PostsList.astro`, `NewsletterCtaCard.astro`, `services/*.astro`, `legacy/CoursesList.astro`, `legacy/CourseLessonsList.astro`, `legacy/ProjectsList.astro`.
- Keep the hexagon logo mask (`mask-hexagon`) untouched — it is the brand signature.
- Inputs may use `0.375rem` (6px) if softer field corners are preferred.

### 2. Depth + texture (#108, #109)
- Set `--depth: 1` (subtle DaisyUI shadows) and `--noise: 1` (component grain) in the theme.
- Define a real `.noise` utility in `global.css`: a grayscale SVG `feTurbulence` (saturate=0, ~5% opacity, ~140px tile) applied as `background-image`. This restores the intended section grain.
- Add alternating section tint to the homepage: `bg-base-200/60` on `HomeAbout`, `HomeBlogPreview`, `HomeCTA` (the 2nd/4th/6th sections), leaving hero/projects/stats on black.

### 3. Typography (#100 — dependency, specced in 08)
- Load **Inter** (body) + **JetBrains Mono** (headings/code/chrome) via Google Fonts in `BaseHead.astro`; map through `@theme` (`--font-sans`, `--font-mono`) in `global.css`. This is the P0 brand win and a prerequisite for the terminal hero (Req 9).

### 4. Color hierarchy (#106)
- Stat values → `text-accent` (amber). Project "Status:" lines → `text-secondary` (cyan). Card hover borders + title hovers → `text-secondary` / `hover:border-secondary`.
- Keep `text-primary`/`btn-primary` for: Work With Me CTAs, the "Featured Post" label, and section eyebrows. Featured card may keep its primary border as the single deliberate emphasis.

### 5. Blog cards (#107)
- Wrap non-featured posts in `PostsList.astro` in bordered cards: `p-5 border border-base-content/10 bg-base-100/5 hover:border-secondary rounded-box transition`. Neutral borders, cyan hover; keep tag badges.

### 6. Nav & chrome defects (#103, #104, #105 — cross-ref specs/08)
- Mobile dropdown: `bg-base-200 border border-base-content/15 shadow-xl` (currently invisible pure-black).
- Active nav: compute `Astro.url.pathname` in `Header.astro`, set `aria-current="page"` + `text-primary font-semibold` on the matching link.
- Footer separators: `border-base-300` → `border-base-content/20` (both rules).

### 7. Scroll-triggered reveal animations (#129)
- Reusable `Reveal`/`AnimationWrapper` component: `opacity-0 translate-y-4` → visible on IntersectionObserver entry.
- 700ms ease-out, 16px (1rem) slide-up, 100ms stagger cascade (About → Projects → Blog → Stats → CTA).
- Respect `prefers-reduced-motion` (show static). Reuse the existing stat-card observer pattern.

### 8. View transitions (#128)
- Render `<ClientRouter />` in `BaseHead.astro`; add `transition:animate="fade"` (200–300ms) on `<main>` in `BaseLayout.astro`.
- **Required companion:** fire a GA `page_view` on `astro:page-load` (or `astro:after-swap`) so SPA navigation still counts page views. Do not ship one without the other.
- Respect `prefers-reduced-motion`.

### 9. Terminal-input hero animation (#134)
- Replace/augment `HeroTyping` with a `mockup-code` terminal window: pre-filled build-status lines, then a `$` prompt typing a command with a blinking cursor on a loop.
- Pink for commands, cyan for output, amber for status (reuse theme tokens). Static text remains in the HTML for no-JS/SEO; reduced-motion = static frame.

### 10. Art gallery + homepage preview (#126, #130)
- New `gallery` content collection (`title`, `description`, `image`, `medium`, `year`, `category`, `featured: bool`).
- `/gallery` page: responsive grid (3/2/1), lazy images, lightbox (Esc / arrows / click-outside / caption).
- Homepage preview section (3 featured, terminal-style heading `gallery --list --featured`, "View Full Gallery" `btn-outline`), placed between HomeStats and HomeCTA.

### 11. 3D model viewer (#127)
- `<model-viewer>` web component (CDN) for `.glb` files under `public/models/`; auto-rotate, orbit/zoom, poster + progress; lightbox mode for `type: "3d"` entries. Fallback poster for grid/social.

### 12. Music player (#132, #133)
- Homepage "Now Playing" card (Requirement 130 territory) and a synthwave player page with a gallery ambient player. Scope depends on audio source choice (streaming service vs self-hosted) — see Open Questions.

## Acceptance Criteria
- [ ] `--depth: 1`, `--noise: 1`, sharp radius tokens set; `.noise` utility actually renders grain; alternating section tint visible
- [ ] `rounded-2xl` replaced by uniform card radius; hexagon mask unchanged
- [ ] Inter + JetBrains Mono load and apply to body/headings with no layout shift
- [ ] Primary pink reduced to CTAs/eyebrows/featured only; stats amber, status cyan
- [ ] Blog posts render as cards; active nav, visible mobile menu, visible footer separators
- [ ] Scroll reveals animate once, honor reduced motion, no horizontal overflow
- [ ] Page transitions play; GA page_view still fires on SPA navigation
- [ ] Terminal hero types commands with blinking cursor; static fallback in view-source
- [ ] `/gallery` grid + lightbox work (keyboard + click-outside); homepage preview links to it
- [ ] 3D entries open in model-viewer with poster fallback
- [ ] `npm run build` succeeds; `npm run astro -- check` introduces no new diagnostics in touched files

## Files to Create
- `src/content.config.ts` (add `gallery` collection) · `src/content/gallery/*.md`
- `src/pages/gallery.astro` · `src/components/gallery/GalleryGrid.astro` · `src/components/gallery/Lightbox.astro` · `src/components/gallery/ModelViewer.astro`
- `src/components/homepage/GalleryPreview.astro` · `src/components/homepage/MusicPlayerCard.astro`
- `src/components/shared/TerminalHero.astro` (or extend `HeroTyping`) · `src/components/shared/Reveal.astro`
- `public/models/` (`.glb` files) · optional `src/pages/music.astro`

## Files to Modify
- `src/styles/global.css` — radius tokens, `--depth`, `--noise`, `.noise` utility, fonts, `[aria-current]`
- `src/components/shared/BaseHead.astro` — font links, `<ClientRouter />`, GA `astro:page-load` handler
- `src/layouts/BaseLayout.astro` — `transition:animate` on `<main>`
- `src/components/shared/Header.astro` — active nav + mobile dropdown
- `src/components/shared/Footer.astro` — separator visibility
- `src/components/homepage/HomeHero.astro`, `HomeStats.astro`, `ProjectsSection.astro`, `HomeBlogPreview.astro`, `HomeAbout.astro`, `HomeCTA.astro` — color rebalance, tint, reveal wrappers
- `src/components/legacy/PostsList.astro` — blog cards
- `src/pages/index.astro` — insert GalleryPreview / MusicPlayerCard

## Issue References
- #126, #127, #128, #129, #130, #131, #132, #133, #134 (new coverage)
- #100, #103, #104, #105, #106, #107, #108, #109 (dependency/cross-ref → specs/08, with corrections above)

## Prioritization
| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Typography (fonts) — dep on specs/08 | 15 min | High |
| P0 | Depth + noise + `.noise` utility + section tint (#108/#109) | 20 min | Medium |
| P0 | Radius tokens + `rounded-2xl` cleanup (#131) | 30 min | Medium |
| P1 | Color hierarchy rebalance (#106) | 20 min | Medium |
| P1 | Blog cards (#107) | 10 min | Medium |
| P1 | Nav/chrome defects (#103/#104/#105) | 15 min | Medium |
| P1 | Scroll reveals (#129) | 30 min | Medium |
| P2 | View transitions + GA fix (#128) | 30 min | Medium |
| P2 | Terminal hero (#134) | 60 min | High |
| P2 | Gallery page + lightbox (#126) | 90 min | High |
| P3 | Homepage gallery preview (#130) | 45 min | Medium |
| P3 | 3D model viewer (#127) | 60 min | Medium |
| P3 | Music player card + page (#132/#133) | 90 min | Medium |

## Risks / Open Questions
- **`--noise` scale** is 0/1, not 0–30 — do not reuse the specs/08 value.
- **Radius sharpening is subjective** (#131 notes current rounds may be deliberate) — confirm Decision 1 before touching every card.
- **View transitions break GA page-view tracking** without the companion handler — never ship one alone.
- **Music source** (self-hosted audio vs Spotify/Last.fm embed) is undecided — resolves Req 12 scope.
- **Google Fonts vs Lighthouse 100**: two webfonts add a render path; use `preconnect` + `display=swap` and accept a minor LCP tradeoff, or self-host the fonts (subset) if the 100 stays non-negotiable.
- **Gallery images** need real assets before the preview/grid looks finished — confirm asset availability before Req 10.
