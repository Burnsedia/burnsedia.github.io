import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import image from "@astrojs/image";
import react from "@astrojs/react"
// import netlify from ""

// https://astro.build/config
export default defineConfig({
  site: 'https://baileyburnsed.dev',
  integrations: [react(),mdx(), sitemap()]
});
