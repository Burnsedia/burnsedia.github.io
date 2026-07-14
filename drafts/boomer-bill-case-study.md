---
title: "BoomerBill: A Vibe-Coding Case Study"
description: "I built an app out of spite to stop my mom interrupting my work. It got traction. I had to kill it because I never thought about money. Here's what vibe
    coding actually looks like when it hits real users."
pubDate: "Jul 14 2026"
heroImage: ""
tags: ["vibe-coding", "postmortem", "indie-dev", "startup-lessons", "open-source"]
---

# BoomerBill: A Vibe-Coding Case Study

## How I Vibe-Coded an App Out of Spite, Accidentally Got Users, and Had to Kill It Because I Never Thought About Money

## The Origin

> "My mom keeps interrupting my work."

That was the entire product spec. One sentence. Zero market research. No competitor analysis. No ICP.

BoomerBill started as a weekend spit-build — a tracker for unpaid family tech support. Log when your mom asks why her printer won't connect, see the cumulative cost of the interruption, set boundaries.

I opened Codex and started typing. The code was garbage. I'm not being modest — the commit history is a museum of AI failure:


commit "the AI ran out of tokens"
commit "I am not ever again using AI, it completely fuck my codebase"


The AI literally ran out of context mid-session and left my codebase in pieces. I was so mad I swore off AI forever. Then I used it again the next day because the code was already AI spaghetti and only AI could untangle it.

The stack was Vue 3 (frontend), Django (backend), Postgres, deployed on Fly.io + Netlify. But that was an accident too — I just picked whatever the AI suggested.


## The Marketing Strategy (Accidental)

I posted the app on:

  - Boomer subreddits — got banned for trolling boomers. The app itself was the troll.
  - Selfhosted communities — resonated with people who want local-first, no-SaaS tools.
  - Hacker News — the "I built this to stop my mom interrupting me" hook worked.
  - Twitter — threw it out there and let it cook.

There was no strategy. No launch plan. No press list. No "building in public" content calendar. I just posted a thing I built out of spite and it resonated. The
problem was real and universal enough that the app sold itself.

The AI Business Plan Theater

Here's where it gets ironic. Months later, an AI agent (BulkPost) scanned my repos and auto-generated FOSS_BUSINESS_MARKETING_PLAN.md, avatar.yml,
market-analysis.md — the whole corporate package. ICPs. 90-day targets. Pricing tiers. Open-core trust funnels.

The repo looked like it had a strategy. The docs were thorough. Any investor or user browsing the GitHub would think there was a plan.

There wasn't. I never wrote those docs. The AI wrote them because that's what AI does — it fills empty space with plausible-sounding structure. The business plan was
theater. I was still building on vibes underneath it all.


## The Traction

The app hit a nerve. People wanted this. 10,000+ logs on the server. Real sessions. Real users tracking real family members.

But here's the trap:

Almost all of it was anonymous/local-first traffic. The app synced to the API, but users never created accounts. There was no account wall, no paywall, no Stripe
integration — nothing to convert engagement into revenue.

I had one public account. In the "boomer hall of shame." Me.



## The Numbers That Matter

    | Metric              | Value                |
    |---------------------|----------------------|
    | Monthly server cost | $50/mo               |
    | Budget              | $5/mo                |
    | Revenue             | $0                   |
    | Gap                 | $50/mo out of pocket |

The killer was managed Postgres on Fly.io. Not the compute, not the bandwidth — the database. Scaling connections, backups, connection pooling. The convenience of
managed infrastructure became the unaffordable luxury.

On a $5 budget, a $50 bill isn't a scaling problem — it's a shutdown signal.

## The Kill

I pulled the servers. No announcement. No farewell blog post. Just — gone.

The code is still on GitHub, AGPL licensed. 170 commits. 46 open issues (P0 performance, P2 UI polish, and everything in between). 2 stars. A ghost repo that looks
alive but has no backend.

The Real Lessons

1. Distribution can exist without monetization, but scale will bankrupt you.

The app found its audience without a paid tier. That's actually remarkable — genuine product-market fit from a spite-build. But the server costs scaled linearly with
usage while revenue stayed at zero. If you don't ship the payment flow before the traffic spike, you're building a charity.

2. Vibe coding finds product-market fit. Vibe coding doesn't find unit economics.

Codex was great at turning "mom keeps interrupting me" into working software. It was terrible at turning that software into a sustainable business. The AI solved the
technical problem instantly. It could not solve the business problem at all — because I never asked it to.

3. AI-generated business plans are worse than no plan.

The repo was full of professional-looking strategy docs. They were all generated by an AI that didn't know the product, the market, or my budget. They made the project look serious while the actual business model was: hope the server bill doesn't come. Faux strategy is worse than no strategy because it prevents you from feeling the urgency of the real gap.

4. $5 budgets need $5 infrastructure.

Fly.io + managed Postgres is a beautiful stack until you check the bill. For a $5/month budget, the right answer is a $5 VPS with SQLite. Or a static PWA that doesn't
hit a backend at all — which was exactly the pivot I was making when the bills arrived.



## The Postmortem

BoomerBill succeeded at finding a problem people actually had. It failed at everything after that — monetization, infrastructure planning, honest strategy.

The repo lives. The code is open. The 46 open issues are a monument to "I'll fix it later" — later never came because the servers are off.

If I rebuild it:

  - PWA only. No backend. No Postgres. No server costs.
  - Payment on day one. The business model doesn't come after the code. It's part of the spec.
  - Honest strategy. One paragraph I actually wrote, not 10 pages an AI generated.

The AI can build the app. It can't build the business.

Built on spite. Ship on strategy.
