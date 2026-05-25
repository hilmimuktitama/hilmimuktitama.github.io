import type { APIRoute } from "astro";
import { buildSitemapText } from "../lib/sitemap";

export const GET: APIRoute = async ({ site }) => {
  return new Response(await buildSitemapText(site), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
