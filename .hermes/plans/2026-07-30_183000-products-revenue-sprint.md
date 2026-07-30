# Products & Revenue Sprint — Implementation Plan

> **For Hermes:** Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Turn baileyburnsed.dev from a blog-only site into a revenue-generating storefront by adding a `/products` hub, product landing pages, and conversion CTAs throughout the blog — yielding $3k MRR via 3 revenue streams (digital products, retainer, sponsorships).

**Architecture:** Pure static Astro on Netlify. No backend, no auth. All payments handled externally by Gumroad (digital products), Stripe (retainer), and Patreon/GitHub Sponsors (memberships). The site is the storefront layer.

**Tech stack:** Astro 6, TypeScript strict, Tailwind v4 + DaisyUI 5, Netlify deploy.

**Key files to touch:**
- Create: `src/pages/products/index.astro`, `src/pages/products/retainer.astro`, `src/pages/products/skills.astro`, `src/pages/products/courses.astro`, `src/pages/sponsor.astro`
- Create: `src/components/products/PricingCard.astro`, `src/components/products/ProductCard.astro`, `src/components/shared/ProductCtaCard.astro`
- Modify: `src/components/shared/Header.astro`, `src/components/shared/Footer.astro`, `src/layouts/BlogPost.astro`, `src/pages/courses/index.astro`, `src/pages/courses/[course]/index.astro`, `src/consts.ts`

---

## Task 1: Add products-related constants

**Objective:** Add Gumroad links and product URLs to the global constants file so all pages reference a single source of truth.

**Files:**
- Modify: `src/consts.ts`

**Step 1: Read the current file**
```
read_file("src/consts.ts")
```
Current content:
```ts
export const SITE_TITLE = 'baileyburnsed.dev';
export const SITE_DESCRIPTION = 'I Build Software for:  ';
export const SITE_META_DESCRIPTION = 'Burnsedia builds practical AI systems...';
export const BLOG_DESCRIPTION = 'Actionable articles on AI agents...';
```

**Step 2: Write updated file**

Replace with:
```ts
// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'baileyburnsed.dev';
export const SITE_DESCRIPTION = 'I Build Software for:  ';
export const SITE_META_DESCRIPTION = 'Burnsedia builds practical AI systems, SaaS products, and full-stack software for founders, creators, and small businesses.';
export const BLOG_DESCRIPTION = 'Actionable articles on AI agents, indie SaaS growth, developer tools, and shipping profitable software products.';

// ── Products & Revenue ────────────────────────────────────────────

/** Gumroad storefront — digital products */
export const GUMMROAD_URL = 'https://burnsedia.gumroad.com';
/** Gumroad product: Hermes Agent Skill Bundle */
export const SKILL_BUNDLE_URL = `${GUMMROAD_URL}/l/hermes-agent-skills`;
/** Gumroad product: Django SaaS Foundations course */
export const DJANGO_COURSE_URL = `${GUMMROAD_URL}/l/django-saas-foundations`;
/** Stripe payment link: Office Hours Retainer ($1,500/mo) */
export const RETAINER_STRIPE_URL = 'https://buy.stripe.com/9B67sM2DH0LhfOq4aeaEE06';
/** Newsletter sponsorship — sponsored slot enquiry */
export const SPONSOR_EMAIL = 'mailto:bailey@burnsedia.dev?subject=Newsletter%20Sponsorship';
/** Products hub URL */
export const PRODUCTS_URL = '/products';
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. No type errors in consts.ts.

---

## Task 2: Create ProductCard component

**Objective:** A reusable card that links to any product with icon, title, description, price, and CTA — used on the products hub page.

**Files:**
- Create: `src/components/products/ProductCard.astro`

**Step 1: Write the component**

```astro
---
interface Props {
  title: string;
  description: string;
  price: string;
  href: string;
  cta: string;
  badge?: string;
}

const { title, description, price, href, cta, badge } = Astro.props as Props;
---

<a
  href={href}
  class="group rounded-2xl border border-base-content/10 bg-base-100/5 p-6 hover:border-primary transition block"
>
  {badge && (
    <span class="badge badge-primary badge-sm">{badge}</span>
  )}
  <h3 class="mt-2 text-xl font-bold">{title}</h3>
  <p class="mt-2 text-sm text-base-content/70">{description}</p>
  <div class="mt-4 flex items-center justify-between">
    <span class="text-lg font-semibold text-primary">{price}</span>
    <span class="btn btn-primary btn-sm group-hover:btn-neutral transition">
      {cta}
    </span>
  </div>
</a>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 3: Create PricingCard component

**Objective:** Reusable pricing tier card for retainer, sponsorship, or membership pages.

**Files:**
- Create: `src/components/products/PricingCard.astro`

**Step 1: Write the component**

```astro
---
interface Feature {
  text: string;
  included: boolean;
}

interface Props {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

const { name, price, description, features, cta, href, highlighted = false } = Astro.props as Props;
---

<article
  class={`rounded-2xl border p-6 flex flex-col ${highlighted ? 'border-primary bg-primary/5 shadow-[0_0_24px] shadow-primary/15' : 'border-base-content/10 bg-base-100/5'}`}
>
  {highlighted && <span class="badge badge-primary badge-sm self-start mb-2">Most Popular</span>}
  <h3 class="text-xl font-bold">{name}</h3>
  <p class="mt-1 text-sm text-base-content/70">{description}</p>
  <p class="mt-4 text-3xl font-bold">{price}<span class="text-base font-normal text-base-content/50">/mo</span></p>
  <ul class="mt-6 space-y-2 flex-1">
    {features.map((feature) => (
      <li class="flex items-start gap-2 text-sm">
        {feature.included ? (
          <svg class="w-4 h-4 mt-0.5 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        ) : (
          <svg class="w-4 h-4 mt-0.5 text-base-content/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        )}
        <span class={feature.included ? '' : 'text-base-content/50'}>{feature.text}</span>
      </li>
    ))}
  </ul>
  <a href={href} class={`btn mt-8 w-full ${highlighted ? 'btn-primary' : 'btn-outline'}`}>
    {cta}
  </a>
</article>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 4: Create ProductCtaCard component

**Objective:** Reusable "Content Upgrade" card for embedding product offers inside blog posts — similar to `NewsletterCtaCard.astro` but for digital products.

**Files:**
- Create: `src/components/shared/ProductCtaCard.astro`

**Step 1: Write the component**

```astro
---
interface Props {
  product: 'skills' | 'course' | 'retainer';
  placement: string;
  source: string;
}

const products = {
  skills: {
    title: 'Ship faster with ready-made Hermes skills',
    description: 'Get 5 production-tested Hermes Agent skills in one bundle. Import, configure, and ship.',
    href: '/products/skills',
    cta: 'Get the Skill Bundle — $47',
  },
  course: {
    title: 'Want the full Django SaaS course?',
    description: '9 lessons from zero to shipped SaaS. PDF + resources, downloadable now.',
    href: '/products/courses',
    cta: 'Buy the Course — $49',
  },
  retainer: {
    title: 'Need hands-on technical help?',
    description: 'Office Hours Retainer: 4h/week of advisory, code review, and architecture for $1,500/mo.',
    href: '/products/retainer',
    cta: 'Book Office Hours',
  },
} as const;

const { product, placement, source } = Astro.props as Props;
const p = products[product];
---

<section class="rounded-2xl border border-primary/20 bg-base-100/5 p-6">
  <h3 class="text-xl font-bold">{p.title}</h3>
  <p class="mt-2 text-base-content/75 max-w-2xl">{p.description}</p>
  <div class="mt-4 flex flex-wrap gap-3">
    <a
      class="btn btn-primary"
      href={p.href}
      data-track-event={`product_click`}
      data-track-source={source}
      data-track-placement={placement}
      data-track-label={product}
    >
      {p.cta}
    </a>
  </div>
</section>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 5: Create products hub page

**Objective:** The `/products` landing page listing all revenue streams with cards. Serves as the central storefront.

**Files:**
- Create: `src/pages/products/index.astro`

**Step 1: Write the page**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PageHeader from '../../components/shared/PageHeader.astro';
import ProductCard from '../../components/products/ProductCard.astro';
import { SITE_TITLE } from '../../consts';

const baseUrl = Astro.site?.toString() ?? 'https://baileyburnsed.dev';
const toAbsoluteUrl = (path: string) => new URL(path, baseUrl).toString();

const productsBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Products', item: toAbsoluteUrl('/products/') },
  ],
};
---

<BaseLayout
  title={`Products | ${SITE_TITLE}`}
  description="Tools, templates, and services built from real shipping experience. Pick the lane that fits."
  canonical="/products/"
>
  <script type="application/ld+json" set:html={JSON.stringify(productsBreadcrumbSchema)} />
  <PageHeader
    eyebrow="Storefront"
    title="Things I build and sell"
    description="Pick the lane that fits. Every product comes from real shipping experience — no fluff, just useful tools and services."
    typingPrefix="Lanes"
    typingPhrases={['Digital products', 'Advisory retainer', 'Course library', 'Sponsorships']}
  >
    <div class="mt-6">
      <a class="btn btn-outline" href="mailto:bailey@burnsedia.dev?subject=Quick%20question">
        Not sure? Ask me
      </a>
    </div>
  </PageHeader>

  <section class="w-full py-16 md:py-20 noise">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          title="Office Hours Retainer"
          description="4 hours/week of advisory, code review, and architecture guidance. Async-first, no meetings unless needed."
          price="$1,500/mo"
          href="/products/retainer"
          cta="Learn More"
          badge="Best for founders"
        />
        <ProductCard
          title="Hermes Agent Skill Bundle"
          description="5 production-tested Hermes Agent skills. Import, configure, and ship AI agent workflows faster."
          price="$47"
          href="/products/skills"
          cta="Buy Now"
          badge="Instant download"
        />
        <ProductCard
          title="Django SaaS Foundations"
          description="9 practical lessons from zero to shipped Django SaaS. PDF + resources."
          price="$49"
          href="/products/courses"
          cta="Buy Now"
          badge="9 lessons"
        />
        <ProductCard
          title="Newsletter Sponsorship"
          description="Reach developers, founders, and operators reading weekly build notes."
          price="$300/wk"
          href="/sponsor"
          cta="Sponsor"
        />
        <ProductCard
          title="GitHub Sponsors"
          description="Support open builds, get early access to sponsorware, and shape the roadmap."
          price="$10/mo"
          href="https://github.com/sponsors/Burnsedia"
          cta="Sponsor"
        />
        <ProductCard
          title="Patreon Membership"
          description="Behind-the-scenes posts, monthly Q&A, and digital skill access."
          price="$5/mo"
          href="https://www.patreon.com/burnsedia"
          cta="Join"
        />
      </div>
    </div>
  </section>
</BaseLayout>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. `dist/products/index.html` is generated.

---

## Task 6: Create retainer page

**Objective:** Landing page for the Office Hours Retainer ($1,500/mo) — the light version of the $4k Unlimited Dev.

**Files:**
- Create: `src/pages/products/retainer.astro`

**Step 1: Write the page**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PageHeader from '../../components/shared/PageHeader.astro';
import PricingCard from '../../components/products/PricingCard.astro';
import { SITE_TITLE, RETAINER_STRIPE_URL } from '../../consts';

const baseUrl = Astro.site?.toString() ?? 'https://baileyburnsed.dev';
const toAbsoluteUrl = (path: string) => new URL(path, baseUrl).toString();

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Products', item: toAbsoluteUrl('/products/') },
    { '@type': 'ListItem', position: 3, name: 'Office Hours Retainer', item: toAbsoluteUrl('/products/retainer/') },
  ],
};
---

<BaseLayout
  title="Office Hours Retainer | Products | baileyburnsed.dev"
  description="4 hours/week of senior developer advisory, code review, and architecture guidance. $1,500/mo. No meetings unless needed."
  canonical="/products/retainer/"
>
  <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  <PageHeader
    eyebrow="Service"
    title="Office Hours Retainer"
    description="4 hours/week of technical advisory. No long-term contract. No meetings required."
  >
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="btn btn-primary" href={RETAINER_STRIPE_URL}>Buy Now — $1,500/mo</a>
      <a class="btn btn-outline" href="mailto:bailey@burnsedia.dev?subject=Office%20Hours%20Question">Ask a question</a>
    </div>
  </PageHeader>

  <section class="w-full py-16 noise">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h2 class="text-2xl font-bold mb-4">What you get</h2>
          <ul class="space-y-3">
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span><strong>4 hours/week</strong> of my time, used how you need it</span>
            </li>
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span><strong>Code review</strong> — PRs, architecture, deployment configs</span>
            </li>
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span><strong>Architecture guidance</strong> — stack decisions, cloud costs, tradeoffs</span>
            </li>
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span><strong>Async-first</strong> — Slack / Loom. No zoom meetings unless you want one</span>
            </li>
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span><strong>No long-term contract</strong> — month to month, cancel anytime</span>
            </li>
          </ul>

          <h2 class="text-2xl font-bold mt-10 mb-4">Who this is for</h2>
          <ul class="space-y-3">
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span>Founders who need technical guidance, not full-time execution</span>
            </li>
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span>Non-technical founders evaluating build vs buy</span>
            </li>
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span>Teams who want a senior second opinion on architecture</span>
            </li>
            <li class="flex gap-3">
              <span class="text-primary shrink-0">→</span>
              <span>Anyone who needs <strong>$4k Unlimited Dev</strong> but isn't ready to commit that scope</span>
            </li>
          </ul>
        </div>

        <div class="sticky top-28">
          <PricingCard
            name="Office Hours"
            price="$1,500"
            description="4 hours/week. No meetings required. Cancel anytime."
            cta="Get Started"
            href={RETAINER_STRIPE_URL}
            highlighted={true}
            features={[
              { text: '4 hours/week advisory time', included: true },
              { text: 'Code review & architecture', included: true },
              { text: 'Async Slack / Loom support', included: true },
              { text: 'Month-to-month, cancel anytime', included: true },
              { text: 'Scheduled weekly calls', included: false },
              { text: 'Full-time development', included: false },
            ]}
          />
          <p class="mt-4 text-xs text-base-content/60 text-center">
            Need full-time execution? See <a href="/service" class="link link-hover">Unlimited Dev ($4k/mo)</a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="w-full py-16 noise">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-4">FAQ</h2>
      <div class="space-y-4">
        <details class="collapse collapse-arrow border border-base-content/10 rounded-box">
          <summary class="collapse-title font-medium">What if I need more than 4 hours in a week?</summary>
          <div class="collapse-content text-sm text-base-content/70">
            <p>Extra hours are billed at $150/hour. I'll let you know before billing anything beyond the retainer.</p>
          </div>
        </details>
        <details class="collapse collapse-arrow border border-base-content/10 rounded-box">
          <summary class="collapse-title font-medium">How do we communicate?</summary>
          <div class="collapse-content text-sm text-base-content/70">
            <p>Async-first: Slack for quick questions, Loom for walkthroughs. We can schedule a Zoom kickoff call.</p>
          </div>
        </details>
        <details class="collapse collapse-arrow border border-base-content/10 rounded-box">
          <summary class="collapse-title font-medium">Can I cancel?</summary>
          <div class="collapse-content text-sm text-base-content/70">
            <p>Yes. Month-to-month. Cancel anytime, no questions asked.</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</BaseLayout>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. `dist/products/retainer/index.html` is generated.

---

## Task 7: Create skills product page

**Objective:** Landing page for the Hermes Agent Skill Bundle ($47 Gumroad).

**Files:**
- Create: `src/pages/products/skills.astro`

**Step 1: Write the page**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PageHeader from '../../components/shared/PageHeader.astro';
import { SITE_TITLE, SKILL_BUNDLE_URL } from '../../consts';

const baseUrl = Astro.site?.toString() ?? 'https://baileyburnsed.dev';
const toAbsoluteUrl = (path: string) => new URL(path, baseUrl).toString();

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Products', item: toAbsoluteUrl('/products/') },
    { '@type': 'ListItem', position: 3, name: 'Skill Bundle', item: toAbsoluteUrl('/products/skills/') },
  ],
};

const skills = [
  { name: 'GitHub PR Workflow', desc: 'Automate PR creation, review assignment, and merge tracking.' },
  { name: 'Blog Content Pipeline', desc: 'Draft, review, and publish blog posts via agent workflow.' },
  { name: 'System Health Monitor', desc: 'Check server stats, disk usage, and service health on schedule.' },
  { name: 'Code Review Assistant', desc: 'Automated diff review with inline comments via gh CLI.' },
  { name: 'Research Synthesizer', desc: 'Collect sources, summarize, and produce structured briefs.' },
];
---

<BaseLayout
  title="Hermes Agent Skill Bundle | Products | baileyburnsed.dev"
  description="5 production-tested Hermes Agent skills in one bundle. Import, configure, and ship AI agent workflows faster."
  canonical="/products/skills/"
>
  <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  <PageHeader
    eyebrow="Digital Product"
    title="Hermes Agent Skill Bundle"
    description="5 production-tested Hermes Agent skills. One-time purchase, instant download."
  >
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="btn btn-primary" href={SKILL_BUNDLE_URL}>Buy Now — $47</a>
      <a class="btn btn-outline" href="https://hermes-agent.nousresearch.com/docs">Read the docs</a>
    </div>
  </PageHeader>

  <section class="w-full py-16 noise">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-8">What's included</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <article class="rounded-xl border border-base-content/10 bg-base-100/5 p-5">
            <h3 class="font-bold">{skill.name}</h3>
            <p class="mt-1 text-sm text-base-content/70">{skill.desc}</p>
          </article>
        ))}
      </div>

      <div class="mt-12 rounded-2xl border border-base-content/10 bg-base-100/5 p-6">
        <h2 class="text-xl font-bold">How it works</h2>
        <ol class="mt-4 space-y-2 text-base-content/80">
          <li>1. Purchase on Gumroad — instant download</li>
          <li>2. Unzip the bundle into your Hermes skills directory</li>
          <li>3. Run <code class="bg-base-300 px-1 rounded">skill_view(name='&lt;skill-name&gt;')</code> to verify</li>
          <li>4. Modify and use like any native skill</li>
        </ol>
      </div>

      <div class="mt-8 text-center">
        <a class="btn btn-primary btn-lg" href={SKILL_BUNDLE_URL}>Buy Now — $47</a>
        <p class="mt-2 text-xs text-base-content/60">Instant download. Gumroad handles delivery.</p>
      </div>
    </div>
  </section>
</BaseLayout>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 8: Create courses product page

**Objective:** Landing page for the Django SaaS Foundations course ($49 Gumroad).

**Files:**
- Create: `src/pages/products/courses.astro`

**Step 1: Write the page**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PageHeader from '../../components/shared/PageHeader.astro';
import { SITE_TITLE, DJANGO_COURSE_URL } from '../../consts';
import { getCollection } from 'astro:content';
import { groupCourseLessons } from '../../utils/courses';

const entries = await getCollection('courses');
const courses = groupCourseLessons(entries);
const primaryCourse = courses[0];

const baseUrl = Astro.site?.toString() ?? 'https://baileyburnsed.dev';
const toAbsoluteUrl = (path: string) => new URL(path, baseUrl).toString();

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Products', item: toAbsoluteUrl('/products/') },
    { '@type': 'ListItem', position: 3, name: 'Django SaaS Course', item: toAbsoluteUrl('/products/courses/') },
  ],
};
---

<BaseLayout
  title="Django SaaS Course | Products | baileyburnsed.dev"
  description="9 practical lessons for building and shipping production-ready Django SaaS apps. PDF download + resources."
  canonical="/products/courses/"
>
  <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  <PageHeader
    eyebrow="Course"
    title="Django SaaS Foundations"
    description="9 lessons from zero to shipped. Production-ready patterns, real tradeoffs."
  >
    <div class="mt-6 flex flex-wrap gap-3">
      <a class="btn btn-primary" href={DJANGO_COURSE_URL}>Buy Now — $49</a>
      {primaryCourse && <a class="btn btn-outline" href={`/courses/${primaryCourse.slug}/`}>Read free lessons</a>}
    </div>
  </PageHeader>

  <section class="w-full py-16 noise">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-4">What you'll learn</h2>
      <ul class="space-y-3">
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>Deploy a Django app on Fly.io with Docker (Lesson 1)</span>
        </li>
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>Build a REST API with Django REST Framework (Lesson 2)</span>
        </li>
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>Add authentication with Djoser + SimpleJWT (Lesson 3)</span>
        </li>
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>Connect Django and Vue.js frontends (Lesson 4)</span>
        </li>
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>Set up CI/CD with GitHub Actions (Lesson 5)</span>
        </li>
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>Multi-tenant SaaS architecture (Lesson 6)</span>
        </li>
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>Build MVPs in 7 days (Lesson 7)</span>
        </li>
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>White-label SaaS for clients (Lesson 8)</span>
        </li>
        <li class="flex gap-3">
          <span class="text-primary shrink-0">→</span>
          <span>Turn your GitHub into a lead magnet (Lesson 9)</span>
        </li>
      </ul>

      <div class="mt-8 rounded-2xl border border-base-content/10 bg-base-100/5 p-6">
        <h2 class="text-xl font-bold">What you get</h2>
        <ul class="mt-4 space-y-2 text-base-content/80">
          <li>Complete 9-lesson course as a PDF</li>
          <li>Code snippets and configuration templates</li>
          <li>Architecture diagrams and decision trees</li>
          <li>Life-time access + updates</li>
        </ul>
      </div>

      <div class="mt-8 text-center">
        <a class="btn btn-primary btn-lg" href={DJANGO_COURSE_URL}>Buy the Full Course — $49</a>
        <p class="mt-2 text-xs text-base-content/60">Instant PDF download. Gumroad handles delivery.</p>
      </div>
    </div>
  </section>
</BaseLayout>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 9: Create sponsor page

**Objective:** Media kit page for newsletter sponsorship. Lists audience stats and sponsorship tiers.

**Files:**
- Create: `src/pages/sponsor.astro`

**Step 1: Write the page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHeader from '../components/shared/PageHeader.astro';
import PricingCard from '../components/products/PricingCard.astro';
import { SITE_TITLE, SPONSOR_EMAIL } from '../consts';

const baseUrl = Astro.site?.toString() ?? 'https://baileyburnsed.dev';
const toAbsoluteUrl = (path: string) => new URL(path, baseUrl).toString();

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Sponsor', item: toAbsoluteUrl('/sponsor/') },
  ],
};
---

<BaseLayout
  title="Sponsor the Newsletter | baileyburnsed.dev"
  description="Sponsor the Burnsedia newsletter — reach developers, founders, and operators reading weekly build notes."
  canonical="/sponsor/"
>
  <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  <PageHeader
    eyebrow="Sponsorship"
    title="Reach devs who ship"
    description="My weekly newsletter goes to developers, founders, and operators who build real products with practical tools."
  />

  <section class="w-full py-16 noise">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <h2 class="text-2xl font-bold mb-4">Audience</h2>
          <div class="space-y-4">
            <article class="rounded-xl border border-base-content/10 bg-base-100/5 p-4">
              <p class="text-sm text-base-content/60">Role</p>
              <p class="font-semibold">Founders, indie devs, operators</p>
            </article>
            <article class="rounded-xl border border-base-content/10 bg-base-100/5 p-4">
              <p class="text-sm text-base-content/60">Topics</p>
              <p class="font-semibold">AI agents, SaaS building, Django, cloud cost, developer tools</p>
            </article>
            <article class="rounded-xl border border-base-content/10 bg-base-100/5 p-4">
              <p class="text-sm text-base-content/60">Format</p>
              <p class="font-semibold">Weekly build notes — one useful email, no fluff</p>
            </article>
          </div>
        </div>

        <div>
          <PricingCard
            name="Sponsor Slot"
            price="$300"
            description="One weekly edition. Your message, my audience."
            cta="Get in Touch"
            href={SPONSOR_EMAIL}
            highlighted={true}
            features={[
              { text: 'Dedicated sponsor section in newsletter', included: true },
              { text: 'Logo + description + link', included: true },
              { text: 'Social media mention (X)', included: true },
              { text: 'Included in RSS feed version', included: true },
              { text: 'Multiple placements per month', included: false },
              { text: 'Dedicated email send', included: false },
            ]}
          />
        </div>
      </div>
    </div>
  </section>

  <section class="w-full py-16 noise">
    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-2xl font-bold mb-4">Ready to sponsor?</h2>
      <a class="btn btn-primary btn-lg" href={SPONSOR_EMAIL}>Email me about sponsorship</a>
    </div>
  </section>
</BaseLayout>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 10: Add Products link to Header navigation

**Objective:** Add a "Products" nav item to the global header, alongside Build Log, Newsletter, etc.

**Files:**
- Modify: `src/components/shared/Header.astro`

**Step 1: Read current file**
```
read_file("src/components/shared/Header.astro")
```

**Step 2: Edit mobile dropdown nav**

In the mobile menu `<ul>`, add a Products link after "Build Log":
```astro
<li><a class="min-h-11 btn btn-ghost justify-start" href="/products">Products</a></li>
```

Insert after line:
```astro
<li><a class="min-h-11 btn btn-ghost justify-start" href="/blog">Build Log</a></li>
```

**Step 3: Edit desktop nav**

In the desktop `<div class="navbar-end hidden lg:flex gap-2">`, add:
```astro
<a href="/products" class="btn btn-ghost text-sm">Products</a>
```

Insert after "Build Log" link and before "Newsletter" link.

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds. Header shows "Products" link on both mobile and desktop.

---

## Task 11: Add Products link to Footer navigation

**Objective:** Add a "Products" section to the footer nav.

**Files:**
- Modify: `src/components/shared/Footer.astro`

**Step 1: Read current file**
```
read_file("src/components/shared/Footer.astro")
```

**Step 2: Add Products link to "Site" nav section**

In the first `<nav>` (Site), add after the "Build Log" link:
```astro
<a href="/products" class="link link-hover">Products</a>
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 12: Add product CTAs to BlogPost layout

**Objective:** Add content upgrade CTAs (from ProductCtaCard) after the newsletter CTA in blog posts, depending on post topic.

**Files:**
- Modify: `src/layouts/BlogPost.astro`

**Step 1: Read current BlogPost.astro**
```
read_file("src/layouts/BlogPost.astro")
```

**Step 2: Import ProductCtaCard**

Add import after `NewsletterCtaCard`:
```astro
import ProductCtaCard from '../components/shared/ProductCtaCard.astro';
```

**Step 3: Determine product mapping from tags**

Add a frontmatter block after the `normalizedTags` line that picks a product based on tags:

```astro
// ── Content upgrade: map tags to product ──────────────────────
const TAG_PRODUCT_MAP: Record<string, 'skills' | 'course' | 'retainer'> = {
  'ai-agents': 'skills',
  'developer-tools': 'skills',
  'automation': 'skills',
  'django': 'course',
  'saas': 'course',
  'api': 'course',
  'case-study': 'retainer',
  'cloud': 'retainer',
  'business': 'retainer',
  'architecture': 'retainer',
};

let recommendedProduct: 'skills' | 'course' | 'retainer' | null = null;
for (const tag of normalizedTags) {
  const match = TAG_PRODUCT_MAP[tag];
  if (match) {
    recommendedProduct = match;
    break;
  }
}
```

**Step 4: Add ProductCtaCard after the newsletter CTA section**

After the `NewsletterCtaCard` section (around line 104-105), insert:
```astro
{recommendedProduct && (
  <section class="mt-4">
    <ProductCtaCard
      product={recommendedProduct}
      placement={`blog_post_end_${recommendedProduct}`}
      source="blog_post"
    />
  </section>
)}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 13: Add purchase CTA to course pages

**Objective:** Add a "Get the Full Course" button on the course overview page and individual course pages, linking to Gumroad.

**Files:**
- Modify: `src/pages/courses/index.astro` (course directory)
- Modify: `src/pages/courses/[course]/index.astro` (individual course page)

**Step 1: Modify course index page**

In `src/pages/courses/index.astro`, import `DJANGO_COURSE_URL` from consts:
```astro
import { SITE_TITLE, DJANGO_COURSE_URL } from '../../consts';
```

After the `<CoursesList />` section, add:
```astro
<section class="mt-12 text-center">
  <div class="rounded-2xl border border-primary/20 bg-base-100/5 p-6">
    <h2 class="text-xl font-bold">Want the full course as a PDF?</h2>
    <p class="mt-2 text-base-content/70">Download all 9 lessons in one bundle — PDF + resources, instant access.</p>
    <a class="btn btn-primary mt-4" href={DJANGO_COURSE_URL}>Buy the Full Course — $49</a>
  </div>
</section>
```

**Step 2: Modify individual course page**

In `src/pages/courses/[course]/index.astro`, import `DJANGO_COURSE_URL`:
```astro
import { SITE_TITLE, DJANGO_COURSE_URL } from '../../../consts';
```

After the `<CourseLessonsList />` section, add:
```astro
<section class="mt-12 text-center">
  <div class="rounded-2xl border border-primary/20 bg-base-100/5 p-6">
    <h2 class="text-xl font-bold">Get the complete course</h2>
    <p class="mt-2 text-base-content/70">Downloadable PDF with all {course.lessons.length} lessons in one bundle.</p>
    <a class="btn btn-primary mt-4" href={DJANGO_COURSE_URL}>Buy the Full Course — $49</a>
  </div>
</section>
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

---

## Task 14: Final build verification

**Objective:** Confirm the entire site builds without errors and all new pages are reachable.

**Step 1: Full build**

Run: `npm run build`
Expected: `dist/` is produced with all pages.

**Step 2: Check new pages exist**

Run: `ls -la dist/products/index.html dist/products/retainer/index.html dist/products/skills/index.html dist/products/courses/index.html dist/sponsor/index.html`
Expected: All 5 HTML files exist.

**Step 3: Check build output for any warnings**

Run: `npm run build 2>&1 | grep -i "error\|warn\|fail"`
Expected: No errors or warnings related to our changes.

---

## Verification checklist

- [ ] `npm run build` succeeds
- [ ] `/products` renders with 6 product cards
- [ ] `/products/retainer` renders with pricing card and FAQ
- [ ] `/products/skills` renders with skill list and Gumroad CTA
- [ ] `/products/courses` renders with lesson list and Gumroad CTA
- [ ] `/sponsor` renders with audience stats and sponsorship CTA
- [ ] Header shows "Products" on desktop and mobile
- [ ] Footer shows "Products" link in Site nav
- [ ] Blog posts with relevant tags show content upgrade CTAs
- [ ] Course pages show "Buy Full Course" CTA
- [ ] All external links resolve (Gumroad, Stripe, Patreon, GitHub Sponsors)
- [ ] Navigation clearly guides visitors from blog content → products

---

## Risks and tradeoffs

| Risk | Mitigation |
|------|-----------|
| Gumroad products not yet created | Create Gumroad products before deploying links. Use temporary placeholder URLs if needed |
| Stripe link hardcoded — update if changed | Centralized in `src/consts.ts` — single point of change |
| Product CTA on blog posts may feel pushy | Only shows on tags-matching posts; one card per post, same format as newsletter CTA |
| No analytics on product page conversions | Add data-track-event attributes (already included in components) — GA handles tracking |
| Course CTAs on free pages may reduce engagement | Positioned below all content — reader gets value first, offer second |

---

## Open questions

1. Are the Gumroad products (skill bundle, course) already created, or do they need to be created on Gumroad.com first?
2. Is the Stripe payment link for the retainer correct, or should a new one be created for $1,500/mo?
3. Should existing blog posts be retrofitted with tag metadata for content upgrades, or only new posts?
