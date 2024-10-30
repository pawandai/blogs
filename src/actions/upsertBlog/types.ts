import { z } from "zod";
import { UpsertBlog } from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { Post } from "@/types";

export type InputType = z.infer<typeof UpsertBlog>;
export type ReturnType = ActionState<InputType, Post>;
