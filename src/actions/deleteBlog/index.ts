"use server";

import fs from "fs/promises";
import { join } from "path";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { DeleteBlog } from "./schema";

const handler = async (input: InputType): Promise<ReturnType> => {
  const deletedFile = join(process.cwd(), "src", "_blogs", `${input.slug}.md`);
  try {
    await fs.unlink(deletedFile);
    return { data: "Post deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete post" };
  }
};

export const deleteBlog = createSafeAction(DeleteBlog, handler);
