---
title: "Fixing Google Analytics in Astro After Enabling Client-Side Routing"
description: "How to get Google Analytics working again after adding <ClientRouter /> to your Astro site — plus why Brave and ad blockers might hide your traffic."
pubDate: "Oct 12 2025"
heroImage: "/CyberPunkLogo2.jpg"
---
# 🔧 Fixing Google Analytics When Using Client-Side Routing in Astro (and Brave Browser Blocks It)

When you enable **client-side routing** in your Astro site using `<ClientRouter />`, your pages stop doing full reloads.  
This improves UX — but it also breaks Google Analytics tracking, because GA only tracks **page loads**, not internal route changes.

To make things trickier, privacy-focused browsers like **Brave** block Google Analytics entirely by default.  
That’s why it may look like GA “works locally but not in production.”

This guide walks you through **fixing Google Analytics** on an Astro SPA and confirming it works in all modern browsers.

---

## Step 1. Add a Custom Pageview Tracker

Replace your existing GA snippet with this bulletproof version.  
It works for both **Astro’s SPA events** and browsers that don’t fully support them.

```html
<!-- GA4 tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LRMSZ4V1XG"></script>
<script>
  // Bootstrap GA
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());

  // Disable default pageview to prevent duplicates
  gtag('config', 'G-LRMSZ4V1XG', { send_page_view: false });

  // Function to send manual pageviews
  function sendPageView() {
    if (typeof gtag !== 'function') return;
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: location.href,
      page_path: location.pathname + location.search + location.hash
    });
    console.debug('[GA4] page_view:', location.href);
  }

  // Fire on load
  sendPageView();

  // Hook into Astro SPA events
  addEventListener('astro:page-load', sendPageView);
  addEventListener('astro:after-swap', sendPageView);

  // Backup hooks — catches all history changes
  ['pushState', 'replaceState'].forEach(fn => {
    const orig = history[fn];
    history[fn] = function() {
      const ret = orig.apply(this, arguments);
      queueMicrotask(sendPageView);
      return ret;
    };
  });
  addEventListener('popstate', sendPageView);
</script>

```
**Where to put it:**  
Inside your main layout (e.g., `src/layouts/BaseLayout.astro`), right before `</head>`.

**Why it works:**  
It handles Astro’s router events *and* native browser history events—so page views are sent no matter what framework behavior changes later.

---

## Step 2. Confirm Content Security Policy (CSP)

If you’re deploying on **Netlify**, you need to make sure GA is allowed by your headers.

Run this check:

```bash
curl -I https://your-domain.com | grep -i content-security-policy
```

If you see something like this:

```
content-security-policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline'; ...
```

You’re good.

If not, add this to your `netlify.toml` or `public/_headers` file.

### Example — `netlify.toml`

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = """
      default-src 'self';
      script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline';
      connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com;
      img-src 'self' data: https://www.google-analytics.com;
    """
```

### Example — `public/_headers`

```
/*
  Content-Security-Policy: default-src 'self';
  Content-Security-Policy: script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline';
  Content-Security-Policy: connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com;
  Content-Security-Policy: img-src 'self' data: https://www.google-analytics.com;
```

---

## Step 3. Verify Tracking Works

1. Open **DevTools → Network → Filter: `collect` or `g/collect`**
2. Navigate between routes — each click should trigger a new request.
3. In **Google Analytics → Realtime → Events**, you should see `page_view` hits.
4. If you want extra confirmation, add this for testing:

```html
<script>
  gtag('config', 'G-LRMSZ4V1XG', { debug_mode: true });
  gtag('event', 'test_ping', { page: location.pathname });
</script>
```

You should see `test_ping` appear in Realtime → DebugView in GA4.

---

## 🦁 Step 4. Brave Browser Gotcha

Brave’s **Shields** feature blocks Google Analytics by default.  
This is why it looks like GA “doesn’t work” in production even though your setup is fine.

### How to test properly:

1. Click the 🦁 icon in the Brave toolbar.  
2. Toggle **Shields down** for your domain (e.g., `baileyburnsed.dev`).  
3. Refresh and check **Realtime Analytics** — you should now see hits.

If you want to test with analytics always enabled, use Chrome Incognito or a browser without built-in tracker blocking.

---

## Step 5. Optional — Detect When GA Is Blocked

If you want a simple developer-only warning to show in the console when GA is blocked, add this snippet:

```html
<script>
  fetch('https://www.google-analytics.com/g/collect', { mode: 'no-cors' })
    .then(() => console.debug('[GA Probe] Analytics likely allowed'))
    .catch(() => console.warn('[GA Probe] GA request likely blocked (Brave/Adblock)'));
</script>
```

✅ This won’t break your site.  
It simply prints a warning if GA requests fail silently due to Shields, VPNs, or extensions.

---

##  Step 6. Long-Term Alternatives (Privacy-Friendly)

Since more users are adopting browsers that block GA, you may want to consider **privacy-friendly analytics tools** that won’t get blocked as easily:

- [**Plausible Analytics**](https://plausible.io/) – Lightweight, GDPR-friendly, no cookies  
- [**Umami**](https://umami.is/) – Self-hosted or cloud, open-source  
- [**Netlify Analytics**](https://www.netlify.com/products/analytics/) – Server-side, no client JS needed  

These tools are privacy-safe, lightweight, and less likely to be blocked by default.

---

##  Summary

| Issue | Cause | Fix |
|-------|--------|-----|
| GA not tracking between pages | SPA routing | Add manual pageview listener (`astro:after-swap`) |
| GA silent in production | Brave Shields or adblockers | Test with Shields down or in Chrome Incognito |
| GA blocked by Netlify | CSP too strict | Add GA domains to your CSP headers |
| Still missing some users | Privacy browsers | Consider Plausible or Umami |

---

##  Final Thoughts

If you build Astro SPAs and care about analytics accuracy, this setup is the most robust way to keep Google Analytics working—no matter how your router or deployment platform behaves.

Even with Brave users blocking GA, you’ll now know *why*, and you can plan privacy-friendly alternatives for long-term analytics reliability.
