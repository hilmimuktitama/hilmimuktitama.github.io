# Design direction: editorial line studies

The homepage leads with current content. Its title, description, date, and destination come from the latest published article. The next three articles appear in a vertical list. If no articles are available, the first public experiment supplies the lead; with no published content, the page shows the site name. Empty Writing and Experiments sections are omitted.

Public experiments come from `src/content/projects/`, sorted by their existing `order` field. The homepage and archive both display each entry's own title and description. There are no title-specific description overrides, illustration assignments, or custom layouts to maintain for individual experiments.

The shared header retains the site name and navigation. Role labels, location labels, a fixed promotional headline, and the homepage biography have been removed. The résumé remains available through ordinary navigation.

## Visual structure

The [initial generated reference](redesign-proposals/2026-11-01-editorial-lines/reference.png) established the paper-and-ink palette, serif hierarchy, open article rows, dark experiment section, and layered linework. Its illustrative text is not a content source. The subsequent content-led revision supersedes its fixed headline, profile labels, and per-project diagrams.

A single start-aligned page grid, capped at 1280px, keeps Writing and Experiments in normal vertical flow. The lead sizes to its content and reserves a short drawing area below the copy. Its contours extend to the viewport edges without opaque text masks. The experiment heading and shared illustration sit together above compact project rows. On narrow screens, descriptions use the full available row width and header controls retain their desktop order. The [fuller linework reference](redesign-proposals/2026-11-01-editorial-lines/reference-fuller-lines-v2.png) develops the drawing into three curved surfaces: an upper canopy, a central saddle, and a returning lower fold. Cross-ribs, varied stroke weights, perspective planes, and two orange signal paths give the surfaces depth. The experiment study uses expanding and narrowing elliptical cross-sections. Mobile layouts omit alternate fine contours and ribs and fit the full upper curve inside the artwork area. There are two shared SVG studies: one in the lead section and one for the experiment section. Neither depends on project names, concepts, or the number of entries.

## Inner pages

Writing, Experiments, article and project details, Resume, Contact, and the 404 page share the homepage's ivory/charcoal palette, serif hierarchy, compact navigation, and thin rules. These changes live in the existing global stylesheet and page templates. Article prose uses Georgia at a bounded reading measure; metadata and navigation keep the existing sans serif. The archive openings show collection counts instead of fixed topic taglines. Project descriptions and actions stay together in compact rows.

Contact presents the email address, copy action, and external profiles without role or location framing. The resume retains its career information and derives the current role from the first ordered experience entry. The existing reading outline, copy feedback, theme control, GSAP entrances, and content collections remain in place; this pass adds no dependencies or animation machinery.

The homepage ends in one compact footer: name, email, external profiles, and back-to-top, with one divider. The redundant Contact heading and duplicate email call to action have been removed. Links retain 44px hit targets and wrap on narrow screens.

## Motion

`src/components/LineStudy.astro` generates three compatible poses from shared surface frames and continuous cubic tangents. Each surface's contours, cross-ribs, signal paths, and nodes use the same timing phase, keeping their connections intact during interpolation. `TangledMotion.astro` uses one GSAP ScrollTrigger timeline per study: the layers open and then settle, short tracers advance along the two signal paths, and pulse rings expand around their moving anchors. The entrance draws contours, ribs, and accents in sequence using normalized path lengths, without querying every path's geometry. Hidden mobile detail is also omitted from the animation targets. Content receives a small vertical entrance. There is no horizontal card movement, pinning, drag interaction, custom cursor, hidden-link reveal, or continuous idle loop.

Motion responds to the device preference and the saved site control, and stops for keyboard navigation. Scoped contexts clean up on page exit and restore without replaying the initial entrance. Without JavaScript, all content and native navigation remain available.

## Files and maintenance

- Homepage composition: `src/pages/index.astro`.
- Shared motion and SVG: `src/components/TangledMotion.astro`, `src/components/LineStudy.astro`.
- Page geometry and styling: `src/styles/editorial-layout.css`, `src/styles/tangled-world.css`.
- Writing: `src/content/articles/`; experiments: `src/content/projects/`.
- [Reference, prompt, and verification notes](redesign-proposals/2026-11-01-editorial-lines/README.md).
- [Standalone preview](redesign-proposals/2026-11-01-editorial-lines/preview.html).

Adding, removing, reordering, or editing an experiment requires changing its content entry, not the homepage illustration or animation code. Existing individual project detail content remains separate from this shared presentation.
