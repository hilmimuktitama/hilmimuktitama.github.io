# Design direction: Loose Ends

Selected by Hilmi on 2026-09-05 from the third displayed proposal. This supersedes the earlier annotated-field-notes and condensed-type drafts.

## Visual reference

[Selected homepage](redesign-proposals/2026-09-05/03-loose-ends.png), 1422 × 1106 pixels. [The three proposals](redesign-proposals/2026-09-05/README.md) preserve the exploration and tradeoffs.

The site introduces a person working through software, AI, and coordination questions. A charcoal tangle releases an orange strand toward a recent essay. The illustration gives the homepage a recognizable identity; real writing, experiment notes, and career history carry the remaining pages.

## System

- Typography: self-hosted Hanken Grotesk for headings, body text, and navigation; Newsreader italic for the small illustration caption and occasional section labels. Keep headlines in sentence case and retain comfortable reading measures.
- Light palette: blue-gray `#e7eef0`, petroleum ink `#163841`, burnt vermilion `#ae3b20`.
- Dark palette: petroleum `#142b32`, pale ink `#e2edef`, warm coral `#f09673`. The thread has a matching pale recolor.
- Layout: a broad, open homepage; an asymmetric writing archive; a compact experiments list; a 720px maximum prose column; a factual career chronology. Use space and fine rules to organize content.
- Navigation: Writing, Experiments, Resume, Contact, plus the existing theme toggle. All destinations remain visible on mobile in a second header row.
- Motion: brief hover color and theme-button press feedback only. Reduced-motion preference removes transitions and smooth scrolling.

## Artwork

The homepage uses separate generated raster illustrations, not a screenshot of the mockup. Astro creates responsive WebP variants. The dark recolor uses the light illustration's alpha as a mask so its generated background cannot form a visible rectangle.

- [Light asset provenance](redesign-proposals/2026-09-05/loose-ends-light-generation.md)
- [Dark asset provenance](redesign-proposals/2026-09-05/loose-ends-dark-generation.md)
- [Newsreader source and license](https://github.com/google/fonts/tree/main/ofl/newsreader), with the OFL included in `public/fonts/Newsreader-OFL.txt`.

The final cord is thicker and its loops differ from the concept image. Its placement, color, material, and connection to the essay preserve the selected idea. The caption sits below the final knot to avoid crossing the strands. At 600px and below the artwork moves into document flow after the introduction.

## Content and extension rules

Keep actual article titles, publication dates, routes, metadata, résumé facts, and repository scope. The homepage's featured essay and experiment are derived from the content collections. Its shortened essay summary follows the selected mockup; the full article description remains on the reading page.

Keep the illustration concentrated on the homepage. Repeated cards, knots, oversized slogans, and decorative animation would compete with the author's writing. Secondary pages should inherit the palette and typography while making long content easy to scan and read.

[Current design QA](../design-qa.md) records browser evidence, resolved issues, and validation.
