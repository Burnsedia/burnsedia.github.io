
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://baileyburnsed.dev',

  // 🚀 Super important: eliminates render-blocking CSS and improves LCP/FCP
  compressHTML: true,
  inlineStylesheets: 'auto',   // or "always" for maximum score

  // 🚀 Let Astro prefetch + preload intelligently for you
  prefetch: {
    prefetchAll: true,
  },

  integrations: [
    sitemap(),

    // 🚀 Sends Google Tag Manager and analytics to a web worker → fixes TBT
    partytown({
      config: {
        forward: ['dataLayer.push'], // Required for GTM through Partytown
      },
    }),

    mdx(),
    vue(),
    react(),
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      // 🚀 Smaller bundles → faster TBT/FCP
      cssMinify: true,
      minify: 'esbuild',
    },
  },

  // 🚀 Improves FCP by isolating heavy scripts + better hydration strategy
  experimental: {
    clientPrerender: true,
  },
});

