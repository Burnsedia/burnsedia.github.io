# Products & Revenue Specification

## Objective
Turn baileyburnsed.dev from a blog-only site into a revenue-generating storefront with clear purchase pathways for productized services, digital products, memberships, and sponsorships.

## North Star
$3k MRR from 3+ revenue streams, achieved with <6 hours/week maintenance. No new infrastructure beyond Netlify + external payment platforms.

## Revenue Streams Map

```
baileyburnsed.dev (Netlify — storefront only, no auth/backend)
├── Productized Services → Stripe
│   ├── Unlimited Dev ($4k/mo) — existing, full-stack
│   ├── Office Hours Retainer ($1.5k/mo) — new, 4h/week advisory
│   └── Hermes Agent Management (TBD) — future
├── Digital Products → Gumroad
│   ├── Hermes Agent Skill Bundle ($47) — new
│   └── Django SaaS Course ($49) — new
├── Memberships → GitHub Sponsors, Patreon
│   ├── GitHub Sponsors ($10-25/mo)
│   └── Patreon ($5-50/mo)
└── Sponsorships — direct
    └── Newsletter sponsorship ($300/wk)
```

## Requirements

### 1. Products Hub (`/products`)
- Central landing page listing all revenue streams
- ProductCard component: title, description, price, badge, CTA link
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Sections: Services, Digital Products, Memberships, Sponsorships
- BreadcrumbList schema
- CTA: "Not sure? Ask me" fallback

### 2. Office Hours Retainer (`/products/retainer`)
- Pricing: $1,500/mo for 4h/week
- Stripe payment link (centralized in `src/consts.ts`)
- Features list: async-first, code review, architecture guidance, no meetings required
- FAQ section with expandable details
- Anti-scope: what's NOT included (full-time dev, weekly calls)
- Link to Unlimited Dev Service for larger scope
- FAQPage JSON-LD schema

### 3. Hermes Agent Skill Bundle (`/products/skills`)
- Gumroad product: $47, instant download
- 5 skills listed with descriptions
- How-it-works section: purchase → unzip → import → use
- Link to Hermes docs
- BreadcrumbList schema

### 4. Django SaaS Course (`/products/courses`)
- Gumroad product: $49, PDF download
- All 9 lessons listed with descriptions
- What-you-get section
- BreadcrumbList schema
- Link to free lessons on `/courses/`

### 5. Newsletter Sponsorship (`/sponsor`)
- Media kit with audience stats (roles, topics, format)
- Single tier: $300/wk per slot
- Include: sponsor section in newsletter, social mention, RSS inclusion
- Exclude: dedicated email send, multiple placements
- Contact CTA: email link

### 6. Products Navigation
- "Products" link in Header (desktop + mobile)
- "Products" link in Footer Site nav
- Visible on all pages

### 7. Content Upgrades in Blog
- ProductCtaCard component: relevant product offer per blog post
- Tag-to-product mapping: ai-agents/dev-tools → skills, django/saas/api → course, case-study/cloud/business → retainer
- One card per post, below newsletter CTA
- Same visual style as NewsletterCtaCard

### 8. Course Page CTAs
- Course directory page + individual course page
- "Buy Full Course — $49" button linking to Gumroad
- Below free lesson content

## Acceptance Criteria
- [ ] `npm run build` succeeds
- [ ] `/products` renders with 6 product cards in grid
- [ ] `/products/retainer` renders with pricing card, FAQ, Stripe CTA
- [ ] `/products/skills` renders with skill list, Gumroad CTA
- [ ] `/products/courses` renders with lesson list, Gumroad CTA
- [ ] `/sponsor` renders with audience stats, sponsorship CTA
- [ ] Header + Footer show "Products" link
- [ ] Blog posts with matching tags show ProductCtaCard
- [ ] Course pages show "Buy Full Course" CTA
- [ ] All external links resolve (Gumroad, Stripe, Patreon, GitHub Sponsors)
- [ ] No broken links or 404s

## Revenue Target (Conservative Monthly)

| Stream | Price | Est. Sales | Revenue |
|--------|-------|-----------|---------|
| Office Hours Retainer | $1,500/mo | 1 | $1,500 |
| Skill Bundle (Gumroad) | $47 | 10 | $470 |
| Django Course (Gumroad) | $49 | 6 | $294 |
| Newsletter Sponsorship | $300/wk | 1 | $300 |
| GitHub Sponsors | $10-25/mo | 5 | ~$100 |
| Patreon | $5-15/mo | 8 | ~$100 |
| **TOTAL** | | | **~$2,764** |

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
- `src/consts.ts` — add Gumroad, Stripe, sponsor URLs
- `src/components/shared/Header.astro` — add Products link
- `src/components/shared/Footer.astro` — add Products link
- `src/layouts/BlogPost.astro` — add ProductCtaCard
- `src/pages/courses/index.astro` — add purchase CTA
- `src/pages/courses/[course]/index.astro` — add purchase CTA
