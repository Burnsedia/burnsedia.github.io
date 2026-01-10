---
title: "Lesson 3: Adding Authentication with Djoser and SimpleJWT"
description: "Complete setup for Django REST auth using Djoser + SimpleJWT — includes the required URLs/settings, email-as-username, custom User model, email verification, and token blacklist logout."
pubDate: "Oct 12 2025"
lesson: 3
---

# Adding Authentication with Djoser and SimpleJWT (Updated)

> This is an updated version that **includes the required configuration you must add** (Djoser URLs + DRF/JWT settings), plus **advanced options**: email-as-username, custom user model, email verification, and proper logout using token blacklisting.

## ✅ What You’ll Build

- Token-based auth (access + refresh) with **SimpleJWT**
- Plug-and-play endpoints from **Djoser**
- Optional **custom User model** that uses **email as the login field**
- Email **verification** (activation links) and **password resets**
- **Token blacklisting** for secure logout


## 0) Install Dependencies

```bash
pip install djangorestframework djoser djangorestframework-simplejwt
# For email previews in dev (optional):
pip install django-allauth  # not required, but useful if you later integrate social auth
```


## 1) Required Settings (Must Add)

`settings.py`:

```python
INSTALLED_APPS = [
    # Django core
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "djoser",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",  # for logout/blacklist
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,          # optional: rotate refresh on use
    "BLACKLIST_AFTER_ROTATION": True,        # required if you want secure logout
    "AUTH_HEADER_TYPES": ("Bearer",),
}
```

`urls.py` (project root):

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # Djoser (base & JWT endpoints)
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
]
```

Now you have:

- `POST /api/auth/jwt/create/` (login)
- `POST /api/auth/jwt/refresh/`
- `POST /api/auth/jwt/verify/`
- `POST /api/auth/users/` (register)
- `GET  /api/auth/users/me/`
- plus password reset / activation endpoints (configure email below)


## 2) (Recommended) Use Email as Username with a Custom User Model

Create an app for users:

```bash
python manage.py startapp users
```

`users/models.py`:

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=False, blank=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # no username

    def __str__(self):
        return self.email
```

`settings.py`:

```python
INSTALLED_APPS += ["users"]
AUTH_USER_MODEL = "users.User"
```

**Important:** create this custom user model **before** your first migration in a new project.  
If migrating an existing project, follow Django’s official guide for swapping user models.

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```


## 3) Configure Djoser for Email Login + Optional Features

`settings.py`:

```python
DJOSER = {
    # Tell Djoser to use email for login
    "LOGIN_FIELD": "email",

    # What fields are exposed/required
    "USER_ID_FIELD": "id",
    "USER_CREATE_PASSWORD_RETYPE": True,  # ask to type password twice on registration
    "SEND_ACTIVATION_EMAIL": True,        # enable activation flow
    "SEND_CONFIRMATION_EMAIL": True,      # email on successful password change

    # Password reset / activation URLs your frontend will handle:
    "PASSWORD_RESET_CONFIRM_URL": "reset-password/{uid}/{token}",
    "ACTIVATION_URL": "activate/{uid}/{token}",

    # Serializers (use Djoser's defaults or plug your own)
    "SERIALIZERS": {
        "user_create": "djoser.serializers.UserCreateSerializer",
        "user": "djoser.serializers.UserSerializer",
        "current_user": "djoser.serializers.UserSerializer",
    },
}
```

**Dev email backend** to preview links in the console:

```python
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
DEFAULT_FROM_EMAIL = "noreply@example.com"
```

In production, switch to SMTP or a provider (e.g., SES, Postmark, SendGrid).


## 4) Token Blacklist (Secure Logout)

Since we enabled `rest_framework_simplejwt.token_blacklist`, add routes to blacklist refresh tokens on logout.

You can either use Djoser’s built-in `/jwt/logout/` (DRF view) or create a tiny custom endpoint:

`auth/views.py` (optional custom):

```python
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            return Response({"detail": "Refresh token required."}, status=400)
        try:
            token = RefreshToken(refresh)
            token.blacklist()
        except TokenError:
            return Response({"detail": "Invalid token."}, status=400)
        return Response(status=status.HTTP_205_RESET_CONTENT)
```

`urls.py`:

```python
from django.urls import path, include
from auth.views import LogoutView  # adjust path to your app

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
    path("api/auth/jwt/logout/", LogoutView.as_view()),  # optional custom
]
```

Client flow:
- On logout, send `POST /api/auth/jwt/logout/` with the **refresh** token to blacklist it.


## 5) End-to-End Flow (Examples)

### Register

```
POST /api/auth/users/
{
  "email": "dev@example.com",
  "password": "SuperStrongPassword123",
  "re_password": "SuperStrongPassword123"
}
```

If `SEND_ACTIVATION_EMAIL=True`, user must activate via emailed link:
```
GET /api/auth/users/activation/?uid=...&token=...
```
(or your frontend consumes `ACTIVATION_URL` and calls the confirm endpoint)

### Login

```
POST /api/auth/jwt/create/
{
  "email": "dev@example.com",
  "password": "SuperStrongPassword123"
}
```

Response:
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Include on requests:
```
Authorization: Bearer <access_token>
```

### Refresh

```
POST /api/auth/jwt/refresh/
{
  "refresh": "<refresh_token>"
}
```

### Logout (Blacklist)

```
POST /api/auth/jwt/logout/
{
  "refresh": "<refresh_token>"
}
```


## 6) Make Views Public or Private

Global default is authenticated. Make a view public as needed:

```python
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Quote
from .serializers import QuoteSerializer

class QuoteViewSet(ModelViewSet):
    queryset = Quote.objects.all().order_by("-created_at")
    serializer_class = QuoteSerializer
    permission_classes = [AllowAny]  # public
```

---

## 7) Fly.io Secrets for Production

Set secrets before deploy:

```bash
flyctl secrets set DJANGO_SECRET_KEY='supersecret'
flyctl secrets set DEBUG='False'
flyctl secrets set DEFAULT_FROM_EMAIL='noreply@example.com'
# SMTP creds if you use a real email backend in prod:
flyctl secrets set EMAIL_HOST='smtp.sendgrid.net'
flyctl secrets set EMAIL_HOST_USER='apikey'
flyctl secrets set EMAIL_HOST_PASSWORD='your_sendgrid_api_key'
flyctl secrets set EMAIL_PORT='587'
flyctl secrets set EMAIL_USE_TLS='True'
```

Then:

```bash
flyctl deploy
```

## Troubleshooting

- **401 Unauthorized**: Missing `Authorization: Bearer <token>` header or expired token.  
- **Activation not working**: Check console email output, confirm `DJOSER` URLs and email backend.  
- **Custom user errors**: Ensure `AUTH_USER_MODEL` is set **before** first migration on new projects.  
- **Logout not invalidating**: Confirm `token_blacklist` app is installed and blacklist flags enabled in `SIMPLE_JWT`.

## Conclusion

You now have a **production-grade authentication layer**:

- Djoser for endpoints and flows  
- SimpleJWT for modern tokens  
- Email-as-username with a custom user model  
- Email verification + password resets  
- Secure logout with token blacklisting

It’s clean, repeatable, and works with any frontend (Vue, Flutter, React) — perfect for indie SaaS and client projects.


*Written by Bailey Burnsed — Senior Software Engineer, Founder of BaileyBurnsed.dev*

