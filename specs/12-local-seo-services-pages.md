# Local SEO Services Pages Specification

## Objective
Build the services page infrastructure — a directory page, a reusable service detail template, and per-location landing pages — so every productized service gets a crawlable, internally-linked entry and local search visibility across Metro Atlanta.

## North Star
Every service is reachable at a stable URL with unique, localized copy and complete Service + BreadcrumbList structured data. No two location pages share duplicate content.

## Current State
- Single existing service page: `src/pages/service.astro` → `/service/` (singular), first-person "Unlimited Dev Service" offer.
- No services content collection, no directory page, no per-service detail pages, no location landing pages.
- `src/components/shared/BaseHead.astro` already emits Service + LocalBusiness schema (on homepage and `/service/`) with `areaServed` = Atlanta, East Point, College Park, Hapeville, Metro Atlanta.
- Issues #31 / #33 / #34 propose a `/services/` (plural) namespace.

## Open Decision (resolve before building)
Route naming conflict: existing `/service/` (singular) vs proposed `/services/` (plural).

- **Recommendation A (preferred):** introduce the `/services/` namespace for the new pages and keep `/service/` as the flagship detail page during the transition. Once the detail template is live, 301-redirect `/service/` → `/services/unlimited-dev/` to preserve current SEO equity and consolidate authority.
- **Recommendation B:** build everything under the existing `/service/` route (no new namespace).

## Requirements

### 1. Services content source
- Add a `services` collection to `src/content.config.ts` (or a `src/data/services.ts` module) with fields: `title`, `description`, `longDescription`, `price`, `features: string[]`, `locations?: string[]`, `faq?`.
- Populate with currently offered services (Unlimited Dev Service first; then any others already declared in the BaseHead Service schema).

### 2. Services directory page (`/services/`)
- `src/pages/services/index.astro`
- Lists every service with a short description and a link to its detail page.
- Includes BreadcrumbList + ItemList JSON-LD.
- Cross-links each service entry to its detail page (internal link equity).

### 3. Service detail template (`/services/[id]/`)
- `src/pages/services/[id].astro`
- Reusable layout: title, description, price, features, CTA, and an FAQ section.
- Emits Service + BreadcrumbList JSON-LD per detail page.
- `canonical` set to the detail URL.

### 4. Local landing pages (`/services/location/[slug]/`)
- `src/pages/services/location/[slug].astro`
- One page per target area: East Point, Atlanta, Hapeville, College Park.
- Localized copy (area name, local proof/context) unique per page — no duplication of the main service page.
- Emits Service + LocalBusiness/GeoPage JSON-LD with location keywords.
- `canonical` to the location URL; never `noindex`.

## Acceptance Criteria
- [ ] Directory page renders every service at `/services/`
- [ ] Each service entry links to its detail page
- [ ] Detail template renders for any service entry at `/services/[id]/`
- [ ] A landing page exists for East Point, Atlanta, Hapeville, and College Park under `/services/location/<slug>/`
- [ ] Location pages have unique, localized copy (not duplicated)
- [ ] Service + BreadcrumbList schema present on detail pages; Service/GeoPage on location pages
- [ ] `npm run build` succeeds
- [ ] `npm run astro -- check` introduces no new diagnostics in touched files

## Files to Create
- `src/pages/services/index.astro`
- `src/pages/services/[id].astro`
- `src/pages/services/location/[slug].astro`
- `src/data/services.ts` (or services collection entries under `src/content/services/`)

## Files to Modify
- `src/content.config.ts` — add `services` collection (if content-collection approach chosen)
- `src/pages/service.astro` — canonical/redirect decision per Open Decision

## Issue References
- #31 (service detail template)
- #33 (local landing pages)
- #34 (services directory page)

## Prioritization
| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| P1 | Services content source + directory page | 45 min | Medium |
| P1 | Service detail template | 45 min | Medium |
| P2 | Local landing pages (4 locations) | 60 min | Medium-High (local search) |
