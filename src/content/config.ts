import { defineCollection, z } from "astro:content";

export const collections = {
  "blog": defineCollection({
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      date: z.date(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
      }).optional(),
      tags: z.array(z.string()).optional(),
    }),
  }),
  "projects": defineCollection({
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      date: z.date(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
      }).optional(),
    }),
  }),
};
