---
version: alpha
name: Burnsedia
description: Darksynthwave terminal aesthetic for a content-first "building in public" indie developer site.
colors:
  background: "oklch(0% 0 0)"
  surface: "oklch(14% 0.004 49.25)"
  surface-raised: "oklch(21% 0.006 56.043)"
  text: "oklch(100% 0 0)"
  text-muted: "oklch(100% 0 0 / 0.7)"
  primary: "oklch(71% 0.202 349.761)"
  on-primary: "oklch(28% 0.109 3.907)"
  secondary: "oklch(82% 0.111 230.318)"
  on-secondary: "oklch(29% 0.066 243.157)"
  tertiary: "oklch(75% 0.183 55.934)"
  on-tertiary: "oklch(26% 0.079 36.259)"
  neutral: "oklch(45% 0.24 277.023)"
  on-neutral: "oklch(87% 0.065 274.039)"
  info: "oklch(74% 0.16 232.661)"
  on-info: "oklch(29% 0.066 243.157)"
  success: "oklch(77% 0.152 181.912)"
  on-success: "oklch(27% 0.046 192.524)"
  warning: "oklch(90% 0.182 98.111)"
  on-warning: "oklch(42% 0.095 57.708)"
  error: "oklch(73.7% 0.121 32.639)"
  on-error: "oklch(23.501% 0.096 290.329)"
typography:
  h1:
    fontFamily: ui-sans-serif, system-ui, sans-serif
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: ui-sans-serif, system-ui, sans-serif
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.2
  h3:
    fontFamily: ui-sans-serif, system-ui, sans-serif
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontFamily: ui-sans-serif, system-ui, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: ui-sans-serif, system-ui, sans-serif
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: "0.08em"
  mono:
    fontFamily: ui-monospace, Hack, monospace
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 8px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  section: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-outline-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 24px
  card-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
  terminal-widget:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 16px
  stat-value:
    textColor: "{colors.primary}"
  blog-content:
    textColor: "{colors.text-muted}"
  badge:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-neutral}"
    rounded: "{rounded.full}"
    padding: 4px
  status-dot-active:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-success}"
    rounded: "{rounded.full}"
    size: 8px
  status-dot-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-warning}"
    rounded: "{rounded.full}"
    size: 8px
  status-dot-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    rounded: "{rounded.full}"
    size: 8px
  status-dot-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.on-info}"
    rounded: "{rounded.full}"
    size: 8px
---

## Overview

Burnsedia is the digital storefront of an autistic hacker-builder who ships
things that work. The identity is darksynthwave terminal: near-black
backgrounds, one electric pink interaction color, cyan secondary, amber
tertiary, and purple neutral. Copy is first-person, direct, anti-hype —
"I build shit that works" is the tagline, not an accident.

The site is pivoting to a content business. The homepage leads with proof of
work: a live "currently building" widget, real verifiable stats (repos,
stars, posts), recent build-log entries, and a tutorials/courses section.
Every surface should feel like a terminal window on a working system, not a
marketing brochure. Content (build logs) is the primary product; products,
membership, and services are secondary CTAs.

## Colors

- **Background (oklch(0% 0 0)):** Pure black page background. The terminal
  is off; everything else glows against it.
- **Surface (oklch(14% 0.004 49.25)):** Default card/panel fill — a dim
  terminal window.
- **Surface-raised (oklch(21% 0.006 56.043)):** Hover and elevated panels.
- **Text (oklch(100% 0 0)):** Pure white primary text, always on dark.
- **Text-muted (white at 70%):** Secondary prose, metadata, descriptions.
- **Primary (oklch(71% 0.202 349.761)):** The electric pink — sole driver
  for interactive elements: links, buttons, active nav, stat values.
- **Secondary (oklch(82% 0.111 230.318)):** Cyan. Supporting interactive
  elements and secondary CTAs.
- **Tertiary (oklch(75% 0.183 55.934)):** Amber. Hover states and accent
  highlights.
- **Neutral (oklch(45% 0.24 277.023)):** Purple. Badges and category tags.
- **Info/Success/Warning/Error:** Functional feedback only — alerts,
  status dots on the live build widget, form validation. Never decorative.

Do not lighten the background or introduce white surfaces. The dark terminal
is the brand.

## Typography

System sans-serif stack for everything readable — no web font dependency,
fast load, native feel. Hierarchy comes from weight (bold headlines) and
size, not family changes. Display sizes carry tight letter-spacing
(-0.02em). Body is white at 100% for headings and 70% for prose paragraphs
(`text-base-content/80` pattern in blog content).

`font-mono` (ui-monospace, Hack, monospace) is reserved for terminal
elements: the live build widget, code blocks, prices, stat numbers
(`tabular-nums`), and ASCII/CRT flourishes. Monospace signals "this is a
real system, live data."

## Layout

Spacing scale is a 4px baseline: `xs` 4, `sm` 8, `md` 16, `lg` 24, `xl` 48.
Sections breathe with `section` (96px) vertical padding — generous black
space is part of the aesthetic. Content column is max-w-3xl for prose
(blog), max-w-5xl for section grids. Section headings are `h2` at
text-3xl/4xl bold; the homepage is one scrollable terminal session:
hero → live build widget → stats → projects → blog preview → tutorials →
CTA.

## Elevation & Depth

Flat by design. Depth comes from borders (`border border-base-content/10`)
and color layering (surface vs surface-raised), not shadows. Hover states
shift border to primary and background to surface-raised. CRT scanline and
noise overlays are acceptable as texture, never as shadow.

## Shapes

Rounded corners are modest: `sm` (8px) on interactive elements and cards
(radius-box 0.5rem), `lg` (16px) on the hexagon mask and hero treatments,
`full` reserved for pill badges and tags. The hexagon logo mask is the one
signature shape — keep it.

## Components

- `button-primary` — the only high-emphasis action per screen. Electric
  pink, dark text. Hover shifts to amber.
- `button-outline` — ghost/outline secondary action. White text, border,
  transparent fill. Hover shifts to pink.
- `card` — default surface for projects, posts, and products. Dim panel,
  no shadow, border on base-content/10. Hover: raised background + primary
  border.
- `terminal-widget` — the "currently building" live widget on the homepage.
  Mono font, surface background, window-chrome header, status dot (green =
  active), no shadows. Must fail safe: if the GitHub API is unreachable,
  render static content, never break the page.
- `stat-value` — real, verifiable numbers only (repos, stars, posts, years).
  Pink, mono/tabular-nums. No invented metrics.
- `blog-content` — prose at 70% white, headings 100%, blockquotes with a
  primary left border, max-w-3xl.
- `badge` — purple pill for category tags and tier labels.

## Do's and Don'ts

- **Do** keep the dark terminal background. This is non-negotiable.
- **Do** use token references (`{colors.primary}`) instead of literal color
  values in component definitions.
- **Do** lead with content: the homepage is a build log first, a storefront
  second.
- **Do** show real data — stats must be verifiable, the build widget must
  reflect actual repo activity.
- **Do** write copy like a person: first-person, direct, no marketing fluff.
- **Don't** introduce colors outside the palette — extend the palette
  first.
- **Don't** nest component variants. `button-primary-hover` is a sibling,
  not a child.
- **Don't** add shadows for elevation — use borders and surface layering.
- **Don't** use light mode; the site is dark-only (color-scheme: dark).
- **Don't** let external scripts (analytics, GitHub API) block rendering —
  fail safely.
