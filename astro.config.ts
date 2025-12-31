import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://blog.pdzeng.com',
  output: "static",
  prefetch: true,
  compressHTML: true,
  integrations: [mdx(), sitemap()],
});