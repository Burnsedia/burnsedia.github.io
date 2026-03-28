# Audience-First Business Plan

## Mission

Build `baileyburnsed.dev` into a command-and-control hub for audience growth first, while preserving existing site voice and copy as much as possible.

Primary outcomes:

1. Grow newsletter subscribers.
2. Grow GitHub Sponsors and Patreon patrons.
3. Grow social followers and repeat visitors.
4. Accept only high-fit client work as a secondary funnel.

---

## Brand And Domain Architecture

- **Primary authority domain:** `baileyburnsed.dev` (canonical home for SEO/GEO authority)
- **GitHub identity:** `Burnsedia`
- **Supporting domains:** `burnsedia.dev`, `retrofoss.dev`

Strategy:

- Keep core authority content and conversions on `baileyburnsed.dev`.
- Use supporting domains for focused campaigns, experiments, or niche audience projects.
- Link all properties back to `baileyburnsed.dev` with consistent identity (Bailey Burnsed / Burnsedia).

---

## Business Model

### Primary Revenue Support

- GitHub Sponsors (open-source support)
- Patreon (exclusive build notes, devlogs, deeper insights)

### Secondary Revenue

- Highly qualified consulting/build partnerships only

Qualification principles:

- Budget-ready
- Decision-maker involvement
- Clear business outcomes

---

## Product Strategy: Keep Copy, Improve Conversion Design

Do not rewrite site copy aggressively.
Instead, add conversion modules around existing content.

### Core UX Rule

Each page should emphasize one primary action:

- Newsletter signup (default)
- Sponsor/Patron support (secondary)
- Work-with-me application (select pages only)

### Reusable Conversion Modules

1. **Newsletter CTA block** (headline + value bullets + form/button)
2. **Support block** (GitHub Sponsors + Patreon)
3. **Follow block** (GitHub, X, LinkedIn)
4. **Client qualification CTA** (only on service/case study pages)

---

## Site-Level Design Improvements (Audience-First)

### Homepage

- Keep current hero copy and visual style.
- Make `Join the Newsletter` the primary CTA.
- Keep `Work with Me` visible but lower emphasis.
- Add one compact support panel: GitHub Sponsors + Patreon.
- Add one compact follow panel: social links + "build in public" prompt.

### Blog Preview Section

- Keep current writing cards.
- Add an inline newsletter card after post grid.
- Add lightweight copy: "Get new posts in your inbox."

### Newsletter Page

- Keep existing form and layout.
- Add value bullets:
  - weekly software notes
  - practical AI/dev workflows
  - build-in-public lessons
- Add trust note: "Unsubscribe anytime. No spam."

### Footer

- Expand footer to include:
  - newsletter shortcut
  - GitHub Sponsors link
  - Patreon link
  - social profile links

### Navigation

- Add persistent `Subscribe` action in desktop + mobile nav.
- Keep existing links; avoid major IA disruption.

---

## Content System (Markdown-First)

### Source of Truth

- Keep all editorial content in Markdown collections (`src/content/*`).
- Use MDX only when interactive blocks are necessary.

### Content Types

1. **Build Logs** (short, frequent, authentic)
2. **Deep Technical Posts** (how-to + tradeoffs)
3. **Case Narratives** (problem -> implementation -> result)
4. **Opinion/POV Posts** (strong voice, practical framing)

### Editorial Rules

- Include real constraints and tradeoffs.
- Prioritize practical detail over generic advice.
- Keep tone personal and direct.
- End every post with a clear audience CTA.

---

## SEO + GEO Plan

### SEO Basics

- Keep canonical URLs consistent on `baileyburnsed.dev`.
- Maintain metadata quality for title/description/open graph.
- Continue sitemap and RSS generation.
- Use internal linking between related posts and conversion pages.

### GEO (AI Discovery) Basics

- Add concise "Key Takeaways" in major posts.
- Add FAQ sections with direct answers.
- Use explicit headings phrased as questions where relevant.
- Include entity-rich context: tools, stacks, outcomes, constraints.

---

## Audience Growth Funnel

1. Visitor lands from search/social.
2. Visitor consumes authentic technical content.
3. Visitor subscribes to newsletter.
4. Newsletter nurtures trust.
5. Trusted subscribers convert to Sponsor/Patreon.
6. Small subset converts to high-fit client applications.

---

## Measurement Plan (GA4 + Simple KPIs)

Track these events:

- `newsletter_submit`
- `github_sponsor_click`
- `patreon_click`
- `social_follow_click`
- `work_with_me_click`

Weekly KPI dashboard:

- New newsletter subscribers
- Subscriber conversion rate by page
- Sponsor/patron click-through rate
- Returning visitor rate
- Top 10 pages by conversion contribution

---

## 30-Day Execution Plan

### Week 1: Conversion Infrastructure

- Add newsletter/support/follow modules to homepage and footer.
- Add persistent subscribe CTA in nav.
- Add GA4 events for key actions.

### Week 2: Blog Conversion Layer

- Add inline newsletter CTA and end-of-post support CTA.
- Add one lead magnet or value-focused newsletter promise block.

### Week 3: Content Cadence Activation

- Publish 2 short build logs.
- Publish 1 deeper technical post.
- Publish 1 sponsor/patron-oriented post.

### Week 4: Optimize

- Review conversion data.
- Improve CTA placement and wording where underperforming.
- Keep copy changes minimal; focus on placement, hierarchy, and consistency.

---

## 90-Day Targets

- Newsletter list growth: consistent month-over-month increase.
- Sponsor/patron growth: measurable recurring supporter lift.
- Engagement: higher returning visitor rate.
- Client pipeline quality: fewer low-fit inquiries, higher-fit conversations.

---

## Guardrails

- Preserve existing brand tone and core copy.
- Avoid over-optimizing into generic marketing language.
- Keep design cohesive with Darksynthwave theme.
- Favor authentic technical storytelling over volume publishing.

---

## Market Research Addendum (Niche Validation + Positioning)

### Niche Validation Snapshot

- Niche combination is strong: `Neovim + open coding tools + Godot + Flutter + technical builder commentary`.
- Communities are active and monetizable when content is implementation-first.
- Generic tech news is crowded; opinionated builder synthesis is higher-conversion.

### Public Market Signals

- Neovim ecosystem is large and active (`neovim/neovim` ~96k+ GitHub stars).
- Godot ecosystem is large and active (`godotengine/godot` ~106k+ stars).
- Flutter ecosystem is massive (`flutter/flutter` ~175k+ stars).
- itch.io has high Godot activity (`~32,958` Godot-tagged results).
- GitHub Sponsors shows meaningful market size (`$40M+` paid out, `4.2k+` sponsoring organizations).
- Stack Overflow 2024 signals:
  - Neovim usage ~12.5%
  - Flutter usage ~9.4%
  - GDScript usage ~2.3%
  - Godot appears as a recognized developer tool

### Opportunity By Segment

- **Neovim:** focus on shipping outcomes and workflows, not config-only content.
- **Open coding tools/agents:** fast-growth and crowded; win with practical benchmarks and real outcomes.
- **Godot games + art:** creator-heavy space; win with devlog + art pipeline + itch commercialization.
- **Flutter apps:** broad demand; stand out with senior architecture and anti-pattern teardown content.

### Positioning Strategy

- Core angle: build apps, games, and open tools in public with real constraints/tradeoffs and measurable outcomes.
- Differentiator: concrete implementation details and lessons learned, not generic trend commentary.

### Content Mix Recommendation

- 60% hybrid devlogs (apps/games/tools/art)
- 25% deep technical teardown tutorials
- 15% curated tech news with opinionated builder takeaways

### Conversion Alignment

- Public site: summaries, progress updates, authority content, and social proof.
- Patreon + GitHub Sponsors: early access, deeper implementation notes, private Q&A, and monthly patron sessions.
- LinkedIn: polished technical teardown content only.

### KPI Additions

Track monthly:

- Patreon and GitHub Sponsor click-through by content type
- Conversion rate from devlogs vs tutorials
- Returning visitor rate
- Clip-to-site referral traffic
- Verified follower growth per platform

---

## Summary

This plan treats the site as an audience engine first: newsletter, supporters, and followers.
It keeps existing messaging intact, adds conversion-focused design modules, and builds long-term authority around Bailey Burnsed / Burnsedia.
