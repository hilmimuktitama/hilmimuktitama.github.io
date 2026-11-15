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
- The Common Ground homepage is in `src/pages/index.astro`. Shared components are in `src/components/ground/`, styles in `src/styles/ground*.css`, and the sculpture assets and GSAP runtime in `public/ground/`. The [design direction](docs/design-direction.md) records layout and maintenance choices.
- The current page loads self-hosted GSAP 3.15.0 and ScrollTrigger. Upstream commit and license details are in `public/vendor/gsap/provenance.json`.

The site has no database, CMS, or server runtime.

Everything committed to this repository is public source, including content omitted from the rendered site. Keep private case studies and internal evidence outside the repository. A content status or publication date controls rendering, not source visibility. Site verification rejects project files marked `private-case-study`.

## Sharing images

`npm run build` generates `/og-image.png` and one title-specific PNG for each published article under `/og/articles/`.

The sharing cards use `public/og-image.svg` with the Common Ground cream, cobalt, terracotta and mustard palette with architectural forms. Hanken Grotesk supplies the labels; a static Newsreader instance in `src/assets/fonts/` supplies the titles at build time. The Hanken Grotesk license is in `public/fonts/`; Newsreader’s license and source/conversion record are in `src/assets/fonts/`. The same Newsreader file is bundled for page typography. Rendering uses bundled fonts, with system-font loading disabled, and adds no browser runtime dependencies.

## Verification

Run the same build, site, and Chromium checks used for deployment:

```bash
npm audit --audit-level=high
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4324 npm run verify
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4324 npm run test:e2e:cross-browser
```

The browser suite covers navigation, themes, keyboard and reduced-motion behavior, GSAP lifecycle cleanup, responsive layouts, contact actions, metadata, and archive screenshots. The homepage suite covers automatic sculpture assembly, staggered text, viewport pause/resume, keyboard settling and restoration without replay. Screenshot baselines reflect the current design and are separated by operating system and browser project, with reviewed Chromium sets for macOS and Linux. Heading font normalization reduces variation but does not make font rendering portable across platforms. See the [baseline notes](tests/site.spec.ts-snapshots/README.md); native-browser visual review covers the actual serif typography. Update baselines only after reviewing intentional changes.

The [release record](docs/release-readiness.md) describes the checked build, cleanup scope, and publication procedure. A push to `main` or a manual run of `.github/workflows/deploy.yml` on `main` publishes the site after verification. Manual feature-branch runs verify without deploying; deployment results are recorded in [GitHub Actions](https://github.com/hilmimuktitama/hilmimuktitama.github.io/actions/workflows/deploy.yml).

The retained September design and QA records are historical. Current behavior and release checks are documented in the links above; obsolete October prototypes, renderer instructions, and planning snapshots are excluded from this release.

Local design studies, editable motion projects and review exports are ignored. They are not release dependencies. Verify the staged source in a clean export when those local files are present; production verification rejects `lab`, `motion`, `docs` and test-report directories in the deployed output.
