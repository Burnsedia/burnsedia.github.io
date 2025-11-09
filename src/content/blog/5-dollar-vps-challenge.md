---
title: "The $5 Cloud + VPS Stack — Running Indie SaaS on Fly.io and Bare Metal"
description: "How I start on a $5 VPS using Docker Compose and Watchtower, then scale globally with Fly.io’s edge network — full control, low cost, and zero manual updates."
pubDate: "Nov 15 2025"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["Fly.io", "VPS", "Docker Compose", "Watchtower", "Django", "Vue.js", "DevOps", "indie dev", "hosting"]
---
# The $5 Cloud + VPS Stack — Running Indie SaaS on Fly.io and Bare Metal

## From VPS Foundations to Global Edge

I start every project on a **$5 VPS** — usually Hetzner, Linode, or Vultr.
It’s cheap, stable, and gives me full root control.
Everything runs in **Docker Compose**, built once and pushed to **GitHub Container Registry (GHCR)**.

Then I use **Watchtower** to keep the VPS containers updated automatically —
no `git clone`, no `git pull`, no manual SSHing.
I just push a new Docker image, and Watchtower redeploys it automatically.

## Why I Still Love VPS Hosting

### 1. Full Control

VPS gives me root access, predictable performance, and zero vendor lock-in.
Perfect for:

* PostgreSQL / Redis
* Celery or background tasks
* Cron jobs and backup scripts
* Reverse proxies (Nginx / Caddy)

### 2. Self-Updating Infrastructure

I use Watchtower to keep all containers fresh:

```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --cleanup --interval 300
```

Now when I push a new Docker image to GHCR,
the VPS auto-pulls the update within five minutes — no downtime.

### 3. Simple Docker Compose Setup

```bash
docker compose up -d
```

That’s it.
No pipelines, no complex CI/CD.
Just containers that maintain themselves.


## When Fly.io Enters the Picture

I stay on the VPS as long as possible.
It’s fast, predictable, and easy to manage with Watchtower keeping everything current.

But when I start pushing the limits — CPU maxed out, latency creeping up,
or more users than a single VPS can comfortably handle —
that’s when **Fly.io** becomes the next step.

I don’t rebuild anything.
I take the exact same Docker image that’s already running on the VPS
and deploy it to **Fly.io** for horizontal scaling and global reach.

### Deploying the Same Image

```bash
fly launch
fly deploy --image ghcr.io/username/app:latest
```

Fly.io automatically handles SSL, load balancing, and global regions.
It becomes my edge layer — scaling out copies of the same container closer to users.

### Managing the Data Layer

For small side projects, I’ll sometimes keep a local PostgreSQL container on the VPS —
it’s simple, fast, and fits within that $5 budget.

But once the app starts to grow, I migrate to a **Fly.io Managed Database**
or use **Neon** for cloud-native Postgres.
Both options are built for high availability and scale,
so I don’t have to worry about data loss, backups, or uptime.

Example production setup:

```bash
fly secrets set DATABASE_URL="postgres://user:pass@<fly-db-host>:5432/app"
```

Fly.io or Neon handle the persistence and replication,
while my app containers can scale freely across regions without touching the data layer.

It’s the same workflow — just a smarter backend once the project outgrows local storage.

## Architecture and Cost

| Layer  | Platform           | Role                                     | Cost       |
| ------ | ------------------ | ---------------------------------------- | ---------- |
| VPS    | Hetzner / Linode   | Databases, Redis, Workers, Reverse Proxy | $5–6/mo    |
| Fly.io | Global Edge        | Scaling API + Frontend Containers        | Free–$5/mo |
| GHCR   | Container Registry | Image Hosting                            | Free       |

**Total:** Under **$10/month**
**Maintenance:** Zero manual updates
**Upgrade Path:** VPS first → Fly.io when you outgrow it

## The Indie Stack That Scales Itself

* VPS = Control & Data Persistence
* Watchtower = Zero-Touch Updates
* Fly.io = Scale When You Need It
* Cost = Under $10/month

Build once. Push once.
Let Watchtower keep your VPS fresh — and Fly.io handle the scale-up when the time comes.

Want this hybrid setup for your SaaS or internal project?

[Book a 15-minute strategy call](https://calendly.com/baileyburnsed/15min)
or [Start your hybrid deployment plan](https://baileyburnsed.dev)
