# Loose Ends design QA

Date: 2026-09-05. Selected direction: the third displayed proposal, approved by Hilmi.

## Findings

No unresolved P0, P1, or P2 findings remain in the inspected states. The implementation preserves the selected composition while adapting the illustration to a separate asset, responsive layouts, and a dark theme.

## Comparison target and evidence

- Source visual truth: `docs/redesign-proposals/2026-09-05/03-loose-ends.png`, 1422 × 1106 pixels.
- Implementation: <http://127.0.0.1:4321/> using the production build.
- Matching implementation screenshot: `docs/visual-qa/loose-ends/home-chromium-light-1422.png`, 1422 × 1106 pixels.
- Comparison viewport: 1422 × 1106 CSS pixels, device scale factor 1. Source and implementation were opened together in the same comparison input at matching dimensions. No crop or density conversion was needed.
- State: homepage, light theme, top of page, fonts and both illustration assets fully decoded. The source contains no browser chrome.
- Earlier comparisons used the Codex in-app browser, tab 3, at the same CSS viewport and density. Native viewport captures were retained inline in the task. A stitched full-page capture with incorrect dimensions and an immediate navigation capture before images loaded were discarded; neither was used to pass QA.

Additional saved homepage evidence:

| Capture | Viewport and state |
| --- | --- |
| `docs/visual-qa/loose-ends/home-chromium-dark-1422.png` | 1422 × 1106, dark |
| `docs/visual-qa/loose-ends/home-chromium-light-390.png` | 390 × 844, light |
| `docs/visual-qa/loose-ends/home-chromium-dark-390.png` | 390 × 844, dark |
| `docs/visual-qa/loose-ends/home-chromium-light-601.png` | 601 × 900, light |
| `docs/visual-qa/loose-ends/home-chromium-light-320.png` | 320 × 844, light |
| `docs/visual-qa/loose-ends/home-webkit-dark-1422.png` | 1422 × 1106, dark |
| `docs/visual-qa/loose-ends/home-webkit-dark-390.png` | 390 × 844, dark |

All saved captures use a device scale factor of 1. Mobile and dark states extend the selected direction; they were not separate source mockups.

## Full-view and focused comparison

The source and final light capture both place the masthead at the upper left, a two-line personal introduction below it, and a charcoal tangle on the right. Its orange strand leads left toward the recent essay. The essay and the workbench share the lower area, with direct reading links and All writing visible within the desktop capture.

The full-resolution images were also inspected region by region: masthead/navigation, headline/supporting copy, thread/caption, and essay/workbench. Those regions were large and legible in the paired input, so separate crop files were unnecessary. Mobile captures provided a further close inspection of type, image edges, and navigation.

Expected differences from the generated source:

- The standalone final artwork has thicker cord and different loop geometry. It retains the subject, material, two-color treatment, focal placement, and strand leading to the essay. It is not a pixel-identical extraction from the concept.
- The caption sits below the final knot, approximately 90px lower than in the concept, to keep the text clear of its strands.
- The essay title retains two lines with natural wrapping at a different word. The summary retains three lines; both primary links remain visible in the desktop viewport.
- The existing theme control remains in the header. Its space slightly shifts the navigation left.
- A career-context section and shared footer continue below the source crop. The homepage illustration is not repeated through the reading pages.

## Required fidelity surfaces

- **Fonts and typography — passed.** Self-hosted Hanken Grotesk provides the normal-width sans-serif voice of the reference. Newsreader italic provides the small caption and sparse section labels. Headline hierarchy, readable body sizes, line height, weight, and wrapping were inspected at desktop and mobile sizes. The narrower tablet headline now has a 40px minimum.
- **Spacing and layout rhythm — passed.** Open composition, broad margins, asymmetric content alignment, and the same hero/essay/workbench order are preserved. Secondary pages use a restrained archive/list structure and a 720px maximum prose measure. Responsive layouts do not hide persistent navigation or introduce page overflow.
- **Colors and tokens — passed.** Light uses `#e7eef0`, `#163841`, and `#ae3b20`; dark uses `#142b32`, `#e2edef`, and `#f09673`. Contrast against the page background is 10.67:1/12.38:1 for main text, 4.64:1/7.40:1 for muted text, and 5.19:1/6.55:1 for accent text, light/dark respectively.
- **Image quality and asset fidelity — passed with the expected geometry difference above.** Real 1870 × 841 raster assets are rendered through responsive WebP variants. The light asset has alpha. The dark recolor reuses that alpha as a mask. Desktop and mobile Chromium and WebKit captures show clean boundaries and no rectangular background. No custom CSS or SVG drawing substitutes for the illustration. Phosphor supplies UI icons.
- **Copy and content — passed.** The selected introduction and caption, actual article title, date, short homepage summary, experiment title/description, and direct links are retained. Existing collection content, résumé facts, publication dates, metadata, sitemap behavior, and routes remain available. No fictional outcomes or adoption claims were added.

## Comparison history and fixes

1. **Initial browser comparison — blocked.** [P2] The caption crossed the thread. [P2] The essay summary had an overly long measure. The caption was moved below the knot and the summary narrowed to 26rem. The homepage title scale was adjusted to match the reference composition.
2. **Revised desktop/dark comparison — blocked.** [P2] The dark recolor had a visible background rectangle that could cover content. Applying the matching light asset's alpha removed the rectangle. Revised dark captures show continuous page color around the cord and clear text.
3. **Mobile and tablet comparison.** The 390px layout showed readable navigation, stacked artwork, and clear essay content. At 601px, [P2] the fluid headline became too small relative to the essay. Its tablet size was clamped to at least 40px. The saved 601px production capture shows the corrected hierarchy without overlap.
4. **Final comparison — passed.** The paired 1422px source and fully loaded production screenshot were reviewed again. Final light/dark mobile and WebKit captures verified the asset treatment and responsive adjustments. No P0/P1/P2 issues remained.

## Routes and interactions checked

The in-app browser was used to follow Writing into the latest essay, Experiments into Truth Tools, and navigation to Resume and Contact. Desktop and mobile views were inspected. The existing regression suite additionally checks all seven representative routes at 1440, 1024, 973, 901, 900, 768, and 390px; every sitemap location; production 404 recovery links; keyboard skip navigation; keyboard primary navigation; current-page state; persisted theme labels/state; reduced motion; page overflow; and unexpected console errors.

The refreshed writing and experiment screenshots were inspected, including intermediate desktop and mobile layouts. The final homepage capture pass separately verified all images decoded, zero console/page errors, no page overflow, and CSS mask support in Chromium and WebKit.

## Validation

- `npm run build`: passed after the final CSS adjustment; 23 Astro files, zero diagnostics, 19 pages built.
- `npm run verify:site`: passed after the final CSS adjustment.
- Existing Chromium suite with refreshed baselines: 76 passed. A final `npm run verify` before release also passed all 76 checks after the tablet adjustment and dependency update.
- Screenshot comparison without updating baselines: 14 passed.
- Final production homepage capture checks after the tablet adjustment: 8 passed across Chromium and WebKit.
- `git diff --check`: passed.
- Dependency audit: zero vulnerabilities after updating the transitive `fast-uri` dependency from 3.1.5 to 3.1.7. The earlier version would have blocked the deployment workflow's high-severity audit gate.

The first automated attempt could not launch the preview/browser inside the sandbox. After running with the required local process permissions, a separate pre-existing startup race appeared: tests could begin before Astro's preview was ready. `scripts/preview-for-tests.mjs` now keeps the preview attached to Playwright, and the configuration waits for its URL. The successful runs above used that corrected runner.

The final release run includes the homepage-only tablet minimum-size adjustment. The full Firefox suite and physical-device testing were not performed. Contact destinations were inspected without sending messages.

## Follow-up polish

No additional changes are required for this direction. Further changes to the cord's thickness or exact headline/title wrapping would be art-direction refinements, not repairs to the verified experience.

## Implementation checklist

- [x] Selected third proposal implemented across the existing site.
- [x] Separate, optimized thread assets placed in both themes.
- [x] Responsive navigation and reading layouts inspected.
- [x] Functional navigation, theme persistence, and keyboard paths verified.
- [x] Existing browser baselines refreshed and checked.
- [x] Build, route checks, and final image loading checks passed.
- [x] P0/P1/P2 findings fixed and recaptured.
- [x] Local production preview left running for review.

final result: passed
