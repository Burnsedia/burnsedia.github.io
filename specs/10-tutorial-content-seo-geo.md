# Tutorial Content SEO & GEO Specification

## Objective
Optimize tutorial and how-to blog posts for search engines (SEO) and AI answer engines (GEO) by adding structured data, improving content structure, and leveraging existing frontmatter fields.

## Target Posts

| Post | Type | Has FAQ | Schema Gap |
|------|------|---------|------------|
| Neovim Made Me Twice as Fast | Workflow tutorial | No | FAQPage, HowTo |
| Godot for Python Devs | Beginner guide | No | FAQPage, HowTo |
| Python-Pytest | Tutorial | Yes (3 pairs) | FAQPage (not rendered), HowTo |
| SaaS Checklist | Checklist/Guide | No | FAQPage, HowTo |
| TL;DR Static Sites | Guide | No | FAQPage |
| CaseStudy-PrivateCloud | Case study | Yes (3 pairs) | FAQPage (not rendered) |
| Freelancing as Autistic Dev | Narrative | No | FAQPage |

## Requirements

### 1. Render FAQPage Schema from Existing Frontmatter
- `src/content.config.ts` already defines `faq: {question, answer}[]` on blog schema
- Two posts already have FAQ data: Python-Pytest (3 pairs) and CaseStudy-PrivateCloud (3 pairs)
- The `BlogPost.astro` layout receives `faq` as a prop but never renders it as JSON-LD
- **Fix:** Add FAQPage JSON-LD rendering in BlogPost.astro when `faq` exists and has items
- Code:
```astro
{faq && faq.length > 0 && (
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(f => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer }
      }))
    })}
  </script>
)}
```
- Need to add `faq` to the Props interface and destructuring in BlogPost.astro

### 2. Use seoTitle and seoDescription Frontmatter
- Schema defines `seoTitle` and `seoDescription` as optional fields but they're never used
- Some posts already have them: Python-Pytest, CaseStudy-PrivateCloud
- **Fix:** In BlogPost.astro, use `seoTitle || title` for `<title>` and `seoDescription || description` for `<meta name="description">`
- Add `seoTitle` and `seoDescription` to Props interface and destructuring

### 3. Add HowTo Schema for Tutorial Posts
- Tutorial posts (Neovim, Godot, Python-Pytest, SaaS Checklist) have instructional step content
- No HowTo schema exists anywhere on the site
- Create HowToSchema component that renders `HowTo` JSON-LD
- Add `schema: "howto"` frontmatter field to content schema (optional, enum of "article" | "howto")
- Add `steps: {name, text, image?}[]` frontmatter field to content schema
- Render HowTo schema in BlogPost.astro when `schema === "howto"` and steps exist

### 4. Add FAQ Frontmatter to Remaining Posts
- 5 posts eligible for FAQ data, only 2 have it
- Add 3-5 Q&A pairs to frontmatter of each eligible post
- Questions should be based on actual content in the post
- Suggested FAQ per post:

**Neovim Workflow:**
- "Why switch from VS Code to Neovim?"
- "How long does the Neovim learning curve take?"
- "Is Neovim faster than VS Code for development?"
- "What plugins do you use for Neovim?"

**Godot for Python Devs:**
- "Is GDScript similar to Python?"
- "Can I use Python instead of GDScript in Godot?"
- "What kinds of games can I build with Godot?"
- "Is Godot good for beginners?"

**SaaS Checklist:**
- "Can I build a SaaS without technical skills?"
- "How much does it cost to build an MVP?"
- "What tech stack should I use for my SaaS?"
- "How do I validate my SaaS idea?"

**TL;DR Static Sites:**
- "When should I use a static site vs dynamic?"
- "Are static sites more secure?"
- "How do static sites handle scalability?"
- "What is a static site generator?"

**Freelancing as Autistic Developer:**
- "What is a productized service?"
- "How do I start freelancing as an autistic developer?"
- "Why are productized services good for autistic entrepreneurs?"

### 5. Improve Section Headings for AI Extraction
- AI search engines extract answers from clear, declarative headings
- Review and improve heading structure on tutorial posts

**Specific changes needed:**
- TL;DR Static Sites: Change "Speed" → "Why Static Sites Are Faster Than Dynamic Sites", "Security" → "How Static Sites Improve Security", "Scalability" → "Why Static Sites Scale Better", "Simplicity" → "Why Static Sites Are Simpler to Maintain"
- Godot for Python Devs: Change "Benefits of Using Python with Godot" → question form
- SaaS Checklist: Add question-form headings matching search intent
- Ensure each heading section starts with the answer, then elaborates
- Fix any missing or broken heading hierarchy

### 6. Add Analytics Event Tracking for Tutorial Engagement
- Track scroll depth on tutorial posts (25%, 50%, 75%, 100%)
- Track CTA clicks within tutorial content (product links, newsletter)
- Track code copy events (if code copy buttons exist)
- Use existing gtag infrastructure
- Add inline script to BlogPost.astro for scroll depth tracking

## Acceptance Criteria
- [ ] `Python-Pytest.md` and `CaseStudy-PrivateCloud-AI-Update.md` have FAQPage schema in their JSON-LD
- [ ] Posts with `seoTitle`/`seoDescription` use them for `<title>` and `<meta name="description">`
- [ ] HowTo schema appears on tutorial posts when steps are added
- [ ] All 7 eligible posts have FAQ frontmatter populated
- [ ] Section headings on tutorial posts are descriptive, question-form, and keyword-rich
- [ ] Scroll depth tracking fires analytics events on tutorial pages
- [ ] `npm run build` succeeds
- [ ] Google Rich Results Test passes for FAQPage and HowTo schemas

## Files to Create
- `src/components/shared/HowToSchema.astro`

## Files to Modify
- `src/content.config.ts` — add `schema` type and `steps` field
- `src/layouts/BlogPost.astro` — FAQPage rendering, HowTo rendering, seoTitle/seoDescription
- `src/pages/blog/[...slug].astro` — pass FAQ and schema data
- `src/content/blog/neovim-made-me-twice-as-fast.md` — add FAQ frontmatter
- `src/content/blog/godot-for-python-programmers.md` — add FAQ frontmatter
- `src/content/blog/saas-checklist.md` — add FAQ frontmatter
- `src/content/blog/tl-dr-static-sites.md` — add FAQ frontmatter
- `src/content/blog/freelancing-as-a-autistic-developer.md` — add FAQ frontmatter
- Various content files — heading improvements

## Issue References
- GitHub issues #120, #121, #122, #123, #124, #125

## Prioritization
| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| P0 | Render FAQPage from existing faq frontmatter | 10 min | High |
| P1 | Use seoTitle/seoDescription in head | 10 min | Medium |
| P2 | Add FAQ frontmatter to remaining posts | 25 min (5 posts) | High |
| P2 | HowTo schema component + schema changes | 30 min | Medium |
| P3 | Section heading improvements | 15 min per post | Low-Medium |
| P3 | Analytics scroll tracking | 20 min | Low |
