import type { APIRoute } from "astro";
import { createSocialImage } from "../lib/social-image";

export const GET: APIRoute = () => new Response(createSocialImage(), {
  headers: { "Content-Type": "image/png" }
});
