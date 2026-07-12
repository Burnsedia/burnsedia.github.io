# Revenue Site — Productized Services & Products

> **For Hermes:** Use subagent-driven-development to implement task-by-task.

**Goal:** Restructure baileyburnsed.dev as a revenue-generating site that sells productized services, SaaS apps, games, skills, memberships, API/MCP access, and sponsorships — all on Netlify static site, with VPS hosting the actual services.

**Architecture:** Pure static Astro on Netlify. The site is the storefront and documentation hub. All actual service delivery (API keys, MCP endpoints, SaaS apps, agent hosting) lives on the VPS. Revenue links go to Stripe, GitHub Sponsors, Patreon, or Gumroad — no backend auth on the site itself.

---

## Revenue Streams Map

```
                    ┌─────────────────────────────────────────────┐
                    │  baileyburnsed.dev (Netlify)                │
                    │  Storefront, Blog, Docs, Art Gallery        │
                    │  No auth, no backend — links to everything  │
                    └─────────────────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┬────────────────────┐
        ▼                      ▼                      ▼                    ▼
 ┌──────────────┐    ┌──────────────────┐    ┌─────────────────┐   ┌─────────────┐
 │ Productized  │    │ SaaS (VPS)       │    │ Sponsorware     │   │ Memberships │
 │ Services     │    │                  │    │ (GitHub Spons)  │   │ & Sponsors  │
 │              │    │ boomerbill       │    │                 │   │             │
 │ Unlimited    │    │ BulkPost         │    │ Code/features   │   │ GitHub Spons│
 │ Dev ($4k/mo) │    │ API-as-a-Service │    │ sponsor-first,  │   │ Patreon     │
 │ OpenClaw     │    │ MCP-as-a-Service │    │ public later    │   │             │
 │ Hermes Mgmt  │    │ [other SaaS]     │    │                 │   │             │
 │ [future ones]│    └──────────────────┘    └─────────────────┘   └─────────────┘
                          │
                          ▼
 ┌─────────────────────────────────────────────────────────────────────────┐
 │ One-time Sales (external platforms, linked from site)                  │
 │ Games on Itch.io  |  Skills/Guides on Gumroad  |  3D Art Asset Packs  │
 └─────────────────────────────────────────────────────────────────────────┘
```

---

## Task 1: Create /products Hub Page

**Objective:** A single `/products` page that lists every revenue stream with descriptions and CTAs. Serves as the main sales landing page.

**Files:**
- Create: `src/pages/products/index.astro`
- Modify: `src/components/shared/Header.astro` (replace "Work With Me" with "Products" dropdown or direct link)
- Modify: `src/components/shared/Footer.astro` (add Products link)

**Page sections:**
1. Hero: "Things I build and sell. Pick the lane that fits."
2. Productized Services section — Unlimited Dev Service, Hermes Management, etc.
3. SaaS Products section — BulkPost, OpenClaw, boomerbill
4. API & MCP Services section
5. Games & Skills section — one-time purchases
6. Memberships & Sponsorships section
7. CTA: "Not sure what you need? Book a 15-min call."

---

## Task 2: Productized Services Pages

**Objective:** Individual pages for each productized service, following the template model (fixed scope, fixed price, templated delivery).

**Files:**
- Create: `src/pages/products/unlimited-dev.astro`
- Create: `src/pages/products/hermes-management.astro`
- Create: `src/components/products/ProductizedService.astro` (template component)

**Productized Service Template (reused across services):**
- Hero: service name and price
- What you get (scope)
- What you don't get (anti-scope)
- Process: how delivery works (onboard → build → iterate)
- CTA: Buy Now (Stripe Payment Link) + Book Call
- FAQ section with schema
- Case studies / social proof

**Unlimited Dev Service** — $4,000/month
- Full-stack development, Django/Vue/React/Astro
- Fixed scope per sprint
- Existing clients, refine the page copy to match your actual voice

**Hermes Agent Management** — pricing TBD
- Deploy, run, monitor, and maintain Hermes Agent for clients
- Includes: server setup, agent configuration, tool installation, skill management, updates, uptime monitoring
- Target: teams who want AI agent infrastructure without managing it themselves

---

## Task 3: SaaS Product Pages

**Objective:** Landing pages for each SaaS product, hosted on Netlify, linking to the VPS-hosted instances.

**Files:**
- Create: `src/pages/products/bulkpost.astro`
- Create: `src/pages/products/boomerbill.astro`
- Create: `src/components/products/SaaSProduct.astro` (template)

**Each SaaS page:**
- Hero: app name + one-liner
- Screenshot or demo GIF
- Key features
- Pricing (or "coming soon" if not ready)
- CTA: "Launch App" (links to VPS subdomain) or "Join Waitlist"

**Subdomain convention for VPS-hosted SaaS:**
- `bulkpost.baileyburnsed.dev`
- `boomerbill.baileyburnsed.dev`
- `api.baileyburnsed.dev` (API service)
- `mcp.baileyburnsed.dev` (MCP service)

---

## Task 4: API & MCP Service Pages

**Objective:** Pages explaining API-as-a-Service and MCP-as-a-Service with documentation and signup links.

**Files:**
- Create: `src/pages/products/api-service.astro`
- Create: `src/pages/products/mcp-service.astro`

**API Service page:**
- What it is: hosted API endpoints for whatever the user specific service does
- Pricing tiers (requests/month)
- Quick start / code example
- Full docs link (could be a docs subdomain on VPS or docsify/docs page)
- CTA: "Get API Key" → links to VPS portal or Stripe checkout

**MCP Service page:**
- What it is: Model Context Protocol servers for AI agents to consume
- Available MCP servers (list with descriptions)
- Pricing per endpoint or bundled
- Quick start example
- Docs link

---

## Task 5: Games & Skills Store

**Objective:** Sell your games and digital skills/products.

**Files:**
- Create: `src/pages/products/games.astro`
- Create: `src/pages/products/skills.astro`
- Create: `src/pages/products/gallery.astro`

**Games page:**
- 32bit-Spacer on Itch.io
- Future games
- Future games
- Each game: trailer/GIF, description, buy link

**Skills page:**
- Digital products (guides, playbooks, templates, tool configs)
- Sold via Gumroad (handles delivery + payments)
- Examples: "Indie Dev Stack 2025 Guide", "Neovim Workflow Playbook", "AI Agent Build Templates"
- Each: title, description, price, Gumroad buy button

**Gallery page:**
- 3D models via `<model-viewer>` component
- Free previews, some available as paid asset packs
- Let people orbit/zoom the models in browser
- No backend needed — models stored in /public/models/

---

## Task 6: Sponsorware + Membership & Sponsorship

**Objective:** Pages explaining the sponsorware model (sponsor-first, public later) plus membership/sponsorship tiers.

**Files:**
- Create: `src/pages/sponsorware.astro`
- Create: `src/pages/membership.astro`
- Modify: `src/components/shared/Header.astro`

**Sponsorware page:**
- Hero: "Sponsor first. Ships to everyone eventually."
- How it works: code/features release to GitHub Sponsors first, become public later
- Current sponsorware projects and what's in early access
- Roadmap preview (sponsors vote on what's built next)
- CTA: "Sponsor on GitHub → get early access"
- FAQ

**Sponsorware tiers (GitHub Sponsors):**
| Tier | Price | Perks |
|------|-------|-------|
| Early Access | $10/mo | Sponsorware code access, vote on roadmap, early builds |
| Builder | $25/mo | Above + monthly dev call, direct input on what ships next |

**Membership tiers (Patreon):**
| Tier | Price | Perks |
|------|-------|-------|
| Insider | $5/mo | Behind-the-scenes posts, discord role |
| Member | $15/mo | Above + monthly group Q&A, digital skill access |
| Patron | $50/mo | Above + quarterly 1:1, name on site, priority support |

**Sponsorship (GitHub Sponsors):**
| Tier | Price | Perks |
|------|-------|-------|
| Sponsor | $100/mo | Logo on site, dev log shoutout, direct line |

## VPS Setup (separate workstream from site changes)

These are NOT site changes — they're what the VPS needs to run in parallel:
1. Subdomain routing (Caddy reverse proxy or Nginx)
2. SaaS app instances (BulkPost, boomerbill, OpenClaw)
3. API gateway service (key generation, rate limiting, billing webhooks)
4. MCP server endpoints
5. Stripe webhook handlers (provision access on payment)
6. Monitoring and uptime

---

## Execution Order

1. Create `/products` hub page
2. Rewrite `/service` page with your actual voice
3. Create product pages (Unlimited Dev, Hermes Mgmt, SaaS)
4. Create API & MCP pages
5. Create Sponsorware page
6. Create Games & Skills store pages (Itch.io + Gumroad)
7. Create Gallery page with model-viewer
8. Create Membership & Sponsorship page
9. Update navigation
10. Set up Stripe Payment Links
11. Wire domain/subdomains to VPS

---

## Verification

- [ ] npm run build succeeds
- [ ] All product pages render at expected URLs
- [ ] All external links (Stripe, Gumroad, Patreon, GitHub Sponsors) work
- [ ] model-viewer renders 3D models on gallery page
- [ ] Navigation clearly guides visitors to products
- [ ] Service page voice matches the rest of the site
- [ ] No broken links or 404s
- [ ] Mobile responsive on all new pages