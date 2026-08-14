# Business Plan: Content + Productized Services + App Sales

> Consolidated plan. Reconciles the audience-first plan (`business/business-plan.md`) and the
> products sprint (`.hermes/plans/2026-07-30_183000-products-revenue-sprint.md`) into one model
> with three revenue streams and a clear 30-day cash target.

Generated: 2026-08-13

---

## 1. The model: three engines, three timelines

Three revenue streams, each with its own realistic timeline. They compound, but they do NOT all
produce cash on the same clock.

| Stream | What | Timeline to cash | Job in the system |
|---|---|---|---|
| **Productized services** | Hermes/agent deployment + Unlimited Dev | **Now (days–weeks)** | Pays the bills, funds the other two |
| **Content** | Build log, newsletter, shorts | 3–6 months | Authority + inbound leads + audience |
| **App / product sales** | SaaS, games, digital assets | 3–9 months | Recurring product revenue + exit value |

**The honest rule:** services are the only engine that reliably clears $3k in 30 days. Content and
app sales are real, but they compound on a longer clock. Run all three, but fund the build with
service cash.

---

## 2. Target: $3k MRR in 30 days, low stress

From your Prompt.md. Be precise about "MRR" vs "cash":

| Path | Month-1 result | MRR run-rate |
|---|---|---|
| 1 Launch + 1 Care | ~$5,000 cash | $1,500/mo |
| 2 Launch | ~$7,000 cash | $0 |
| 2 Care plans | $3,000 cash | **$3,000/mo** ✅ |

**True $3k MRR = 2 care plans.** Realistic low-stress month-1 target: **2 paid deals of any kind**,
then convert toward Care plans in month 2. Warm path only (past clients, network, referrals) — no
cold email this month.

---

## 3. Pillar 1 — Productized services (the month-1 engine)

The offer, locked in: **"I put AI agents to work in your business."** Fixed scope, fixed price.

| SKU | Price | What it is |
|---|---|---|
| **Discovery** | Free (45 min) | Find the 1–3 workflows they'd pay to never do again |
| **Launch** | $3,500 one-time | Install agent stack + 2 workflows + training + runbook |
| **Scale** | $6,000 one-time | Up to 5 workflows + integrations + dashboard |
| **Care plan** | $1,500/mo | Maintenance + 1 new workflow/mo — the recurring engine |

Anchor upsell: **Unlimited Dev** $4,000/mo full-stack (already live on `/service`).

Warm sales motion (low stress): 15 names → 5 discovery calls → 2 closes. You already have the
deploy kit (`hermes-services/deploy/`), outreach templates, and prospect kit. The gap is *asking*.

---

## 4. Pillar 2 — Content (the compounding engine)

Content is not the month-1 revenue source; it is the month-3+ lead and audience engine. Keep it
running on a low-effort cadence while services pay the bills:

- **Newsletter** — "Agents in Production": weekly, one real deployment story per issue. Self-hosted
  (Listmonk) per the v3 architecture. Feeds inbound leads.
- **Build log** — the site's blog. Document what you're already building (apps + client work).
- **Shorts / devlogs** — repurpose git commits via the weekly content-pack cron already built.

Content converts differently per stream: build logs drive product + service sales; opinion pieces
drive consulting; deployment stories drive newsletter → inbound service leads.

---

## 5. Pillar 3 — App / product sales (the product line)

Your GitHub is a product pipeline, not a portfolio. Map what you already have to what sells:

| Asset | Repo | Type | Monetization path |
|---|---|---|---|
| boomerbill | `Burnsedia/boomerbill` | Web app | SaaS subscription |
| Dracula | `Burnsedia/dracula` | Flutter app | App store / subscription |
| 32bit-Spacer | `Burnsedia/32bit-Spacer` | Godot game | itch.io / Steam |
| BulkPost | `Burnsedia/BulkPost` | Content automation | SaaS |
| nerdtime | `Burnsedia/nerdtime` | CLI tool | Free → sponsors / pro tier |
| virtue-pwa | `Burnsedia/virtue-pwa` | Productivity PWA | Niche subscription (autistic/ADHD devs) |
| Django-Agent | `Burnsedia/Django-Agent` | AI agent suite | SaaS / license |
| hermes-skills | `Burnsedia/hermes-skills` | 94 agent skills | Digital bundle / sponsorware |
| waywind / darksynthwave | `Burnsedia/waywind`, `darksynthwave` | Tools/theme | One-time / tips |
| devleads / tgbs | (private) | Lead gen / niche app | B2B SaaS |

Strategy: **pick ONE app to push to revenue this quarter** (recommend boomerbill — it already has a
live user — or the hermes-skills bundle, which is instant-download). The rest stay "built in public"
content assets that feed the build log and build authority. Don't try to launch six products at once.

---

## 6. Website: one storefront, three streams

The site is the hub. Structure (matches `indie-developer-revenue-site`):

```
/                Homepage — content-first build log + latest
/service         Productized services (4 SKUs) — DONE
/products        Hub page — services + apps + content, all three streams
/blog            Build log
/newsletter      Lead magnet (specific offer, not "join my list")
/socials         Follow + support links
/legal           ToS, privacy
```

Payments stay external (Stripe Payment Links, itch.io, Gumroad, GitHub Sponsors/Patreon). No auth,
no backend on the site — it's the storefront layer.

---

## 7. 30-day execution (what runs NOW vs later)

**Week 1 — Offer + list.**
- Service page live with 4 SKUs (done). Build `/products` hub.
- Write the warm list: 15 names. Send 5 personal reach-outs.

**Week 2 — Conversations.**
- Book 3–5 Discovery calls. Send 5 more reach-outs.
- Newsletter lead magnet live.

**Week 3 — First close.**
- Close 1–2 deals (Launch / Launch + Care).
- Pick the ONE app to push to revenue this quarter; write its landing page.

**Week 4 — Recurring + momentum.**
- Deliver Launch, collect testimonial. Convert 1 → Care plan.
- First newsletter issue shipped. Book next month's pipeline from referrals.

**Later (months 2–6):** layer content cadence (weekly) + ship the first paid app + niche down the
service ("AI agents for [one vertical]").

---

## 8. Guardrails (the "low stress" contract)

- **One primary offer** for services (the 4 SKUs). Don't pitch courses, games, and SaaS in the same
  conversation.
- **One app** pushed to revenue at a time.
- **One channel**: warm reach-outs only this month.
- **One metric** weekly: discovery calls booked + deals closed. Ignore followers/pageviews until
  month 2.
- **Don't rebuild**: you already have the deploy kit, outreach templates, and a working site.

---

## 9. Measurement (weekly, 3 numbers)

1. Reach-outs sent (5–10/wk)
2. Discovery calls booked (3–5 by end of week 2)
3. Deals closed + MRR (2 deals / $3k+ cash by end of week 4)
