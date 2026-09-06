/**
 * Apply new-tab behavior during rendering, including citations and autolinks.
 * A project's live demo is a separate destination even when hosted on our domain.
 * @param {string} site
 * @returns {import('@astrojs/markdown-satteri').SatteriResolvedOptions['hastPlugins'][number]}
 */
export function externalLinks(site) {
  const siteUrl = new URL(site);
  return {
    name: "external-links",
    element: {
      filter: ["a"],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (typeof href !== "string") return;
        const url = URL.parse(href, siteUrl);
        if (!url || !["http:", "https:"].includes(url.protocol)) return;
        const liveUrl = ctx.data.astro?.frontmatter?.liveUrl;
        if (url.origin === siteUrl.origin && href !== liveUrl) return;

        const rel = node.properties?.rel;
        const tokens = Array.isArray(rel) ? rel : String(rel ?? "").split(/\s+/);
        ctx.setProperty(node, "target", "_blank");
        ctx.setProperty(node, "rel", [...new Set([...tokens.filter(Boolean), "noopener", "noreferrer"])]);
      }
    }
  };
}
