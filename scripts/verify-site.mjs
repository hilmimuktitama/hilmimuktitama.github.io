import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { cwd, exit } from "node:process";

const root = cwd();
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function readHtmlFiles(dir) {
  if (!existsSync(dir)) return "";
  return readdirSync(dir)
    .flatMap((file) => {
      const path = join(dir, file);
      if (statSync(path).isDirectory()) return readHtmlFiles(path);
      return file.endsWith(".html") ? readFileSync(path, "utf8") : "";
    })
    .join("\n");
}

const indexHtml = existsSync(join(root, "dist", "index.html"))
  ? read("dist/index.html")
  : "";
const contactHtml = existsSync(join(root, "dist", "contact", "index.html"))
  ? read("dist/contact/index.html")
  : "";
const publicHtml = readHtmlFiles(join(root, "dist"));
const approvedEmail = "hilmimukti@gmail.com";
const mailtoMatches = publicHtml.match(/mailto:[^"']+/g) ?? [];
const homepageContactLinks = indexHtml.match(/href="[^"]*\/contact\/"/g) ?? [];
const cssDir = join(root, "dist", "_astro");
const css = existsSync(cssDir)
  ? readdirSync(cssDir)
      .filter((file) => file.endsWith(".css"))
      .map((file) => readFileSync(join(cssDir, file), "utf8"))
      .join("\n")
  : "";
const seniorTpm = read("src/content/resume/mekari-senior-technical-program-manager.md");
const projectTruth = read("src/content/projects/program-truth.md");
const captureTruth = read("src/content/projects/capture-truth.md");

check(indexHtml.includes('rel="canonical"'), "homepage should render a canonical link");
check(indexHtml.includes('property="og:title"'), "homepage should render Open Graph title metadata");
check(indexHtml.includes('name="twitter:card"'), "homepage should render Twitter card metadata");
check(indexHtml.includes('rel="icon"'), "homepage should render a favicon link");
check(indexHtml.includes("og-image.png"), "homepage should reference the PNG share image");
check(indexHtml.includes("View full resume"), "homepage resume preview should link to the full resume page");
check(homepageContactLinks.length >= 2, "homepage header and hero Contact links should target /contact/");
check(!indexHtml.includes("/#contact"), "homepage Contact links should not point to the footer anchor");
check(contactHtml.includes("hilmimukti@gmail.com"), "contact page should show the public email address");
check(contactHtml.includes("mailto:hilmimukti@gmail.com"), "contact page should link the public email address");
check(contactHtml.includes("https://www.linkedin.com/in/hilmimuktitama/"), "contact page should link LinkedIn");
check(contactHtml.includes("https://github.com/hilmimuktitama"), "contact page should link GitHub");
check(!contactHtml.includes('aria-label="Contact links"'), "contact page should not repeat the global contact footer");
check(
  mailtoMatches.length > 0 && mailtoMatches.every((href) => href === `mailto:${approvedEmail}`),
  "public build should expose only the approved public email mailto link"
);
check(!publicHtml.includes("Private work can be discussed"), "public build should not use vague private-work filler copy");
check(!publicHtml.includes("share-safe"), "public build should not use vague share-safe filler copy");
check(!publicHtml.includes("work I can talk about"), "public build should not use casual work-disclosure filler copy");
check(!publicHtml.includes("AI-assisted workflows"), "public build should not use broad AI-positioning filler copy");
check(!publicHtml.includes("Additional work samples are available on request"), "public build should not use generic work-sample availability filler copy");
check(!publicHtml.includes("Platform Readiness Program"), "public build should not expose private Platform Readiness case note");
check(publicHtml.includes("Capture Truth"), "public build should render Capture Truth project content");

check(css.includes(".prose p+p"), "prose paragraphs should have spacing between adjacent paragraphs");
check(css.includes(".prose ul") && css.includes(".prose ol"), "prose lists should have readable spacing");
check(css.includes(".prose blockquote"), "prose should support styled blockquotes");
check(css.includes(".prose code"), "prose should support inline code styling");
check(css.includes(".prose table"), "prose should support table styling");
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

if (failures.length > 0) {
  console.error("Site verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  exit(1);
}

console.log("Site verification passed.");
