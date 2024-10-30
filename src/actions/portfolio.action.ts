"use server";

import { join } from "path";
import fsPromises from "fs/promises";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDataToFile = async (data: any) => {
  const portfolioData = join(process.cwd(), "src", "data", "index.json");
  if (process.env.NODE_ENV === "development") {
    await fsPromises.writeFile(portfolioData, JSON.stringify(data), "utf-8");
    return "Data saved";
  }
};
