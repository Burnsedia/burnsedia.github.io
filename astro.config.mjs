// import { defineConfig } from 'astro/config';
// import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';
// import react from "@astrojs/react";
// import partytown from '@astrojs/partytown';

// // https://astro.build/config
// import tailwind from "@astrojs/tailwind";

// // https://astro.build/config
// export default defineConfig({
//   site: 'https://baileyburnsed.dev',
//   integrations: [react(), mdx(), sitemap(), tailwind(), partytown(),
// ]
// });

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://baileyburnsed.dev',
  integrations: [
    react(),
    mdx(),
    sitemap(),
    tailwind(),
    partytown(),
  ],
  // Additional configurations for better performance
  build: {
    output: 'static', // Ensures a static site build
  },
  vite: {
    optimizeDeps: {
      include: ['sharp'], // Ensures sharp is bundled if required
    },
  },
});

