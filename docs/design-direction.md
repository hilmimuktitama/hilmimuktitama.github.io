# Common Ground

The approved identity uses cream, cobalt, terracotta and mustard, Hanken Grotesk and Newsreader, and generated architectural plaster artwork. The homepage has an asymmetric headline, cobalt writing section, warm experiments section, mustard About section and terracotta contact area. This identity continues through every article, project, resume, contact and 404 page.

The headline is **Good work happens between.** Preserve that wording and its staggered reveal. Hilmi wants a personal site for writing, experiments, technology and work. Technical program management is part of his background, not the site's defining identity. Copy edits must preserve that broader positioning.

## Production sources

- `src/components/ground/` owns the shared header, footer, sculpture and SVG arrows.
- `src/styles/ground-layout.css` and `ground-stage.css` hold the composition; `ground.css` integrates it with the document styles in `global.css`.
- `public/ground/` contains only the required generated artwork, shared motion score and production runtime.
- Newsreader uses the existing licensed font in `src/assets/fonts/`; Hanken uses `public/fonts/`.

The editable HyperFrames project and frozen design studies remain local design artifacts. The approved ten-second `public/ground/score.js` is unchanged from that shared score. Local prototypes and review exports are excluded from commits and deployment. Do not restore a runtime dependency on `/lab/`.

## Content and interaction

The homepage uses published articles and public projects from the existing collections. Content, URLs, metadata, publication filtering, structured data and sitemaps are preserved. Article rows begin with dates and topics, without sequence numbers. "A little more about me" and "Let's talk" are text-only; other arrows use the GroundArrow SVG component.

Headings and links use direct wording. Decorative slogans, repeated labels and generic principles are removed. Authored article prose, project details and resume facts remain intact.

The sculpture plays once when it enters view: rigid pieces lift, align and seat in sequence, with height-sensitive shadows. The headline reveals with it. Playback pauses offscreen or while the document is hidden, resumes on return, and finishes assembled. No playback controls are exposed. Reduced motion and keyboard navigation settle the composition; history restoration does not replay it. Cleanup affects only owned animations and listeners.

All content and native project disclosures work without JavaScript. Writing filters initialize progressively. The persistent theme preference changes reading surfaces; identity panels retain their approved colors. Resume printing uses white and black.

## Verification

Run the build, static verification and Playwright suite listed in the README. Regression coverage includes all published routes, both reading themes, navigation, focus, clipboard, overflow, motion ownership and the shared score's rigid landings. Both macOS and Linux archive screenshot baselines must be reviewed when layouts change; keep the existing 1% tolerance.
