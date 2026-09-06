import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const publicDirectory = join(process.cwd(), "public");
const font = {
  fontFiles: [join(publicDirectory, "fonts/HankenGrotesk-SemiBold.ttf")],
  defaultFontFamily: "Hanken Grotesk",
  sansSerifFamily: "Hanken Grotesk",
  loadSystemFonts: false
};

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  })[character]!);
}

function textWidth(value: string, size: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="160"><text y="110" font-family="Hanken Grotesk" font-size="${size}" font-weight="600">${escapeXml(value)}</text></svg>`;
  return new Resvg(svg, { font }).getBBox()?.width ?? 0;
}

function wrapTitle(title: string, size: number) {
  const lines: string[] = [];
  for (const word of title.split(/\s+/)) {
    const last = lines.at(-1);
    if (last && textWidth(`${last} ${word}`, size) <= 1060) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else {
      lines.push(word);
    }
  }
  return lines;
}

/** Generate the same branded card for the site and each published article. */
export function createSocialImage(article?: { title: string; pubDate: Date }) {
  let svg = readFileSync(join(publicDirectory, "og-image.svg"), "utf8");
  if (article) {
    let size = 80;
    let lines = wrapTitle(article.title, size);
    while (size > 32 && (lines.length * size * 1.16 > 286 || lines.some((line) => textWidth(line, size) > 1060))) {
      size -= 4;
      lines = wrapTitle(article.title, size);
    }
    const firstBaseline = 215 + size;
    const title = `<g id="card-title" font-family="Hanken Grotesk" font-size="${size}" font-weight="600" fill="#163841">${lines.map((line, index) => `<text x="64" y="${firstBaseline + index * size * 1.16}">${escapeXml(line)}</text>`).join("")}</g>`;
    const date = article.pubDate.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta"
    });
    svg = svg
      .replace(/<g id="card-title"[\s\S]*?<\/g>/, title)
      .replace(/(<text id="category"[^>]*>)[\s\S]*?<\/text>/, "$1A NOTE FROM THE WORK</text>")
      .replace(/(<text id="card-footer"[^>]*>)[\s\S]*?<\/text>/, `$1Published ${date}</text>`)
      .replace(/<image id="thread-art"[^>]*\/>/, "");
  } else {
    const thread = readFileSync(join(publicDirectory, "images/loose-ends-light.png"));
    svg = svg.replace('href="/images/loose-ends-light.png"', `href="data:image/png;base64,${thread.toString("base64")}"`);
  }
  return Uint8Array.from(new Resvg(svg, { font }).render().asPng());
}
