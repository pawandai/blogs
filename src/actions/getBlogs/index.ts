"use server";

import { ReturnType } from "./types";
import matter from "gray-matter";
import fs from "fs/promises";
import { join } from "path";
import { Post } from "@/types";

export const getBlogs = async (): Promise<ReturnType> => {
  console.log("Fetching posts...");
  try {
    const postsDirectory = join(process.cwd(), "src", "_blogs");
    const slugs = await fs.readdir(postsDirectory);

    const response = slugs.map(async (slug: string) => {
      const postsDirectory = join(process.cwd(), "src", "_blogs");
      const realSlug = slug.replace(/\.md$/, "");
      const fullPath = join(postsDirectory, `${realSlug}.md`);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return { ...data, content };
    });

    // sort posts by date in descending order
    const posts = (await Promise.all(response)) as Post[];
    const sortedPosts = posts.sort((post1, post2) =>
      post1.createdAt > post2.createdAt ? -1 : 1
    );

    return { data: sortedPosts };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch posts" };
  }
};
