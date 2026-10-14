import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/teaboom-product-card/' : '/',
  test: {
    include: ['src/**/*.test.js'],
  },
});
