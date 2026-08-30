---
title: "Devlog: The Daily Tech Brief Pipeline (HN to Memes to Blog to LinkedIn)"
description: "I automated sending a daily tech-news brief to this blog with memes, then to LinkedIn. How the pipeline is built, why it exists, and what it does each morning."
pubDate: "2026-08-30"
heroImage: "/memes/not-sure-tldr.png"
tags: ["devlog", "automation", "ai agents", "content", "open source", "building in public"]
---

I built a small pipeline that turns Hacker News into a daily tech brief, with memes, on this blog and on LinkedIn. This is how it's put together and why it exists.

## What it does, end to end

Every day, hands-off:

1. **Source** — Pulls the live Hacker News front page via the Firebase API (`topstories.json`, then each item). Cross-checks two daily AI/tech indexes to find the 5-7 stories that actually matter.
2. **Write** — Turns that into a brief in my voice: plain, short, no hype, no em dashes. A one-line "through-line" ties the stories together (some days it's trust, some days it's money, some days it's just chaos).
3. **Memes** — Builds 3-5 memes with the memegen.link API matched to the day's stories, then hosts them on this domain (not hotlinked), with alt text, so they count as content instead of dead images.
4. **Publish** — Writes the post as an Astro markdown file, builds the site to verify it compiles, opens a PR, merges it, and Netlify deploys it.
5. **Share** — Post a shorter version to LinkedIn with a link back to the blog.

## The pieces

- **Sources:** Hacker News Firebase API (free, no key), plus the AI-news indexes for cross-checking.
- **Memes:** `api.memegen.link/templates` to list valid templates, then `images/{id}/{line1}/{line2}.png`. A real gotcha: only some template ids work (drake, fry, buzz, rollsafe here); the others 404. And I check the PNG magic bytes before trusting the file, because a "success" isn't a file.
- **Publishing:** The site is Astro + Netlify. Post goes into `src/content/blog/`, memes into `public/memes/`. `npm run build` is the gate that has to stay green before anything ships.
- **LinkedIn:** Via the API as the author, public post, with the blog URL.

## Why it exists

I'm building in public. The blog is the primary product, and this pipeline keeps it current without me dragging a news tab into the workflow every morning. It's a force multiplier on the "shipped" part of "no hype, just shipped."

## The honest trade-offs

- This is an auto-poster on a real account. I keep a human-in-the-loop bias: it reports real handles, never fakes a publish, and if the news is thin it's supposed to say so rather than force a meme.
- Memes are the hook, not the SEO. The value for search is the original written angle and self-hosted images, not the joke itself.
- A recurring job like this lives or dies on verification. Every step has to confirm it actually happened (HTTP 200 on the post, a real LinkedIn share URN), or the pipeline is just quietly lying.

## What's next

- Internal links: route the brief's "why it matters" into the service and devlog pages instead of only linking out to sources.
- Feeding older weekly roundups off the same pipeline.

The workflow is a reusable skill now, so each morning's brief is structured, verified, and in my voice. That's the whole point: build it once, then ship it daily.