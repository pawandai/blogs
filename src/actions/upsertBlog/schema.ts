import { z } from "zod";

export const UpsertBlog = z.object({
  title: z.string(),
  topics: z.string(),
  slug: z.string(),
  category: z.string(),
  image: z.string(),
  tags: z.string(),
  content: z.string(),
  createdAt: z.string(),
  timeToRead: z.string(),
  preview: z.string(),
});
