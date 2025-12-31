import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://miguelramosalarcon.github.io',
  base: '/portfolio-mrstudio',
  integrations: [
    sitemap()
  ],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
