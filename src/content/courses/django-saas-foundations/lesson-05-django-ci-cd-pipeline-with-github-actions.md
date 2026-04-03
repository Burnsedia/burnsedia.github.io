---
title: "Django CI/CD Pipeline with GitHub Actions"
description: "Automate your Django app deployment to Fly.io using Docker and GitHub Actions — test, build, and ship with zero manual steps."
seoTitle: "Django CI/CD with GitHub Actions and Fly.io"
seoDescription: "Build a practical CI/CD pipeline for Django with GitHub Actions, Docker, tests, and Fly.io deployment automation."
pubDate: "2025-10-24"
tags: ["Django", "Fly.io", "CI/CD", "GitHub Actions", "Docker", "DevOps"]
heroImage: "/CyberPunkLogo2.jpg"
faq:
  - question: "What should run first in a Django CI pipeline?"
    answer: "Run linting and tests first, then build and deploy only if checks pass on your main branch."
  - question: "Do I need Docker for Django CI/CD on Fly.io?"
    answer: "Docker is the cleanest path because it keeps local, CI, and production environments consistent."
  - question: "How do I keep secrets safe in GitHub Actions?"
    answer: "Store credentials in GitHub Secrets, rotate them regularly, and avoid hardcoding environment values in workflow files."
---

# Django CI/CD Pipeline with GitHub Actions

Manually deploying your Django project every time you make a change slows down your workflow and increases the risk of mistakes.  

A **CI/CD pipeline** (Continuous Integration and Continuous Deployment) ensures that your code is tested, built, and deployed automatically every time you push to your main branch.

This tutorial shows how to build a full pipeline for your Django app using **GitHub Actions** and **Fly.io**.

## 🚀 What You’ll Learn

- Automate testing and migrations  
- Build Docker images for Django  
- Deploy automatically to Fly.io  
- Use GitHub Secrets to store environment variables  

## 🧩 Prerequisites

Before we begin, make sure you have:

- A **Django app** (preferably containerized with Docker)
- A **Fly.io** account and working app (`fly.toml` already created)
- GitHub repo connected to your project

## 🐳 Step 1: Dockerize Your Django App

If you don’t already have a `Dockerfile`, here’s a minimal example:

```dockerfile
# Dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
CMD ["gunicorn", "projectname.wsgi:application", "--bind", "0.0.0.0:8000"]
```

and `.dockerignore`:

```
__pycache__
*.pyc
.env
.git
```

Build and test locally:

```bash
docker build -t myapp .
docker run -p 8000:8000 myapp
```

## ⚙️ Step 2: Configure Fly.io for Deploys

Initialize your app if you haven’t yet:

```bash
fly launch
```

This creates a `fly.toml` configuration file that looks like this:

```toml
app = "your-app-name"

[build]
  image = "registry.fly.io/your-app-name:latest"

[env]
  DJANGO_SETTINGS_MODULE = "projectname.settings"
  PORT = "8000"
```

## 🔑 Step 3: Add Secrets to Fly.io

Store production secrets on Fly.io (so they’re not in your repo):

```bash
fly secrets set DJANGO_SECRET_KEY='supersecret'
fly secrets set DEBUG='False'
fly secrets set DATABASE_URL='postgresql://user:password@host:5432/dbname'
```

## 🧠 Step 4: Add GitHub Secrets

In your GitHub repo:

1. Go to **Settings → Secrets and variables → Actions**
2. Add the following secrets:

| Name | Description |
|------|--------------|
| `FLY_API_TOKEN` | Your Fly.io API token (`fly auth token`) |
| `DJANGO_SECRET_KEY` | Django’s secret key |
| `DATABASE_URL` | Connection string to production DB |
| `DEBUG` | Set to `False` |

## ⚡ Step 5: Create the GitHub Actions Workflow

Create a new workflow file:

```
.github/workflows/deploy.yml
```

```yaml
name: Deploy Django to Fly.io

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install flake8 black
          pip install -r requirements.txt

      - name: Run code quality checks
        run: |
          black --check .
          flake8 .

      - name: Run Django tests
        run: |
          python manage.py collectstatic --noinput
          python manage.py test

      - name: Set up Fly.io
        uses: superfly/flyctl-actions/setup-flyctl@master

      - name: Deploy to Fly.io
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
        run: |
          flyctl deploy --remote-only
```

## 🧪 Step 6: Trigger the Workflow

Push a commit to your `main` branch:

```bash
git add .
git commit -m "Enable GitHub Actions deploy"
git push origin main
```

Go to your GitHub repo → **Actions** tab → watch the deployment run.

Once complete, Fly.io will automatically build and deploy your app. 🎉

## 🧰 Step 7: Add Automatic Database Migrations

You can chain migrations to run right after deploy.

Add this job after deployment in `deploy.yml`:

```yaml
  run-migrations:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Set up Fly.io
        uses: superfly/flyctl-actions/setup-flyctl@master
      - name: Run Django migrations
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
        run: |
          flyctl ssh console -C "python manage.py migrate"
```

Now, every deploy will:

- Test your code
- Build your Docker image
- Push to Fly.io
- Run migrations automatically

## 🔁 Step 8: Optional — Staging Environment

If you want a staging app:

```bash
fly apps create myapp-staging
fly launch --name myapp-staging
```

Then duplicate your workflow file and deploy from a `staging` branch instead of `main`.

```yaml
on:
  push:
    branches: [staging]
```

You can even use separate secrets (`FLY_API_TOKEN_STAGING`, etc.).

## 🧭 Step 9: CI Enhancements

Add more checks as your app grows:

- **pytest-django** for unit tests  
- **Bandit** for security scans  
- **Black** + **Flake8** for linting  
- **isort** for import ordering  

Example:

```bash
pip install pytest pytest-django bandit
pytest
bandit -r .
```

## 🌍 Step 10: Monitor and Roll Back

Fly.io keeps image versions automatically.  
To rollback to a previous version:

```bash
fly releases
fly deploy --image <previous_image>
```

You can also view logs in real time:

```bash
fly logs
```

## 🏁 Conclusion

You now have a **production-ready Django CI/CD pipeline**:

✅ Automated testing and code checks  
✅ Zero-downtime Docker deploys  
✅ Environment secrets stored securely  
✅ Optional staging + rollback  

With this workflow, your Fly.io apps deploy themselves — every push ships production code.

*Written by Bailey Burnsed — Senior Software Engineer, Founder of BaileyBurnsed.dev*
