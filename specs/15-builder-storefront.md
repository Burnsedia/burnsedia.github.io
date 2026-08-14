# Builder's Storefront — Unified Design Specification

## Objective
Unify the three revenue lanes of baileyburnsed.dev — build-in-public content, productized services, and product/app sales — into a single coherent "builder's storefront" so the site reads as one indie-builder brand selling apps, services, art, and music, not a freelancer landing page with a blog bolted on.

## North Star
A first-time visitor understands within one scroll: (1) this person builds in public, (2) here is what they ship — apps, games, art, music, and services — (3) here is how to buy, hire, or support. Content leads; the store is one click and never more than one section away.

## Positioning (reconciliation — supersedes parts of spec 11)
spec/11 over-corrected by de-emphasizing consulting and pushing "Work With Me" into the footer. That conflicts with the stated goal of also selling productized services and apps. Correct stance:

- **Content-first, storefront-first-class.** The build log remains the hero and the trust engine, but Products, Services, and Membership are first-class surfaces with equal visual weight — not buried.
- De-emphasize the *freelancer framing* (generic "hire me" voice, "Work With Me" as the primary CTA), not the *revenue surfaces* themselves.
- Primary hero CTAs point at the store and content (Explore the store / Follow the build), with "Work With Me" demoted to a secondary service CTA on the Services shelf.

## Information Architecture (single nav, 5 items)

| Nav item | Destination | Purpose |
|----------|-------------|---------|
| Build Log | `/blog` | Content / trust (Pillar 1–3) |
| Store | `/products` | All revenue: services, SaaS, games, skills, art |
| Gallery | `/gallery` | Art + 3D (proof of the "artist" half) |
| Music | `/music` | Synthwave + Sonic Pi |
| Membership | `/membership` | Recurring support tiers |

- Newsletter = persistent header CTA + footer module (never a nav slot — it is the conversion, not a destination).
- "Work With Me" / Services lives under **Store → Services** (productized services are one shelf in the store).

## Homepage Structure (storefront order)
1. **Hero** — terminal-style "I build shit that works." + "Apps. Games. Art. Music. Built in public." + the live **currently building** widget (DASH-002) + CTAs `Explore the store` / `Follow the build`.
2. **Store shelf** — 3–4 featured product cards (one per lane: service, app, game, art) with type badges + status dots → `/products`.
3. **Build log preview** — 3 latest posts → `/blog`.
4. **Services strip** — productized services (Unlimited Dev, OpenClaw, Hermes Mgmt) with flat rate + scope → `/products#services`.
5. **Gallery + music** — one row of art thumbnails + a "Now Playing" card → `/gallery`, `/music`.
6. **Membership** — compact tier ladder → `/membership`.
7. **Newsletter** — "Follow the build" module.

## Requirements

### 1. Products hub (`/products`) — the store
- Product card system (one reusable `ProductCard`): `type` badge (service | saas | game | skill | art), one-line value prop, price (or "Free" / "On Itch.io" / "On Gumroad"), `status` dot (live=green, beta=amber, planned=purple), CTA link.
- Grouped shelves: **Services**, **SaaS**, **Games & Skills**, **Art & Assets**.
- BreadcrumbList + ItemList JSON-LD (reuse the pattern already in `blog/index.astro`).
- Filter control (All / Services / SaaS / Games / Art) — static HTML + progressive JS.

### 2. Product landing pages (SaaS/apps)
- One template for boomerbill, BulkPost, nerdtime, Virtue Tracker, API Service, MCP Service: hero (name + promise) → screenshot/demo → features → tech stack → status → pricing → CTA ("Try it" / "Get it" / "Join waitlist").
- Live status + "built in public" receipts as social proof.

### 3. Productized services as products
- Reframe Unlimited Dev Service + OpenClaw + Hermes Mgmt as flat-rate, fixed-scope offers: price up front, inclusions/exclusions, process, FAQ, "Book a call" CTA.
- Reuses the FAQPage/BreadcrumbList schema already emitted on `/service/`.
- spec/02's Office Hours Retainer and Hermes Skill Bundle/Django Course remain as additional digital-product entries.

### 4. One-time sales (external platforms)
- Games (32bit-Spacer, Itch.io) and skills/assets (Gumroad) get the same ProductCard treatment with a consistent external "Buy on Itch.io" / "Get on Gumroad" button style.

### 5. Membership (`/membership`)
- Single page with the six tiers (Insider $5 → Sponsor $100) as tier cards; sponsorware "Insider vs Public" framing; "Support the build" language; Patreon + GitHub Sponsors CTAs.

### 6. Content → product funnel
- `ProductCtaCard` (already specced in spec/02/07) rendered contextually at the end of each blog post via tag→product mapping.
- Build-log posts about a product always deep-link to that product's page (boomerbill post → boomerbill page; 32bit-Spacer devlog → Itch.io).

### 7. Design system (from specs 08 + 14)
- Terminal chrome (JetBrains Mono headings/labels/status bar) + Inter body prose; sharp 4px radius; `--depth: 1` subtle shadows; `--noise: 1` + real `.noise` section grain; alternating section tints; primary pink reserved for the store CTAs + featured emphasis; stats amber, status cyan.

## Acceptance Criteria
- [ ] Homepage shows hero + live-build widget + store shelf + build log + services + gallery/music + membership + newsletter in that order
- [ ] `/products` renders grouped shelves with filter + ProductCard (type badge, price, status dot, CTA)
- [ ] Each SaaS/app has a landing page from the shared template
- [ ] Services read as flat-rate products (price, scope, FAQ), not freelancer pitches
- [ ] Games/skills/art link out to Itch.io/Gumroad with consistent buttons
- [ ] `/membership` renders all six tiers as cards
- [ ] Blog posts show a contextual ProductCtaCard + deep-link to their product
- [ ] Nav = Build Log | Store | Gallery | Music | Membership; newsletter in header CTA + footer
- [ ] `npm run build` succeeds; `npm run astro -- check` introduces no new diagnostics in touched files

## Files to Create
- `src/pages/products/index.astro` (+ `[product].astro` template or per-product pages)
- `src/pages/membership.astro` · `src/pages/music.astro` · `src/pages/gallery.astro`
- `src/components/products/ProductCard.astro` · `ProductGrid.astro` · `PricingCard.astro` · `StatusDot.astro`
- `src/components/homepage/StoreShelf.astro` · `ServicesStrip.astro` · `MembershipPreview.astro`
- `src/components/shared/ProductCtaCard.astro` (from spec 02)
- `src/data/products.ts` (canonical product list, sourced from `design-docs/active/product-definitions-reference.md`)

## Files to Modify
- `src/components/shared/Header.astro` — 5-item nav + persistent newsletter CTA
- `src/components/shared/Footer.astro` — store/membership links + newsletter module
- `src/pages/index.astro` — insert store shelf, services strip, gallery/music, membership preview
- `src/components/homepage/HomeHero.astro` — content-first hero + live-build widget + store CTAs
- `src/layouts/BlogPost.astro` — render `ProductCtaCard` via tag mapping
- `src/pages/service.astro` — restyle as service-as-product (or redirect into `/products#services`)

## Issue References
- #88 (CONV-001 product hub) · #89 (CONV-002 rewrite service voice) · #90 (CONV-003 membership) · #91 (CONV-004 lead magnet) · #92 (CONV-005 conversion pathways) · #98 (DASH-002 live build widget) · #87 (DESIGN-003 nav) · #135 (content business copy) · #126/#130 (gallery) · #132/#133 (music)

## Reconciliation Notes (do not edit the originals without confirmation)
- **spec/11** — "de-emphasize Work With Me" is revised to "de-emphasize the freelancer framing; keep Services/Products as first-class store shelves." Nav adds Store + Membership alongside its Projects | Gallery | Music | Blog | Newsletter.
- **spec/02 + spec/07** — keep their `/products` mechanics; this spec adds the Services shelf, the SaaS/app landing template, and the membership page, and re-anchors the nav/homepage around the unified storefront.

## Prioritization
| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| P0 | `src/data/products.ts` + ProductCard/StatusDot system | 45 min | High |
| P0 | `/products` hub with grouped shelves + filter | 60 min | High |
| P0 | Header/footer IA (5-item nav + newsletter CTA) | 30 min | High |
| P1 | Homepage store shelf + services strip + membership preview | 60 min | High |
| P1 | Service-as-product rewrite (`/service` or `/products#services`) | 60 min | Medium |
| P1 | SaaS/app landing template + first product (boomerbill) | 60 min | Medium |
| P2 | `/membership` tier page | 45 min | Medium |
| P2 | ProductCtaCard tag mapping on blog posts | 30 min | Medium |
| P2 | Gallery + music surfaces (dep spec 14) | 90 min | Medium |
