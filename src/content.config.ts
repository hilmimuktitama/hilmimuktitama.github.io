import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([])
  })
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    source: z.enum(["github", "manual"]),
    status: z.enum(["public", "private-case-study", "draft"]),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    language: z.string().optional(),
    updatedDate: z.date().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    tags: z.array(z.string()).default([])
  })
});

const resume = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resume" }),
  schema: z.object({
    section: z.enum(["experience", "skill", "education", "certification", "language", "principle"]),
    title: z.string(),
    organization: z.string().optional(),
    location: z.string().optional(),
    period: z.string().optional(),
    summary: z.string(),
    items: z.array(z.string()).default([]),
    order: z.number().default(100)
  })
});

export const collections = { articles, projects, resume };
