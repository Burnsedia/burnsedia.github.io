---
title: "Lesson 1: Getting Started with Django on Fly.io"
description: "A step-by-step guide to deploying your Django app with Docker on Fly.io — the indie developer’s cloud platform."
pubDate: "2025-10-24"
lesson: 1
tags: ["Django", "Fly.io", "deployment", "Docker"]
---

# Getting Started with Django on Fly.io

Fly.io is one of the best platforms for indie developers who want the power of cloud hosting without the complexity of AWS or the price of managed services.

You can deploy a production-ready Django app with Docker in minutes — and scale it globally when you're ready.

Let’s walk through how to get Django running on Fly.io from scratch.



## 🧩 What You’ll Need

- Python 3.11 or newer  
- Django (4.2+ recommended)  
- Docker installed  
- A Fly.io account (sign up at [https://fly.io](https://fly.io))  
- The Fly CLI (`flyctl`) installed  

If you don’t have the CLI yet:

```bash
curl -L https://fly.io/install.sh | sh
```

Then log in:

```bash
flyctl auth login
```



## ⚙️ Step 1: Create a Django Project

If you don’t already have a Django app:

```bash
mkdir myapp && cd myapp
python -m venv venv
source venv/bin/activate
pip install django gunicorn psycopg2-binary
django-admin startproject core .
```

Run it locally:

```bash
python manage.py runserver
```

Once confirmed, stop it with `Ctrl + C`.



## 🐳 Step 2: Add a Dockerfile

Inside your project root, create a file named `Dockerfile`:

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8080"]
```

Generate a `requirements.txt`:

```bash
pip freeze > requirements.txt
```



## 🗂️ Step 3: Initialize Fly.io

Create your app on Fly.io:

```bash
flyctl launch
```

The CLI will:
- Create a `fly.toml` config file  
- Ask for an app name  
- Ask if you want a Postgres database (say “Yes”)  
- Create the deployment region (choose one close to you)

Your folder will now have:

```
.
├── Dockerfile
├── fly.toml
├── core/
└── requirements.txt
```



## 🗃️ Step 4: Connect to Fly Postgres

After launch, Fly sets up a managed Postgres instance.  
You can connect to it using environment variables.

Get your credentials:

```bash
flyctl postgres connect
```

Or view them:

```bash
flyctl secrets list
```

In your Django `settings.py`, update the database config:

```python
import os
import dj_database_url

DATABASES = {
    "default": dj_database_url.config(default=os.environ.get("DATABASE_URL"))
}
```

Add this to your `.env` file locally for development.



## 🔒 Step 5: Configure Static Files

Install `whitenoise`:

```bash
pip install whitenoise
```

Add it to your `MIDDLEWARE` in `settings.py`:

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    ...
]
```

Collect your static files:

```bash
python manage.py collectstatic
```



## 🚀 Step 6: Deploy

Run:

```bash
flyctl deploy
```

This command:
- Builds your Docker image
- Pushes it to Fly.io
- Launches it in the closest region

Once deployed, Fly gives you a URL like:

```
https://myapp.fly.dev
```

Visit it — and your Django app is live.



## 🌍 Step 7: Scale and Secrets

You can add environment secrets:

```bash
flyctl secrets set DJANGO_SECRET_KEY='supersecret'
flyctl secrets set DEBUG='False'
```

To scale vertically or horizontally:

```bash
flyctl scale vm shared-cpu-1x --memory 512
flyctl scale count 2
```



## 🧠 Why Fly.io for Indie Devs?

Fly.io is built for the kind of developer who wants control, speed, and simplicity.

- Global edge deployment out of the box  
- Free tier for small apps  
- Built-in Postgres, Redis, and persistent volumes  
- Works seamlessly with Docker  
- CLI-first — no bloated dashboards  

It’s the perfect middle ground between self-hosting on a $5 VPS and managing AWS infrastructure.



## 🏁 Conclusion

You now have a fully working Django app on Fly.io — scalable, secure, and affordable.

From here, you can:
- Add a REST API (see next tutorial)
- Enable authentication with Djoser
- Set up CI/CD with GitHub Actions
- Scale into a full SaaS

You own the stack.  
You deploy it anywhere.  
That’s the indie way.



*Written by Bailey Burnsed — Senior Software Engineer, Founder of BaileyBurnsed.dev*

