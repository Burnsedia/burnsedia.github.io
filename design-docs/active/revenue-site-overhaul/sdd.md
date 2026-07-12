# Revenue Site Overhaul

Status: draft
Owner: Bailey Burnsed
Feature ID: REV-001
Last Updated: 2026-07-11
Related Issues: #1 #2 #3 #4 #5 #6 #7 #8 #9 #10 #11 #12

## Context

The site currently has blog content, a service page for Unlimited Dev, and a socials page that links to GitHub Sponsors and Patreon. There's no unified product catalog, no way to discover all revenue streams, no sponsorware model explained, and no place to showcase games, skills, 3D art, or SaaS products.

Revenue streams already exist or are planned:

- **Productized Services** (you do the work, fixed price, fixed scope): Unlimited Dev Service ($4k/mo), OpenClaw (AI agent setup/running), Hermes Agent management, future services
- **SaaS Products** (self-serve, hosted on VPS): boomerbill, BulkPost, API-as-a-Service, MCP-as-a-Service
- **Sponsorware + Memberships** (GitHub Sponsors + Patreon): single tiered support page, $5-$100/mo
- **One-time Sales** (external platforms linked from site): games on Itch.io, skills/guides on Gumroad, 3D art asset packs

Goal is to organize all of this into a coherent site structure where every revenue stream has a discoverable page and a clear path to purchase, while keeping the site itself fully static on Netlify and all actual service delivery on the VPS.

## Goal

Restructure baileyburnsed.dev as a static storefront that displays and sells every revenue stream — productized services, SaaS, sponsorware, memberships, games, skills, and 3D art — with clear CTAs that link to payment platforms (Stripe, Gumroad, Itch.io, GitHub Sponsors, Patreon) and VPS-hosted services.

## Non-Goals

- No backend auth or payment processing on the Netlify site itself
- No changes to blog content, markdown files, or content collection schemas
- No changes to the existing darksynthwave theme or visual identity
- No VPS setup or infrastructure work (separate workstream)
- No existing page deletions (everything stays, new pages added around it)

## Architecture

```
baileyburnsed.dev (Netlify — fully static Astro)
│
├── Public pages (existing, unchanged)
│   ├── / (homepage)
│   ├── /blog/ (build log)
│   ├── /about/
│   ├── /socials/
│   └── /legal/
│
├── /products/ (NEW — hub page for all revenue)
│   ├── unlimited-dev (productized service)
│   ├── openclaw (productized service)
│   ├── hermes-management (productized service)
│   ├── boomerbill (SaaS)
│   ├── bulkpost (SaaS)
│   ├── api-service (SaaS)
│   ├── mcp-service (SaaS)
│   ├── games (Itch.io listings)
│   ├── skills (Gumroad listings)
│   └── gallery (3D art, some free, some paid)
│
├── /membership/ (NEW — unified sponsorware + membership tiers)
│
├── /gallery/ (NEW — 3D model viewer)
│
├── /service/ (EXISTING — rewrite copy to match site voice)
│
└── /newsletter/ (EXISTING — add lead magnet CTA)
```

All service delivery, user auth, and payment processing happens on the VPS or third-party platforms. The site is purely a storefront and documentation hub.

## Revenue Streams

### Productized Services (Netlify page → Stripe Payment Link)

| Service | Price | What they get |
|---------|-------|--------------|
| Unlimited Dev Service | $4,000/mo | Full-stack dev, fixed scope, templated delivery |
| OpenClaw | TBD | AI agent setup and management for small biz |
| Hermes Agent Mgmt | TBD | Deploy, run, maintain Hermes for clients |
| Future services | TBD | Same productized model |

Each has a dedicated page explaining scope, process, and pricing. Buy button links to Stripe.

### SaaS Products (Netlify page → VPS-hosted app)

| Product | Subdomain | Status |
|---------|-----------|--------|
| boomerbill | boomerbill.baileyburnsed.dev | Live |
| BulkPost | bulkpost.baileyburnsed.dev | Planned |
| API Service | api.baileyburnsed.dev | Planned |
| MCP Service | mcp.baileyburnsed.dev | Planned |

Each has a landing page with features, screenshots, and a "Launch App" or "Get API Key" link.

### Sponsorware + Memberships (single /membership page)

All tiers on one page, linking to GitHub Sponsors and Patreon:

| Tier | Price | Platform | Perks |
|------|-------|----------|-------|
| Insider | $5/mo | Patreon | Behind-the-scenes, discord role |
| Early Access | $10/mo | GitHub Sponsors | Sponsorware code, vote on roadmap |
| Member | $15/mo | Patreon | Above + group Q&A, digital skill access |
| Builder | $25/mo | GitHub Sponsors | Above + monthly dev call, direct input |
| Patron | $50/mo | Patreon | Above + quarterly 1:1, name on site |
| Sponsor | $100/mo | GitHub Sponsors | Logo on site, dev log shoutout, direct line |

### One-time Sales (external platforms, linked from site)

| Category | Platform | Examples |
|----------|----------|---------|
| Games | Itch.io | 32bit-Spacer, future games |
| Skills/Guides | Gumroad | Indie Dev Stack guide, AI agent playbooks, Neovim workflow |
| 3D Art | Site download + Gumroad | Free previews on site, paid asset packs |

## Pages to Create

### /products/index.astro — Products Hub

- Hero: "Things I build and sell. Pick the lane that fits."
- Sections for each revenue type: Productized Services, SaaS, API/MCP, Games, Skills
- Each section has cards with name, 1-line description, price, and CTA
- Links to individual product pages

### /products/unlimited-dev.astro

- Hero: "Unlimited Dev Service — $4,000/month"
- Scope: what's included (full-stack dev, Django/Vue/React/Astro, fixed sprint scope)
- Anti-scope: what's not included
- Process: onboard → sprint → iterate
- FAQ with schema markup
- CTA: "Subscribe" (Stripe Payment Link) + "Book a Call" (Calendly)

### /products/openclaw.astro

- Hero: "OpenClaw — AI Agents for Small Business"
- What it is: "The WordPress of AI agents" — set up, configure, and maintain AI agents
- Who it's for: small business owners who need AI automation without managing infra
- Process: audit → set up → train → maintain
- Pricing tier TBD
- CTA: "Get Started" (Stripe or Calendly)

### /products/hermes-management.astro

- Hero: "Hermes Agent Management — AI Agent Infrastructure"
- What it includes: VPS setup, agent configuration, tool installation, skill management, updates, uptime monitoring
- Pricing tier TBD
- CTA: "Get Started"

### /products/boomerbill.astro

- Hero: "boomerbill — Billing for Nerds"
- Screenshot or demo
- Features list
- CTA: "Launch App" → boomerbill.baileyburnsed.dev

### /products/bulkpost.astro

- Hero: "BulkPost — Agentic AI Social Media"
- Features, pricing
- CTA: "Launch App" or "Join Waitlist"

### /products/api-service.astro

- Hero: "API-as-a-Service"
- Endpoints available
- Pricing tiers (requests/month)
- Quick-start code example
- CTA: "Get API Key" → VPS portal or Stripe

### /products/mcp-service.astro

- Hero: "MCP-as-a-Service"
- Available MCP servers
- Pricing
- Quick-start example
- CTA: "Get Access"

### /products/games.astro

- Hero: "Games I've Built"
- 32bit-Spacer: description, GIF/trailer, link to Itch.io
- Future games added here
- Each entry: title, description, platform link

### /products/skills.astro

- Hero: "Digital Skills & Resources"
- Each product: title, description, price, Gumroad buy button
- Examples: Neovim Workflow Playbook, AI Agent Build Kit, Indie Dev Stack 2025

### /gallery.astro — 3D Art Gallery

- <model-viewer> web component loading .glb files
- Gallery grid with thumbnails
- Each model: title, description, preview viewer
- Free models downloadable directly
- Paid models link to Gumroad

### /membership.astro — Sponsorware + Membership

- Explains the sponsorware model and all membership tiers
- Single unified page with all $5-$100/mo options
- Each tier: price, perks, platform link (GitHub Sponsors or Patreon)
- FAQ: What is sponsorware? How does early access work? Where does my money go?

## Pages to Modify

### /service.astro (EXISTING)

- Rewrite copy to match site voice
- Focus on Unlimited Dev Service as main offer
- Remove old client projects (Edudate, Dracula, FullerIT)
- Link to /products for full catalog
- Keep the pricing question format but rewrite in authentic voice

### Header.astro (EXISTING)

- Add "Products" nav link
- Add "Membership" nav link
- Add "Gallery" nav link
- Keep "Build Log", "Socials", "Legal" as-is

### Footer.astro (EXISTING)

- Add Products link
- Add Membership link
- Add Gallery link
- Keep existing Sponsor/Patreon/Work With Me links

## Components to Create

- `src/components/products/ProductLayout.astro` — shared layout wrapper for product pages
- `src/components/products/ProductCard.astro` — card for product listings on hub page
- `src/components/products/PricingTable.astro` — reusable pricing tier table
- `src/components/products/CTASection.astro` — CTA block with Stripe link + Calendly
- `src/components/gallery/ModelViewer.astro` — model-viewer wrapper component
- `src/components/membership/TierCard.astro` — membership tier display card

## Implementation Order

1. Create /products hub page + shared product components
2. Create productized service pages (unlimited-dev, openclaw, hermes-management)
3. Create SaaS product pages (boomerbill, bulkpost, api-service, mcp-service)
4. Create games and skills pages (links to Itch.io + Gumroad)
5. Create gallery page with model-viewer
6. Create membership page (sponsorware + tiers)
7. Rewrite existing /service page
8. Update nav and footer
9. Set up Stripe Payment Links
10. Set up Gumroad products
11. Wire VPS subdomains
12. Final build → deploy → verify

## VPS Setup (separate workstream)

Not part of this site build, but needs to happen in parallel:

- Caddy reverse proxy for subdomain routing
- Each SaaS app deployed and accessible at its subdomain
- API gateway service with key generation + rate limiting
- MCP server endpoints
- Stripe webhook handlers for provisioning
- Monitoring

## Risks

- Too many pages could overwhelm visitors — hub page with clear categories mitigates this
- Productized service pricing for OpenClaw and Hermes isn't set yet — mark as "Coming Soon" or "Contact for Pricing"
- Some SaaS products (BulkPost, API/MCP) may not be ready yet — use "Join Waitlist" instead of "Launch"
- Stripe Payment Links require Stripe account setup — already assumed to exist
- 3D models need to be exported as .glb files from Blender — technical skill already present

## Verification

- [ ] npm run build succeeds with no errors
- [ ] All product pages render at their expected URLs
- [ ] Navigation has Products, Blog, Membership, Gallery links
- [ ] All Stripe Payment Links open correctly
- [ ] All Gumroad buy buttons work
- [ ] All Itch.io links open in new tab
- [ ] Gallery models render with model-viewer
- [ ] Service page copy matches the authentic site voice
- [ ] Membership page lists all tiers with correct links
- [ ] Mobile responsive on all new pages
- [ ] No broken links
