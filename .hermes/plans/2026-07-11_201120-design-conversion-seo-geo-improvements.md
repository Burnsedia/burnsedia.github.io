# Design, Conversion & SEO/GEO Improvement Plan

> **For Hermes:** Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Fix the design issues that hurt credibility and conversion, add structured data for SEO/GEO, and create clear purchase pathways for all revenue streams — while keeping the current theme, logo, and assets the user likes.

**Architecture:** All changes are additive to the existing Astro 5 + Tailwind v4 + DaisyUI stack. No framework changes, no redesign — fixing broken sections, adding structured data, and building product pages on top of what already works.

**Tech Stack:** Astro 5, Tailwind CSS v4, DaisyUI 5, TypeScript strict, JSON-LD structured data, GA4

**Current design state (from live site audit):**
- Good: darksynthwave theme, "I build shit that works" tagline, hexagon logo, blog layout, project cards, stats animation, overall voice
- Broken: hero layout cuts off typing animation, stats numbers aren't credible, 6 empty cards in "building in public" section, every interior page repeats the same hero template, service page voice doesn't match the rest of the site
- Missing: product catalog, membership page, art gallery, newsletter lead magnet, FAQ schema, 404 page, internal content linking

---

### Task 1: Fix the Hero Layout

**Objective:** Fix the hexagon+text layout issue where the typing animation gets truncated ("Fou" visible instead of "Founders") and the hero feels cramped.

**Files:**
- Modify: `src/components/homepage/HomeHero.astro`
- Modify: `src/components/shared/HeroTyping.astro` (if min-width calculation is wrong)

**Current problem:** The hexagon logo takes ~2/3 width on desktop, leaving the text column cramped. The typing animation's min-width `ch` calculation might not account for the actual container width, causing truncation.

**Step 1: Fix the layout**

Replace the `flex-col lg:flex-row` with a stacked layout on all sizes, or reduce the hexagon container width so text has room:

```astro
<!-- Before: w-2/3 sm:w-full md:w-2/3 -->
<!-- After: -->
<div class="w-full max-w-xs mx-auto mask mask-hexagon ring ring-info ring-offset-4 ring-offset-info p-2 mt-5">
  <HeroLogo />
</div>
```
Change from `w-2/3 sm:w-full md:w-2/3` to `w-full max-w-xs mx-auto` so the hexagon caps at a reasonable size and the text gets the remaining space naturally.

**Step 2: Fix HeroTyping min-width**

In `HeroTyping.astro`, the `maxChars` calculation uses `phrase.length` but doesn't account for the `prefix`. The min-width should include the prefix length:

```typescript
// Before:
const maxChars = Math.max(...sanitizedPhrases.map((phrase) => phrase.length), firstPhrase.length, 1);
// After:
const prefixLength = (prefix ?? '').length;
const maxChars = Math.max(...sanitizedPhrases.map((phrase) => phrase.length + prefixLength), firstPhrase.length + prefixLength, 1);
```

**Step 3: Simplify hero CTAs**

Move the CTA buttons out of the text column and below the entire hero block for cleaner separation:

```astro
<div class="mt-6 flex flex-wrap gap-3 justify-center">
  <a href="/products" class="btn btn-primary">See What I Build</a>
  <a href="/blog" class="btn btn-outline btn-accent">Follow My Builds</a>
</div>
```

**Verification:** Typing animation shows full phrases. Hero renders cleanly on mobile and desktop. `npm run build` succeeds.

---

### Task 2: Fix Broken Stats Section

**Objective:** Remove the unconvincing fake stats and the 6 empty article wrappers. Replace with real, verifiable metrics.

**Files:**
- Modify: `src/components/homepage/HomeStats.astro`

**Step 1: Replace fake stats with real ones**

Current stats ("Client projects shipped: 100%", "Public repos maintained: 95+") aren't believable. Replace with verifiable metrics:

```typescript
const stats = [
  { label: 'Years coding', value: 15, suffix: '+' },
  { label: 'Blog posts', value: 18, suffix: '' },
  { label: 'GitHub stars across repos', valueText: '150+' },
  { label: 'PyATL co-organizer since', value: 2023 },
  { label: 'Newsletter subscribers', valueText: 'Growing weekly' },
  { label: 'Apps, games & tools built', value: 12, suffix: '+' },
];
```

**Step 2: Remove empty article wrappers**

Delete the 6 empty `<article>` elements that show up in the accessibility tree with no content. These are likely placeholder cards that were never filled in.

**Step 3: Simplify the section**

If there aren't 6 real stats worth showing, reduce to 3-4 cards. Quality over quantity.

**Verification:** No empty elements in the "Building in public" section. Stats are credible. `npm run build` succeeds.

---

### Task 3: Create Product Hub Page

**Objective:** Build `/products/` as the main conversion landing page listing all revenue streams with clear CTAs.

**Files:**
- Create: `src/pages/products/index.astro`
- Create: `src/components/products/ProductCard.astro`

**Step 1: Create ProductCard component**

```astro
---
interface Props {
  title: string;
  description: string;
  price: string;
  type: 'service' | 'saas' | 'api' | 'game' | 'skill' | 'membership';
  href: string;
  badge?: string;
}
const { title, description, price, type, href, badge } = Astro.props;
const typeLabels: Record<string, string> = {
  service: 'Productized Service',
  saas: 'SaaS',
  api: 'API / MCP',
  game: 'Game',
  skill: 'Digital Skill',
  membership: 'Membership',
};
---
<a
  href={href}
  class="group p-5 border border-base-content/10 bg-base-100/5 hover:border-primary hover:bg-base-100/10 transition-all rounded-box flex flex-col gap-2"
>
  <div class="flex items-center justify-between">
    <span class="text-xs uppercase tracking-wide text-primary">{typeLabels[type]}</span>
    {badge && <span class="badge badge-sm badge-primary">{badge}</span>}
  </div>
  <h3 class="text-lg font-bold group-hover:text-primary transition-colors">{title}</h3>
  <p class="text-sm text-base-content/70 flex-1">{description}</p>
  {price && <p class="text-sm font-mono text-accent mt-2">{price}</p>}
</a>
```

**Step 2: Create Products page**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProductCard from '../../components/products/ProductCard.astro';
import { SITE_TITLE } from '../../consts';

const productizedServices = [
  { title: 'Unlimited Dev Service', description: 'Full-stack development. Fixed scope. Flat $4k/month. No hourly tracking, no scope creep games.', price: '$4,000/mo', type: 'service' as const, href: '/products/unlimited-dev/', badge: 'Active' },
  { title: 'OpenClaw', description: 'AI agent setup and management for small businesses. The WordPress of AI agents.', price: 'Contact for pricing', type: 'service' as const, href: '/products/openclaw/', badge: 'New' },
  { title: 'Hermes Agent Management', description: 'Deploy, run, and maintain Hermes AI agents for your team. Infrastructure included.', price: 'Contact for pricing', type: 'service' as const, href: '/products/hermes-management/' },
];

const saasProducts = [
  { title: 'boomerbill', description: 'Billing and labor tracking for nerds tired of unpaid tech support. Local-first, no lock-in.', price: 'Live — launch app', type: 'saas' as const, href: 'https://boomerbill.baileyburnsed.dev/' },
  { title: 'BulkPost', description: 'Agentic AI social media automation. Schedule, publish, and manage across platforms.', price: 'Coming soon', type: 'saas' as const, href: '/products/bulkpost/', badge: 'Waitlist' },
  { title: 'API Service', description: 'Hosted API endpoints with rate limiting, key management, and usage tracking.', price: 'Tiered pricing', type: 'api' as const, href: '/products/api-service/' },
  { title: 'MCP Service', description: 'Model Context Protocol servers for AI agents to consume. Plug in and query.', price: 'Tiered pricing', type: 'api' as const, href: '/products/mcp-service/' },
];

const games = [
  { title: '32bit-Spacer', description: 'Retro-futurist space game built in Godot. Playable systems in active development.', price: 'On Itch.io', type: 'game' as const, href: 'https://burnsedia.itch.io/' },
];

const skills = [
  { title: 'Indie Dev Stack 2025', description: 'The exact tools, configs, and workflows I use to ship software.', price: '$9.99', type: 'skill' as const, href: 'https://gumroad.com/burnsedia' },
];
---
<BaseLayout title="Products | {SITE_TITLE}" description="Things I build and sell — productized services, SaaS apps, games, and digital skills." canonical="/products/">
  <!-- Hero -->
  <section class="w-full py-16 noise">
    <div class="mx-auto w-full max-w-5xl px-4">
      <h1 class="text-4xl sm:text-5xl font-bold">Things I build and sell.</h1>
      <p class="text-lg text-base-content/70 mt-4 max-w-2xl">Productized services, SaaS apps, API/MCP access, games, and digital skills. Pick the lane that fits.</p>
    </div>
  </section>

  <!-- Productized Services -->
  <section class="w-full py-12 noise">
    <div class="mx-auto w-full max-w-5xl px-4">
      <h2 class="text-2xl font-bold mb-2">Productized Services</h2>
      <p class="text-sm text-base-content/60 mb-6">Fixed scope, fixed price. I do the work.</p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productizedServices.map(s => <ProductCard {...s} />)}
      </div>
    </div>
  </section>

  <!-- SaaS & API -->
  <section class="w-full py-12 noise">
    <div class="mx-auto w-full max-w-5xl px-4">
      <h2 class="text-2xl font-bold mb-2">SaaS &amp; API Services</h2>
      <p class="text-sm text-base-content/60 mb-6">Self-serve apps running on my infra.</p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {saasProducts.map(s => <ProductCard {...s} />)}
      </div>
    </div>
  </section>

  <!-- Games & Skills -->
  <section class="w-full py-12 noise">
    <div class="mx-auto w-full max-w-5xl px-4">
      <h2 class="text-2xl font-bold mb-2">Games &amp; Skills</h2>
      <p class="text-sm text-base-content/60 mb-6">One-time purchases. Pay once, own forever.</p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map(s => <ProductCard {...s} />)}
        {skills.map(s => <ProductCard {...s} />)}
      </div>
    </div>
  </section>

  <!-- Bottom CTA -->
  <section class="w-full py-16 text-center noise">
    <div class="mx-auto w-full max-w-2xl px-4">
      <h2 class="text-2xl font-bold mb-4">Not sure what you need?</h2>
      <p class="text-base-content/70 mb-6">15-minute call, no pressure. I'll point you at the right thing or tell you if I'm not a fit.</p>
      <a href="https://calendly.com/baileyburnsed/15min" class="btn btn-primary">Book a 15-minute call</a>
    </div>
  </section>
</BaseLayout>

```

**Verification:** Page renders at `/products/`. All links work. Grid layout responsive on mobile. `npm run build` succeeds.

---

### Task 4: Rewrite Service Page Voice

**Objective:** Rewrite the existing `/service/` page so it sounds like the same person who wrote "I build shit that works" — not a generic sales page.

**Files:**
- Modify: `src/pages/service.astro` (frontmatter copy and component imports)
- Modify or replace: `src/components/marketing/Hero.astro` (the service page hero)

**Step 1: Update the page frontmatter**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { SITE_TITLE } from '../../consts';
---
<BaseLayout
  title="Unlimited Dev Service | {SITE_TITLE}"
  description="Flat-rate full-stack development. $4,000/month. No hourly tracking, no scope creep, no agency bloat."
  canonical="/service/"
>
```

**Step 2: Replace the hero section**

Replace "I Build Software for:" typing gimmick with a direct headline that matches the homepage:

```astro
<section class="w-full py-16 noise">
  <div class="mx-auto w-full max-w-5xl px-4">
    <h1 class="text-4xl sm:text-5xl font-bold">Flat-rate development, no bullshit.</h1>
    <p class="text-lg text-base-content/70 mt-4 max-w-2xl">
      $4,000/month. Full-stack. Fixed scope per sprint. No hourly tracking, no agency layers, no lock-in.
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a href="https://buy.stripe.com/[YOUR_LINK]" class="btn btn-primary">Subscribe Now</a>
      <a href="https://calendly.com/baileyburnsed/15min" class="btn btn-outline">Book a Call First</a>
    </div>
  </div>
</section>
```

**Step 3: Explain the offer in your actual voice**

Keep the Q&A format ("How much does it cost to build a mobile app? $4000/month") but rewrite in first-person, direct voice:

```html
<section class="w-full py-12">
  <div class="mx-auto w-full max-w-3xl px-4 space-y-8">
    <div class="p-5 border border-base-content/10 rounded-box">
      <h3 class="font-bold">What do I get for $4k/month?</h3>
      <p class="text-base-content/70 mt-2">A senior full-stack developer who ships. Django, Vue, React, Astro — whatever your stack needs. One sprint at a time, clear scope, no surprises.</p>
    </div>
    <div class="p-5 border border-base-content/10 rounded-box">
      <h3 class="font-bold">How is this different from hiring an agency?</h3>
      <p class="text-base-content/70 mt-2">No account managers. No sales pipeline. No 3-month onboarding. You talk directly to the person writing the code.</p>
    </div>
    <div class="p-5 border border-base-content/10 rounded-box">
      <h3 class="font-bold">What if I need less than a month?</h3>
      <p class="text-base-content/70 mt-2">Book a call. I do fixed-scope sprints too — sometimes a 2-week push is all you need. We'll figure out the right shape.</p>
    </div>
  </div>
</section>
```

**Step 4: Remove irrelevant old projects**

Remove Edudate, Dracula, FullerIT, NerdTime, Virtue Tracker, LunarVim from the service page. These are old projects that don't represent the current offer.

**Step 5: Replace the bio section**

Replace the third-person bio ("Bailey Burnsed is a senior software engineer with over eight years of experience...") with your actual first-person voice from the rest of the site.

**Verification:** Service page reads like the same person who wrote the homepage. `npm run build` succeeds.

---

### Task 5: Add FAQ Schema for GEO

**Objective:** Inject FAQPage JSON-LD structured data on service/product pages so AI search engines can pull answers directly into generative results.

**Files:**
- Create: `src/components/shared/FAQSchema.astro`
- Modify: `src/pages/service.astro` (add FAQ schema)
- Modify: `src/pages/consulting.astro` (if it exists)
- Modify: `src/pages/products/unlimited-dev.astro` (when created)

**Step 1: Create FAQSchema component**

```astro
---
interface FAQItem {
  question: string;
  answer: string;
}
interface Props {
  items: FAQItem[];
}
const { items } = Astro.props;
if (!items || items.length === 0) return;
---
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(item => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
})}
</script>
```

**Step 2: Add FAQ data to service page**

```astro
<FAQSchema items={[
  { question: "What does the Unlimited Dev Service include?", answer: "Full-stack software development using Python, Django, Vue.js, React, and Astro. Clear sprint scope, flat $4,000/month pricing, and direct communication with the developer." },
  { question: "How is this different from hiring an agency?", answer: "You work directly with me — no account managers, no sales team, no 3-month onboarding. One developer, one point of contact, clear delivery." },
  { question: "Can I cancel anytime?", answer: "Yes. Month-to-month. No long-term contracts, no exit fees." },
  { question: "Do you work with early-stage startups?", answer: "Yes — most of my clients are founders with technical products who need senior execution without hiring a full team." },
  { question: "What technologies do you use?", answer: "Python, Django, Vue.js, React, Astro, Tailwind CSS, PostgreSQL, Docker, and whatever else fits the problem. I don't force a stack." },
]} />
```

**Step 3: Add FAQ data to product pages**

Each productized service and SaaS page gets its own FAQPage schema with 4-8 questions specific to that product.

**Verification:** Google Rich Results Test shows FAQ schema. Generative AI queries about the service pull from these answers.

---

### Task 6: Add HowTo Schema for Blog Posts

**Objective:** Add HowTo structured data to tutorial-style blog posts so AI search engines can surface step-by-step instructions in generative results.

**Files:**
- Create: `src/components/shared/HowToSchema.astro`
- Modify: `src/layouts/BlogPost.astro` (conditionally render HowTo schema)

**Step 1: Create HowToSchema component**

```astro
---
interface Step {
  name: string;
  text: string;
  url?: string;
  image?: string;
}
interface Props {
  name: string;
  description: string;
  steps: Step[];
  totalTime?: string;
}
const { name, description, steps, totalTime } = Astro.props;
if (!steps || steps.length === 0) return;
---
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  description,
  "totalTime": totalTime,
  step: steps.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.name,
    text: step.text,
    url: step.url,
    ...(step.image ? { image: step.image } : {})
  }))
})}
</script>
```

**Step 2: Identify tutorial posts for HowTo schema**

Posts suitable for HowTo:
- `/blog/neovim-made-me-twice-as-fast/` — has clear numbered steps
- `/blog/Godot-for-Python-Programmers/` — tutorial structure
- `/blog/Python-Pytest/` — tutorial structure
- `/blog/SaaS-Checklist/` — checklist format

**Step 3: Conditionally add HowTo to BlogPost layout**

Either add frontmatter field to blog posts (`schema: 'howto'`) or detect based on tags.

**Verification:** HowTo schema validates on tutorial posts. Rich Results Test passes.

---

### Task 7: Fix Content Silos & Internal Linking

**Objective:** Organize blog posts into topical clusters with internal links from supporting posts to pillar pages. Improves SEO topical authority.

**Files:**
- Create: `src/utils/silos.ts`
- Modify: `src/pages/blog/[...slug].astro` (add cluster banner)
- Modify: `src/content/blog/*.md` (add internal links)

**Step 1: Create silo mapping**

```typescript
export interface ContentSilo {
  pillar: string;
  label: string;
  description: string;
  posts: string[];
}

export const SILOS: ContentSilo[] = [
  {
    pillar: 'ai-agents-for-solo-teams-playbook',
    label: 'AI Agents for Solo Teams',
    description: 'Practical implementation playbook for solo devs and founders.',
    posts: ['the-ai-agent-stack-for-solo-developers', 'bulkpost-2-agentic-ai-social-media', '7-powerful-ways-to-use-ai-agents-to-make-more-money'],
  },
  {
    pillar: 'indie-saas-growth-playbook',
    label: 'Indie SaaS Growth',
    description: 'End-to-end growth system for solo founders.',
    posts: ['from-mvp-to-mrr-how-to-productize-your-side-projects', 'the-indie-developer-stack-2025', 'pricing-strategy-for-developers-who-think-too-much', 'why-i-charge-4000-a-month', 'the-one-developer-agency-model'],
  },
  {
    pillar: 'self-hosting-playbook-for-small-saas',
    label: 'Self-Hosting & Infrastructure',
    description: 'Decision framework and migration path for owning your infra.',
    posts: ['own-dont-rent-the-hidden-cost-of-saas', 'own-dont-rent-10-self-host-tools-for-small-business', 'self-hosting-as-a-service-how-i-run-client-saas-on-fly', 'the-5-dollar-vps-stack-that-scales-to-the-cloud', '5-dollar-vps-challenge', '5-dollar-flyio-stack'],
  },
  {
    pillar: 'the-art-of-building-in-public',
    label: 'Building in Public',
    description: 'Repeatable system for content and trust building.',
    posts: ['why-i-work-in-public', 'why-open-source-is-my-marketing-strategy', 'the-future-of-indie-agencies-is-open-source'],
  },
];
```

**Step 2: Add cluster banner to blog posts**

In `src/pages/blog/[...slug].astro`, after the title, check if the post belongs to a silo and show:

```astro
{postSilo && (
  <div class="mt-4 p-3 border border-primary/20 bg-primary/5 rounded-box text-sm">
    Part of the <a href={`/blog/${postSilo.pillar}/`} class="link link-primary font-semibold">{postSilo.label}</a> series.
    <a href={`/blog/${postSilo.pillar}/`} class="link ml-2">Start here →</a>
  </div>
)}
```

**Step 3: Add contextual links in blog markdown**

Add in-body links from each supporting post to its pillar post. One link in the first third of the content.

**Verification:** All supporting posts link to their pillar. Blog index shows cluster sections. No orphaned content. `npm run build` succeeds.

---

### Task 8: Add Schema Markup to Interior Pages

**Objective:** Add BreadcrumbList, ItemList, and WebPage schemas to interior pages that are currently missing them.

**Files:**
- Modify: `src/components/shared/BaseHead.astro` (improve Person schema)
- Modify: `src/pages/about.astro` (add BreadcrumbList)
- Modify: `src/pages/socials.astro` (add BreadcrumbList)
- Create: `src/pages/404.astro` (terminal-themed 404 with schema)

**Step 1: Expand Person schema in BaseHead**

```typescript
// Add to existing Person schema
knowsAbout: [
  "https://en.wikipedia.org/wiki/Software_development",
  "https://en.wikipedia.org/wiki/Artificial_intelligence",
  "https://en.wikipedia.org/wiki/Cloud_computing",
  "https://en.wikipedia.org/wiki/Open-source_software",
],
sameAs: [
  "https://github.com/Burnsedia",
  "https://www.linkedin.com/in/bailey-burnsed-50051115a/",
  "https://x.com/baileyburnsed",
  "https://patreon.com/burnsedia",
  "https://burnsedia.itch.io/",
],
```

**Step 2: Add BreadcrumbList to interior pages**

Each page that doesn't have one should get a basic BreadcrumbList schema pointing: Home > Page Name.

**Step 3: Create 404 page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="404 — Command Not Found | baileyburnsed.dev" description="The page you're looking for doesn't exist." robots="noindex, follow">
  <section class="w-full py-24 text-center noise">
    <div class="mx-auto w-full max-w-xl px-4">
      <pre class="text-left text-base-content/60 font-mono text-sm mb-8 leading-relaxed">
┌──────────────────────────────────────┐
│  404: command not found              │
│                                      │
│  The page you're looking for         │
│  doesn't exist on this server.       │
│                                      │
│  Did you mean one of these?          │
│    /products/    — things I build    │
│    /blog/        — build log         │
│    /membership/  — support the work  │
│    /gallery/     — 3D art            │
└──────────────────────────────────────┘
      </pre>
      <div class="flex flex-wrap gap-3 justify-center mt-8">
        <a href="/" class="btn btn-primary">Home</a>
        <a href="/products/" class="btn btn-outline">Products</a>
        <a href="/blog/" class="btn btn-ghost">Build Log</a>
      </div>
    </div>
  </section>
</BaseLayout>
```

**Verification:** All pages have at minimum BreadcrumbList schema. 404 page returns proper 404 status. `npm run build` succeeds.

---

### Task 9: Create Single Membership Page

**Objective:** Replace separate sponsorware + membership concepts with a single `/membership/` page listing all support tiers.

**Files:**
- Create: `src/pages/membership.astro`

**Page structure:**

Hero: "Support the builds. Get something back."
Tiers table:
| Tier | Price | Platform | Perks |
|------|-------|----------|-------|
| Insider | $5/mo | Patreon | Behind-the-scenes posts, discord role |
| Early Access | $10/mo | GitHub Sponsors | Sponsorware code access, vote on roadmap |
| Member | $15/mo | Patreon | Above + group Q&A, digital skill access |
| Builder | $25/mo | GitHub Sponsors | Above + monthly dev call, direct input |
| Patron | $50/mo | Patreon | Above + quarterly 1:1, name on site |
| Sponsor | $100/mo | GitHub Sponsors | Logo on site, dev log shoutout, direct line |

Each tier as a card with platform logo, price, perks list, and a "Join on..." link.

Bottom FAQ section with FAQPage schema answering: "What is sponsorware?", "How does early access work?", "What's the difference between Patreon and GitHub Sponsors?", "Can I switch tiers?", "Where does my money go?"

**Verification:** Page renders at `/membership/`. All external links work. FAQ schema validates. `npm run build` succeeds.

---

### Task 10: Update Navigation

**Objective:** Restructure the nav to support the new pages while keeping it clean.

**Files:**
- Modify: `src/components/shared/Header.astro`
- Modify: `src/components/shared/Footer.astro`

**New nav links:**
```
[BaileyBurnsed.dev]  [Products]  [Build Log]  [Membership]  [Socials]
```

Remove standalone "Newsletter" from top nav (it's linked from blog + everywhere else). Remove "Legal" from top nav (it's in footer). This keeps the top nav to 5 items max.

**Footer additions:**
- Add "Products" to the Site column
- Add "Membership" to the Site column
- Keep everything else as-is

**Verification:** Nav is clean, all links work. No overflow on mobile. `npm run build` succeeds.

---

### Task 11: Newsletter Lead Magnet

**Objective:** Give visitors a reason to subscribe by offering a specific free resource.

**Files:**
- Create: `src/pages/free-guide.astro`
- Modify: `src/components/shared/newsletter.astro` (update CTA copy)
- Modify: `src/components/shared/NewsletterCtaCard.astro` (update CTA copy)

**Step 1: Create the lead magnet landing page**

A simple page at `/free-guide/`:
- "Free Guide: The Indie Dev Stack 2025"
- What's inside (bullet list of the tools and configs)
- Email signup form
- On submit, redirect to `/thank-you/` which shows a download link

**Step 2: Update newsletter CTA copy everywhere**

Replace "Join the Newsletter" / "Subscribe for Weekly Builds" with:
- "Get the Free Indie Dev Stack Guide + Weekly Build Notes"
- "Free guide on signup. Unsubscribe anytime."

**Verification:** Form submits correctly. Thank-you page has guide link. CTA copy is more compelling. `npm run build` succeeds.

---

### Task 12: Conversion Pathway Polish

**Objective:** Add clear purchase pathways from every page to product pages or purchase links.

**Files:**
- Modify: `src/components/homepage/HomeCTA.astro`
- Modify: `src/components/homepage/HomeBlogPreview.astro`
- Modify: `src/layouts/BlogPost.astro`

**Step 1: Update HomeCTA**

Change from:
- "Need it built right?" → "Work With Me" / "Not ready? Follow My Builds"

To:
- "See everything I build" → "Browse Products" / "Follow the Build Log"

This leads visitors to the product hub rather than straight to a single service page.

**Step 2: Add product CTAs to blog**

In the blog sidebar/end-card, test different CTAs:
- "Like this content? I build these systems for clients. → See Services"
- "Need AI agents for your business? → OpenClaw"
- "Get the tools I use → Free Guide"

**Step 3: Add non-intrusive product mentions in blog index**

Each blog post card in `/blog/` could have subtle tags indicating which product it relates to:
- "AI Agents" → links to OpenClaw or API service
- "Self-Hosting" → links to Dev Service

**Verification:** Click path from any page → product/service is clear and takes ≤ 3 clicks.

---

### Task 13: GEO Content Optimization

**Objective:** Optimize existing content so AI search engines (ChatGPT, Perplexity, Gemini) can easily extract and cite it.

**Files:**
- Modify: `src/content/blog/*.md` (add Q&A headings and front-loaded answers)

**Step 1: Add question-format H2 headings**

AI search engines pull content with clear question/answer patterns. Add H2 headings that match common search queries:

- "What is the best way to [topic]?"
- "How do I [common task]?"
- "What tools do you recommend for [topic]?"

These don't change the content — just the heading format.

**Step 2: Front-load answers**

Move the key answer to the first paragraph after each H2 or H3 heading. The supporting detail follows. This is how AI extractors parse content — they look for the answer immediately after the heading.

**Step 3: Add definition lists for key terms**

```html
<dl>
  <dt>Productized Service</dt>
  <dd>A fixed-price, fixed-scope service offering delivered on a repeatable template. Examples: Unlimited Dev Service, OpenClaw.</dd>
  <dt>Sponsorware</dt>
  <dd>Software that releases to sponsors first and becomes public later. Used to fund development while building in public.</dd>
</dl>
```

AI extractors treat `<dl>` elements as knowledge definitions.

**Verification:** No content meaning changed. Heading structure is more question-friendly. Definition lists added for key terms.

---

### Summary of All Changes

| # | Task | Type | Pages/Components |
|---|------|------|-----------------|
| 1 | Fix hero layout | Design | HomeHero, HeroTyping |
| 2 | Fix broken stats | Design | HomeStats |
| 3 | Create product hub | Design/Conversion | products/index.astro, ProductCard |
| 4 | Rewrite service page | Design/Conversion | service.astro, marketing/Hero.astro |
| 5 | FAQ schema for GEO | SEO/GEO | FAQSchema, service.astro, product pages |
| 6 | HowTo schema for blog | SEO/GEO | HowToSchema, BlogPost layout |
| 7 | Content silos & internal links | SEO | silos.ts, blog posts, blog layout |
| 8 | Schema + 404 page | SEO/GEO | BaseHead, 404.astro, interior pages |
| 9 | Single membership page | Conversion | membership.astro |
| 10 | Update navigation | Design | Header, Footer |
| 11 | Newsletter lead magnet | Conversion | free-guide.astro, newsletter CTAs |
| 12 | Conversion pathway polish | Conversion | HomeCTA, BlogPost CTA area |
| 13 | GEO content optimization | SEO/GEO | Blog post markdown files |

### Verification

- [ ] `npm run build` succeeds
- [ ] All pages render at expected URLs
- [ ] Hero typing animation shows full phrases
- [ ] Stats use real/verifiable numbers
- [ ] No empty elements in "Building in public" section
- [ ] Products page lists all revenue streams with working links
- [ ] Service page reads in authentic voice
- [ ] FAQ schema validates on service/product pages
- [ ] HowTo schema validates on tutorial blog posts
- [ ] All supporting posts link to their pillar post
- [ ] 404 page renders with terminal theme and proper HTTP status
- [ ] Navigation has Products, Blog, Membership, Socials links
- [ ] Newsletter signup offers lead magnet
- [ ] Clear purchase path from any page ≤ 3 clicks
- [ ] GEO-friendly headings and definition lists on key content
