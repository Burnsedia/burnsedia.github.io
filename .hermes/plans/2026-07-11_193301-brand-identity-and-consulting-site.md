# Brand Identity & Consulting Site — Implementation Plan

> **For Hermes:** Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Transform baileyburnsed.dev into a brand-driven business site that positions Bailey as "the autistic hacker-builder who ships practical systems" — optimized for SEO, GEO (Generative Engine Optimization), and consulting/ newsletter conversions.

**Architecture:** Enhance the existing Astro 5 + Tailwind v4 + DaisyUI stack with a deeper terminal/cyberpunk aesthetic, structured data for AI discoverability, a dedicated consulting funnel, and a building-in-public dashboard. No framework changes — all improvements are additive within the current stack.

**Tech Stack:** Astro 5, Tailwind CSS v4, DaisyUI 5, TypeScript (strict), JSON-LD structured data, Netlify, GA4

---
## Current State Summary

**What exists already (good foundation):**
- Dark synthwave theme (`darksynthwave`) with cyberpunk logo
- Brand docs in `business/brand.md` and `business/message.md` with clear voice, positioning, audience model
- Blog with ~20 posts, working RSS, sitemap, tag system
- Structured data (Person, Organization, Service, LocalBusiness, BlogPosting schemas)
- Newsletter signup (Netlify Forms) with a dedicated page
- Basic SEO: geo tags, canonical URLs, meta tags, OG/Twitter cards
- SEO cannibalization map in `docs/seo-phase-1-cannibalization-map.md`
- Brand reset plans in `plans/brand-reset/`

**What's missing or weak:**
- Brand docs exist but aren't fully reflected in actual site copy
- No dedicated consulting page with process, case studies, and clear offer
- Newsletter has no lead magnet (free PDF/checklist) to drive signups
- No "building in public" live dashboard or showcase
- Terminal/nerd aesthetic could be pushed much harder (ASCII art, terminal widgets, CRT effects)
- GEO (Generative Engine Optimization) — no FAQ schema, how-to schema, or AI-friendly structured data
- No explicit "autistic entrepreneur" brand narrative woven into copy
- No content silos aligned to SEO cluster map
- No conversion analytics beyond GA4 pageviews
- Blog has good content but no "Start Here" path for new visitors

---

## Task 1: Push the Terminal Aesthetic Harder

**Objective:** Make the site visually scream "nerd hacker terminal" while staying usable and performant.

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/shared/Header.astro`
- Create: `src/components/shared/TerminalPrompt.astro`
- Create: `src/components/shared/StatusBar.astro`
- Create: `src/components/shared/AsciiDivider.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create TerminalPrompt component**

Create `src/components/shared/TerminalPrompt.astro`:
```astro
---
const { text = '', prefix = '$', blink = false, class: className = '' } = Astro.props;
---
<span class={`font-mono text-primary ${className}`}>
  <span class="text-base-content/50">{prefix}</span>
  <span class="text-base-content">{text}</span>
  {blink && <span class="cursor-blink">▊</span>}
</span>
<style>
  .cursor-blink {
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
</style>
```

**Step 2: Create AsciiDivider component**

Create `src/components/shared/AsciiDivider.astro`:
```astro
---
const { char = '─', length = 50, class: className = '' } = Astro.props;
const line = char.repeat(length);
---
<pre class={`text-center text-base-content/20 text-xs tracking-wider select-none ${className}`}>{line}</pre>
```

**Step 3: Add CRT scanline and glow effects to global.css**

Add to `src/styles/global.css`:
```css
/* ── Terminal aesthetic touches ── */
@keyframes scanline {
  0% { background-position: 0 0; }
  100% { background-position: 0 2px; }
}

.scanlines::after {
  content: '';
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0, 0, 0, 0.03) 1px,
    rgba(0, 0, 0, 0.03) 2px
  );
  pointer-events: none;
  z-index: 9999;
}

/* Terminal-style blockquote - stronger cyberpunk */
.terminal-blockquote {
  @apply border-l-2 border-primary font-mono text-sm pl-4 py-2 my-4 bg-base-200/30;
}
```

**Step 4: Add StatusBar to BaseLayout**

Create `src/components/shared/StatusBar.astro` showing build time or last commit.

**Step 5: Update BaseLayout to include scanlines + statusbar**

**Verification:** `npm run astro -- check` — no new errors. `npm run build` succeeds.

---

## Task 2: Rewrite Brand Copy Across Core Pages

**Objective:** Make every page reflect the established brand docs — "autistic hacker-builder", "practical systems", "anti-hype", "building in public".

**Files:**
- Modify: `src/consts.ts`
- Modify: `src/components/homepage/HomeHero.astro`
- Modify: `src/components/homepage/HomeAbout.astro`
- Modify: `src/components/homepage/HomeCTA.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/components/shared/BaseHead.astro` (meta description)

**Step 1: Update consts.ts**

Replace SITE_DESCRIPTION and SITE_META_DESCRIPTION with brand-aligned copy:
```
export const SITE_TITLE = 'Bailey Burnsed — Autistic Hacker-Builder';
export const SITE_DESCRIPTION = 'Autistic entrepreneur shipping apps, games, and AI systems in public. Consulting on practical software, AI automation, and lean SaaS.';
export const SITE_META_DESCRIPTION = 'Bailey Burnsed (Burnsedia) — autistic hacker-builder offering software consulting, AI automation, and a weekly newsletter for founders who need shipped systems, not hype.';
export const BLOG_DESCRIPTION = 'Build logs, AI workflows, indie SaaS strategy, and postmortems from an autistic entrepreneur building in public.';
```

**Step 2: Rewrite HomeHero**

Update `HomeHero.astro` copy to weave in brand identity:
- Hero heading: "I build shit that works."
- Subhead: "Autistic hacker-builder shipping apps, games, and AI systems. No hype. No lock-in. No vaporware."
- HeroTyping phrases: `['Founders', 'Small teams', 'Creators', 'Autistic operators', 'Solo builders']`

**Step 3: Rewrite HomeAbout**

Add explicit brand signals: "I am an autistic entrepreneur who codes, builds AI systems, and writes about the tradeoffs most people skip."

**Step 4: Rewrite HomeCTA**

Make the CTA section reflect the brand voice: direct, anti-hype, practical.

**Step 5: Update page meta descriptions**

Update each page's meta description to match brand voice and include target keywords.

**Verification:** `npm run build` succeeds. Visual review in browser for tone consistency.

---

## Task 3: Create a Dedicated Consulting Page

**Objective:** Build a consulting offer page that clearly communicates process, pricing model, and outcomes — separate from the general `/service` page.

**Files:**
- Create: `src/pages/consulting.astro`
- Create: `src/components/consulting/ConsultingProcess.astro`
- Create: `src/components/consulting/ConsultingPricing.astro`
- Create: `src/components/consulting/ConsultingFAQ.astro`
- Create: `src/components/consulting/ConsultingCaseStudies.astro`
- Modify: `src/components/shared/Header.astro` (add consulting nav link)

**Step 1: Create consulting page structure**

`src/pages/consulting.astro` — sections:
1. Hero: "I help founders and small businesses ship practical systems."
2. Process: discovery → architecture → build → handoff (4-step process with timelines)
3. Offer types: Technical consulting (strategy/audit), Implementation sprint (build), Retainer (ongoing)
4. Pricing: Fixed-scope sprints with clear pricing tiers. No hourly billing.
5. FAQ: Schema-marked FAQ for GEO (answers AI can pull for featured snippets)
6. Case studies: anonymized outcomes from previous work
7. CTA: Calendly booking + "Not ready? Join newsletter"

**Step 2: Build FAQ schema component**

Create a reusable FAQ schema component that injects `FAQPage` JSON-LD. This is critical for GEO — AI search engines pull FAQ schemas into rich results.

**Step 3: Add consulting to navigation**

Add "Consulting" link to Header.astro between "Build Log" and "Newsletter".

**Verification:** `npm run build` succeeds. Page renders at `/consulting`. Structured data validates at schema.org validator.

---

## Task 4: Create a Lead Magnet for Newsletter Growth

**Objective:** Give visitors a reason to subscribe beyond "get weekly notes" — a specific, useful free resource.

**Files:**
- Create: `src/content/lead-magnets/the-indie-dev-stack-2025.md`
- Create: `src/pages/free-guide.astro`
- Modify: `src/components/shared/newsletter.astro`
- Create: `src/components/shared/LeadMagnetCTA.astro`
- Modify: `src/components/shared/NewsletterCtaCard.astro`
- Modify: `netlify.toml` (form handling for lead magnet)

**Step 1: Create the lead magnet content**

The "Indie Developer Stack 2025" guide — a concise PDF/landing page listing the exact tools and workflows Bailey uses. This maps to existing popular blog content.

**Step 2: Build lead magnet landing page**

`/free-guide/` — minimal page with:
1. Headline: "The Indie Developer Stack 2025 — Free Guide"
2. Bullet list of what's inside
3. Email capture form (Netlify Forms)
4. Redirect to thank-you page with download link

**Step 3: Update newsletter component**

Add lead magnet mention to newsletter signup forms across the site:
- Hero CTA should reference the free guide
- Blog post end cards should offer the guide
- Generic "Subscribe" becomes "Get the Free Guide + Weekly Builds"

**Step 4: Update NewsletterCtaCard.astro**

Add lead magnet mention and better copy.

**Verification:** Form submission works on Netlify. Thank-you page loads with download link.

---

## Task 5: Create a "Building in Public" Dashboard

**Objective:** Show visitors that Bailey is actively shipping — live GitHub activity, now-building status, recent commits.

**Files:**
- Create: `src/components/homepage/NowBuilding.astro`
- Create: `src/api/github-activity.ts`
- Modify: `src/pages/index.astro` (add NowBuilding section)
- Modify: `src/pages/about.astro` (add build stats)

**Step 1: Create NowBuilding component**

A terminal-styled widget showing:
- "Currently building: [project name]" — manually updated via content YAML
- "Last commit: [relative time]"
- "GitHub stars: [count]"
- Display as a terminal window with title bar

```astro
<div class="mockup-code w-full max-w-2xl mx-auto">
  <div class="mockup-code-toolbar">
    <span class="mockup-code-status">build.sh</span>
  </div>
  <pre><code class="text-sm">$ cat /proc/build-status
  <span class="text-secondary">→ Currently: {currentProject}</span>
  <span class="text-primary">→ Status: {status}</span>
  <span class="text-accent">→ Commits this week: {commitCount}</span>
  <span class="text-base-content/70">→ Next update: {eta}</span>
  </code></pre>
</div>
```

**Step 2: Create a data source**

Create `src/content/build-log/current.json` — a simple JSON file that gets updated as Bailey works:
```json
{
  "currentProject": "OpenClaw — AI agent platform for small biz",
  "status": "Building onboarding flow",
  "lastCommit": "2026-07-10T14:30:00Z",
  "commitCount": 12,
  "eta": "Beta launch next week"
}
```

**Step 3: Add to homepage**

Add the NowBuilding section between HomeAbout and ProjectsSection on index.astro.

**Verification:** `npm run build` succeeds. Widget renders correctly on homepage.

---

## Task 6: Implement Content Silos for SEO

**Objective:** Organize blog content into topical clusters matching SEO cannibalization map, with internal linking and pillar pages.

**Files:**
- Create: `src/utils/silos.ts`
- Create: `src/components/shared/SiloNavigation.astro`
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/blog/[...slug].astro`
- Modify: `src/content/blog/*.md` (add internal links)

**Step 1: Define content silos**

Create a utility mapping posts to clusters:
```
CLUSTERS = {
  'ai-agents': { pillar: 'ai-agents-for-solo-teams-playbook', label: 'AI Agents for Solo Teams' },
  'indie-saas': { pillar: 'indie-saas-growth-playbook', label: 'Indie SaaS Growth' },
  'self-hosting': { pillar: 'self-hosting-playbook-for-small-saas', label: 'Self-Hosting & Infrastructure' },
  'build-in-public': { pillar: 'the-art-of-building-in-public', label: 'Building in Public' },
}
```

**Step 2: Add pillar post navigation**

At the top of each non-pillar post in a cluster, add a contextual link: "This is part of the [Cluster Name] series. Start here → [Pillar Post]."

**Step 3: Add silo navigation to blog index**

Add a section above the post list showing 4 content pillars with descriptions and number of posts. This helps both SEO (internal linking) and user experience (findability).

**Step 4: Add contextual internal links**

Add in-body links from each supporting post to its cluster pillar URL. Also link to related posts within the same cluster.

**Verification:** Internal link graph has all posts pointing to pillar pages. No orphaned content. `npm run build` succeeds.

---

## Task 7: GEO Optimization — AI-Friendly Structured Data

**Objective:** Optimize for Generative Engine Optimization (GEO) — how AI search engines like Perplexity, ChatGPT, and Gemini surfaces site content.

**Files:**
- Create: `src/components/shared/GeoOptimizer.astro`
- Create: `src/components/shared/FAQSchema.astro`
- Create: `src/components/shared/HowToSchema.astro`
- Modify: `src/layouts/BlogPost.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/service.astro` (add FAQ schema)

**Step 1: Create reusable FAQ schema component**

```astro
--- 
const { faqs } = Astro.props as { faqs: { question: string; answer: string }[] };
if (faqs.length === 0) return;
---
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer }
  }))
})}
</script>
```

**Step 2: Add FAQ schema to service/consulting pages**

Write 5-8 high-intent Q&A pairs (e.g., "How much does AI consulting cost?", "What does building in public mean?").

**Step 3: Create HowTo schema component**

For blog posts that are tutorials/playbooks, add a HowTo schema with steps. This gets pulled into AI search results as actionable content.

**Step 4: Add author expertise signals to BaseHead**

- Add `sameAs` array expansion (add more social profiles)
- Add `knowsAbout` field to Person schema (add explicit skills as schema.org/Thing URLs)
- Add `hasCredential` for relevant certifications

**Step 5: Optimize for AI answer extraction**

- Add clear `<h2>` question headings in blog posts that mirror FAQ structure
- Use definition lists (`<dl>`) for key terms AI can pull as knowledge snippets
- Front-load content: put the answer in the first paragraph, then elaborate

**Verification:** Rich results test shows FAQ schema. Google's Rich Results Test passes all structured data.

---

## Task 8: Build the Newsletter Content Engine

**Objective:** Turn the newsletter into a real content system — with a lead magnet, welcome sequence, and clear value proposition.

**Files:**
- Create: `src/content/newsletter/issues/` (if starting a collection)
- Modify: `src/components/shared/newsletter.astro`
- Modify: `src/components/shared/NewsletterCtaCard.astro`
- Modify: `src/pages/thank-you.astro`

**Step 1: Refine newsletter CTA copy across site**

Replace generic "Subscribe" with benefit-driven CTAs:
- "Get the Indie Dev Stack Guide + Weekly Build Notes"
- "Join 50+ founders who read the Weekly Build Notes"
- "No fluff. Just shipped systems. Every Tuesday."

**Step 2: Create welcome email content**

The welcome email should:
1. Deliver the lead magnet
2. Set expectations (what content they'll receive, how often)
3. Link to top 3 blog posts
4. Link to consulting page

**Step 3: Create a newsletter archive page**

A simple page listing past newsletter issues with links. Shows social proof that the newsletter is active and valuable.

**Verification:** Newsletter form submits correctly. Thank-you page has lead magnet download.

---

## Task 9: Add Conversion Analytics + Track Events

**Objective:** Beyond GA4 pageviews, implement event tracking for key conversion points — newsletter signups, consulting CTA clicks, form submissions.

**Files:**
- Create: `src/utils/analytics.ts`
- Modify: `src/components/shared/BaseHead.astro`
- Add data attributes across existing CTAs (partially done already)

**Step 1: Create analytics utility**

```typescript
export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

**Step 2: Add event handlers to key interactions**

Add click tracking for:
- Newsletter signup form submission
- "Work With Me" CTA clicks (across all placements)
- "Book a call" clicks
- Lead magnet download
- Social profile clicks (GitHub, X, LinkedIn)

**Step 3: Set up GA4 conversion tracking**

Document the GA4 events to mark as conversions in GA4 dashboard:
- `newsletter_signup` → Conversion
- `work_with_me_click` → Conversion
- `guide_download` → Conversion

**Verification:** GA4 debug view shows events firing on interaction.

---

## Task 10: SEO Technical Pass — Speed, Schema, Sitemaps

**Objective:** Ensure technical SEO is solid for maximum search visibility.

**Files:**
- Modify: `astro.config.mjs`
- Modify: `public/robots.txt`
- Create: `src/pages/404.astro`
- Modify: `netlify.toml`

**Step 1: Add 404 page**

Create `src/pages/404.astro` with a terminal-themed "command not found" error page:
```
╔══════════════════════════════════╗
║  404: Command not found          ║
║  The page you're looking for     ║
║  doesn't exist on this server.   ║
║                                  ║
║  Try: /blog, /consulting, /      ║
╚══════════════════════════════════╝
```

**Step 2: Optimize robots.txt**

Add directive to crawl blog posts first.

**Step 3: Add structured data to 404 page**

Use `Dataset` or `WebPage` schema so search engines know this is a valid 404, not a broken page.

**Step 4: Verify sitemap includes all important pages**

Check that `/consulting`, `/free-guide`, `/newsletter` appear in the sitemap.

**Step 5: Performance optimization**

- Ensure images use proper width/height attributes (prevent CLS)
- Verify inline CSS is working (BaseLayout already has `inlineStylesheets: 'auto'`)
- Add `loading="lazy"` to below-fold images

**Verification:** Lighthouse score ≥ 90 on desktop. Sitemap includes all pages. No 4xx errors in Netlify analytics.

---

## Task 11: Add Autistic Entrepreneur Narrative

**Objective:** Explicitly weave the autistic entrepreneur identity into the brand story — not as a disclaimer, but as a strength signal.

**Files:**
- Modify: `src/pages/about.astro`
- Create: `src/components/homepage/NeurodiversityStatement.astro`
- Modify: `src/components/homepage/HomeAbout.astro`
- Modify: `src/components/homepage/HomeStats.astro`

**Step 1: Create neurodiversity statement component**

A brief, proud statement: "I am an autistic entrepreneur. I see patterns others miss. I build systems that hold up. This isn't in spite of being autistic — it's because of it."

**Step 2: Add to About page**

Expand the "How I build" section to explicitly connect autistic traits to business value:
- Pattern recognition → better system architecture
- Deep focus → sustained delivery with fewer context switches
- Systematization → repeatable, templatable services
- Direct communication → clear scope and no surprises

**Step 3: Update HomeStats**

Replace vague "years coding" stat with concrete, authentic ones:
- "Coding since 9yo" (shown as years)
- "X blog posts published this year"
- "X GitHub stars across repos"
- "X newsletter subscribers"

**Verification:** Brand voice is consistent. Autistic entrepreneur identity is framed as strength.

---

## Task 12: Launch Checklist & Validation

**Objective:** Final sweep before going live with all changes.

**- [ ]** `npm run build` succeeds with no errors
**- [ ]** `npm run astro -- check` reports no new issues (note existing baseline issues)
**- [ ]** All pages render: `/`, `/blog`, `/blog/*`, `/consulting`, `/service`, `/about`, `/newsletter`, `/free-guide`, `/socials`, `/legal`
**- [ ]** 404 page renders with terminal theme
**- [ ]** Structured data validates on Google Rich Results Test
**- [ ]** Sitemap includes all pages
**- [ ]** Newsletter form submits to Netlify
**- [ ]** Lead magnet download works
**- [ ]** All links work (no 404s)
**- [ ]** Mobile responsive
**- [ ]** Lighthouse score ≥ 90
**- [ ]** GA4 events fire on key interactions
**- [ ]** Brand voice consistent across all copy
**- [ ]** Internal links from supporting posts to pillar pages exist
**- [ ]** FAQ schema present on consulting page
**- [ ]** All CTAs have data-track attributes

---

## Risks, Tradeoffs, and Open Questions

**Risks:**
- Too many changes at once could break build — mitigate by implementing in order and verifying after each task
- Brand voice shift might alienate existing audience — but brand docs already established this direction
- Newsletter growth is gradual — lead magnet helps but won't be overnight

**Tradeoffs:**
- Terminal aesthetic vs. accessibility — CRT effects must respect `prefers-reduced-motion`
- Building-in-public dashboard requires manual updates — could go stale if not maintained
- More pages = more to maintain — but each page serves a distinct funnel step

**Open Questions:**
- Should the lead magnet be a downloadable PDF (hosted on Netlify) or a landing page?
- Should consulting pricing be public or "contact for quote"?
- Should the building-in-public widget pull live from GitHub API or be manually updated?
