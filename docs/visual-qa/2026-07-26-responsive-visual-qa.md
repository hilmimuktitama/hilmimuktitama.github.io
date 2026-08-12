# Responsive visual QA — warm editorial portfolio

Date: 2026-07-26  
Build: Astro production preview from this worktree  
Capture tool: Playwright Chromium, headless  
Viewports: `1440×900`, `1024×768`, `390×844`  
Themes: light and dark

## Result

The final capture covers 42 viewport screenshots: seven representative routes,
three viewport sizes, and two themes. Every route returned HTTP 200, no page or
console errors were observed, and `document.documentElement.scrollWidth` stayed
within the requested viewport width.

The first pass exposed undersized header controls on narrow screens. The shared
navigation links and theme toggle now use a minimum `44×44px` target, and the
full screenshot matrix was recaptured after that fix.

## Screenshot matrix

| Route | Light desktop | Light tablet | Light mobile | Dark desktop | Dark tablet | Dark mobile |
| --- | --- | --- | --- | --- | --- | --- |
| Home | [1440×900](screenshots/light-desktop-home.png) | [1024×768](screenshots/light-tablet-home.png) | [390×844](screenshots/light-mobile-home.png) | [1440×900](screenshots/dark-desktop-home.png) | [1024×768](screenshots/dark-tablet-home.png) | [390×844](screenshots/dark-mobile-home.png) |
| Work listing | [1440×900](screenshots/light-desktop-work-list.png) | [1024×768](screenshots/light-tablet-work-list.png) | [390×844](screenshots/light-mobile-work-list.png) | [1440×900](screenshots/dark-desktop-work-list.png) | [1024×768](screenshots/dark-tablet-work-list.png) | [390×844](screenshots/dark-mobile-work-list.png) |
| Work detail | [1440×900](screenshots/light-desktop-work-detail.png) | [1024×768](screenshots/light-tablet-work-detail.png) | [390×844](screenshots/light-mobile-work-detail.png) | [1440×900](screenshots/dark-desktop-work-detail.png) | [1024×768](screenshots/dark-tablet-work-detail.png) | [390×844](screenshots/dark-mobile-work-detail.png) |
| Writing listing | [1440×900](screenshots/light-desktop-writing-list.png) | [1024×768](screenshots/light-tablet-writing-list.png) | [390×844](screenshots/light-mobile-writing-list.png) | [1440×900](screenshots/dark-desktop-writing-list.png) | [1024×768](screenshots/dark-tablet-writing-list.png) | [390×844](screenshots/dark-mobile-writing-list.png) |
| Writing detail | [1440×900](screenshots/light-desktop-writing-detail.png) | [1024×768](screenshots/light-tablet-writing-detail.png) | [390×844](screenshots/light-mobile-writing-detail.png) | [1440×900](screenshots/dark-desktop-writing-detail.png) | [1024×768](screenshots/dark-tablet-writing-detail.png) | [390×844](screenshots/dark-mobile-writing-detail.png) |
| Resume | [1440×900](screenshots/light-desktop-resume.png) | [1024×768](screenshots/light-tablet-resume.png) | [390×844](screenshots/light-mobile-resume.png) | [1440×900](screenshots/dark-desktop-resume.png) | [1024×768](screenshots/dark-tablet-resume.png) | [390×844](screenshots/dark-mobile-resume.png) |
| Contact | [1440×900](screenshots/light-desktop-contact.png) | [1024×768](screenshots/light-tablet-contact.png) | [390×844](screenshots/light-mobile-contact.png) | [1440×900](screenshots/dark-desktop-contact.png) | [1024×768](screenshots/dark-tablet-contact.png) | [390×844](screenshots/dark-mobile-contact.png) |

The representative detail routes are `/work/program-truth/` and
`/articles/ai-is-non-deterministic/`.

## Interaction and accessibility checks

- Keyboard traversal reached the brand link, all primary navigation links, the
  theme toggle, and the first content actions. Each focused element exposed a
  `2px solid` terracotta `:focus-visible` outline. See the focused-state
  capture: [reduced-motion mobile home](screenshots/reduced-motion-mobile-home-focus.png).
- The reduced-motion context reported
  `matchMedia("(prefers-reduced-motion: reduce)") === true`; content remained
  visible, the theme control retained only color/border/background transitions,
  and its transform was `none`.
- The theme toggle changed `data-theme` from `light` to `dark` and
  `aria-pressed` from `false` to `true`.
- Primary header and CTA targets measured at least `44×44px` in the final
  narrow viewport capture.
- Keyboard navigation reached `/work/` with HTTP 200 and the expected page
  heading, confirming route access without hover.

## Evidence limits

This is a headless Chromium inspection of the production preview. It does not
replace VoiceOver or other assistive-technology testing, a real touch-device
check, a full WCAG audit, or a review of external destinations after leaving
the site. The retained screenshots show the requested first viewport for each
route; source-level and automated checks remain the authority for content below
the fold.
