# Loose Ends dark hero artwork

- Edit source: `public/images/loose-ends-light.png`
- Generation mode: built-in `image_gen` edit, with a targeted retry for transparency
- Output: `public/images/loose-ends-dark.png`
- Dimensions: 1870 × 841 px
- Fiber treatment: pale blue-gray/ivory recolor; vermilion strand retained warm coral
- Final pass: replaced the checkerboard with a uniform flat dark background requested for CSS pairing.
- Verification: 1870 × 841 px RGB PNG with no checkerboard. A subsequent decoded pixel check using Sharp found small variations in the generated background, so it is not an exact match for the CSS background color.
- Integration: the homepage reuses the matching light illustration's alpha as a CSS mask. This removes the generated dark background while retaining the recolored cord. The rendered result was inspected in desktop and mobile dark mode with no visible rectangular background or overlapping text.
