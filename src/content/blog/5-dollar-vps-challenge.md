---
title: "The $5 Cloud + VPS Stack — Running Indie SaaS on Fly.io and Bare Metal"
description: "How I mix traditional VPS hosting with Fly.io’s cloud network to build, deploy, and scale full-stack apps for under $10 a month."
pubDate: "Nov 15 2025"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["Fly.io", "VPS", "Django", "Vue.js", "DevOps", "indie dev", "hosting"]
---

# The $5 Cloud + VPS Stack — Running Indie SaaS on Fly.io and Bare Metal

## 1️⃣ Story: From VPS Days to Cloud Edge

Before Fly.io, I used plain VPS servers — DigitalOcean, Linode, Vultr.  
They gave me total control but also total responsibility:  
manual updates, nginx config, database tuning, firewalls, SSL renewals.  

Then I found Fly.io — a cloud platform that runs **Docker containers globally**.  
It didn’t replace VPS; it **complemented it**.  
Now I use both: a VPS for long-term stable services and Fly.io for global app deployment.


## 2️⃣ List: Why Use Both Fly.io and a VPS

### ⚙️ 1. VPS for Stability and Control
VPS hosting gives root access, full logs, and predictable performance.  
Perfect for running:
- Databases (PostgreSQL, Redis)
- File storage or backups
- Private services (cron, Celery workers)
You control everything — no limits on background tasks or daemons.

### 🌍 2. Fly.io for Global Reach
Fly.io handles edge deployment — your app runs near your users automatically.  
It’s great for Django APIs, static frontends, or anything Dockerized.  
With Fly, I skip all the networking setup a VPS usually requires.

### 🧩 3. Perfect Pair: Hybrid Architecture
A small VPS hosts my core data, and Fly.io runs the app containers.  
Fly connects to the VPS securely over WireGuard, which acts like a private network.

### 🧱 4. Cost Efficiency
Fly.io’s free and $5 VMs cover global delivery.  
My Hetzner VPS runs for about $4–$6/month.  
Together, that’s under $10/month for a complete SaaS stack.

### 🔐 5. Defense in Depth
Keeping the database on a VPS while Fly handles public traffic adds isolation.  
If Fly’s container gets compromised, the data layer stays protected.


## 3️⃣ Steps: My Hybrid Cloud Workflow

### Step 1 — Set Up a VPS Backend
Spin up a VPS (Hetzner, Linode, DigitalOcean).  
Install your stack:

\`\`\`bash
sudo apt update && sudo apt install postgresql redis nginx ufw
\`\`\`

Secure the ports:
\`\`\`bash
ufw allow 22/tcp
ufw allow 51820/udp   # for WireGuard
ufw enable
\`\`\`


### Step 2 — Create a WireGuard Network Between VPS and Fly.io
Fly provides its own private WireGuard tunnel:

\`\`\`bash
fly wireguard create
fly wireguard connect
\`\`\`

On your VPS, install WireGuard and configure the peer from Fly.  
This lets your Fly apps talk to the VPS privately via internal IPs.


### Step 3 — Deploy App on Fly.io
Dockerize your Django app and push it live:

\`\`\`bash
fly launch
fly deploy
\`\`\`

Set your environment variables to point to the VPS database:
\`\`\`bash
fly secrets set DATABASE_URL="postgres://user:pass@10.0.0.1:5432/app"
\`\`\`


### Step 4 — Serve Frontend with Fly.io or Netlify
If using Vue or Astro, deploy via:

\`\`\`bash
npm run build
\`\`\`

Then push to Netlify or Fly static hosting for near-zero latency delivery.


### Step 5 — Monitor Both Ends
- **Fly.io** handles uptime, logs, metrics, and scaling.  
- **VPS** handles persistent data, backups, and background tasks.  

Tools like **Uptime Kuma** or **Healthchecks.io** (also self-hostable) make monitoring easy.


## 4️⃣ The Big Idea: Best of Both Worlds

VPS = control.  
Fly.io = convenience.  
Together, they give indie developers full-stack power on an indie budget.  
You can keep your data local, deploy globally, and still spend less than lunch money.


## 📞 Call to Action

Want a hybrid setup that scales like the cloud but costs like a VPS?

👉 [Schedule a 15-minute Zoom call](https://calendly.com/baileyburnsed/15min)  
👉 or [Start your 30-day development plan now](https://baileyburnsed.dev/)

