import { z } from "zod";

export const SendMail = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  subscribe: z.boolean(),
});
