import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { externalLinks } from "./scripts/markdown-external-links.mjs";

const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const isUserPage = repo === `${owner}.github.io`;
const site = process.env.SITE ?? "https://hilmimuktitama.github.io";

export default defineConfig({
  site,
  base: process.env.BASE_PATH ?? (isGitHubActions && repo && !isUserPage ? `/${repo}` : "/"),
  output: "static",
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks(site)] })
  }
});
