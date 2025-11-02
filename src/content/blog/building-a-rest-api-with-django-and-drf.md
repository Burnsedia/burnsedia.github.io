---
title: "Building a REST API with Django and DRF"
description: "A practical guide for indie developers to build, serialize, and expose data with Django REST Framework."
pubDate: "2025-10-24"
---

# Building a REST API with Django and DRF

If Django is the engine of your app, Django REST Framework (DRF) is the transmission — it moves data between your frontend and backend with structure and speed.

This tutorial will show you how to build a **fully functional REST API** using Django and DRF — the same setup I use for my clients’ apps, SaaS platforms, and mobile APIs.

---

## 🧩 Why Django REST Framework?

DRF gives you all the essentials:
- Serialization (convert models to JSON)
- Authentication and permissions
- Pagination, filtering, and ordering
- ViewSets and Routers (clean API endpoints)

It’s perfect for indie devs who want professional-grade APIs without overengineering.

## ⚙️ Step 1: Install Django REST Framework

Assuming you already have a Django project, install DRF:

```bash
pip install djangorestframework
```

Then, add it to your `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
]
```

## 🧱 Step 2: Create a Model

In your `app/models.py` file, define a simple model — for example, a `Quote` model:

```python
from django.db import models

class Quote(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author
```

Apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```


## 🧩 Step 3: Create a Serializer

Serializers convert Django models into JSON data your frontend can read.

Create a new file `app/serializers.py`:

```python
from rest_framework import serializers
from .models import Quote

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = "__all__"
```

## 🧩 Step 4: Create a ViewSet

ViewSets make CRUD endpoints easy.

In `app/views.py`:

```python
from rest_framework import viewsets
from .models import Quote
from .serializers import QuoteSerializer

class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all().order_by("-created_at")
    serializer_class = QuoteSerializer
```

## 🧭 Step 5: Register the API Routes

In `app/urls.py`:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuoteViewSet

router = DefaultRouter()
router.register(r"quotes", QuoteViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
```

Then include `app.urls` in your project’s main `urls.py`:

```python
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("app.urls")),
]
```

## 🧪 Step 6: Test the API

Run your local server:

```bash
python manage.py runserver
```

Open your browser and visit:

```
http://127.0.0.1:8000/api/quotes/
```

You’ll see DRF’s interactive API view — you can add, edit, or delete quotes directly from the browser.

## 🔒 Step 7: Add Basic Permissions

In `settings.py`, define REST framework defaults:

```python
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
}
```

Later, you’ll switch to **JWT authentication** (we’ll cover that in the next tutorial).

## 🧠 Optional: Add Pagination and Filtering

Add pagination to your API responses:

```python
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}
```

Add search or filtering with `django-filter`:

```bash
pip install django-filter
```

Then modify the viewset:

```python
from rest_framework import filters

class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["author", "category"]
```

Now you can search like this:

```
/api/quotes/?search=wisdom
```

## 🚀 Step 8: Deploy the API to Fly.io

If you followed the previous tutorial, your Fly.io setup already works.  
You just need to redeploy with your new API changes:

```bash
flyctl deploy
```

Then visit:

```
https://yourapp.fly.dev/api/quotes/
```

Your REST API is now globally available.

## 🧭 What’s Next

From here, you can:
- Add authentication with **Djoser + SimpleJWT**  
- Connect your API to a **Vue.js** or **Flutter** frontend  
- Add background tasks with **Celery and Redis**

This API pattern works for everything — SaaS apps, mobile backends, CRMs, and even personal dashboards.

## 🏁 Conclusion

Building APIs with Django REST Framework is fast, clean, and scalable.  
You don’t need heavy frameworks or enterprise tools to serve data — just Django, DRF, and a good deployment pipeline.

When you own your stack, you own your business.


*Written by Bailey Burnsed — Senior Software Engineer, Founder of BaileyBurnsed.dev*

