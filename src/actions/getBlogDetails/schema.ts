import { z } from "zod";

export const GetBlogDetails = z.object({
  slug: z.string(),
});
