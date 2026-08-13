import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { cwd, exit } from "node:process";

const root = cwd();
const distRoot = join(root, "dist");
const failures = [];
const siteOrigin = "https://hilmimuktitama.github.io";
const approvedEmail = "hilmimukti@gmail.com";
const linkedInUrl = "https://www.linkedin.com/in/hilmimuktitama";

function display(value) {
  if (typeof value === "string") return value || "(empty)";
  return JSON.stringify(value);
}

function contextFor(page) {
  return page ? `route=${page.route}, file=${page.file}` : "route=site-wide, file=source/build";
}

function check(condition, conditionName, observed = condition ? "pass" : "fail", expected = "pass", page) {
  if (!condition) {
    failures.push(
      `${contextFor(page)} | condition=${conditionName} | observed=${display(observed)} | expected=${display(expected)}`
    );
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|quot|nbsp);/gi, (entity, code) => {
    const lower = code.toLowerCase();
    if (lower === "amp") return "&";
    if (lower === "apos") return "'";
    if (lower === "gt") return ">";
    if (lower === "lt") return "<";
    if (lower === "quot") return '"';
    if (lower === "nbsp") return "\u00a0";
    const number = lower.startsWith("#x") ? Number.parseInt(lower.slice(2), 16) : Number.parseInt(lower.slice(1), 10);
    try {
      return Number.isInteger(number) ? String.fromCodePoint(number) : entity;
    } catch {
      return entity;
    }
  });
}

function openingTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function attribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`, "i")
  );
  return match ? decodeHtml(match[1] ?? match[2] ?? match[3]) : null;
}

function metaValues(html, attributeName, expectedValue) {
  return openingTags(html, "meta")
    .filter((tag) => attribute(tag, attributeName)?.toLowerCase() === expectedValue.toLowerCase())
    .map((tag) => attribute(tag, "content") ?? "");
}

function canonicalTags(html) {
  return openingTags(html, "link").filter((tag) =>
    (attribute(tag, "rel") ?? "").toLowerCase().split(/\s+/).includes("canonical")
  );
}

function htmlIds(html) {
  return new Set(
    [...html.matchAll(/<[A-Za-z][^>]*\bid\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+))/g)]
      .map((match) => decodeHtml(match[1] ?? match[2] ?? match[3]))
      .filter(Boolean)
  );
}

function htmlScripts(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
    .map((match) => ({ tag: `<script${match[1]}>`, body: match[2] }))
    .filter(({ tag }) => (attribute(tag, "type") ?? "").toLowerCase() === "application/ld+json");
}

function walkHtmlFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const filePath = join(directory, name);
    return statSync(filePath).isDirectory() ? walkHtmlFiles(filePath) : filePath.endsWith(".html") ? [filePath] : [];
  });
}

function routeForFile(filePath) {
  const file = relative(distRoot, filePath).split(sep).join("/");
  if (file === "index.html") return "/";
  if (file === "404.html") return "/404/";
  if (file.endsWith("/index.html")) return `/${file.slice(0, -"/index.html".length)}/`;
  return `/${file}`;
}

const projectContentDirectory = join(root, "src", "content", "projects");
const projectRecords = existsSync(projectContentDirectory)
  ? readdirSync(projectContentDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({ file, content: readFileSync(join(projectContentDirectory, file), "utf8") }))
  : [];
const publicProjectRecords = projectRecords.filter(({ content }) => /^status:\s*["']public["']\s*$/m.test(content));
const privateProjectSlugs = projectRecords
  .filter(({ content }) => !/^status:\s*["']public["']\s*$/m.test(content))
  .map(({ file }) => file.replace(/\.md$/, ""));
const approvedExternalSiteUrls = publicProjectRecords.flatMap(({ content }) => {
  const match = content.match(/^liveUrl:\s*["']([^"']+)["']\s*$/m);
  if (!match) return [];
  try {
    const url = new URL(decodeHtml(match[1]));
    return url.protocol === "https:" && url.origin === siteOrigin ? [url] : [];
  } catch {
    return [];
  }
});

function normalizedMountPath(pathname) {
  const path = pathname.replace(/^\/+|\/+$/g, "");
  return path ? `/${path}/` : "/";
}

function pathsOverlap(left, right) {
  const leftMount = normalizedMountPath(left);
  const rightMount = normalizedMountPath(right);
  if (leftMount === "/" || rightMount === "/") return leftMount === rightMount;
  return (
    leftMount === rightMount ||
    leftMount.startsWith(rightMount) ||
    rightMount.startsWith(leftMount)
  );
}

function normalizeBasePath(value) {
  const path = (value || "/").trim();
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

const basePath = normalizeBasePath(process.env.BASE_PATH);
check(basePath === "/", "production BASE_PATH resolves to the user-page root", basePath, "/");

function routeWithBase(route) {
  return basePath === "/" ? route : `${basePath}${route}`;
}

function pageUrl(page) {
  return new URL(routeWithBase(page.route), siteOrigin);
}

function routeCandidates(pathname) {
  const paths = [pathname];
  if (basePath !== "/" && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    paths.unshift(pathname.slice(basePath.length) || "/");
  }
  return [...new Set(paths.map((path) => (path.startsWith("/") ? path : `/${path}`)))];
}

function decodedPathname(pathname, page) {
  try {
    return decodeURIComponent(pathname);
  } catch (error) {
    check(false, "internal link URL path is validly encoded", error.message, "a decodable URL path", page);
    return null;
  }
}

function resolveAsset(pathname) {
  const relativePath = pathname.replace(/^\/+/, "");
  if (relativePath.includes("..")) return false;
  const filePath = join(distRoot, relativePath);
  return existsSync(filePath) && statSync(filePath).isFile();
}

function findPage(pageByRoute, pathname) {
  for (const candidate of routeCandidates(pathname)) {
    const route = candidate.endsWith("/") || extname(candidate) ? candidate : `${candidate}/`;
    const target = pageByRoute.get(route);
    if (target) return target;
  }
  return null;
}

function isApprovedExternalSiteUrl(url) {
  if (url.origin !== siteOrigin || url.protocol !== "https:") return false;
  return approvedExternalSiteUrls.some((approvedUrl) => {
    const approvedPath = normalizedMountPath(approvedUrl.pathname);
    return (
      !generatedRouteMounts.some((route) => pathsOverlap(route, approvedPath)) &&
      (url.pathname === approvedUrl.pathname || url.pathname.startsWith(approvedPath))
    );
  });
}

function inspectLinks(page, pageByRoute) {
  for (const tag of openingTags(page.html, "a")
    .concat(openingTags(page.html, "area"), openingTags(page.html, "link"))) {
    const hrefValue = attribute(tag, "href");
    if (hrefValue === null) continue;
    const href = hrefValue.trim();
    check(href.length > 0, "href is not empty", href, "a non-empty href", page);
    if (!href) continue;

    if (/^(?:javascript:|data:|blob:)/i.test(href)) {
      check(false, "href does not use an unsafe URL scheme", href, "a relative, HTTPS, mailto, or tel URL", page);
      continue;
    }
    if (/^(?:mailto:|tel:)/i.test(href)) continue;

    let targetUrl;
    try {
      targetUrl = new URL(href, pageUrl(page));
    } catch (error) {
      check(false, "internal link URL is valid", error.message, "a valid URL or relative href", page);
      continue;
    }
    if (targetUrl.protocol === "http:") {
      check(false, "links use HTTPS", href, "an HTTPS URL", page);
      continue;
    }
    if (!["http:", "https:"].includes(targetUrl.protocol) || targetUrl.origin !== siteOrigin) continue;

    const pathname = decodedPathname(targetUrl.pathname, page);
    if (pathname === null) continue;
    if (isApprovedExternalSiteUrl(targetUrl)) continue;
    const target = findPage(pageByRoute, pathname);
    const asset = target ? true : routeCandidates(pathname).some(resolveAsset);
    check(
      Boolean(target || asset),
      "internal link resolves to a generated page or static asset",
      href,
      "a generated target or existing dist asset",
      page
    );
    if (!target || !targetUrl.hash) continue;

    let fragment;
    try {
      fragment = decodeURIComponent(targetUrl.hash.slice(1));
    } catch {
      fragment = targetUrl.hash.slice(1);
    }
    check(
      target.ids.has(fragment),
      "internal fragment resolves to an id in the target HTML",
      `#${fragment}`,
      `an id in ${target.file}`,
      page
    );
  }
}

function jsonLdItems(value) {
  const items = Array.isArray(value) ? value : [value];
  return items.flatMap((item) => {
    if (item && typeof item === "object" && Array.isArray(item["@graph"])) {
      return [item, ...jsonLdItems(item["@graph"])];
    }
    return [item];
  });
}

function hasType(item, expected) {
  return item && typeof item === "object" &&
    (item["@type"] === expected || (Array.isArray(item["@type"]) && item["@type"].includes(expected)));
}

function inspectStructuredData(page) {
  const parsed = [];
  for (const script of htmlScripts(page.html)) {
    try {
      let value;
      try {
        value = JSON.parse(script.body.trim());
      } catch {
        value = JSON.parse(decodeHtml(script.body.trim()));
      }
      check(
        value && typeof value === "object",
        "application/ld+json has an object or array JSON-LD value",
        Array.isArray(value) ? "array" : typeof value,
        "object or array",
        page
      );
      const items = jsonLdItems(value);
      for (const item of items) {
        check(
          Boolean(item && typeof item === "object" && (item["@type"] || Array.isArray(item["@graph"]))),
          "application/ld+json declares @type",
          item?.["@type"] ?? typeof item,
          "a non-empty @type or @graph",
          page
        );
      }
      parsed.push(...items);
    } catch (error) {
      check(false, "application/ld+json parses as JSON", error.message, "valid JSON", page);
    }
  }
  return parsed;
}

const htmlPages = walkHtmlFiles(distRoot).map((filePath) => ({
  file: `dist/${relative(distRoot, filePath).split(sep).join("/")}`,
  absolutePath: filePath,
  route: routeForFile(filePath),
  html: readFileSync(filePath, "utf8"),
  ids: htmlIds(readFileSync(filePath, "utf8"))
}));
const verificationPages = htmlPages.filter((page) =>
  /^google-site-verification:\s*google[\w-]+\.html\s*$/i.test(page.html.trim())
);
const sitePages = htmlPages.filter((page) => !verificationPages.includes(page));
const pageByRoute = new Map(sitePages.map((page) => [page.route, page]));
const generatedRouteMounts = [...pageByRoute.keys()];

console.log("Generated public HTML pages:");
for (const page of sitePages) console.log(`- route=${page.route}, file=${page.file}`);
for (const page of verificationPages) console.log(`- excluded verification file=${page.file}`);

check(existsSync(join(distRoot, "404.html")), "dist/404.html exists", existsSync(join(distRoot, "404.html")), true);
for (const approvedUrl of approvedExternalSiteUrls) {
  check(
    !generatedRouteMounts.some((route) => pathsOverlap(route, approvedUrl.pathname)),
    "approved same-origin liveUrl mount does not overlap a generated route",
    approvedUrl.pathname,
    "a non-generated route mount"
  );
}

for (const page of sitePages) inspectLinks(page, pageByRoute);

const canonicalRecords = [];
for (const page of sitePages) {
  const tags = canonicalTags(page.html);
  check(tags.length === 1, "page has exactly one canonical link", tags.length, "one", page);
  for (const tag of tags) {
    const href = attribute(tag, "href") ?? "";
    check(href.trim().length > 0, "canonical href is not empty", href, "a non-empty absolute HTTPS URL", page);
    let canonical;
    try {
      canonical = new URL(href, pageUrl(page));
    } catch (error) {
      check(false, "canonical URL is valid", error.message, "a valid canonical URL", page);
      continue;
    }
    const expectedPath = routeWithBase(page.route);
    check(canonical.protocol === "https:" && canonical.origin === siteOrigin, "canonical uses the canonical HTTPS site origin", canonical.href, siteOrigin, page);
    check(canonical.pathname === expectedPath && !canonical.search && !canonical.hash, "canonical matches the generated route", canonical.href, `${siteOrigin}${expectedPath}`, page);
    canonicalRecords.push({ page, url: canonical.href });
  }
}
const canonicalOwners = new Map();
for (const record of canonicalRecords) {
  const prior = canonicalOwners.get(record.url);
  check(!prior, "canonical URL is unique across generated pages", record.url, "one generated page", record.page);
  if (!prior) canonicalOwners.set(record.url, record.page);
}

const canonicalByPage = new Map(canonicalRecords.map(({ page, url }) => [page, url]));
const structuredDataByPage = new Map();
for (const page of sitePages) {
  const structuredData = inspectStructuredData(page);
  structuredDataByPage.set(page, structuredData);
  const canonicalUrl = canonicalByPage.get(page);
  for (const item of structuredData) {
    if (item?.url === undefined) continue;
    check(
      item.url === canonicalUrl,
      "JSON-LD url matches the page canonical URL",
      item.url,
      canonicalUrl,
      page
    );
  }
}

function jsonLdTypes(page) {
  return (structuredDataByPage.get(page) ?? []).flatMap((item) => {
    const types = item?.["@type"];
    return Array.isArray(types) ? types : types ? [types] : [];
  });
}

const homepage = pageByRoute.get("/");
if (homepage) {
  check(jsonLdTypes(homepage).includes("Person"), "homepage JSON-LD includes Person", jsonLdTypes(homepage), "Person", homepage);
  check(
    (structuredDataByPage.get(homepage) ?? []).some((item) => item?.["@type"] === "Person" && item.url === canonicalByPage.get(homepage)),
    "homepage Person JSON-LD uses the canonical URL",
    structuredDataByPage.get(homepage),
    canonicalByPage.get(homepage),
    homepage
  );
}
for (const page of sitePages.filter((candidate) => candidate.route.startsWith("/work/") && candidate.route !== "/work/")) {
  const expectedTypes = ["SoftwareSourceCode", "CreativeWork"];
  const projectJsonLd = structuredDataByPage.get(page) ?? [];
  check(
    projectJsonLd.some((item) => expectedTypes.some((type) => hasType(item, type))),
    "project JSON-LD declares SoftwareSourceCode or CreativeWork",
    jsonLdTypes(page),
    expectedTypes,
    page
  );
  check(
    projectJsonLd.some((item) => expectedTypes.some((type) => hasType(item, type)) && item.url === canonicalByPage.get(page)),
    "project JSON-LD uses the canonical URL",
    projectJsonLd,
    canonicalByPage.get(page),
    page
  );
}

const articlePages = sitePages.filter((page) => /^\/articles\/[^/]+\/$/.test(page.route));
for (const page of articlePages) {
  const ogTypes = metaValues(page.html, "property", "og:type");
  const published = metaValues(page.html, "property", "article:published_time");
  const tags = metaValues(page.html, "property", "article:tag").filter((value) => value.trim());
  check(ogTypes.length === 1 && ogTypes[0].toLowerCase() === "article", "article emits og:type article", ogTypes, ["article"], page);
  check(published.length === 1 && !Number.isNaN(Date.parse(published[0])), "article emits a valid article:published_time", published, "one valid date", page);
  check(tags.length > 0, "article emits article:tag values", tags, "at least one non-empty tag", page);
}

for (const page of sitePages) {
  const structuredData = structuredDataByPage.get(page) ?? [];
  if (!articlePages.includes(page)) continue;
  const articleLd = structuredData.find((item) => hasType(item, "Article"));
  const schemaContext = articleLd?.["@context"] ?? structuredData.find((item) => item?.["@context"])?.["@context"];
  check(Boolean(articleLd), "article emits Article JSON-LD", structuredData.map((item) => item?.["@type"]), "an Article @type", page);
  check(["https://schema.org", "http://schema.org"].includes(schemaContext), "Article JSON-LD declares a schema.org @context", schemaContext, "https://schema.org", page);
  check(typeof articleLd?.headline === "string" && articleLd.headline.trim(), "Article JSON-LD declares headline", articleLd?.headline, "a non-empty headline", page);
  check(typeof articleLd?.datePublished === "string" && !Number.isNaN(Date.parse(articleLd.datePublished)), "Article JSON-LD declares valid datePublished", articleLd?.datePublished, "a valid date", page);
  check(typeof articleLd?.author === "object" || typeof articleLd?.author === "string", "Article JSON-LD declares an author", articleLd?.author, "an author object or name", page);
  check(Boolean(articleLd?.image), "Article JSON-LD declares an image", articleLd?.image, "an image URL or image object", page);
}

const distIndexHtml = pageByRoute.get("/")?.html ?? "";
const contactHtml = pageByRoute.get("/contact/")?.html ?? "";
const robotsTxt = existsSync(join(distRoot, "robots.txt")) ? read("dist/robots.txt") : "";
const sitemapXml = existsSync(join(distRoot, "sitemap.xml")) ? read("dist/sitemap.xml") : "";
const alternateSitemapXml = existsSync(join(distRoot, "sitemap-google.xml")) ? read("dist/sitemap-google.xml") : "";
const sitemapTxt = existsSync(join(distRoot, "sitemap.txt")) ? read("dist/sitemap.txt") : "";
const publicHtml = sitePages.map((page) => page.html).join("\n");
const sitemapUrls = [...sitemapXml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtml(match[1].trim()));
const alternateSitemapUrls = [...alternateSitemapXml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtml(match[1].trim()));
const textSitemapUrls = sitemapTxt.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
const mailtoMatches = publicHtml.match(/mailto:[^"']+/g) ?? [];
const homepageContactLinks = [...distIndexHtml.matchAll(/<a\b[^>]*href\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)]
  .map((match) => decodeHtml(match[1] ?? match[2]))
  .filter((href) => href === "/contact/" || href === `${basePath}/contact/`);
const cssDir = join(distRoot, "_astro");
const css = existsSync(cssDir) ? readdirSync(cssDir).filter((file) => file.endsWith(".css")).map((file) => readFileSync(join(cssDir, file), "utf8")).join("\n") : "";
const baseLayoutSource = read("src/layouts/BaseLayout.astro");
const globalCssSource = read("src/styles/global.css");
const seniorTpm = read("src/content/resume/mekari-senior-technical-program-manager.md");
const projectTruth = read("src/content/projects/program-truth.md");
const captureTruth = read("src/content/projects/capture-truth.md");
const timelineTruth = read("src/content/projects/timeline-truth.md");
const truthTools = read("src/content/projects/truth-tools.md");
const projectSources = readdirSync(join(root, "src", "content", "projects"))
  .filter((file) => file.endsWith(".md"))
  .map((file) => read(join("src", "content", "projects", file)));
const featuredProjects = projectSources.filter((content) => /^featured:\s*true\s*$/m.test(content));

check(robotsTxt.includes("User-agent: *"), "robots.txt declares a catch-all user agent");
check(robotsTxt.includes("Allow: /"), "robots.txt allows crawlers to access the public site");
check(robotsTxt.includes("Sitemap: https://hilmimuktitama.github.io/sitemap.xml"), "robots.txt points to the canonical sitemap URL");
check(robotsTxt.includes("Sitemap: https://hilmimuktitama.github.io/sitemap-google.xml"), "robots.txt points to the alternate Google sitemap URL");
check(robotsTxt.includes("Sitemap: https://hilmimuktitama.github.io/sitemap.txt"), "robots.txt points to the plain-text sitemap URL");

const expectedSitemapUrls = sitePages
  .filter((page) => page.route !== "/404/")
  .map((page) => new URL(routeWithBase(page.route), siteOrigin).href);
const sameValues = (left, right) => left.length === right.length && new Set(left).size === left.length && left.every((value) => right.includes(value));
for (const [label, urls] of [["sitemap", sitemapUrls], ["alternate sitemap", alternateSitemapUrls], ["text sitemap", textSitemapUrls]]) {
  check(urls.length === expectedSitemapUrls.length, `${label} has exactly the generated public route count`, urls.length, expectedSitemapUrls.length);
  check(sameValues(urls, expectedSitemapUrls), `${label} exactly matches the generated public route set`, urls, expectedSitemapUrls);
}
for (const slug of privateProjectSlugs) {
  const privateRoute = `/work/${slug}/`;
  check(!pageByRoute.has(privateRoute), "private project has no generated page", privateRoute, "no generated route");
  const privateUrl = new URL(routeWithBase(privateRoute), siteOrigin).href;
  check(!sitemapUrls.includes(privateUrl), "private project is absent from sitemap", privateUrl, "not present");
}
for (const urls of [sitemapUrls, alternateSitemapUrls, textSitemapUrls]) {
  check(!urls.some((url) => new URL(url).pathname.endsWith("/404/")), "sitemap excludes 404", urls, "no /404/ URL");
}
for (const concept of [
  "flagship evidence-first technical-program reliability toolkit",
  "snapshot gap",
  "privacy",
  "quality and health",
  "OIDC",
  "exact suite lock",
  "claim floor",
  "health consistency",
  "nested",
  "locator-only",
  "portable approval",
  "synthetic"
]) {
  check(truthTools.toLowerCase().includes(concept.toLowerCase()), `Truth Tools should explain ${concept}`);
}
check(projectTruth.includes('language: "JavaScript"'), "Program Truth should declare JavaScript");
check(
  !/\b(legacy|retired|umbrella|replaced|deprecated)\b/i.test(truthTools),
  "Truth Tools should not use retired-product framing"
);
check(
  !/Version 0\.3\.1 is published/i.test(truthTools),
  "Truth Tools should not retain the stale 0.3.1 published claim"
);
check(
  /The 0\.4\.0 release line adds/i.test(truthTools),
  "Truth Tools should use 0.4.0 release-line framing"
);

check(css.includes(".prose p+p"), "prose paragraphs should have spacing between adjacent paragraphs");
check(css.includes(".prose ul") && css.includes(".prose ol"), "prose lists should have readable spacing");
check(css.includes(".prose blockquote"), "prose should support styled blockquotes");
check(css.includes(".prose code"), "prose should support inline code styling");
check(css.includes(".prose table"), "prose should support table styling");
check(baseLayoutSource.includes("data-theme"), "base layout should initialize a data-theme attribute");
check(/localStorage\.getItem\((themeKey|"theme")\)/.test(baseLayoutSource), "theme runtime should read the stored visitor preference");
check(baseLayoutSource.includes("prefers-color-scheme: dark"), "theme runtime should fall back to system dark preference");
check(baseLayoutSource.includes('class="theme-toggle"'), "header should include a visible theme toggle button");
check(baseLayoutSource.includes("aria-pressed"), "theme toggle should expose pressed state to assistive technology");
check(globalCssSource.includes('[data-theme="dark"]'), "global CSS should define dark theme token overrides");
check(globalCssSource.includes("--header-bg"), "global CSS should use a semantic header background token");
check(globalCssSource.includes("--tag-bg"), "global CSS should use a semantic tag background token");
check(globalCssSource.includes("--interactive-hover"), "global CSS should use a semantic hover surface token");
check(globalCssSource.includes("--primary-button-ink"), "global CSS should use a semantic primary button text token");
check(globalCssSource.includes("--code-block-bg"), "global CSS should use a semantic code block background token");
check(!publicHtml.includes("article-callout"), "article content should not depend on custom callout classes");
check(!publicHtml.includes("article-pullquote"), "article content should not depend on custom pullquote classes");

check(/quarterly/i.test(seniorTpm), "senior TPM resume bullets should include scope evidence");
check(
  !seniorTpm.includes("  - lead planning"),
  "senior TPM bullets should not remain lowercase responsibility statements"
);

for (const [label, content] of [
  ["Program Truth", projectTruth],
  ["Capture Truth", captureTruth]
]) {
  check(content.includes("## Context"), `${label} should include context`);
  check(content.includes("## What changed"), `${label} should include what changed`);
  check(content.includes("## Evidence I can show"), `${label} should include sanitized evidence`);
}

check(
  captureTruth.includes("https://github.com/hilmimuktitama/capture-truth"),
  "Capture Truth should link to the public repository"
);
check(
  captureTruth.includes("evidence_pack"),
  "Capture Truth should explain the evidence pack artifact"
);
for (const boundary of [
  "pre-review mechanics",
  "candidate claims remain unreviewed",
  "does not establish semantic truth",
  "does not establish semantic source support"
]) {
  check(captureTruth.toLowerCase().includes(boundary), `Capture Truth should preserve its ${boundary} boundary`);
}
for (const concept of [
  "normalization",
  "timestamps",
  "revisions",
  "hashes",
  "locator-only",
  "unreviewed candidate claims",
  "derivation",
  "explicit approval",
  "portable",
  "local"
]) {
  check(captureTruth.toLowerCase().includes(concept), `Capture Truth should explain ${concept}`);
}
for (const concept of ["already-fetched", "no connectors", "no fetching"]) {
  check(captureTruth.toLowerCase().includes(concept), `Capture Truth should explain ${concept}`);
}
for (const excluded of [
  "does not own gaps",
  "final conflicts",
  "health assessment",
  "timeline validation",
  "truth determination"
]) {
  check(captureTruth.toLowerCase().includes(excluded), `Capture Truth should disclaim ${excluded}`);
}
for (const staleClaim of ["validation gaps", "unresolved conflicts"]) {
  check(!captureTruth.toLowerCase().includes(staleClaim), `Capture Truth should not claim ${staleClaim}`);
}
for (const concept of ["parses inputs locally", "locator-only", "no excerpts", "drift", "baseline/current schedule drift"]) {
  check(timelineTruth.toLowerCase().includes(concept), `Timeline Truth should explain ${concept}`);
}
check(
  !timelineTruth.toLowerCase().includes("planned and observed"),
  "Timeline Truth should describe baseline/current schedule drift rather than planned-v-observed drift"
);
check(
  !timelineTruth.includes("directly compile a `StatusArtifact`"),
  "Timeline Truth should not claim direct canonical artifact compilation"
);
for (const boundary of ["does not assemble a `StatusArtifact` itself", "did not compute a critical path"]) {
  check(timelineTruth.toLowerCase().includes(boundary.toLowerCase()), `Timeline Truth should preserve its ${boundary} boundary`);
}
for (const concept of ["explicit health assessment", "available Jira and Confluence connectors", "bundles no connectors"]) {
  check(projectTruth.toLowerCase().includes(concept.toLowerCase()), `Program Truth should explain ${concept}`);
}
check(
  projectTruth.toLowerCase().includes("does not perform deterministic validation itself"),
  "Program Truth should disclaim deterministic validation"
);
check(
  !projectTruth.toLowerCase().includes("proves truth"),
  "Program Truth should not overstate truth determination"
);
check(
  captureTruth.includes("Explicit approval is required for\ncandidate text in `portable-summary`."),
  "Capture Truth should require explicit approval for candidate text in portable-summary"
);
check(
  captureTruth.includes("An `internal-evidence-pack` can contain unreviewed\nstructured and metadata candidates"),
  "Capture Truth should allow unreviewed structured and metadata candidates in internal-evidence-pack"
);
check(
  captureTruth.includes("but it is not a repo-safe guarantee"),
  "Capture Truth should not present internal-evidence-pack as a repo-safe guarantee"
);
check(
  captureTruth.includes("Raw and mixed representations remain excluded from portable output"),
  "Capture Truth should exclude raw and mixed representations from portable output"
);
check(
  captureTruth.includes("`raw-local` is local-only"),
  "Capture Truth should keep raw-local local-only"
);
check(
  !captureTruth.toLowerCase().includes("all portable output requires approval"),
  "Capture Truth should not use generic all-portable-output approval wording"
);
check(sitemapUrls.every((url) => url.startsWith(`${siteOrigin}/`)), "sitemap URLs use the canonical site origin");
check(alternateSitemapUrls.every((url) => url.startsWith(`${siteOrigin}/`)), "alternate sitemap URLs use the canonical site origin");
check(textSitemapUrls.every((url) => url.startsWith(`${siteOrigin}/`)), "text sitemap URLs use the canonical site origin");
check(sitemapUrls.length === new Set(sitemapUrls).size, "sitemap has no duplicate URLs");
check(alternateSitemapUrls.length === new Set(alternateSitemapUrls).size, "alternate sitemap has no duplicate URLs");
check(textSitemapUrls.length === new Set(textSitemapUrls).size, "text sitemap has no duplicate URLs");
check(alternateSitemapXml === sitemapXml, "alternate sitemap matches canonical sitemap content");
check(textSitemapUrls.join("\n") === sitemapUrls.join("\n"), "text sitemap matches canonical sitemap URL order");

check(distIndexHtml.includes('rel="canonical"'), "homepage renders a canonical link");
check(distIndexHtml.includes('property="og:title"'), "homepage renders Open Graph title metadata");
check(distIndexHtml.includes('name="twitter:card"'), "homepage renders Twitter card metadata");
check(distIndexHtml.includes('rel="icon"'), "homepage renders a favicon link");
check(distIndexHtml.includes("og-image.png"), "homepage references the PNG share image");
check(distIndexHtml.includes("View full resume"), "homepage resume preview links to the full resume page");
check(homepageContactLinks.length >= 2, "homepage header and hero Contact links target /contact/");
check(!distIndexHtml.includes("/#contact"), "homepage Contact links do not point to the footer anchor");
check(contactHtml.includes(approvedEmail), "contact page shows the public email address");
check(contactHtml.includes(`mailto:${approvedEmail}`), "contact page links the public email address");
check(contactHtml.includes(`href="${linkedInUrl}"`), "contact page links LinkedIn with the canonical profile URL");
check(!publicHtml.includes("https://www.linkedin.com/in/hilmimuktitama/"), "public build LinkedIn links do not use the mobile-404 trailing slash form");
check(!publicHtml.includes("https://www.linkedin.com/in/hilmimuktitama?_l=en_US"), "public build LinkedIn links do not include a locale query");
check(!publicHtml.includes("https://www.linkedin.com/in/hilmimuktitama/?_l=en_US"), "public build LinkedIn links do not use the mobile-404 slash-before-locale form");
check(contactHtml.includes("https://github.com/hilmimuktitama"), "contact page links GitHub");
check(!contactHtml.includes('aria-label="Contact links"'), "contact page does not repeat the global contact footer");
check(mailtoMatches.length > 0 && mailtoMatches.every((href) => href === `mailto:${approvedEmail}`), "public build exposes only the approved public email mailto link");
check(!publicHtml.includes("Private work can be discussed"), "public build excludes vague private-work filler copy");
check(!publicHtml.includes("share-safe"), "public build excludes vague share-safe filler copy");
check(!publicHtml.includes("work I can talk about"), "public build excludes casual work-disclosure filler copy");
check(!publicHtml.includes("AI-assisted workflows"), "public build excludes broad AI-positioning filler copy");
check(!publicHtml.includes("Additional work samples are available on request"), "public build excludes generic work-sample availability filler copy");
check(!publicHtml.includes("Platform Readiness Program"), "public build excludes private Platform Readiness case note");
check(publicHtml.includes("Capture Truth"), "public build renders Capture Truth project content");
check(publicHtml.includes("Truth Tools"), "public build renders the Truth Tools flagship");
check(featuredProjects.length === 1, "exactly one project is featured");
check(featuredProjects[0]?.includes('title: "Truth Tools"'), "Truth Tools is the sole featured project");
for (const section of ["## Problem", "## Product reset", "## Architecture", "## Engineering decisions", "## Honest evaluation boundary", "## TPM competencies", "## Links"]) {
  check(truthTools.includes(section), `Truth Tools includes ${section}`);
}
for (const link of ["https://github.com/hilmimuktitama/truth-tools", "https://hilmimuktitama.github.io/truth-tools/", "https://github.com/hilmimuktitama/capture-truth", "https://github.com/hilmimuktitama/timeline-truth", "https://github.com/hilmimuktitama/program-truth", "/work/truth-tools/"]) {
  check(truthTools.includes(link), `Truth Tools includes the correct link ${link}`);
}
for (const concept of ["snapshot gap", "privacy", "quality and health", "OIDC", "exact suite lock", "synthetic"]) {
  check(truthTools.toLowerCase().includes(concept.toLowerCase()), `Truth Tools explains ${concept}`);
}
check(projectTruth.includes('language: "JavaScript"'), "Program Truth declares JavaScript");
check(!/\b(legacy|retired|umbrella|replaced|deprecated)\b/i.test(truthTools), "Truth Tools does not use retired-product framing");
check(css.includes(".prose p+p"), "prose paragraphs have spacing between adjacent paragraphs");
check(css.includes(".prose ul") && css.includes(".prose ol"), "prose lists have readable spacing");
check(css.includes(".prose blockquote"), "prose supports styled blockquotes");
check(css.includes(".prose code"), "prose supports inline code styling");
check(css.includes(".prose table"), "prose supports table styling");
check(baseLayoutSource.includes("data-theme"), "base layout initializes a data-theme attribute");
check(/localStorage\.getItem\((themeKey|"theme")\)/.test(baseLayoutSource), "theme runtime reads the stored visitor preference");
check(baseLayoutSource.includes("prefers-color-scheme: dark"), "theme runtime falls back to system dark preference");
check(baseLayoutSource.includes('class="theme-toggle"'), "header includes a visible theme toggle button");
check(baseLayoutSource.includes("aria-pressed"), "theme toggle exposes pressed state to assistive technology");
check(globalCssSource.includes('[data-theme="dark"]'), "global CSS defines dark theme token overrides");
check(globalCssSource.includes("--header-bg"), "global CSS uses a semantic header background token");
check(globalCssSource.includes("--tag-bg"), "global CSS uses a semantic tag background token");
check(globalCssSource.includes("--interactive-hover"), "global CSS uses a semantic hover surface token");
check(globalCssSource.includes("--primary-button-ink"), "global CSS uses a semantic primary button text token");
check(globalCssSource.includes("--code-block-bg"), "global CSS uses a semantic code block background token");
check(!publicHtml.includes("article-callout"), "article content does not depend on custom callout classes");
check(!publicHtml.includes("article-pullquote"), "article content does not depend on custom pullquote classes");
check(/quarterly/i.test(seniorTpm), "senior TPM resume bullets include scope evidence");
check(!seniorTpm.includes("  - lead planning"), "senior TPM bullets are not lowercase responsibility statements");
for (const [label, content] of [["Program Truth", projectTruth], ["Capture Truth", captureTruth]]) {
  check(content.includes("## Context"), `${label} includes context`);
  check(content.includes("## What changed"), `${label} includes what changed`);
  check(content.includes("## Evidence I can show"), `${label} includes sanitized evidence`);
}
check(captureTruth.includes("https://github.com/hilmimuktitama/capture-truth"), "Capture Truth links to the public repository");
check(captureTruth.includes("evidence_pack"), "Capture Truth explains the evidence pack artifact");

if (failures.length > 0) {
  console.error("Site verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  exit(1);
}

console.log("Site verification passed.");
