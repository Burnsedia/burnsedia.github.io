import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://baileyburnsed.dev',
  integrations: [sitemap(), partytown(), mdx(), vue(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});