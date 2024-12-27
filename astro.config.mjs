import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import partytown from '@astrojs/partytown';
// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  image: {
   service: passthroughImageService(),
 },
  site: 'https://baileyburnsed.dev',
  integrations: [react(), mdx(), sitemap(), tailwind(), partytown(),
]
});

