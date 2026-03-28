# Blog SEO Content Refresh Plan

This plan captures the AI-content audit and the execution roadmap to improve rankings and newsletter conversions.

## Current State Snapshot

- Corpus size: ~47 blog posts
- Estimated quality score: **56/100**
- Primary risk pattern: mixed post quality and thin, overlapping topic pages

## Top Ranking Risks To Fix First

1. **Corrupted content file with inline base64 payload**
   - `src/content/blog/How-to-get-more-bookings-at-your-Salon-with-a-Booking-app-made-in-Django.md`
2. **Thin content footprint**
   - Many posts under ~500 words for competitive technical queries
3. **AI-templated phrasing repetition**
   - Similar sections and repetitive structure reduce originality signals
4. **Weak evidence depth**
   - Too many claims without references, proof, or first-hand data
5. **Topic cannibalization in cluster pages**
   - Overlapping intent in VPS/self-hosting and related posts
6. **Trust-impacting editorial issues**
   - Typos, rough metadata, and inconsistent polish in key posts
7. **Tag fragmentation**
   - Too many one-off tags and weak cluster cohesion
8. **Weak newsletter conversion layer on blog**
   - Blog posts lean toward call-booking CTAs over newsletter-first capture

## Keep / Refresh / Prune Framework

- **Keep (light polish):** strong first-hand POV, clear intent, no overlap
- **Refresh (primary bucket):** good topic, weak depth/evidence/copy quality
- **Prune or merge:** duplicate intent, very thin pages, corrupted or low-trust pages

Working allocation target:

- Keep: ~8 posts
- Refresh: ~28 posts
- Prune/Merge: ~11 posts

## Priority 10-Page Queue

1. `src/content/blog/How-to-get-more-bookings-at-your-Salon-with-a-Booking-app-made-in-Django.md`
   - Action: prune or full rebuild + redirect
   - Why: file corruption/noise risk
2. `src/content/blog/freelancing-as-a-autistic-developer.md`
   - Action: major refresh
   - Why: high authenticity potential, currently low trust polish
3. `src/content/blog/the-ai-agent-stack-for-solo-developers.md`
   - Action: refresh with evidence and comparisons
   - Why: strong intent fit for target audience
4. `src/content/blog/ai-agents-for-solo-teams-playbook.md`
   - Action: expand refresh
   - Why: good theme, too shallow for playbook-intent query
5. `src/content/blog/self-hosting-playbook-for-small-saas.md`
   - Action: expand refresh
   - Why: high-intent topic with ranking potential
6. `src/content/blog/5-dollar-vps-challenge.md`
   - Action: keep as canonical + refresh
   - Why: differentiator post to anchor VPS cluster
7. `src/content/blog/the-5-dollar-vps-stack-that-scales-to-the-cloud.md`
   - Action: merge into canonical or reposition intent
   - Why: cannibalization risk
8. `src/content/blog/own-dont-rent-the-hidden-cost-of-saas.md`
   - Action: refresh as canonical own-vs-rent page
   - Why: strategic positioning topic
9. `src/content/blog/Astro-SPA-Google-Analytics.md`
   - Action: keep + technical refresh + tags/linking
   - Why: practical, search-friendly technical intent
10. `src/content/blog/neovim-made-me-twice-as-fast.md`
    - Action: keep + light refresh
    - Why: strong personal POV and useful developer angle

## Rewrite Checklist For AI-Assisted Posts

Use this checklist on every refreshed article.

- **Intent lock**
  - One primary query intent, one secondary at most
  - Add "who this is for/not for" in the opening section
- **Proof block (required)**
  - Include what was tested, constraints, and results
  - Add one failure/tradeoff section
- **Structure quality**
  - Clear H1, then 4-6 H2 sections tied to real reader sub-questions
  - Include one table, checklist, or decision matrix
- **Evidence standards**
  - Add at least 2 external sources and 3 internal links
  - Replace vague claims with concrete metrics/examples
- **Human voice pass**
  - Remove generic AI filler phrasing
  - Add first-hand narrative and implementation details
- **Metadata quality**
  - Title ~50-60 chars, benefit + specificity
  - Meta description ~140-160 chars, clear value proposition
  - Ensure tag consistency with topic cluster
- **Conversion layer**
  - Mid-article soft CTA to `/newsletter/`
  - End-of-post newsletter CTA (service CTA only where BOFU intent fits)

## 30-Day Execution Roadmap

### Week 1: Stabilize + instrument

- Remove or rebuild corrupted salon post and set redirect strategy
- Finalize canonical pages per core cluster
- Add newsletter CTA modules in blog template (mid + end)
- Capture KPI baseline:
  - blog sessions
  - post CTA click-through rate
  - blog-to-newsletter submit rate

### Week 2: Refresh highest-impact pages

- Refresh three priority pages:
  - `the-ai-agent-stack-for-solo-developers.md`
  - `ai-agents-for-solo-teams-playbook.md`
  - `self-hosting-playbook-for-small-saas.md`
- Add proof blocks, citations, and internal linking to cluster winners
- Shift TOFU posts to newsletter-first CTA language

### Week 3: Merge overlap + trust cleanup

- Merge/reposition cannibalized VPS and own-vs-rent variants
- Fix title/description/typo quality on priority posts
- Normalize tags to reduce fragmentation and improve cluster signals

### Week 4: Conversion optimization sprint

- Launch one lead magnet tied to top-performing cluster
- Add "related reads + newsletter value" block to post endings
- Refresh two additional high-impression posts and update revision dates
- Review first conversion data and build next 60-day refresh queue

## KPI Targets For This Plan

- Increase blog-to-newsletter conversion rate
- Improve non-branded impressions/clicks on refreshed cluster pages
- Reduce query cannibalization by consolidating overlapping intent pages
- Improve perceived quality/trust via cleaner metadata and stronger evidence
