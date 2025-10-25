---
title: "Multi-Tenant SaaS with django-tenants (Don’t Reinvent the Wheel)"
description: "A production-ready guide to building a multi-tenant Django app using the battle-tested django-tenants library: schemas, domains, middleware, and deploy notes."
pubDate: "2025-10-24"
tags: ["Django", "SaaS", "Multi-tenant", "django-tenants", "PostgreSQL", "Fly.io"]
---

# Multi-Tenant SaaS with `django-tenants` (Don’t Reinvent the Wheel)

You don’t need to hand-roll tenant middleware, routers, and schema switching.  
**`django-tenants`** gives you a proven pattern: one **PostgreSQL database**, multiple **schemas** (one per tenant), a **public** schema for shared stuff, and automatic **subdomain** routing.

This guide shows a clean, production-ready setup that plays nicely with the stack from the earlier posts (DRF, Djoser + SimpleJWT, Vue).

> We’ll use **`django-tenants`** (the maintained successor to older libs). PostgreSQL is required.

---

## 🧩 What You’ll Build

- A **public** schema (marketing site, auth entry, global config)
- A **tenant** schema per customer (their data, models)
- Subdomain routing like `acme.yourapp.com` → Acme’s schema
- Commands to create tenants, run migrations per schema
- JWT auth that works per tenant domain

---

## 0) Install & Enable

```bash
pip install django-tenants
```

`settings.py` — add apps **in this order**:

```python
INSTALLED_APPS = [
    # django-tenants must come BEFORE django.contrib.contenttypes
    "django_tenants",

    # Django core
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.admin",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Your shared/tenant apps below...
    "rest_framework",
    "djoser",
    "rest_framework_simplejwt",
    # your apps...
]
```

Database (PostgreSQL only):

```python
DATABASES = {
    "default": {
        "ENGINE": "django_tenants.postgresql_backend",  # IMPORTANT
        "NAME": "yourdb",
        "USER": "youruser",
        "PASSWORD": "yourpass",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```

Tenant router and middleware:

```python
DATABASE_ROUTERS = ("django_tenants.routers.TenantSyncRouter",)

MIDDLEWARE = [
    "django_tenants.middleware.main.TenantMainMiddleware",  # must be near top
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]
```

---

## 1) Declare Your Tenant & Domain Models

Create an app, e.g. `tenancy`:

```bash
python manage.py startapp tenancy
```

`tenancy/models.py`:

```python
from django.db import models
from django_tenants.models import TenantMixin, DomainMixin

class Client(TenantMixin):
    # Required by django-tenants
    name = models.CharField(max_length=255)
    paid_until = models.DateField(null=True, blank=True)
    on_trial = models.BooleanField(default=True)

    # auto_create_schema ensures migrations create this tenant's schema
    auto_create_schema = True

    def __str__(self):
        return self.name


class Domain(DomainMixin):
    # domain = 'acme.yourapp.com' (provided by DomainMixin)
    pass
```

Add the app:

```python
INSTALLED_APPS += ["tenancy"]
```

---

## 2) Split Shared vs Tenant Apps

`django-tenants` needs to know which apps live in the **public** schema and which live per **tenant** schema:

```python
SHARED_APPS = (
    "django_tenants",        # must be first
    "tenancy",               # contains Client and Domain
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.admin",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # shared utilities/APIs (optional)
    "rest_framework",
    "djoser",
    "rest_framework_simplejwt",
)

TENANT_APPS = (
    # everything here will be synced to each tenant schema
    # put your domain-specific apps here
    "yourapp.projects",
    "yourapp.billing",
    # etc...
)

INSTALLED_APPS = list(SHARED_APPS) + list(TENANT_APPS)

# The tenant model & domain model paths
TENANT_MODEL = "tenancy.Client"   # app.Model
TENANT_DOMAIN_MODEL = "tenancy.Domain"
```

> **Rule of thumb:** stuff that’s truly global (admin, auth entry, landing pages, Djoser endpoints) stays in **SHARED_APPS**. Per-tenant data/models go in **TENANT_APPS**.

---

## 3) Run Initial Migrations

First time:

```bash
python manage.py makemigrations
python manage.py migrate_schemas --shared  # create public schema objects
```

Then create a tenant:

```bash
python manage.py create_tenant
```

If you don’t have that command yet, add a simple management command.

`tenancy/management/commands/create_tenant.py`:

```python
from django.core.management.base import BaseCommand
from tenancy.models import Client, Domain

class Command(BaseCommand):
    help = "Create a tenant and its domain"

    def add_arguments(self, parser):
        parser.add_argument("--schema", required=True, help="Schema name (e.g., acme)")
        parser.add_argument("--name", required=True, help="Tenant name (e.g., Acme Inc)")
        parser.add_argument("--domain", required=True, help="Domain (e.g., acme.yourapp.com)")
        parser.add_argument("--paid", default=None, help="YYYY-MM-DD or omit")

    def handle(self, *args, **opts):
        client = Client(
            schema_name=opts["schema"],
            name=opts["name"],
        )
        if opts["paid"]:
            from datetime import date
            y, m, d = map(int, opts["paid"].split("-"))
            client.paid_until = date(y, m, d)

        client.save()  # auto-creates schema

        Domain.objects.create(
            domain=opts["domain"],
            tenant=client,
            is_primary=True,
        )
        self.stdout.write(self.style.SUCCESS(f"Tenant {client} created at {opts['domain']}"))
```

Usage:

```bash
python manage.py create_tenant --schema=acme --name="Acme Inc" --domain=acme.yourapp.com
```

Migrate tenant apps to **all** schemas:

```bash
python manage.py migrate_schemas --tenant
```

---

## 4) URL Routing & Subdomains

Requests are routed by **host header**.  
Point `*.yourapp.com` to your app (wildcard DNS). Each tenant gets a `Domain` row like `acme.yourapp.com`.

Your normal `urls.py` can stay as is. `TenantMainMiddleware` switches DB schema before resolving the view, so your views “just work” per tenant.

If you want a **public site** at `www.yourapp.com` and tenants on subdomains, create a `Domain` for `www` that points to the **public** tenant (schema `public` is implicit).

> On Fly.io, map your apex and wildcard domains in DNS to your Fly app. TLS certs will cover `*.yourapp.com` if you enable a wildcard cert via your DNS/ACME setup.

---

## 5) Creating Tenant-Scoped Data

Any model in `TENANT_APPS` automatically lives inside each schema.  
No need to manually filter by org — the **schema** enforces isolation.

Example (tenant app): `projects/models.py`:

```python
from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
```

A request to `acme.yourapp.com` will read/write **only** the `acme` schema’s `projects_project` table.

---

## 6) Admin & Superusers per Tenant

Create superusers for a specific tenant schema:

```bash
python manage.py tenant_command createsuperuser --schema=acme
```

This runs any Django command inside that tenant schema.  
Global/public superusers run under `public` (default):

```bash
python manage.py createsuperuser  # public schema
```

---

## 7) Auth with Djoser + SimpleJWT (Per Tenant)

Place Djoser URLs in **shared** (public) if you want a centralized auth entry **per domain**.  
In multi-tenant reality, users log in **on their tenant domain** (`acme.yourapp.com`) so tokens are scoped to that tenant.

`settings.py` (from earlier post still valid):

```python
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}
```

`urls.py`:

```python
from django.urls import path, include

urlpatterns = [
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
    path("api/", include("yourapp.api_urls")),  # your APIs
]
```

Because schema switching happens **before** URL resolution, each subdomain authenticates against its own schema’s users. Your Vue SPA should call the same paths, **but on the tenant domain**.

---

## 8) Migrations & Releases

Common flows:

- Add a new app to `TENANT_APPS` → run:
  ```bash
  python manage.py makemigrations
  python manage.py migrate_schemas --tenant
  ```
- Change shared models → run:
  ```bash
  python manage.py migrate_schemas --shared
  ```
- Run arbitrary management commands across tenants:
  ```bash
  python manage.py tenant_command <cmd>
  # e.g.
  python manage.py tenant_command collectstatic
  ```

Automate these in CI/CD after deploy.

---

## 9) Local Dev & Fixtures

In dev, map `acme.local` to `127.0.0.1` in `/etc/hosts`, then create a `Domain` for `acme.local` pointing to your tenant.  
You can also seed demo tenants:

```bash
python manage.py create_tenant --schema=demo --name="Demo Co" --domain=demo.local
python manage.py tenant_command loaddata demo_data.json --schema=demo
```

---

## 🔧 Production Notes (Fly.io / Postgres)

- Use **one managed Postgres** with multiple schemas (Fly Postgres, Aiven, RDS, etc.).  
- Backups restore per database; for tenant-level export, dump the schema.  
- Enable connection pooling (PgBouncer) when traffic grows.  
- Wildcard DNS: `*.yourapp.com` → Fly app.  
- HTTPS: terminate TLS at Fly; enforce HTTPS in Django `SECURE_SSL_REDIRECT = True`.

---

## 🧠 When to Use Separate Databases

`django-tenants` makes **separate schemas** easy. If you need **separate databases per tenant** (compliance, noisy neighbors), you can:
- Run **multiple Fly apps** (one per big tenant), or  
- Write a custom DB router (advanced), or  
- Split “premium tenants” to dedicated databases and keep small tenants in the shared DB.

Start simple with schemas; graduate to DB-per-tenant only when you must.

---

## 🏁 Conclusion

`django-tenants` saves months of architecture work:

- Public vs tenant apps, automatically versioned/migrated
- Subdomain → schema switching handled for you
- Plays perfectly with DRF + Djoser + JWT + Vue
- Scales from MVP to serious SaaS

Don’t reinvent tenancy. Ship features.

---

*Written by Bailey Burnsed — Senior Software Engineer, Founder of BaileyBurnsed.dev*

