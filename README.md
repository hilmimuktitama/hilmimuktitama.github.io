# Hilmi Muktitama

Public source for a static Astro profile site.

Requires Node.js 22.12 or newer.

## Commands

```bash
npm ci
npm run dev
npm run build
npm run verify:site
```

## Structure

- Add articles in `src/content/articles/`.
- Add projects in `src/content/projects/`.
- Update resume content in `src/content/resume/`.

The site has no database, CMS, or server runtime.

## Sharing images

`npm run build` generates `/og-image.png` and one title-specific PNG for each published article under `/og/articles/`.

The sharing cards use `public/og-image.svg`, the existing thread illustration, and a static 600-weight instance of the self-hosted Hanken Grotesk font. The font license is included in `public/fonts/HankenGrotesk-OFL.txt`. Image rendering happens at build time; it adds no browser runtime dependencies.

## Verification

`npm run verify` checks the production build, public routes and metadata, keyboard navigation, responsive layouts, theme persistence, clipboard behavior, and visual baselines. Use `npm run test:e2e:update` only after reviewing intentional changes to the Writing and Experiments list screenshots.
