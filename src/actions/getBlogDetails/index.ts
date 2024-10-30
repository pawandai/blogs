"use server";

import { InputType, ReturnType } from "./types";
import matter from "gray-matter";
import fs from "fs/promises";
import { join } from "path";
import { Post } from "@/types";
import { createSafeAction } from "@/lib/createSafeAction";
import { GetBlogDetails } from "./schema";

const handler = async (input: InputType): Promise<ReturnType> => {
  const { slug } = input;
  try {
    const postsDirectory = join(process.cwd(), "src", "_blogs");
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const dataToBeSent = { ...data, content } as Post;

    return { data: dataToBeSent };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch posts" };
  }
};

export const getBlogDetails = createSafeAction(GetBlogDetails, handler);
