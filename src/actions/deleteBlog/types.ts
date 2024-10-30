import { z } from "zod";
import { DeleteBlog } from "./schema";
import { ActionState } from "@/lib/createSafeAction";

export type InputType = z.infer<typeof DeleteBlog>;
export type ReturnType = ActionState<InputType, string>;
