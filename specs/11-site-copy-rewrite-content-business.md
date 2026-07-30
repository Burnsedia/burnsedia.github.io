# Site Copy Rewrite — Content Business Positioning

## Objective
Rewrite all site copy from the current consulting-centric messaging ("I build shit that works" → "Work With Me" → Unlimited Dev Service) to a content business positioning that promotes apps, games, digital art, and synthwave music.

## North Star
Every visitor immediately understands: this is an indie builder creating things across code, art, and music — not a freelancer for hire. CTAs drive to content, gallery, music, and products, not a consulting sales pipeline.

## Current vs New Positioning

| Dimension | Current (Consulting-first) | New (Content-first, consulting available) |
|-----------|---------------------------|-------------------------------------------|
| Identity | Freelance developer for hire | Indie builder — apps, games, art, music |
| Hero CTA | "Work With Me" / "Follow My Builds" | "Explore Projects" / "View Gallery" / "Listen" |
| Primary offer | Unlimited Dev Service ($4k/mo) | Content, products, gallery, music |
| Secondary offer | — | Consulting/freelancing (de-emphasized) |
| Social proof | Client projects shipped | GitHub repos, art pieces, music releases |
| Newsletter pitch | "Need help shipping?" | "Follow the build" |

## Requirements

### 1. Global Metadata (src/consts.ts)
- `SITE_TITLE`: Change from "baileyburnsed.dev" to "Burnsedia — Apps, Games, Art & Music"
- `SITE_DESCRIPTION`: Fix broken placeholder. New: "Indie builder shipping apps, games, digital art, and synthwave. Building in public."
- `SITE_META_DESCRIPTION`: Rewrite to reflect builder identity
- `BLOG_DESCRIPTION`: Rewrite to cover build logs, dev diaries, art process

### 2. Homepage Hero (HomeHero.astro)
- Keep "I build shit that works." (strong, established)
- New subtitle: "Apps. Games. Digital art. Synthwave. Building all of it in public."
- Typing phrases: ['Apps', 'Games', 'Art', 'Music', 'Open source']
- CTAs: "Explore Projects" → /products, "View Gallery" → /gallery, "Listen to Synthwave" → /music

### 3. Homepage About (HomeAbout.astro)
- Rewrite from freelance bio to builder manifesto:
  "I started coding at 9, making game mods in Lua and C++. Now I build apps, games, 3D art, and synthwave — all in public. I am an autistic hacker-artist. I build what I want, share the process, and sell what people find useful. No theater. Just shipped."

### 4. Projects Section (ProjectsSection.astro)
- Add creative project types with badges ("app", "game", "music", "art")
- Include: OpenClaw, 32bit-Spacer, Synthwave Album, Blender Art, boomerbill, Hermes Skills

### 5. Stats Section (HomeStats.astro)
- Replace client metrics with content metrics
- Apps & tools built, blog posts published, GitHub stars, art pieces, music tracks, years coding

### 6. Homepage CTA (HomeCTA.astro)
- Change from "Need it built right?" → "Explore what I'm building"
- CTAs: "Browse Projects", "View Gallery", "Read the Blog"

### 7. Newsletter CTA (NewsletterCtaCard.astro)
- New headline: "Follow the build"
- New pitch: "Weekly updates on apps, games, art, and music — plus early access to new releases."

### 8. Blog Post End CTA (BlogPost.astro)
- Remove consulting-first messaging
- Context-dependent CTA: link to gallery, music, or relevant product based on post topic

### 9. Navigation (Header.astro)
- New order: Projects | Gallery | Music | Blog | Newsletter | Socials
- De-emphasize or move "Work With Me"

### 10. Service Page (service.astro)
- Keep consulting/freelancing as a secondary offer
- De-emphasize from hero and primary nav
- Keep accessible from footer or /products sub-page
- Not the primary offer anymore — one option among many

## Files to Modify
- src/consts.ts
- src/components/homepage/HomeHero.astro
- src/components/homepage/HomeAbout.astro
- src/components/homepage/HomeCTA.astro
- src/components/homepage/HomeStats.astro
- src/components/homepage/ProjectsSection.astro
- src/components/shared/NewsletterCtaCard.astro
- src/components/shared/Header.astro
- src/layouts/BlogPost.astro
- src/pages/about.astro
- src/pages/service.astro (potential deprecation)
- src/pages/blog/index.astro

## Acceptance Criteria
- [ ] Homepage hero reflects content-first positioning (apps, games, art, music)
- [ ] Consulting is available but not the primary CTA or identity
- [ ] Stats reflect content business metrics (not exclusive client metrics)
- [ ] Newsletter pitch invites following the build
- [ ] Blog post end CTA defaults to content/products, not consulting-first
- [ ] Navigation prioritizes Projects, Gallery, Music
- [ ] Service page is accessible but de-emphasized from hero/nav
- [ ] Tone remains authentic: direct, anti-hype, "building in public"
- [ ] npm run build succeeds

## Issue Reference
- GitHub #135
