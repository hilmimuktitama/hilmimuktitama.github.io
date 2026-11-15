# Archive screenshot baselines

Baselines are separated by operating system and Playwright project. Both Chromium sets cover the same 14 archive views and use the unchanged 1% differing-pixel limit. See [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots) for why baselines must match their rendering environment.

- `darwin/chromium/`: the initial reviewed macOS baselines from release `6c628df`, moved without changing their bytes.
- `linux/chromium/`: the initial reviewed captures from [GitHub Actions run 41458114827](https://github.com/hilmimuktitama/hilmimuktitama.github.io/actions/runs/41458114827), built from `6c628df` on Ubuntu 24.04.5 with Node 22.23.4 and Playwright 1.62.1. Each image was identical across all three attempts. All 14 were visually inspected before adoption.

The first Linux run passed all 93 functional tests. Comparing its captures to macOS images failed because of font rasterization and the system serif fallback in the brand. Layouts, content, themes, and responsive breakpoints were intact. The screenshot helper normalizes headings to bundled Hanken Grotesk; it does not make all operating-system rendering identical or replace review of the site's actual serif typography.

The November 2 article “Make the Effort to Understand Why” refreshes the seven `articles-*` images in each platform set. All 14 updated views were visually reviewed. The Linux captures come from [branch verification run 41472513555](https://github.com/hilmimuktitama/hilmimuktitama.github.io/actions/runs/41472513555) at `af91ef2`, using the same Ubuntu 24.04.5 / Node 22.23.4 / Playwright 1.62.1 environment. Each Linux image was byte-identical across three attempts; all 100 other tests passed. The macOS suite passed all 107 tests with its updated images. Work-archive images and comparison tolerances are unchanged.

Run `npm run test:e2e:run` to compare the current platform's Chromium images. Use `npm run test:e2e:update -- --grep screenshot` only for intentional visual changes, then inspect every changed image. CI never updates baselines automatically. Keep both supported platform sets current when changing the archive layout; Firefox and WebKit runs continue to cover behavior without screenshot comparisons.

## Common Ground implementation — 15 November 2026

All 14 macOS Chromium baselines now show the approved Common Ground identity and
were visually inspected together at desktop, tablet and mobile breakpoints.
The screenshot helper now waits for the shipped Hanken/Newsreader fonts instead
of overriding the approved typography. The 1% comparison threshold is unchanged.
The identity panels intentionally retain their colors in both reading themes.

All 14 Linux baselines were refreshed from [release verification run 43736214079](https://github.com/hilmimuktitama/hilmimuktitama.github.io/actions/runs/43736214079), built from `ef540f9` with Astro 7.4.12 and Playwright 1.62.1 on the workflow's Ubuntu/Node 22 environment. The run passed all 94 functional tests; only the 14 intentional visual changes failed against the preceding design. Every new image was byte-identical across three attempts and was visually inspected before adoption. The following branch verification compares these baselines normally, with updates disabled and the existing 1% tolerance.
