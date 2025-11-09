---
title: "Connecting Django and Vue.js"
description: "End-to-end guide to wiring a Vue 3 SPA to a Django REST API with Djoser + SimpleJWT, CORS, Axios, and secure auth flows."
pubDate: "2025-10-24"
tags: ["Django", "DRF", "Vue 3", "Vite", "Djoser", "JWT", "CORS", "Axios"]
---

# Connecting Django and Vue.js

This tutorial shows how to connect a **Vue 3 (Vite)** frontend to a **Django REST Framework** backend that uses **Djoser + SimpleJWT** for auth.

You’ll get:
- A Django API with CORS enabled
- JWT auth (login, refresh)
- A Vue SPA that stores tokens safely and calls protected endpoints
- Dev & prod configurations that work locally, in Docker, and on Fly.io

## 🧩 Prerequisites

- Completed the previous posts:
  - **DRF API** (quotes example works)
  - **Auth with Djoser + SimpleJWT (Updated)**  
- Python 3.11+, Node 18+, Docker (optional)

Backend assumed running at: `http://127.0.0.1:8000`  
Frontend will run at: `http://127.0.0.1:5173`

## 1) Enable CORS on Django

Install and configure CORS:

```bash
pip install django-cors-headers
```

`settings.py`:

```python
INSTALLED_APPS = [
    # ...
    "corsheaders",
    "rest_framework",
    "djoser",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    # ...
]

# Allow your Vite dev server
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

# If you need cookies (not mandatory for token auth)
CSRF_TRUSTED_ORIGINS = ["http://127.0.0.1:5173", "http://localhost:5173"]
```

Restart Django.

## 2) Create the Vue 3 App (Vite)

```bash
npm create vite@latest vue-client -- --template vue
cd vue-client
npm install
npm install axios pinia vue-router
```

Optional UI libs:
```bash
npm install @tailwindcss/forms tailwindcss postcss autoprefixer
```

Initialize Tailwind (optional):
```bash
npx tailwindcss init -p
```

`tailwind.config.cjs` (if using Tailwind):
```js
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/forms")],
};
```

`src/main.ts` or `src/main.js`:

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
```

## 3) Router & Protected Routes

`src/router/index.ts` (or `.js`):

```ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  { path: "/dashboard", name: "dashboard", component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

export default router;
```

## 4) Pinia Auth Store (JWT + Refresh)

`src/stores/auth.ts`:

```ts
import { defineStore } from "pinia";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    access: localStorage.getItem("access") || "",
    refresh: localStorage.getItem("refresh") || "",
    user: null as null | { id: number; email: string },
  }),
  getters: {
    isAuthenticated: (state) => !!state.access,
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await axios.post(`${API}/api/auth/jwt/create/`, { email, password });
      this.access = data.access;
      this.refresh = data.refresh;
      localStorage.setItem("access", this.access);
      localStorage.setItem("refresh", this.refresh);
      await this.fetchUser();
    },
    async refreshToken() {
      if (!this.refresh) return;
      const { data } = await axios.post(`${API}/api/auth/jwt/refresh/`, { refresh: this.refresh });
      this.access = data.access;
      localStorage.setItem("access", this.access);
    },
    async fetchUser() {
      if (!this.access) return;
      const { data } = await axios.get(`${API}/api/auth/users/me/`, {
        headers: { Authorization: `Bearer ${this.access}` },
      });
      this.user = data;
    },
    async logout() {
      try {
        if (this.refresh) {
          await axios.post(`${API}/api/auth/jwt/logout/`, { refresh: this.refresh }, {
            headers: { Authorization: `Bearer ${this.access}` },
          });
        }
      } catch (_) {}
      this.access = "";
      this.refresh = "";
      this.user = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});
```

> Security note: For SPAs, storing JWTs in memory is safer than localStorage; however, many indie projects accept localStorage with short token lifetimes and refresh rotation. For maximum security, consider a backend-for-frontend (BFF) with HTTP-only cookies.

## 5) Axios Interceptor (Attach Token & Refresh)

`src/lib/http.ts`:

```ts
import axios from "axios";
import { useAuthStore } from "../stores/auth";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const http = axios.create({
  baseURL: API,
});

http.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.access) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${auth.access}`;
  }
  return config;
});

let isRefreshing = false;
let pending: Array<() => void> = [];

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const auth = useAuthStore();
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && auth.refresh) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => pending.push(resolve));
        original.headers.Authorization = `Bearer ${auth.access}`;
        return http(original);
      }
      original._retry = true;
      isRefreshing = true;
      try {
        await auth.refreshToken();
        pending.forEach((r) => r());
        pending = [];
        original.headers.Authorization = `Bearer ${auth.access}`;
        return http(original);
      } catch (e) {
        auth.logout();
        throw e;
      } finally {
        isRefreshing = false;
      }
    }
    throw error;
  }
);

export default http;
```

Use `http` everywhere instead of raw `axios`.

---

## 6) Pages: Login, Dashboard, Home

`src/pages/Login.vue`:

```typescript
<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

async function submit() {
  loading.value = true;
  error.value = "";
  try {
    await auth.login(email.value, password.value);
    const redirect = (route.query.redirect as string) || "/dashboard";
    router.push(redirect);
  } catch (e: any) {
    error.value = "Invalid credentials.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 rounded" />
      <button :disabled="loading" class="w-full py-2 rounded bg-black text-white">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    </form>
  </div>
</template>
```

`src/pages/Dashboard.vue` (fetch protected endpoint):

```typescript
<script setup lang="ts">
import { onMounted, ref } from "vue";
import http from "../lib/http";

const quotes = ref<any[]>([]);
const error = ref("");

onMounted(async () => {
  try {
    const { data } = await http.get("/api/quotes/");
    quotes.value = data.results ?? data; // handle pagination or plain list
  } catch (e) {
    error.value = "Failed to load quotes.";
  }
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <p v-if="error" class="text-red-600">{{ error }}</p>
    <ul class="space-y-3">
      <li v-for="q in quotes" :key="q.id" class="border rounded p-3">
        <p class="font-medium">“{{ q.text }}”</p>
        <p class="text-sm text-gray-500">— {{ q.author }}</p>
      </li>
    </ul>
  </div>
</template>
```

`src/pages/Home.vue`:

```typescript
<script setup lang="ts"></script>
<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-2">Home</h1>
    <p>Welcome. Use the nav to login and view your dashboard.</p>
  </div>
</template>
```

Add a simple nav in `App.vue`:

```typescript
<script setup lang="ts">
import { useAuthStore } from "./stores/auth";
const auth = useAuthStore();
</script>

<template>
  <nav class="p-4 border-b flex gap-4">
    <router-link to="/">Home</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link v-if="!auth.isAuthenticated" to="/login">Login</router-link>
    <button v-else @click="auth.logout()">Logout</button>
  </nav>
  <router-view />
</template>
```

## 7) Environment Variables (Vite)

Create `.env` in `vue-client/`:

```
VITE_API_URL=http://127.0.0.1:8000
```

Use `import.meta.env.VITE_API_URL` (already done in store and http).

## 8) Docker Compose (Optional Dev)

Top-level `docker-compose.yml` (example):

```yaml
version: "3.9"
services:
  api:
    build: ./server
    env_file:
      - ./server/.env
    ports:
      - "8000:8000"
  web:
    build: ./vue-client
    working_dir: /app
    command: ["npm","run","dev","--","--host","0.0.0.0","--port","5173"]
    volumes:
      - ./vue-client:/app
    environment:
      - VITE_API_URL=http://api:8000
    ports:
      - "5173:5173"
    depends_on:
      - api
```

Django CORS must allow `http://web:5173` or just use `CORS_ALLOW_ALL_ORIGINS = True` for local Docker dev (not for prod).


## 9) Production Notes (Fly.io + Netlify)

- **Django API** → Fly.io (Docker).  
  - Set `CORS_ALLOWED_ORIGINS` to your production frontend URL, e.g. `https://yourdomain.com`.
- **Vue SPA** → Netlify, Vercel, or Fly Machines.  
  - Build with `VITE_API_URL` pointing to your API (e.g., `https://api.yourdomain.com`).
- **JWT Lifetimes** → Keep short access tokens (e.g., 15–60 min) and rotate refresh tokens.


## ✅ Quick Checklist

- [x] DRF + Djoser + SimpleJWT configured  
- [x] CORS headers added for dev & prod  
- [x] Vue router guards for protected routes  
- [x] Pinia store handling login, refresh, logout (blacklist)  
- [x] Axios interceptors attach token & auto-refresh  
- [x] Environment variables for API URL  
- [x] Optional Docker compose for local full-stack dev


## 🏁 Conclusion

You now have a **clean, modern** full-stack setup:
- Django REST API with JWT auth  
- Vue 3 SPA with protected routes and automatic token refresh  
- Configs that scale from local dev → Docker → Fly.io/Netlify

This pattern is production-grade and reusable for SaaS, dashboards, and mobile backends.

**Next up:** *django-ci-cd-pipeline-with-github-actions.md* — automate your build & deploys.


*Written by Bailey Burnsed — Senior Software Engineer, Founder of BaileyBurnsed.dev*

