---
title: "Self-Hosting as a Service: How I Run Client SaaS on Fly.io"
description: "How I combine Docker, Django, and Fly.io to deliver white-label SaaS apps that clients fully own — the self-hosting model that keeps performance high and costs low."
pubDate: "Dec 16 2025"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["Fly.io", "Docker", "Django", "DevOps", "SaaS", "self-hosting"]
---

# Self-Hosting as a Service: How I Run Client SaaS on Fly.io

## 1️⃣ Story: Why I Stopped Renting Infrastructure

When I started freelancing, I used every popular cloud: AWS, Firebase, Vercel, Render.  
They were convenient — until a client needed control, data privacy, or long-term cost predictability.  

That’s when I moved everything to **Fly.io**, powered by **Docker** and **Django**.  
Now, instead of “renting” compute from big platforms, I help clients **own their infrastructure**.  
It’s fast, secure, and scales globally with almost no overhead.  

Self-hosting isn’t old-school.  
It’s **freedom packaged as a service**.

## 2️⃣ List: The Benefits of Self-Hosting SaaS

### 🔒 1. Client Ownership
Each client gets their own Fly.io app, database, and domain.  
No shared tenancy, no mystery servers, no lock-in.  
They control their data and can export it anytime.

### 💰 2. Predictable Costs
$5–$10/month instances per app mean small businesses can scale without surprise bills.  
They pay for **usage**, not “premium tiers.”

### ⚙️ 3. Same Stack Everywhere
Every deployment uses:
- Django + REST Framework backend  
- Vue.js or Astro frontend  
- PostgreSQL or LiteFS storage  
- Docker for reproducibility  

If it runs locally, it runs in production.

### 🌍 4. Global Scaling in Minutes
Fly.io’s edge deploys your Docker container near your users automatically.  
Add a region, run one command:
```bash
fly scale count 3
fly regions add iad ord lhr
```
Done — global SaaS without a DevOps team.

### 🧠 5. Open-Source Alignment
This model matches my philosophy: **Own, don’t rent**.  
Clients get open-source codebases they can host anywhere, forever.  
My agency just makes that process painless.

## 3️⃣ Steps: My Deployment Workflow

### Step 1 — Local Docker Build
Each project starts as a standard Dockerized Django + Vue stack:
```bash
docker-compose up --build
```
Once the build is clean locally, it’s ready for Fly.io.

### Step 2 — Fly Launch
```bash
fly launch --name myapp --region atl
fly deploy
```
Fly detects the Dockerfile, provisions resources, and deploys automatically.  
SSL certificates and databases are auto-configured.

### Step 3 — Environment Variables
I use `.env.production` for secrets and staging variables:
```bash
DATABASE_URL=postgres://...
DJANGO_SECRET_KEY=...
FLY_APP_NAME=myapp
```
This keeps everything portable and secure.

### Step 4 — CI/CD Automation
Each client repo has GitHub Actions:
```yaml
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: fly deploy --remote-only
```
Clients push → code builds → Fly updates.  
No human bottlenecks.

### Step 5 — Monitoring and Backups
Fly’s built-in logs + health checks + snapshot backups handle reliability.  
For analytics and error tracking, I add **Sentry** and **Uptime Kuma** containers.

## 4️⃣ Example: From Local MVP to Global SaaS

One client started with a simple Django MVP on my VPS.  
When traffic grew, I migrated it to Fly.io in under an hour.  

No rebuilds. No downtime.  
Just:
```bash
fly launch
fly deploy
```

Now they have:
- A self-hosted SaaS running in 3 regions  
- Dockerized CI/CD  
- Isolated database per tenant  
- Zero dependency on AWS or third-party vendors  

That’s **Self-Hosting as a Service** in action.

## 5️⃣ Lessons Learned

- Start small on a VPS, then scale seamlessly to Fly.io.  
- Dockerize everything — it’s your deployment passport.  
- Give clients ownership, not vendor dependence.  
- Simplicity beats fancy infrastructure 90% of the time.  

The beauty of this system is that it scales with **clients’ ambition**, not with cloud bills.

## 📞 Call to Action

Want your own white-label SaaS with open-source infrastructure and zero lock-in?  
That’s what I build — self-hosted, fast, and future-proof.

👉 [Schedule a 15-minute Zoom call](https://calendly.com/baileyburnsed/15min)  
👉 or [Start your 30-day development plan](https://baileyburnsed.dev)

