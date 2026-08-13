# Portfolio repair visual QA

Date: 2026-08-13

## Working state

- Base commit: `c35d740`
- State: uncommitted working-tree changes for this repair
- Target: static Astro production build served by `astro preview`
- Canonical origin: `https://hilmimuktitama.github.io`

## Diagnosis

The Work and Writing introductions used a two-column grid with three direct
children. CSS Grid placed the third child, the index list, in a new row's
160-pixel first column. At 1440 pixels the pre-fix browser measurements were:

- Section: 1152 pixels wide
- Intro body: left 352, width 944
- Work and Writing list: left 144, width 160
- First description: width 0

The new structure keeps the aside as the first direct grid child and wraps the
intro body and list in `.page-intro-main`, the second direct grid child. The
desktop geometry tests compare actual bounding boxes, so the previous layout
would fail list alignment, list-width, and description-width assertions.

## Commands

The following commands completed successfully unless noted:

```text
node --version                         # v26.0.0; repository minimum is 22.12
npm ci
npm audit --audit-level=high           # 0 vulnerabilities
npm run build                          # 19 pages; 0 errors, warnings, or hints
npm run verify:site                    # passed
npx playwright install --with-deps chromium
npm run verify                         # passed; 76 Chromium tests
npx playwright install chromium firefox webkit
npm run test:e2e:cross-browser         # passed; 124 Firefox/WebKit tests
npm run test:e2e:update                # refreshed 14 Chromium baselines
npm run test:e2e:run                   # passed; 76 Chromium tests
git diff --check                       # passed
```

`npm ci` emitted npm's allow-scripts advisory for Playwright, esbuild, and
fsevents install scripts. Installation and all subsequent checks succeeded.

## Browser coverage

- Chromium 151.0.7922.34: full functional and screenshot suite
- Firefox 153.0: full functional suite, excluding screenshot comparisons
- WebKit 26.5: full functional suite, excluding screenshot comparisons
- Safari proper: not tested

The automated functional suite covered these viewports in all three engines:

```text
1440x900
1024x768
973x1000
901x900
900x900
768x1024
390x844
```

Primary route coverage at every viewport:

```text
/
/work/
/articles/
/resume/
/contact/
/work/truth-tools/
/articles/ai-is-non-deterministic/
```

Every public route emitted by `sitemap.xml` was also requested successfully.
An unknown route was verified to return HTTP 404 and render the custom page.

## Automated assertions

- Successful responses, meaningful titles, primary navigation, main landmark,
  and exactly one meaningful `h1`
- No unexpected page errors, console errors, request failures, or horizontal
  overflow
- Light-theme initialization, dark-theme switching, ARIA state/action label,
  local-storage persistence, and persistence after reload
- Reduced-motion media preference and visible content
- Keyboard skip-link focus and activation, including WebKit's macOS link-tab
  behavior
- Keyboard activation and current-state semantics for primary navigation
- Work and Writing list alignment, substantial section width, and description
  width above 200 pixels at every tested width above 900 pixels
- Internal generated links, fragments, canonical URLs, sitemap equality,
  private-content exclusion, JSON-LD parsing/types/URLs, article metadata,
  approved public email, and canonical profile links

This is not a full WCAG audit and does not represent VoiceOver or other real
assistive-technology validation.

## Visual checks

Chromium baselines were inspected for the Work and Writing listings at the
required desktop, breakpoint, and mobile widths. Representative light and dark
desktop/mobile captures were reviewed for readable measures, long titles,
long descriptions, action alignment, footer composition, and theme continuity.
No confirmed visual defect remained in the final captures.

Functional production-preview checks in Chromium, Firefox, and WebKit covered
Home, Work, Writing, Truth Tools, AI Is Non-Deterministic, Resume, Contact, and
404. They exercised theme switching, keyboard navigation, back links, and
repository-link presence. Firefox and WebKit were not exhaustively reviewed
with retained per-route screenshots.

## Screenshots

Final deterministic baselines are under:

```text
tests/site.spec.ts-snapshots/work-light-1440.png
tests/site.spec.ts-snapshots/work-light-973.png
tests/site.spec.ts-snapshots/work-light-901.png
tests/site.spec.ts-snapshots/work-light-900.png
tests/site.spec.ts-snapshots/work-light-390.png
tests/site.spec.ts-snapshots/work-dark-1440.png
tests/site.spec.ts-snapshots/work-dark-390.png
tests/site.spec.ts-snapshots/articles-light-1440.png
tests/site.spec.ts-snapshots/articles-light-973.png
tests/site.spec.ts-snapshots/articles-light-901.png
tests/site.spec.ts-snapshots/articles-light-900.png
tests/site.spec.ts-snapshots/articles-light-390.png
tests/site.spec.ts-snapshots/articles-dark-1440.png
tests/site.spec.ts-snapshots/articles-dark-390.png
```

The pre-fix Work capture is outside the repository at:

```text
/var/folders/_0/6htfpcv52tg6r8d09381vm4r0000gn/T/opencode/work-before-1440.png
```

Playwright failure output is written to `test-results/`, with the HTML report
in `playwright-report/`. GitHub Actions uploads both directories when browser
tests fail.

## Known limitations

- Safari proper and VoiceOver were not tested.
- External GitHub, LinkedIn, email-client, repository, and live-demo
  destinations were not exhaustively opened and validated from every page.
- Chromium screenshot comparisons allow a 4% differing-pixel ratio to absorb
  operating-system font rasterization differences; geometry assertions remain
  authoritative for the repaired regression.
- No current resume PDF exists in the repository, so no download action was
  added.
- CI configuration was validated locally and by review, but no GitHub Actions
  run exists for the uncommitted working tree.
