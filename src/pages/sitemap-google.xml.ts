import type { APIRoute } from "astro";
import { buildSitemapXml } from "../lib/sitemap";

export const GET: APIRoute = async ({ site }) => {
  return new Response(await buildSitemapXml(site), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
