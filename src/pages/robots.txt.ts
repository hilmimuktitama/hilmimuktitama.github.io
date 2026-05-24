import type { APIRoute } from "astro";

const SITE_URL = "https://hilmimuktitama.github.io";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(SITE_URL);

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${new URL("/sitemap.xml", origin).toString()}`
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
};
