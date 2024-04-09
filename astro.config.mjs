import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import react from "@astrojs/vue";
import partytown from '@astrojs/partytown';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://baileyburnsed.dev',
  integrations: [vue(), react(), mdx(), sitemap(), tailwind(), partytown(),
]
});

