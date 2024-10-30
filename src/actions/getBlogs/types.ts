import { ActionState } from "@/lib/createSafeAction";
import { Post } from "@/types";

export type InputType = string;
export type ReturnType = ActionState<InputType, Post[]>;
