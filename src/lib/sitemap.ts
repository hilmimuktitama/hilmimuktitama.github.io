import { getCollection } from "astro:content";

const SITE_URL = "https://hilmimuktitama.github.io";

type SitemapPage = {
  path: string;
  lastmod?: string;
};

function toIsoDate(date?: Date) {
  return date?.toISOString().slice(0, 10);
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function getSiteOrigin(site?: URL) {
  return site ?? new URL(SITE_URL);
}

export async function buildSitemapXml(site?: URL) {
  const origin = getSiteOrigin(site);
  const now = Date.now();

  const articles = (await getCollection("articles"))
    .filter((article) => article.data.pubDate.valueOf() <= now)
    .map((article) => ({
      path: `/articles/${article.slug}/`,
      lastmod: toIsoDate(article.data.updatedDate ?? article.data.pubDate)
    }));

  const projects = (await getCollection("projects"))
    .filter((project) => project.data.status === "public")
    .map((project) => ({
      path: `/work/${project.slug}/`,
      lastmod: toIsoDate(project.data.updatedDate)
    }));

  const pages: SitemapPage[] = [
    { path: "/" },
    { path: "/resume/" },
    { path: "/contact/" },
    { path: "/articles/" },
    { path: "/work/" },
    ...articles,
    ...projects
  ];

  const urlEntries = pages
    .map(({ path, lastmod }) => {
      const loc = escapeXml(new URL(path, origin).toString());
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}
