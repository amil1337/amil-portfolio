import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    build: {
      cssMinify: false
    }
  }
});