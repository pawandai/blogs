import { ActionState } from "@/lib/createSafeAction";
import { Post } from "@/types";
import { z } from "zod";
import { GetBlogDetails } from "./schema";

export type InputType = z.infer<typeof GetBlogDetails>;
export type ReturnType = ActionState<InputType, Post>;
