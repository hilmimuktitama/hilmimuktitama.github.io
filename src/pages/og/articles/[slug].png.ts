import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getEntrySlug } from "../../../lib/content";
import { createSocialImage } from "../../../lib/social-image";

export async function getStaticPaths() {
  const articles = await getCollection("articles", ({ data }) => data.pubDate.valueOf() <= Date.now());
  return articles.map((article) => ({
    params: { slug: getEntrySlug(article) },
    props: { title: article.data.title, pubDate: article.data.pubDate }
  }));
}

export const GET: APIRoute = ({ props }) => new Response(createSocialImage({
  title: props.title,
  pubDate: props.pubDate
}), { headers: { "Content-Type": "image/png" } });
