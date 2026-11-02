# Archive screenshot baselines

Baselines are separated by operating system and Playwright project. Both Chromium sets cover the same 14 archive views and use the unchanged 1% differing-pixel limit. See [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots) for why baselines must match their rendering environment.

- `darwin/chromium/`: the reviewed macOS baselines from release `6c628df`, moved without changing their bytes.
- `linux/chromium/`: reviewed captures from [GitHub Actions run 41458114827](https://github.com/hilmimuktitama/hilmimuktitama.github.io/actions/runs/41458114827), built from `6c628df` on Ubuntu 24.04.5 with Node 22.23.4 and Playwright 1.62.1. Each image was identical across all three attempts. All 14 were visually inspected before adoption.

The first Linux run passed all 93 functional tests. Comparing its captures to macOS images failed because of font rasterization and the system serif fallback in the brand. Layouts, content, themes, and responsive breakpoints were intact. The screenshot helper normalizes headings to bundled Hanken Grotesk; it does not make all operating-system rendering identical or replace review of the site's actual serif typography.

Run `npm run test:e2e:run` to compare the current platform's Chromium images. Use `npm run test:e2e:update -- --grep screenshot` only for intentional visual changes, then inspect every changed image. CI never updates baselines automatically. Keep both supported platform sets current when changing the archive layout; Firefox and WebKit runs continue to cover behavior without screenshot comparisons.
