# Visual Design Polish Specification

## Objective
Incrementally improve the visual design of baileyburnsed.dev without changing the darksynthwave theme — fix defects, add depth and texture, and improve component consistency.

## North Star
The site feels intentionally designed (not default-styled), with clear visual hierarchy, consistent component patterns across all pages, and no visible defects on any screen size.

## Requirements

### 1. Custom Brand Typography
- Load **JetBrains Mono** (Google Fonts) for headings, code blocks, terminal elements
- Load **Inter** (Google Fonts) for body text, UI labels, navigation
- Add `<link>` tags in `src/components/shared/BaseHead.astro`
- Set font-family in `src/styles/global.css`:
  - Headings: `'JetBrains Mono', ui-monospace, monospace`
  - Body: `'Inter', system-ui, sans-serif`
- Preserve existing system-ui fallback chain

### 2. Fix Hero Typing Animation Truncation
- The hero typing animation cuts off text (e.g., "Found" instead of "Founders")
- Root cause: `HeroTyping.astro` min-width calculation excludes prefix length
- Fix: add `prefixLength` to `maxChars` computation
- Also: reduce hexagon container from `w-2/3` to `w-full max-w-xs mx-auto` in `HomeHero.astro`
- Verify full phrases render on desktop and mobile

### 3. Add Alternating Section Backgrounds
- Every section currently uses transparent on pure black — no visual separation
- Two options:
  - **A)** Add CSS for alternating section tints using `--color-base-200`
  - **B)** Enable `--noise` filter (change from 0 to 30) for subtle grain texture
- Implement Option A as primary, Option B as optional additive

### 4. Fix Mobile Hamburger Menu Visibility
- Dropdown background is `bg-base-100` (pure black) on pure black header — invisible
- Change to `bg-base-200` with `border border-base-content/10` for visibility
- Affects `src/components/shared/Header.astro`

### 5. Add Active Nav State Styling
- No `aria-current` handling exists — visitor loses page orientation
- Detect active page from `Astro.url.pathname` in `Header.astro`
- Add `aria-current="page"` to matching nav link
- CSS: `[aria-current="page"] { @apply text-primary font-semibold; }`

### 6. Fix Footer Separator Visibility
- Footer `border-t border-base-300` is nearly invisible on black
- Change to `border-t border-base-content/20` for visible separation
- Affects `src/components/shared/Footer.astro`

### 7. Reduce Primary Color Overload
- Primary pink/magenta used on stat numbers, link underlines, hover borders, buttons, tags
- Rebalance: reserve primary for primary CTAs only
- Stat numbers → accent (amber)
- Link underlines → secondary (cyan)
- Hover card borders → secondary
- Tag borders → neutral

### 8. Add Card Containers to Blog Post List
- Blog index renders posts as bare text links — no visual containers
- Add bordered card containers matching homepage card pattern:
  `block p-5 border border-base-content/10 bg-base-100/5 hover:border-primary transition rounded-box`
- Ensure tag pills render with visible container styling

### 9. Decide Shadow Depth Strategy
- `--depth: 0` disables all DaisyUI shadows
- Options: A) Accept flat (add 1px borders), B) Increase to `--depth: 1`, C) Selective manual shadows
- Decision needed before implementation

### 10. Enable SVG Noise Filter
- `noise` CSS class applied everywhere but `--noise: 0` disables it
- Change to `--noise: 30` for subtle analog grain texture
- Reinforces cyberpunk/CRT aesthetic

## Acceptance Criteria
- [ ] Custom fonts load and render on page load (no FOUT/FOIT)
- [ ] Hero typing animation shows complete phrases on all breakpoints
- [ ] Sections have distinct background tint alternation
- [ ] Mobile hamburger menu is clearly visible with background/border
- [ ] Active nav page has visual indicator (different color/weight)
- [ ] Footer separator is clearly visible
- [ ] Primary color usage is reduced to primary actions only
- [ ] Blog post list items have card containers matching homepage pattern
- [ ] Shadow depth approach is documented and applied
- [ ] SVG noise filter adds subtle texture (visible on close inspection)
- [ ] `npm run build` succeeds
- [ ] No visual regressions on key pages (home, blog, service, about)

## Files to Create
- None (all changes are modifications to existing files)

## Files to Modify
- `src/components/shared/BaseHead.astro` — font links
- `src/styles/global.css` — font families, section alternation, noise, active nav
- `src/components/shared/HeroTyping.astro` — min-width fix
- `src/components/homepage/HomeHero.astro` — hexagon sizing, CTA layout
- `src/components/shared/Header.astro` — mobile dropdown, active nav
- `src/components/shared/Footer.astro` — separator visibility
- `src/pages/blog/index.astro` or PostsList — card containers
- `src/components/homepage/HomeStats.astro` — color rebalance
- Various component files — primary color reduction

## Issue References
- GitHub issues #100-#109

## Prioritization
| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Custom fonts | 15 min | High |
| P0 | Hero truncation fix | 10 min | High |
| P0 | Mobile hamburger fix | 2 min | High |
| P1 | Section background alternation | 5 min | Medium |
| P1 | Active nav state | 10 min | Medium |
| P1 | Blog post cards | 10 min | Medium |
| P1 | Footer separator | 1 min | Low |
| P2 | Primary color rebalance | 20 min | Medium |
| P2 | Noise filter | 1 min | Low |
| P2 | Shadow depth decision | 5 min | Low |
