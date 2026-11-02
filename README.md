# Hilmi Muktitama

Public source for a static Astro profile site.

Requires Node.js 22.19 or newer. CI uses the latest Node.js 22 patch release.

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
- The content-led homepage is in `src/pages/index.astro`. Shared line geometry and motion are in `src/components/LineStudy.astro` and `src/components/TangledMotion.astro`; styling is in `src/styles/tangled-world.css`. The [design direction](docs/design-direction.md) records layout and maintenance choices.
- The current page loads self-hosted GSAP 3.15.0 and ScrollTrigger. Upstream commit and license details are in `public/vendor/gsap/provenance.json`.

The site has no database, CMS, or server runtime.

Everything committed to this repository is public source, including content omitted from the rendered site. Keep private case studies and internal evidence outside the repository. A content status or publication date controls rendering, not source visibility. Site verification rejects project files marked `private-case-study`.

## Sharing images

`npm run build` generates `/og-image.png` and one title-specific PNG for each published article under `/og/articles/`.

The sharing cards use `public/og-image.svg` with the current ivory, charcoal, and rust palette, serif titles, and vector contours. Hanken Grotesk supplies the labels; a static Newsreader instance in `src/assets/fonts/` supplies the titles at build time. The Hanken Grotesk license is in `public/fonts/`; Newsreader’s license and source/conversion record are in `src/assets/fonts/`. Rendering uses bundled fonts, with system-font loading disabled, and adds no browser runtime dependencies.

## Verification

Run the same build, site, and Chromium checks used for deployment:

```bash
npm audit --audit-level=high
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4324 npm run verify
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4324 npm run test:e2e:cross-browser
```

The latest [reference and QA notes](docs/redesign-proposals/2026-11-01-editorial-lines/README.md) include browser coverage and content-variation checks. The [standalone preview](docs/redesign-proposals/2026-11-01-editorial-lines/preview.html) can be regenerated after building:

```bash
python3 scripts/export-thread-preview.py --output docs/redesign-proposals/2026-11-01-editorial-lines/preview.html
```

The browser suite covers navigation, themes, keyboard and reduced-motion behavior, GSAP lifecycle cleanup, responsive layouts, contact actions, metadata, and archive screenshots. Old homepage-arrival and scroll-reveal tests have been retired with their unused implementations. Screenshot baselines reflect the current design; the existing screenshot font normalization makes those checks portable, while native-browser visual review covers the actual serif typography. Update baselines only after reviewing intentional changes.

The [release handoff](docs/release-readiness.md) records the checked build and remaining publication step. A push to `main` or a manual run of `.github/workflows/deploy.yml` publishes the site; preparation does not require either action.

The retained September design and QA records are historical. Current behavior and release checks are documented in the links above; obsolete October prototypes, renderer instructions, and planning snapshots are excluded from this release.
