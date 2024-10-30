import { z } from "zod";
import { SendMail } from "./schema";
import { ActionState } from "@/lib/createSafeAction";

export type InputType = z.infer<typeof SendMail>;
export type ReturnType = ActionState<InputType, string>;
