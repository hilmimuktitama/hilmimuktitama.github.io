import { getCollection } from "astro:content";

const SITE_URL = "https://hilmimuktitama.github.io";

type SitemapPage = {
  path: string;
  lastmod?: string;
};

function toIsoDate(date?: Date) {
  if (!date) return undefined;

  const parts = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Jakarta"
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
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

async function getSitemapPages() {
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

  return pages;
}

function getSitemapUrls(pages: SitemapPage[], site?: URL) {
  const origin = getSiteOrigin(site);

  return pages.map(({ path }) => new URL(path, origin).toString());
}

export async function buildSitemapText(site?: URL) {
  const pages = await getSitemapPages();
  return `${getSitemapUrls(pages, site).join("\n")}\n`;
}

export async function buildSitemapXml(site?: URL) {
  const origin = getSiteOrigin(site);
  const pages = await getSitemapPages();

  const urlEntries = pages
    .map(({ path, lastmod }) => {
      const loc = escapeXml(new URL(path, origin).toString());
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}
