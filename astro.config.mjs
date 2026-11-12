// @ts-check
import { defineConfig } from 'astro/config';

// На GitHub Pages сайт живёт по адресу https://<user>.github.io/<repo>/ — SITE и BASE_PATH задаёт workflow.
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  image: { responsiveStyles: true },
  // CSS маленький (~12 КБ) — встраиваем в HTML, чтобы не блокировать первую отрисовку на мобилке
  build: { inlineStylesheets: 'always' },
});
