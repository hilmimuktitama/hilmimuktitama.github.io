# Portfolio improvements — implementation and design QA

5 September 2026. Applied to the portfolio repository using three GPT-5.6 LUNA subagents for implementation and review, with integration and visual checks by the primary agent.

## Result

The site keeps its existing typography, palette, name wordmark, and thread illustration. The changes make writing and experiments easier to find, remove repeated introductory wording, improve the reading interface, and finish the resume, contact, favicon, and sharing assets.

The introduction, header, footer, and profile metadata do not promote an employer. Employer and training-provider names remain only as factual resume information. All nine article source files are unchanged, including titles, descriptions, publication dates, and body text. No project Markdown was edited.

## Changes delivered

- Homepage: immediate Writing and Experiments links; each featured section contains its own browse link; aligned feature blocks; adjusted illustration and caption spacing across screen sizes.
- Archives: shorter introductions and functional descriptions that distinguish the four experiments; consistent internal and external link arrows.
- Reading: estimated reading time and a server-rendered table of contents. At 900px and below the outline becomes a native disclosure above the full-width reading column. Short pieces without an outline retain a proper reading width.
- Truth Tools: a real screenshot of its public demo, showing repaired evidence passing checks while program health remains blocked. The image is linked, captioned, and served in responsive WebP sizes.
- Resume: related roles grouped under each employer; duplicated education wording and editorial residue removed; prominent contact and PDF download actions. The two-page PDF is generated from the same career data as the page.
- Contact: email copy button, announced success status, and a manual selection fallback when clipboard access is unavailable.
- Branding: HM favicon in the existing palette; a matching general social card and automatically generated title-specific cards for all nine published articles.

## Visual comparison

Source: the live-site audit captured earlier on the same day. Corresponding before and after images were opened together in the same comparison input, using the same viewport and theme. Desktop captures use 1440 × 1000; mobile uses 390 × 844; the narrow experiment archive uses 320 × 740. Additional checks used the homepage at 1024 × 768 and the reading outline at 768 × 900.

Comparison pairs stored in the repository under `docs/visual-qa/portfolio-improvements/`:

| Before | After | Result |
| --- | --- | --- |
| before-home-desktop.jpg | home-desktop.jpg | Familiar composition retained; browse actions and section grouping improved; no illustration/text overlap. |
| before-home-mobile.jpg | home-mobile.jpg | Browsing is available before the illustration; natural text wrapping and readable navigation. |
| before-writing-desktop.jpg | writing-desktop.jpg | Archive begins sooner; original article titles and descriptions retained. |
| before-experiments-desktop.jpg | experiments-desktop.jpg | Shorter introduction and distinct functional descriptions. |
| before-experiment-desktop.jpg | experiment-desktop.jpg | Real demo evidence and useful outline replace the generic sidebar. |
| before-article-desktop.jpg | article-desktop.jpg | Reading time and section navigation added; article presentation and text preserved. |
| before-resume-desktop.jpg | resume-desktop.jpg | Neutral introduction, usable download/contact actions, clearer career grouping. |
| before-contact-mobile.jpg | contact-mobile.jpg | Email remains primary; copy and external-link controls fit without overflow. |
| before-experiments-320.jpg | experiments-320.jpg | Full first experiment and its actions fit in the viewport. |

The four changed mobile list baselines were independently compared in light and dark themes. Additional dark-mode captures check the grouped homepage links and experiment body.

Fonts, hierarchy, body measure, line wrapping, spacing, palette, image edges, link labels, focus behavior, and responsive layout were inspected. The existing light/dark contrast tokens were retained. This is a targeted visual and interaction review, not a complete WCAG conformance certification or a user study.

## Corrections during verification

1. Shortening the desktop hero initially made the thread cross the latest-writing label and caption. Repositioning and scaling the existing art restored clear separation; the corrected desktop and tablet captures were reviewed again.
2. The outline initially switched modes at 900px while the reading grid changed at 600px. Both now change together at 900px, with regression coverage at 768px and 900px. The no-outline layout also uses a proper single reading column.
3. Article sharing metadata now passes a resolved image URL to the layout, avoiding a doubled prefix when the site is built under a non-root base path.

## Verification

- Final `npm run verify` in the user's repository: passed; 33 Astro files with zero errors, warnings, or hints; site verification passed; all **83 Chromium tests passed**, including the existing visual baselines.
- Firefox and WebKit suite: **132 passed**, with the clipboard-permission test intentionally skipped in those two browsers. The manual-copy fallback was tested in both.
- Final tablet correction: **4 additional Firefox/WebKit tests passed** at 768px and 900px.
- `npm audit --audit-level=high`: **0 vulnerabilities**.
- Non-root `/portfolio-check` build: passed; article social-image URLs and PDF download path verified.
- Two-page PDF: both pages rendered and inspected; all employers, roles, education organization/period/GPA, and five certifications confirmed with text extraction.
- Generic and long-title social cards: raster output inspected at 1200 × 630; all published article image routes generated successfully.
- `git diff --check`: passed. Article source diff: empty. Applied source hashes match the reviewed worktree.

The files are applied locally and the production preview runs at `http://127.0.0.1:4348/`. No commit, push, or deployment was performed. Existing platform caches may continue to show an older social image until a future deployment is recrawled.

## Design references

Grouping and priority follow [NN/G's visual hierarchy guidance](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/). Shorter introductions and removed duplication follow [aesthetic and minimalist design principles](https://www.nngroup.com/articles/aesthetic-minimalist-design/). Responsive layout, keyboard use, visible focus, contrast, and target sizes were checked with the relevant [WCAG 2.2 criteria](https://www.w3.org/TR/WCAG22/) in mind. Arrow selection and visual styling are design conventions, not WCAG requirements.

## Browser feedback follow-up — 6 September 2026

Implemented the three annotated requests with two LUNA agents handling layout and wording, a third reviewing link markup, and the primary agent integrating and checking the rendered result.

- Dates now share the existing topic row beneath each article summary, including the featured article. The archive no longer reserves a separate date column; its titles align exactly with the featured title at the annotated 1117px desktop width.
- Action links use one continuous underline beneath the combined label and arrow. Their actual anchors retain a 44px minimum target height. The same treatment is applied to the shared home, writing, experiment, and footer action links.
- Footer copy is “Roles, projects, and collaboration.” with “Get in touch”. The Contact heading is “Get in touch.” and its introduction states the relevant roles and projects directly. No visitor-facing “compare notes” phrase remains.

### Evidence and comparison

The user's annotated Writing screenshots defined the requested changes. Before and after captures from the same local production preview were opened together in each comparison input. Source and implementation images are saved under `docs/visual-qa/writing-feedback/`.

| Source capture | Implementation capture | Viewport and state | Result |
| --- | --- | --- | --- |
| before-desktop.jpg | after-desktop.jpg | 1117 × 781, light, page top | Archive titles recover the former 137px date-column-plus-gap width. Header, typography, colors, article text, and the outer section sidebar remain consistent. |
| before-mobile.jpg | after-mobile.jpg | 390 × 844, light, page top | Featured title leads; date and topics share one compact row; underline is continuous; no overflow. |
| before-footer.jpg | after-footer.jpg | 1117 × 781, light, document bottom | Direct professional wording, coherent CTA underline, and clean footer alignment. |
| before-contact-mobile.jpg | contact-mobile.jpg | 390 × 844, light, page top | New heading and introduction fit naturally; email and copy actions remain usable. |

All listed JPEG files have the same pixel dimensions as their CSS viewport dimensions (1 output pixel per CSS pixel; the browser reported devicePixelRatio 2). Focused captures `writing-desktop.jpg` and `archive-mobile.jpg` verify dates, tags, article alignment, spacing, and the action underline within the lists. `writing-mobile-dark.jpg` verifies the inherited dark palette and underline contrast. No clipping or horizontal overflow was observed at either inspected viewport. The temporary viewport override and dark theme were reset, and the Writing preview was left open in the in-app Browser.

### Iteration and verification

The first iteration placed dates above titles. The comparison exposed an additional row per entry, so the final version combines dates with the existing topics beneath summaries instead. This addresses width use without adding that vertical overhead.

- Final production build: 33 Astro files, zero errors, warnings, or hints; site verification passed.
- Existing Chromium regression suite: **83 passed**, covering seven responsive sizes, site navigation, theme state, contact copy behavior, reading navigation, generated artifacts, geometry, and screenshot checks.
- The seven Writing screenshot checks also passed in isolation. No baseline file changed in this follow-up.
- Independent source review confirmed semantic link wrappers and preserved focus targets. The caption's inline demo link was considered separately and left as an inline text link.
- `git diff --check` passed. Article source diff remains empty. All applied source hashes match the reviewed worktree.

The changes are applied locally. No commit, push, or deployment was performed.

## Motion follow-up — 6 September 2026

Added short, responsive motion using three LUNA subagents for shared controls, reading disclosures, and copy feedback. The primary agent implemented native page and theme transitions, integrated the changes, and verified them in the in-app Browser. Article content and the established visual design remain unchanged.

| Before | After | Why |
| --- | --- | --- |
| Full page navigation changed instantly. | Native page transitions fade and settle the incoming page by 6px over 220ms while the header stays steady. | Gives navigation a small sense of continuity without delaying interaction. Unsupported browsers retain normal navigation. |
| Theme and its icon changed abruptly. | A 180ms theme crossfade and coordinated sun/moon transition. | Connects the control to its visual effect. Repeated clicks immediately settle the latest requested theme. |
| Action arrows and navigation links were static. | Arrows move 2–3px in their indicated direction; navigation underlines reveal; button presses have restrained feedback. | Makes interactive elements feel responsive while preserving their target size and continuous link underlines. |
| The tablet/mobile reading outline snapped open or shut. | A 220ms height transition reverses from its current rendered position when interrupted. | Helps readers track the disclosure; native details behavior remains available without JavaScript. |
| Copy confirmation appeared only as status text. | The button briefly shows a checkmark and “Copied” with a soft accent treatment, alongside the existing live status. | Places success feedback at the point of action. Its fixed minimum width prevents a layout shift. |

### Motion rules and accessibility

Motion uses shared 140ms and 220ms timings with a quick-settling ease-out curve. Decorative hover/press motion runs only with a fine pointer. Keyboard interactions settle immediately, including when they interrupt an outline or theme animation. Reduced-motion preferences disable the added animation. Theme, disclosure, and copy state remain correct when motion preferences change. No scroll reveals, reading-content entrances, looping effects, animation dependencies, or client router were added.

Native same-origin page transitions are an enhancement over ordinary links and browser history. The opt-in is disabled before keyboard navigation. Native transition snapshots do not intercept pointer input. Theme changes fall back to immediate updates when the View Transition API is unavailable. The outline temporarily clips only while its height is moving, then removes that clipping so focus outlines remain visible.

### Visual evidence

Images are stored in `docs/visual-qa/site-motion/`.

- `before-writing-desktop.jpg` and `after-writing-desktop.jpg` were opened together at 1117 × 781, light theme, page top. Their settled rendering is identical: typography, wrapping, spacing, dates, topic rows, and action underline are preserved.
- `before-contact-mobile.jpg` and `contact-mobile-copied.jpg` were opened together at 390 × 844. The intentional differences are the wider stable button and success treatment/status. The surrounding layout, email action, and footer links remain readable without overflow.
- `experiments-dark.jpg` records the settled theme state at 1117 × 781. Both theme icons were checked during the transition and after keyboard activation.
- `outline-tablet-open.jpg` records the expanded reading outline at 768 × 900. Manual checks observed the intermediate height and a successful reversal; no clipping remained at rest.

Screenshots document appearance at rest or a feedback state. The motion itself was checked through real interactions in the in-app Browser. Temporary viewport overrides were reset, and the existing Writing tab was refreshed with the final production build.

### Verification and refinements

- Production build: **35 Astro files, zero errors, warnings, or hints**; all 19 pages generated; site verification passed.
- Final full Chromium regression run: **90 passed**, including seven new motion tests and the existing visual baselines. No visual baseline was changed for this motion work.
- Focused motion suite: **21 passed** across Chromium, Firefox, and WebKit. After simplifying native navigation, its check passed again in Firefox and WebKit and in six repeated Chromium runs.
- Coverage includes rapid repeated theme/outline actions, keyboard interruptions, reduced motion, resizing, missing View Transition API, browser history, copy feedback and reset, and a no-JavaScript disclosure fallback.
- Verification fixed a stale outline cancellation race, inherited keyboard color transitions, a 0.3px copy-button width difference, and an intermittent native navigation transition rejection. Native navigation now uses a declarative opt-in without custom page lifecycle handlers. A test was also made independent of observing a transient 220ms animation state under parallel test load; it asserts the final user-visible state instead.
- `git diff --check` passed. Article source diff is empty. All seven applied motion source/test files match the reviewed worktree.

Implementation references: [MDN View Transition guidance](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using), [MDN native navigation opt-in](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition), and [Chrome same-origin page transition guidance](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document). Motion placement and timing also follow the applied Emil design engineering and Apple design skills: purposeful feedback, short settling times, interruption support, and reduced-motion alternatives.

The changes are applied locally and visible at `http://127.0.0.1:4348/`. No commit, push, or deployment was performed.

final result: passed

## Index motion follow-up — 6 September 2026

Added two targeted motion improvements to the Home, Writing index, and Experiments index: a once-per-session Home composition arrival and matched native title continuity from each index entry into its detail page. Article text and the settled layout remain unchanged.

| Before | After | Why |
| --- | --- | --- |
| Home's first direct visit showed the whole composition immediately. | Copy, the existing thread illustration, and its caption settle in over 280ms total. | Introduces the composition with a brief, coordinated entrance. |
| An entry title disappeared into the outgoing page fade. | The same title moves into its detail-page heading over 220ms. | Connects the reader's selection to the destination. |

| Opportunity | Frequency | Reason and motion budget |
| --- | --- | --- |
| Home hero composition (`.home-hero-copy`, `.home-thread`, `.home-caption`) | Once per session / first visit | A 220ms ease-out arrival with 30ms and 60ms group offsets gives the title, thread, and caption a short shared entrance. It is rare enough to spend a small delight budget and does not block the links. |
| Matched entry title from Home, Writing, or Experiments to its detail heading | Occasional, when opening an entry | A native 220ms ease-out View Transition keeps the selected title spatially connected to the detail `h1`. Incoming-only title snapshots prevent ghost text and preserve natural aspect ratio. |

The title transition is guarded for reduced-motion preferences, keyboard input, and theme capture. Ordinary links and browser history remain usable when native transitions are unavailable, including with JavaScript disabled. The Home arrival cancels immediately when keyboard or pointer input begins and does not repeat on reload or internal navigation. The animation uses the existing short motion timings and does not introduce a loop.

### Deliberate rejections

Row-by-row cascades across the Writing archive or Experiments list were rejected because users scan those entries for titles, dates, tags, and project metadata. Scroll-triggered cascades were rejected because moving prose while it enters the viewport interrupts reading. Looping thread or cursor decoration was rejected because it adds continuous visual demand without feedback or spatial explanation.

### Visual evidence

Three dark before/after pairs at 1280 × 720 were visually inspected, with the at-rest layout preserved:

- `docs/visual-qa/index-motion/before-home-dark.jpg` → `after-home-dark.jpg`
- `docs/visual-qa/index-motion/before-writing-dark.jpg` → `after-writing-dark.jpg`
- `docs/visual-qa/index-motion/before-experiments-dark.jpg` → `after-experiments-dark.jpg`

The long-title mobile path was checked at 390 × 844 using `docs/visual-qa/index-motion/writing-mobile-dark.jpg` and `article-mobile-dark.jpg`. `experiment-detail-dark.jpg` and `article-desktop-dark.jpg` record settled detail states at 1280 × 720. No clipping or horizontal overflow was observed in the inspected states.

`title-navigation-frame.png` captures an actual intermediate frame from a Writing title click in the in-app Browser. One title moves between its positions while the surrounding pages crossfade. The source title no longer overlaps it. The before/after pairs above document the settled layout, not the animation itself.

### Verification and refinements

- Final production build: **37 Astro files, zero errors, warnings, or hints**; 19 pages generated; site verification passed.
- Full Chromium regression run before the final snapshot-selector refinement: **95 passed**, including the existing visual baselines. No baseline changed.
- Final focused motion suite after that refinement: **39 passed** across Chromium, Firefox, and WebKit with one worker. It covers unique slug matching, incoming-only snapshot styling, first-visit/revisit behavior, keyboard cancellation, reduced-motion and theme safety, native history, and the no-JavaScript fallback.
- The first matched-title treatment showed overlapping text. Incoming-only snapshots corrected that. The regression then exposed a Chromium compatibility issue with `:not(:only-child)` after a view-transition pseudo-element. Direct class selectors with later `:only-child` overrides now pass the actual native snapshot-style assertions in all three engines.
- An initial parallel Firefox run encountered browser startup and teardown timeouts. The complete final serial run passed; no site workaround or timeout increase was needed.
- `git diff --check` passed. Article content source diff is empty; all nine applied source/test files match the reviewed worktree.

The local production preview is refreshed in the user's existing Home tab. The temporary viewport override was reset, and the user's dark theme was preserved. No commit, push, or deployment was performed.

References: [MDN `view-transition-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name), [MDN `view-transition-class`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-class), and Emil Kowalski’s [You Don’t Need Animations](https://emilkowal.ski/ui/you-dont-need-animations).

final result: passed

## Scroll motion follow-up — 6 September 2026

Added a restrained scroll reveal for the lower Home sections, the featured and archived Writing entries, and the Experiments entries. Initial viewport content stays still so the page remains immediately scannable; no article/detail content or copy changed.

| Surface | Before | After | Why |
| --- | --- | --- | --- |
| Home sections below the initial viewport | Sections appeared without an arrival cue. | Each marked section starts 18px lower and settles into place over 420ms with one shared observer. | Adds orientation as the reader reaches the next section without delaying the first screen. |
| Writing featured row, archive heading, and archive entries | Index entries appeared together with no scroll feedback. | Each entry reveals once per page load; an intersection batch uses 0ms for the first entry, 50ms for the second, and a capped 80ms delay for later entries. | Gives the list a quiet sense of progression while keeping the total motion short. |
| Experiments entries and index footer | Rows and footer appeared immediately. | The same 18px/420ms treatment applies once per entry, and a fresh reload replays it. | Keeps the three index surfaces coherent without adding new content or controls. |

The engine uses one `IntersectionObserver` for all marked elements and only arms entries below the viewport. It does not intercept scrolling, change scroll position, add parallax, or use nested reveal markers. Visible initial regions remain static. Pointer interaction settles active motion and the touched pending wrapper. Keyboard input settles all reveals; focus settles its own wrapper. Reduced-motion and print modes remain static. JavaScript-disabled pages stay visible because the hidden pending state is applied only by the script; an unavailable observer also settles everything visibly. Mobile height-only resizes preserve pending work, while width changes settle it so responsive geometry is not revealed from stale measurements.

Every reveal runs at most once per entry per page load. A normal fresh reload starts a new page load and can replay the reveals. There are no article-body, article-detail, hero, or content changes in this follow-up.

### Visual evidence

The three desktop before/after pairs were opened together at a 1280 × 720 viewport, in light theme, after all reveals had settled. Full-page comparisons preserve typography, wrapping, spacing, metadata, and the footer. The mobile Writing pair was also compared together at 390 × 844; no clipping or horizontal overflow was observed.

- `docs/visual-qa/scroll-motion/before-home.jpg` → `after-home.jpg`
- `docs/visual-qa/scroll-motion/before-writing.jpg` → `after-writing.jpg`
- `docs/visual-qa/scroll-motion/before-experiments.jpg` → `after-experiments.jpg`
- `docs/visual-qa/scroll-motion/before-writing-mobile.jpg` → `after-writing-mobile.jpg`

Real wheel scrolling in the in-app Browser was checked separately from the settled screenshots. `writing-reveal-start.jpg`, `writing-reveal-middle.jpg`, and `writing-reveal-late.jpg` capture successive frames. In an intermediate frame, the entering row had opacity 0.926 and 1.34px of downward translation; it settled to full opacity with no transform. `writing-after-scroll.jpg` records the settled archive viewport. `writing-mobile-dark.jpg` records the mobile dark theme check.

On mobile, successive scrolls reduced the pending-entry count from six to four, two, then zero. Browser-toolbar height changes preserve pending reveals. The temporary viewport override was reset and the light theme restored after inspection.

### Verification and refinements

- Production build: **39 Astro files, zero errors, warnings, or hints**; all 19 pages generated; site verification passed.
- Full Chromium regression suite: **103 passed**, including the existing visual baselines. No baseline was changed.
- All seven new scroll checks have passing coverage in Chromium, Firefox, and WebKit. The initial Firefox/WebKit run passed 13 of 14 checks; the remaining failure was a test setup that used one large wheel delta to return to the top. After making that setup independent of platform wheel behavior, the affected check passed in all three engines. The implementation did not require a workaround.
- The first focused run also corrected a test target that was already visible on initial load. The test now selects a genuinely below-viewport entry and asserts that it is pending before scrolling.
- Coverage includes actual wheel-triggered motion, one reveal per visit, reload replay, navigation and browser history, keyboard and focus visibility, reduced motion, width versus height resizing, missing Intersection Observer, and no-JavaScript reading and navigation.
- Manual browser checks covered Home, Writing, Experiments, mobile scrolling, and light/dark themes. Browser error logs were empty.
- `git diff --check` passed. Article content source diff is empty. The seven applied source/test files match the reviewed staging copy.

The changes are applied locally at `http://127.0.0.1:4348/`. The user’s existing Browser tab was refreshed on Writing and marked as the deliverable; the temporary QA tab was closed. No commit, push, or deployment was performed.

References: [MDN Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and [MDN reduced-motion media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). Motion timing and interruption behavior also follow the applied Emil design engineering and Apple design skills.

final result: passed

## Release preparation — 6 September 2026

The pre-release privacy review covered the complete prospective repository, Git history, generated site, and public assets. Gitleaks 8.30.1 reported no secrets in the 231-file candidate, staged diff, generated output, or all 89 preceding commits. The dependency audit reported zero vulnerabilities. Two unnecessary machine-specific paths were removed from QA documentation. Public contact details, resume facts, and the Search Console verification file are intentional public information. Local environment files, caches, and test outputs are ignored; Pages publishes only the generated `dist` directory.

The first GitHub workflow for `d89e7cf` passed build, dependency audit, site verification, and 99 browser checks, but four Writing screenshot comparisons failed. Comparing GitHub's expected and actual images showed that the reference images still contained earlier introductions, employer wording, date placement, and split action underlines. The actual images matched the approved current design. Those stale references had remained within the existing local comparison tolerance.

All 14 Writing and Experiments references were regenerated from the current build and reviewed as paired before/after images at the same viewport and theme. The seven Writing pairs were reviewed by the primary agent; the seven Experiments pairs were independently reviewed by a LUNA agent. The intentional differences match the delivered changes documented above. No clipping, unintended wrapping, or theme regression was observed. Source code, tests, comparison thresholds, and article content were unchanged in this correction.

The refreshed images are the existing 14 PNG paths in `tests/site.spec.ts-snapshots/`. The baseline refresh passed all 14 checks. A separate run without snapshot updates also passed all 14 comparisons.

final result: passed
