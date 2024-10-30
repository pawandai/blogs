"use server";

import { InputType, ReturnType } from "./types";
import matter from "gray-matter";
import fs from "fs/promises";
import { join } from "path";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpsertBlog } from "./schema";

const handler = async (input: InputType): Promise<ReturnType> => {
  const fileToBeWritten = join(
    process.cwd(),
    "src",
    "_blogs",
    `${input.slug}.md`
  );
  console.log("File to be written", fileToBeWritten);

  if (process.env.NODE_ENV === "development") {
    const dataToBeWritten = matter.stringify(input.content, input);
    try {
      await fs.writeFile(fileToBeWritten, dataToBeWritten);
    } catch (error) {
      console.error(error);
      return { error: "File could not be written !" };
    }
    return { data: input };
  } else {
    return {
      error: "This route works in development mode only",
    };
  }
};

export const upsertBlog = createSafeAction(UpsertBlog, handler);
