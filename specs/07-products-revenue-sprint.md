# Products Revenue Sprint — 30-Day Implementation Specification

## Objective
Reach $3k MRR within 30 days by adding product pages, content upgrades, and retainer offering to the existing baileyburnsed.dev blog — with minimal time investment (<6 hours/week recurring).

## North Star
First paying customer within 14 days. $3k MRR by day 30. 3+ revenue streams active and mostly passive.

## Revenue Target

| Stream | Price | Est. Sales/Mo | Revenue |
|--------|-------|--------------|---------|
| Office Hours Retainer | $1,500/mo | 1 | $1,500 |
| Skill Bundle (Gumroad) | $47 | 10 | $470 |
| Django Course (Gumroad) | $49 | 6 | $294 |
| Newsletter Sponsorship | $300/wk | 1 sponsor | $300 |
| GitHub Sponsors | $10-25/mo | 5 | ~$100 |
| Patreon | $5-15/mo | 8 | ~$100 |
| **TOTAL** | | | **~$2,764** |

**Note:** A single retainer client at $1,500/mo covers 50% of target. Add 10-15 digital product sales per month and one sponsored newsletter slot to cross $3k.

## Requirements

### 1. Products Hub (`/products`) — Day 1-2
- Central landing page listing all 6 revenue streams
- ProductCard component: title, description, price, badge, CTA
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Sections: Services, Digital Products, Memberships, Sponsorships
- BreadcrumbList schema
- Bottom CTA: "Not sure? Ask me" link

### 2. Office Hours Retainer (`/products/retainer`) — Day 2-4
- $1,500/mo for 4 hours/week of async advisory
- Features: code review, architecture guidance, Slack/Loom async
- Anti-scope: no full-time dev, no scheduled calls unless wanted
- FAQ with expandable details
- PricingCard component with highlighted "Most Popular" tier
- Stripe payment link (from `src/consts.ts`)
- FAQPage JSON-LD schema
- Link to Unlimited Dev ($4k/mo) for larger scope

### 3. Skill Bundle Page (`/products/skills`) — Day 2-3
- $47, Gumroad-delivered
- 5 Hermes Agent skills listed with descriptions
- How-it-works: purchase → unzip → import → use
- Docs link for reference

### 4. Course Page (`/products/courses`) — Day 2-3
- $49, Gumroad-delivered PDF
- All 9 Django SaaS course lessons listed
- What-you-get section
- Link to free lessons on `/courses/`

### 5. Sponsor Page (`/sponsor`) — Day 3-5
- $300/wk newsletter sponsorship slot
- Audience stats: founders, indie devs, operators; topics: AI, SaaS, Django, cloud
- PricingCard with sponsorship tier
- Contact: mailto link

### 6. Navigation — Day 3-4
- "Products" link in Header (desktop + mobile dropdown)
- "Products" link in Footer "Site" nav section
- Visible on all pages

### 7. Blog Content Upgrades — Day 5-7
- ProductCtaCard component with tag-based product targeting
- Tag mapping: ai-agents/dev-tools → skills, django/saas/api → course, case-study/cloud/business → retainer
- One card per blog post, below newsletter CTA
- Same visual style as existing NewsletterCtaCard

### 8. Course Purchase CTAs — Day 5-6
- "Buy Full Course — $49" button on course directory page
- "Buy Full Course — $49" button on individual course pages
- Links to Gumroad

### 9. One-Time Setup (External)
- Create Gumroad products:
  - "Hermes Agent Skill Bundle" ($47) with .zip file
  - "Django SaaS Foundations" ($49) with PDF
- Verify Stripe payment link for $1,500/mo works
- Optional: Create Patreon tiers if not existing

## Week-by-Week Plan

### Week 1: Ship Products Pages
- Day 1-2: Create `/products` hub + ProductCard component
- Day 2-3: Create retainer, skills, courses product pages
- Day 3-5: Create sponsor page + navigation changes
- Day 5-7: Blog content upgrades + course CTAs
- External: Create Gumroad products, verify Stripe link

### Week 2: Activate
- Set up Gumroad products (skill bundle + course)
- Add content upgrades to 3 existing blog posts manually
- Ensure all external payment links resolve correctly
- Write 1 "sales-enabled" blog post (promotes a product)

### Week 3: Distribute
- Cross-post to X: thread from each blog post linking to products
- Email newsletter with launch announcement + special offer
- Follow up with 5-10 warm leads
- Write second sales-enabled post

### Week 4: Close & Optimize
- Offer launch discount (20% off first month of retainer)
- Check analytics: which product pages get traffic?
- Follow up with newsletter subscribers who clicked but didn't buy
- Write third sales-enabled post

## Time Commitment

| Activity | One-Time | Recurring/Week |
|----------|----------|-----------------|
| Product page creation | 8 hours | — |
| Navigation + CTAs | 3 hours | — |
| Gumroad setup | 2 hours | — |
| Blog writing (3 posts) | 9 hours | 3 hours |
| X posting | — | 15 min |
| Retainer delivery (if client) | — | 4 hours |
| Newsletter sponsorship mgmt | — | 30 min |
| **Total** | **22 hours** | **~5 hours** |

## Acceptance Criteria
- [ ] `npm run build` succeeds
- [ ] `/products` renders with 6 product cards in grid
- [ ] `/products/retainer` renders with pricing, FAQ, Stripe CTA
- [ ] `/products/skills` renders with Gumroad CTA
- [ ] `/products/courses` renders with Gumroad CTA
- [ ] `/sponsor` renders with audience stats
- [ ] Header + Footer show "Products" link on desktop + mobile
- [ ] Blog posts with matching tags show ProductCtaCard
- [ ] Course pages show "Buy Full Course" CTA
- [ ] No broken links or 404s
- [ ] First customer acquired within 14 days
- [ ] $3k MRR within 30 days (or on trajectory)

## Files to Create
- `src/pages/products/index.astro`
- `src/pages/products/retainer.astro`
- `src/pages/products/skills.astro`
- `src/pages/products/courses.astro`
- `src/pages/sponsor.astro`
- `src/components/products/ProductCard.astro`
- `src/components/products/PricingCard.astro`
- `src/components/shared/ProductCtaCard.astro`

## Files to Modify
- `src/consts.ts` — add product URLs
- `src/components/shared/Header.astro` — add Products link
- `src/components/shared/Footer.astro` — add Products nav
- `src/layouts/BlogPost.astro` — add ProductCtaCard
- `src/pages/courses/index.astro` — add purchase CTA
- `src/pages/courses/[course]/index.astro` — add purchase CTA

## Risks
| Risk | Mitigation |
|------|-----------|
| No retainer client in first month | Focus on digital products + newsletter sponsor to hit $1.5k via volume |
| Gumroad products don't sell | Price elasticity: test $27, $37, $47. Bundle with email course |
| Low traffic to new pages | Cross-post on X, include in newsletter, interlink from blog |
| Stripe payment link incorrect | Test with a $1 payment before going live |
