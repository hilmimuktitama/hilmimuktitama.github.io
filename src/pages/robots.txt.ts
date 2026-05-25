import type { APIRoute } from "astro";
import { getSiteOrigin } from "../lib/sitemap";

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${new URL("/sitemap.xml", origin).toString()}`,
      `Sitemap: ${new URL("/sitemap-google.xml", origin).toString()}`,
      `Sitemap: ${new URL("/sitemap.txt", origin).toString()}`
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
};
