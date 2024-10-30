"use client";

import BlogLayout from "@/components/blog/blogLayout";
import Header from "@/components/shared/header";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Header />
      <BlogLayout />
    </>
  );
}
