# Release record — November 2, 2026

The editorial revamp and public-source cleanup are authorized for publication to `hilmimuktitama/hilmimuktitama.github.io`. This record describes the checked release and its history scope. The [GitHub Pages workflow](https://github.com/hilmimuktitama/hilmimuktitama.github.io/actions/workflows/deploy.yml) records deployment results.

## Included

- Content-led homepage, two shared GSAP line studies, coordinated inner-page typography and spacing, and one compact homepage footer.
- Retired cat/knot components, runtime imagery, unused GSAP plugins, reveal engines, old tests, render harnesses, and the unused italic font have been removed. The runtime vendor directory contains GSAP core, ScrollTrigger, and their provenance record.
- Homepage navigation and lifecycle assertions target the current design. All 14 archive screenshot baselines use their named viewport and a 1% difference tolerance.
- Astro is pinned to 7.3.3 with a portable lockfile. CI uses the latest Node 22 patch, meeting the dependency tree's Node 22.19 minimum.
- The [standalone preview](redesign-proposals/2026-11-01-editorial-lines/preview.html), [design direction](design-direction.md), and [current reference notes](redesign-proposals/2026-11-01-editorial-lines/README.md) describe the selected implementation.

## Public-source cleanup

The follow-up removed another 123 files totaling 43,713,133 bytes: 111 superseded October prototype/planning/QA files, eight stale planning outputs for the selected direction, the private-marked case note, both old raster thread images, and the unused Oswald font. The current generated references and exact prompts remain. Earlier September QA records are retained as historical evidence and explicitly superseded by the current handoff.

The removed planning snapshots and continuation notes contained machine-specific paths and an internal conversation link. Current documentation uses repository-relative references; temporary captures and local session instructions are excluded from the release source.

Sharing cards now use the current ivory/charcoal/rust palette, serif titles, and vector contours. All 12 cards are rendered from bundled fonts at 1200 × 630. The build-only Newsreader regular font has a pinned upstream source, checksum, conversion record, and license in `src/assets/fonts/`; it is not copied into the deployed site. The old raster illustration is no longer required.

All 11 articles and all four public project entries are unchanged. The retired private case study is removed from the release source. Site verification now rejects private-marked project frontmatter, including nested Markdown and MDX files, because a rendering filter does not hide files in a public Git repository.

## Verification

Verification for publication combines fresh installation, build, site, and browser checks with the cleanup evidence below. The publication runs used Node 26.0.0:

| Check | Result |
| --- | --- |
| Clean dependency installation and audit | Passed; 0 vulnerabilities reported |
| Astro check and production build | 40 files, 0 errors/warnings/hints; 21 pages built |
| Static site verification | Passed |
| Complete Chromium suite | 107 passed, including all 14 unchanged screenshot baselines |
| Firefox and WebKit functional suites | 184 passed; two expected skips for the Chromium-only clipboard permission test |
| Vendor formatting follow-up | Build/site checks and 42 focused cases across all three browsers passed after normalizing header whitespace and regenerating the preview |
| Private-source guard | Nested private `.md` and `.mdx` fixtures rejected; public content quoting a private-status example accepted; fixtures removed |
| Sharing cards | All 12 PNG dimensions checked; site card and representative short/long article cards visually inspected |
| Deployment artifact cleanup | 58 files / 5,901,625 bytes; the three retired public assets are absent |
| Public-source scan | 244 files checked; no common credential signatures, local-machine metadata, sensitive filenames, or broken Markdown file links found |
| Standalone preview | Regenerated from the checked build |
| Publication history | All 91 commits in the release ancestry filtered; the private path and all four of its original blob versions are absent |

The private-source guard checks and visual sharing-card inspection are retained cleanup evidence; their source files were revalidated unchanged for publication. The publication recheck used the production build on isolated port 4327. Chromium passed in 25.6 seconds; Firefox/WebKit passed in 1.2 minutes. Screenshot baselines were not changed. These local results do not establish physical-device performance or a complete accessibility audit; the deployment workflow separately checks the committed release on Linux with Node 22.

## Publication source and history

This release uses the cleaned `main` ancestry. The previously published tip `0cda9c9d302ae456abc6a6302c35dd822ff6d827` maps to `329c23a28c65fcbfe3cebff4299c5dd2217889d4` before the revamp commit. Their source trees match except for the removed private case-study file.

The history cleanup used `git-filter-repo --invert-paths --path src/content/projects/platform-readiness.md` in an independent clone, following the [upstream path-filtering documentation](https://github.com/newren/git-filter-repo/blob/main/Documentation/git-filter-repo.txt). The authorized deployment updates only `refs/heads/main`, with an explicit lease against the previously inspected remote tip. Other remote branches and existing development clones are not rewritten. This filtering covers the release ancestry, not every historical reference or cached copy on GitHub. Do not merge original-history branches back into the cleaned `main` branch.

## Release procedure

Run these commands from a checkout of the cleaned history for subsequent releases:

```sh
npm ci
npm audit --audit-level=high
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4324 npm run verify
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4324 npm run test:e2e:cross-browser
```

Review the source and history diff, including new files and vendor/font provenance, before each release commit. Stage explicit reviewed paths, preserve unrelated local work, and keep local instructions excluded.

The workflow publishes on a push to `main` or a manual dispatch. After each successful deployment, confirm the live homepage, both archives, an article, Contact, a missing route, and the refreshed sharing images.
