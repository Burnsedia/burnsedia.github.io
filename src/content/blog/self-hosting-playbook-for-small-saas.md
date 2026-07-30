---
title: "Self-Hosting Playbook for Small SaaS Teams"
description: "A decision framework for founders evaluating self-hosting vs managed SaaS — with real examples from my own infra failures and wins."
seoTitle: "Self-Hosting vs Managed SaaS: A Practical Playbook"
seoDescription: "Use this framework to decide when to self-host SaaS infrastructure, control costs, and migrate safely without breaking reliability."
pubDate: "2026-07-30"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["self-hosting", "cloud", "saas", "devops", "indie dev"]
faq:
  - question: "Is self-hosting always cheaper than managed SaaS?"
    answer: "No. It is cheaper only when your workload is predictable and your team can own operations consistently."
  - question: "What is the biggest risk when moving to self-hosting?"
    answer: "Operational fragility. If on-call, backups, and rollback plans are weak, cost savings disappear fast."
  - question: "How should a small team migrate safely?"
    answer: "Use staged cutovers, validate read paths first, then shift traffic gradually with a tested rollback window."
---

# Self-Hosting Playbook for Small SaaS Teams

Self-hosting is not automatically cheaper, faster, or better. It becomes a strategic advantage when your team has predictable workloads, clear boundaries, and ownership discipline.

I learned this the hard way. BoomerBill ran up a $50/month managed Postgres bill on Fly.io before I ever made a dollar. That's the gap between "it works" and "it's sustainable."

This playbook helps decide when to self-host and how to do it without introducing operational fragility.

## Decision Criteria: Host or Rent?

Self-hosting is usually a fit when:

- your monthly SaaS stack is growing faster than revenue
- vendor limits block product requirements
- data ownership and control matter to your customers
- your team can own basic operations reliably

Managed SaaS is usually better when your team cannot support on-call and incident response yet.

My rule: start on managed infra to prove product-market fit, then self-host once the workload is predictable. BoomerBill should have been a $5 VPS with SQLite, not Fly.io managed Postgres.

## My Reference Stack

This is what I run for my own products:

- app: Django/FastAPI
- data: Postgres with automated backups (or SQLite for single-user tools)
- infra: $5 VPS → Docker → Fly.io when scaling is proven
- edge: CDN + managed DNS
- observability: logs + uptime checks + error tracking

The stack stays boring. Reliability beats novelty.

## Migration Strategy Without Downtime

Use staged migration:

1. mirror production data to target environment
2. run read-only validation checks
3. cut over low-risk endpoints first
4. shift traffic gradually
5. keep rollback path for full release window

Avoid all-at-once infrastructure moves unless the system is tiny and low-risk.

## Cost Control Model

Track infra as unit economics, not just total cloud spend:

- cost per active account
- cost per job/workflow execution
- margin impact per feature area

When BoomerBill's server cost hit $50/month with zero revenue, that wasn't an infra problem — it was a business model problem. Infra decisions should tie to product economics, not provider invoices.

## Operational Guardrails

Before calling a self-hosted setup "production ready," confirm:

- backup restore drills tested
- documented incident runbooks
- alerting with ownership defined
- deployment rollback tested
- secrets and access controls reviewed

Teams skip these because the app "seems stable" until first real incident.

Get weekly infra and dev notes in the [newsletter](/newsletter).
