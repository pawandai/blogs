import { z } from "zod";

export const DeleteBlog = z.object({
  slug: z.string(),
});
