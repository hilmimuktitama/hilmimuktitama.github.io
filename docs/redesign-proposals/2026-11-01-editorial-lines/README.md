# Editorial line studies — November 1, 2026

The selected design uses a content-led homepage, two shared line studies, and coordinated inner-page typography. The [design direction](../../design-direction.md) describes the implementation; the [release handoff](../../release-readiness.md) records the latest checks and publication status.

## Design references

- [Initial generated reference](reference.png) and its [exact prompt](image-prompt.txt).
- [Fuller linework reference](reference-fuller-lines-v2.png) and its [exact prompt](image-prompt-fuller-lines-v2.txt).
- [Standalone preview of the implemented homepage](preview.html).

The generated references establish the palette, serif hierarchy, spacing, and layered linework. Their sample text is illustrative. The implemented lead comes from a published content entry; profile labels, the fixed promotional headline, biography, and individual project diagrams were removed during refinement.

These are the retained references for the selected design. The superseded October prototypes, cat artwork, capture harness outputs, and generated planning snapshots have been removed from the release source. Historical September QA records elsewhere in the repository describe the previous design.

## Content and layout

The newest published article supplies the lead title, description, date, and destination. The next three articles populate Writing. With no articles, the first public experiment becomes the lead; with no published content, the site name appears. Empty content sections are omitted.

Experiments are filtered by `status: public` and sorted by `order`. Each entry supplies its own title and description. All source content committed here is public, regardless of whether a template renders it. Private case studies belong outside this repository.

A shared start edge and a 1280px canvas keep the content in normal vertical flow. The lead reserves drawing space below its copy; the experiment heading sits beside the second study. Mobile descriptions use the available row width, and the navigation controls retain their order. The compact footer contains each contact action once.

Writing, Experiments, article and project details, Resume, Contact, and 404 share the ivory/charcoal palette, serif hierarchy, rules, and navigation. The existing outline, copy feedback, theme control, and content collections remain in place. Sharing cards use matching colors, serif titles, and vector contours; article cards retain their own title and publication date.

## Linework and motion

The hero has three curved surfaces: an upper canopy, central saddle, and returning lower fold. The experiment study uses expanding and narrowing elliptical cross-sections. Contours, ribs, two signal paths, and their nodes share compatible geometry and timing. Mobile layouts omit alternate fine details.

GSAP core and ScrollTrigger drive a short entrance and one scroll timeline per study. Device reduced motion, the saved motion setting, keyboard opt-out, JavaScript-free rendering, and page lifecycle cleanup remain supported. There is no pinned scene, draggable yarn, sideways card reel, hidden navigation, or idle loop.

## Planning provenance

The selected DZN direction used seed `hilmi-editorial-20261101`, mode `bold`, engine/system `1.5.0`, 128 evaluations, seven retained directions, and minimum distance 0.3. Its descriptor was `flow-stack-start-caption-tight-loose-attached-open-none`, candidate `3e633457cc299074455f`.

Those parameters record the initial exploration. The implementation subsequently widened the canvas, enlarged the serif lead, shortened the opening gap, and removed the biography. The old generated source snapshots described the preceding site and are excluded; current source files are the implementation reference. The retained prompts document the generated artwork independently of those planning outputs.

## Verification

See the [release handoff](../../release-readiness.md) for dated build, browser, sharing-card, and public-source checks. Earlier native-browser passes covered desktop, tablet, narrow mobile, both themes, keyboard navigation, motion settings, and representative inner pages. Their temporary captures are not release artifacts. Those observations do not establish physical-device performance or a complete accessibility audit.

## Reproduce

```sh
npm ci
npm run build
npm run verify:site
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4324 npx playwright test tests/tangled-world.spec.ts tests/gsap-lifecycle.spec.ts --project=chromium --project=firefox --project=webkit --workers=3
python3 scripts/export-thread-preview.py --output docs/redesign-proposals/2026-11-01-editorial-lines/preview.html
```
