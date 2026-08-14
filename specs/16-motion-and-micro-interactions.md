# Motion & Micro-Interactions Specification

## Objective
Give the site a cohesive "live terminal" motion language — hero typewriter, pulsing status dots, equalizer bars, scroll reveals, count-up stats, and page transitions — that reinforces the build-in-public identity without hurting performance, accessibility, or layout stability. This is the animation layer that pairs with the storefront layout (spec 15) and the design-system tokens (specs 08 + 14).

## North Star
Every animation reads as "something is happening on this machine": text types, status pulses, an equalizer moves, numbers count up as you scroll. All motion is subtle (200–700ms), transform/opacity-only, and every animation has a `prefers-reduced-motion` static fallback with zero layout shift.

## Design Principles (apply to every animation below)
1. **Terminal-native** — motion mirrors a live shell: typing, blinking caret, pulsing status, animated eq bars. No bouncy/springy "marketing" easing.
2. **Fast & subtle** — 200–700ms, `cubic-bezier(0, 0, 0.2, 1)` (or `ease-out`). Nothing blocks interaction.
3. **GPU-only** — animate `transform` and `opacity` only. Never animate `width`/`height`/`top`/`margin` (causes reflow/jank).
4. **No CLS** — reserve space for every animated element (fixed container heights, `min-width` in `ch` for typed text, fixed-height eq bar container).
5. **Reduced motion** — every animation checks `matchMedia('(prefers-reduced-motion: reduce)')` and renders the final static state instead. Never auto-play audio.
6. **Semantic colors** — use daisyUI tokens (`primary` once for the most important accent, `secondary` cyan for links/status, `accent` amber for numbers, `success`/`warning`/`neutral` for status dots). No raw hex.
7. **Static-first** — the HTML always contains the final content (full phrase list, final numbers) so no-JS/SEO renders correctly; JS only animates on top.

## Animation Inventory

| # | Animation | Where | Issue | Timing |
|---|-----------|-------|-------|--------|
| 1 | Hero terminal typing | Hero | #134 | 70ms type / 1700ms hold / 28ms delete / 300ms gap |
| 2 | Status dot pulse | Store cards, build strip | — | 2s ease-in-out loop (glow always-on) |
| 3 | Equalizer bars | "Now Playing" card | #133 | 1s ease-in-out, staggered |
| 4 | Stat count-up | HomeStats | #86 (existing) | 1000–1400ms ease-out cubic |
| 5 | Scroll reveal | Homepage sections | #129 | 700ms ease-out, 100ms stagger |
| 6 | Page transitions | Site-wide nav | #128 | 200–300ms fade |

---

## Requirements

### 1. Hero terminal typing (#134)
Extend the existing `src/components/shared/HeroTyping.astro` to render a terminal prompt line:

`$ built-for <phrase>▊`

- **Prompt:** `$` in `primary`, `built-for` in `text-base-content/60`, phrase in `secondary` (cyan), caret `▊` (or `|`) in `primary` with a 1s `steps(1)` blink.
- **Phrases:** `["apps", "games", "art", "music", "open source"]` (matches the storefront categories).
- **Timing:** type 70ms/char → hold 1700ms → delete 28ms/char → 300ms pause → next phrase. Loop.
- **Static fallback (CLS + SEO):** the `<span>` renders the first phrase server-side; set `min-width` = `maxPhraseLength + 1` `ch`. A `<noscript>` carries the comma-joined full list.
- **Reduced motion:** render all phrases as a static comma-joined string, no caret blink.
- The existing component already has an IntersectionObserver (pause when off-screen) + `prefers-reduced-motion` guard — preserve and extend, don't rewrite.

### 2. Status dot pulse
Use the daisyUI `status` component for all live/beta/planned indicators:
- `status status-success` = live (green), `status status-warning` = beta (amber), `status status-neutral` = planned (purple).
- Add a soft always-on glow via a shared utility, e.g. `@utility status-glow { box-shadow: 0 0 8px currentColor; }` in `global.css` (or `shadow-[0_0_8px] shadow-success/50`).
- Optional subtle pulse (opacity 1→0.7, 2s ease-in-out infinite) ONLY on the "currently building" strip's live dot — not on every card (too busy).
- Reduced motion: static glow, no pulse.

### 3. Equalizer bars ("Now Playing") (#133)
In the homepage music card (see spec 15 Req 12 for the card itself):
- 4 bars, `w-1` wide, `bg-primary`, inside a fixed-height `h-6` flex container (`items-end gap-1`).
- Keyframes: `@keyframes eq { 0%,100% { height:6px } 50% { height:24px } }`.
- `animation: eq 1s ease-in-out infinite`, staggered delays `0s / .2s / .4s / .1s`.
- **No CLS:** container is fixed `h-6`; bars animate `height` inside it (acceptable here — tiny, 4 elements — but keep the container fixed).
- Reduced motion: render all 4 bars at a static mid height (e.g. 14px).

### 4. Stat count-up (reference pattern — keep)
`src/components/homepage/HomeStats.astro` already implements the correct pattern: IntersectionObserver (threshold 0.35), `prefers-reduced-motion` fallback, ease-out cubic (1 − (1−t)³), `tabular-nums`, duration 1000ms (<1000 target) / 1400ms (≥1000). Treat this as the canonical example for all new JS animations. Do not duplicate; reuse its `data-stat-value` + observer structure for any new count-up.

### 5. Scroll reveal (#129)
Create `src/components/shared/Reveal.astro`:
- Wrapper `<section>` with `data-reveal` + optional `data-reveal-delay` (ms).
- Initial state: `opacity-0 translate-y-4`; on IntersectionObserver entry (threshold ~0.2), remove those classes → transitions to `opacity-1 translate-y-0`.
- `transition: opacity .7s ease-out, transform .7s ease-out; transition-delay: var(--delay)`.
- Stagger by setting `data-reveal-delay` 0/100/200/300/400ms on the 5 homepage sections (About → Projects → Blog → Stats → CTA).
- Unobserve after reveal (fire once). Reduced motion: render visible immediately (no-op).
- Wire via a single inline `<script is:inline>` in `index.astro` (or a shared `reveal.ts`), not per-component.

### 6. Page transitions (#128)
- In `src/components/shared/BaseHead.astro`: actually RENDER `<ClientRouter />` (it is currently only imported — dead).
- In `src/layouts/BaseLayout.astro`: `<main transition:animate="fade">` (200–300ms).
- **Mandatory companion (do not ship alone):** add a `page_view` handler on `astro:page-load` / `astro:after-swap` that calls `gtag('config', 'G-…', { send_page_view: true })` — otherwise SPA navigation silently drops GA page-view tracking.
- Respect `prefers-reduced-motion` (Astro's view transitions honor it via `transition:animate` fallbacks; verify).

### 7. Hover micro-interactions (baseline polish)
- Cards/buttons already get daisyUI hover (border-color + bg change). Standardize to a single ~150ms `transition-colors` on store cards and build-log rows so hover is instant-but-smooth, and use `hover:text-secondary` / `hover:border-secondary` (cyan) per the color rules (primary stays reserved for the one primary CTA).

---

## Acceptance Criteria
- [ ] Hero types `$ built-for <phrase>` with blinking caret and correct phrases; static HTML shows the full phrase list without JS
- [ ] Status dots use daisyUI `status` + glow; live/build-strip dot pulses subtly
- [ ] Equalizer bars animate in a fixed-height container (no layout shift)
- [ ] Stats count up on scroll with the existing ease-out/tabular-nums pattern
- [ ] Homepage sections fade+slide up once, staggered, via `Reveal`
- [ ] Page transitions play; GA still records page views after SPA nav
- [ ] Every animation has a `prefers-reduced-motion` static fallback
- [ ] Zero horizontal overflow at 375px / 768px / 1280px; no CLS from animated elements
- [ ] `npm run build` succeeds; `npm run astro -- check` introduces no new diagnostics in touched files

## Files to Create
- `src/components/shared/Reveal.astro`
- `src/components/homepage/EqBars.astro` (or inline in `MusicPlayerCard.astro`)
- `src/components/homepage/MusicPlayerCard.astro` (if not already created under spec 15)

## Files to Modify
- `src/components/shared/HeroTyping.astro` — terminal prompt format, phrases, caret, CLS guard
- `src/components/homepage/HomeHero.astro` — use terminal typing + `$ built-for` framing
- `src/components/homepage/HomeStats.astro` — (keep count-up; optionally align colors per #106)
- `src/pages/index.astro` — wrap sections in `Reveal` with stagger delays
- `src/components/shared/BaseHead.astro` — render `<ClientRouter />` + GA `astro:page-load` page_view handler
- `src/layouts/BaseLayout.astro` — `transition:animate="fade"` on `<main>`
- `src/styles/global.css` — `status-glow` utility, `@keyframes eq`, caret blink, reveal transition utilities

## Issue References
- #134 (terminal typing) · #133 (music player card) · #129 (scroll reveal) · #128 (view transitions) · #86 (stat fix) · #18 / #70 (motion a11y) · #73 (static-first parity)

## Prioritization
| Priority | Animation | Effort | Impact |
|----------|-----------|--------|--------|
| P0 | Hero terminal typing (#134) | 30 min | High |
| P0 | Page transitions + GA fix (#128) | 30 min | Medium |
| P1 | Scroll reveal (#129) | 30 min | Medium |
| P1 | Status dot glow/pulse | 15 min | Medium |
| P2 | Equalizer bars (#133) | 20 min | Low |
| P2 | Hover micro-interaction polish | 20 min | Low |

## Notes for the implementer (OpenCode)
- The stat count-up in `HomeStats.astro` is the reference implementation — copy its observer/reduced-motion/easing structure for any new animation.
- `--depth: 1` and `--noise: 1` are 0/1 toggles (see specs/14 corrections); do not set `--noise: 30`.
- Do not introduce raw hex colors — use the darksynthwave daisyUI tokens only.
- Verify each animation in the browser with `document.documentElement.scrollWidth - window.innerWidth` (must be 0) and by toggling OS reduced-motion.
