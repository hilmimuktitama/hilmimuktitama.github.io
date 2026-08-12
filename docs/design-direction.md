# Design direction: annotated field notes

Date: 2026-07-26

## Decision

The portfolio is an annotated field notebook for making complex software work
legible. It uses a warm paper ground, ink-like typography, terracotta as a
single editorial accent, small numbered sections, and generous margin notes.
The page should feel authored and readable before it feels like a product
interface.

This direction is intentionally restrained: real portfolio evidence supplies
the color and personality. There are no invented portraits, testimonials,
metrics, illustrations, gradients, cursor effects, or ambient loops.

## Reference principles

- [Apple Motion guidance](https://developer.apple.com/design/human-interface-guidelines/motion?changes=_2_2)
  — motion should communicate feedback or spatial context, remain brief and
  precise, be optional, and never be required to understand the interface. The
  implementation keeps motion to press feedback and fine-pointer affordances;
  reduced-motion removes translation.
- [Shirley Xu's portfolio case study](https://www.shirleyxu.dev/projects/portfolio)
  — editorial portfolios become distinctive when their structure demonstrates
  the maker's thinking. The implementation borrows the idea of narrative
  pacing, serif-led reading moments, and alternating project bands, but not its
  scroll-driven color interpolation, SPA routing, glass effects, or visual
  identity.
- [Creative Bloq's 2026 website guidance](https://www.creativebloq.com/professional-development/creative-careers/in-the-age-of-social-media-do-designers-still-need-a-website-in-2026)
  — an owned site earns trust by controlling the pace and depth of the story.
  The implementation makes role, proof, work, writing, and contact explicit
  while keeping a human voice in the copy.

## System

- Type: Hanken Grotesk remains the UI and metadata face; Georgia/system serif
  carries display headlines, pull quotes, and reading surfaces. Headlines use
  a tight but readable measure instead of oversized hero text.
- Palette: `#f5f0e8` paper, `#211e1b` ink, and `#b04b34` terracotta in light
  mode; warm charcoal, parchment, and a lighter terracotta in dark mode.
- Rhythm: 8px base units, 12-column desktop composition, 72rem maximum page
  width, and a narrower 46rem reading measure.
- Surfaces: paper planes, rules, underlines, and one restrained tinted panel;
  no repeated rounded cards. Projects use numbered horizontal entries and a
  lead band so evidence reads like a table of contents.
- Interaction: links reveal an ink line, pressable controls give a subtle
  scale response, and hover translation is gated to fine pointers. All actions
  remain understandable without hover or motion.
- Theme: both themes retain the same warm hierarchy and contrast rules rather
  than switching to a separate visual language.
