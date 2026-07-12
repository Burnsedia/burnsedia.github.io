# Project Roadmap & Current Plans

> Master reference for everything being built on baileyburnsed.dev and planned for burnsedia.dev.

---

## Two-Site Strategy

| Domain | Purpose | Phase | Status |
|--------|---------|-------|--------|
| baileyburnsed.dev | Personal blog, build log, newsletter, storefront, gallery, membership | Active now | Live |
| burnsedia.dev | AI automation learning sandbox → future business site | Phase 1 (learning) | Not yet built |

**Roadmap:** Learn AI site automation on burnsedia.dev now (Phase 1). Domain builds SEO/GEO authority. When business is legally formed, switch to business content (Phase 2) — no cold start.

---

## Current Site (baileyburnsed.dev)

### Revenue Streams

#### Productized Services (you do the work, fixed price)
| Product | Price | Status |
|---------|-------|--------|
| Unlimited Dev Service | $4,000/mo | Active |
| OpenClaw (AI agents for small biz) | TBD | In development |
| Hermes Agent Management | TBD | Planned |

#### SaaS Products (self-serve, hosted on VPS)
| Product | Description | Status |
|---------|-------------|--------|
| boomerbill | Billing + labor tracking for freelancers | Live hosted user |
| BulkPost | Agentic AI social media automation | Planned |
| API Service | Hosted API endpoints with key mgmt | Planned |
| MCP Service | Model Context Protocol for AI agents | Planned |
| nerdtime.dev | Open-source WakaTime alt + task mgmt | Future flagship OSS |
| Virtue Tracker | Habit formation tool (self-improvement, not tasks) | Future |

#### Sponsorware (GitHub Sponsors — early access, public later)
- New code/features land in sponsor-only access first
- Public after funding thresholds or waiting period
- Powers nerdtime, future tools

#### Memberships & Sponsorships
| Tier | Price | Platform | Perks |
|------|-------|----------|-------|
| Insider | $5/mo | Patreon | Behind-the-scenes posts, discord role |
| Early Access | $10/mo | GitHub Sponsors | Sponsorware code, vote on roadmap |
| Member | $15/mo | Patreon | Above + group Q&A, digital skill access |
| Builder | $25/mo | GitHub Sponsors | Above + monthly dev call, direct input |
| Patron | $50/mo | Patreon | Above + quarterly 1:1, name on site |
| Sponsor | $100/mo | GitHub Sponsors | Logo on site, dev log shoutout, direct line |

#### One-time Sales (external platforms)
| Category | Platform | Examples |
|----------|----------|---------|
| Games | Itch.io | 32bit-Spacer, future games |
| Skills/Guides | Gumroad | Indie Dev Stack guide, AI playbooks, Neovim workflow, Sonic Pi packs, Blender assets |
| 3D Art | Gallery + Gumroad | Free previews on site, paid asset packs |

#### Creative Outlets (mentioned, not yet productized)
| Medium | Potential |
|--------|-----------|
| Sonic Pi | Live coding music streams, script packs as digital skills |
| Blender | 3D gallery, asset packs, shader packs, tutorials |
| Quantified Self | Blog content from personal data systems, feeds build-in-public brand |

---

### Planned Pages
| URL | Purpose | Priority |
|-----|---------|----------|
| /products/ | Hub page listing all revenue streams | High |
| /products/unlimited-dev/ | Productized service page | High |
| /products/openclaw/ | Productized service page | High |
| /products/hermes-management/ | Productized service page | Medium |
| /products/boomerbill/ | SaaS landing page | Medium |
| /products/bulkpost/ | SaaS landing page | Low |
| /products/api-service/ | API docs + signup | Medium |
| /products/mcp-service/ | MCP docs + signup | Medium |
| /products/games/ | Itch.io game catalog | Medium |
| /products/skills/ | Gumroad skill catalog | Medium |
| /gallery/ | 3D art with model-viewer | Medium |
| /membership/ | Unified support tiers page | High |
| /free-guide/ | Newsletter lead magnet landing | High |

### Planned Features
| Feature | Component | Urgency |
|---------|-----------|---------|
| Currently building widget | Live GitHub API → hero area | High |
| FAQ schema (service + product pages) | FAQSchema.astro | High |
| HowTo schema (tutorial blog posts) | HowToSchema.astro | Medium |
| Content silos (internal linking) | silos.ts + cluster banners | Medium |
| BreadcrumbList schema + 404 page | Interior pages + 404.astro | Medium |
| Newsletter lead magnet | Updated CTAs sitewide | Medium |
| Conversion pathway polish | Contextual CTAs per page | Medium |
| GEO content optimization | Q&A headings, definition lists | Low |

### Design Fixes
| Issue | Fix | Status |
|-------|-----|--------|
| Hero typing animation truncates ("Fou" not "Founders") | Layout + min-width fix | Planned |
| Stats section has empty article wrappers | Remove placeholder cards | Planned |
| Stats values ambiguous (100% of what?) | Use verifiable public artifacts | Planned |
| Service page voice doesn't match site | Rewrite in authentic voice | Planned |
| Every interior page uses same hero template | Simplify interior page headers | Planned |
| Nav has too many items | Restructure to 5 items | Planned |

---

## burnsedia.dev — Automated Portfolio (Future)

### Phase 1: AI Automation Learning Lab
- Astro static site on Netlify
- Pulls GitHub repos at build time
- Generates a page per repo with README + structured data
- Aggregated views: releases, games, apps, sponsorware
- Auto-injects SEO/GEO metadata (BreadcrumbList, WebPage, FAQPage, ItemList)
- Webhook triggers rebuild on push
- Domain builds search authority while learning

### Phase 2: Business Site
- Same codebase, same infra
- Data source switches from personal account → Burnsedia GitHub org
- Copy shifts from experimental to intentional
- Products, services, SaaS, sponsorware hosted here
- baileyburnsed.dev stays as personal blog
- No cold start — domain already has rankings

---

## SDD Index

All design docs live in `design-docs/active/`.

| Feature ID | Folder | Status |
|------------|--------|--------|
| REV-001 | revenue-site-overhaul/ | Draft |
| DASH-002 | live-build-status-hero/ | Draft |
| AUTO-001 | automated-portfolio/ | Draft |
| DESIGN-001 | fix-hero-layout/ | Draft |
| DESIGN-002 | fix-broken-stats/ | Draft |
| DESIGN-003 | update-navigation/ | Draft |
| CONV-001 | product-hub-page/ | Draft |
| CONV-002 | rewrite-service-page/ | Draft |
| CONV-003 | single-membership-page/ | Draft |
| CONV-004 | newsletter-lead-magnet/ | Draft |
| CONV-005 | conversion-pathways/ | Draft |
| SEO-001 | faq-schema-geo/ | Draft |
| SEO-002 | howto-schema-blog/ | Draft |
| SEO-003 | content-silos-seo/ | Draft |
| SEO-004 | schema-404-page/ | Draft |
| SEO-005 | geo-content-optimization/ | Draft |

### Additional SDDs (lower priority or superseded)
| Feature ID | Folder | Note |
|------------|--------|------|
| TERM-001 | terminal-aesthetic/ | Optional visual polish |
| BRAND-001 | brand-copy-rewrite/ | Superseded by CONV-002 voice fix |
| BRAND-002 | autistic-entrepreneur-narrative/ | Optional, do naturally |
| CONSULT-001 | consulting-page/ | Part of REV-001 scope |
| LEAD-001 | lead-magnet-newsletter/ | Superseded by CONV-004 |
| DASH-001 | building-in-public-dashboard/ | Superseded by DASH-002 |
| SEO-001-orig | content-silos-seo/ | Original, superseded by SEO-003 |
| SEO-002-orig | seo-technical-pass/ | Absorbed into SEO-004 |
| NL-001 | newsletter-engine/ | Superseded by CONV-004 |
| ANALYTICS-001 | conversion-analytics/ | Lower priority |
| LAUNCH-001 | launch-checklist-validation/ | Pre-deploy gate |

---

## Key Decisions Log

- **Stats section:** Reframe as verifiable public artifacts, not "fake." The build-in-public ethos means the numbers are earned and the receipts are visible.
- **Sponsorware + Memberships:** Same funnel, one /membership page. Not separate pages.
- **Service page voice:** Rewrite to match "I build shit that works" tone. Remove third-person bio and old project references.
- **burnsedia.dev:** Learning sandbox first, business site later. Two-phase approach avoids cold start.
- **Nerdtime vs Virtue Tracker:** Separate products. Nerdtime = code tracking + tasks (productivity). Virtue Tracker = habits + self-improvement.
- **Two-site split:** baileyburnsed.dev for personal/blog, burnsedia.dev for automated portfolio → business.
