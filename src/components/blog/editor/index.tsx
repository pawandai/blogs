"use client";

import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
import { useAction } from "@/hooks/useAction";
import { upsertBlog } from "@/actions/upsertBlog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BlogEditorProps {
  post?: Post;
  type: "new" | "edit";
  className?: string;
}

const BlogEditor = ({ type, post, className }: BlogEditorProps) => {
  const router = useRouter();
  const [currentTabs, setCurrentTabs] = useState("BLOGDETAILS");
  const [blogContent, setBlogContent] = useState(post?.content);
  const [mounted, setMounted] = useState(false);
  const [blogVariables, setBlogVariables] = useState<Post>({
    category: post?.category as string,
    title: post?.title as string,
    slug: post?.slug as string,
    tags: post?.tags as string,
    timeToRead: post?.timeToRead as string,
    topics: post?.topics as string,
    preview: post?.preview as string,
    image: post?.image as string,
    createdAt: post?.createdAt as string,
    content: post?.content as string,
  });
  const { execute, loading } = useAction(upsertBlog, {
    onSuccess: (data) => {
      toast.success(`Post "${data.title}" created successfully !`);
      setTimeout(() => {
        router.replace(`/${data.slug}`);
      }, 3000);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = () => {
    execute(blogVariables);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <form
      action={onSubmit}
      className={cn(
        "container p-2 bg-background h-[100vh] px-8 my-10",
        className
      )}
    >
      <div>
        <div className="z-10 sticky top-12">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h1 className="text-4xl">{blogVariables.title}</h1>
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setCurrentTabs("BLOGDETAILS")}
              variant={currentTabs === "BLOGDETAILS" ? "default" : "outline"}
            >
              Blog Details
            </Button>
            <Button
              onClick={() => setCurrentTabs("CONTENT")}
              variant={currentTabs === "CONTENT" ? "default" : "outline"}
            >
              Content
            </Button>
          </div>
        </div>
      </div>
      {currentTabs === "BLOGDETAILS" && (
        <div className="my-10">
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              value={blogVariables.title}
              onChange={(e) =>
                setBlogVariables({ ...blogVariables, title: e.target.value })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
              disabled={loading}
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="slug">
              Slug
            </label>
            <Input
              id="slug"
              value={blogVariables.slug}
              onChange={(e) =>
                setBlogVariables({ ...blogVariables, slug: e.target.value })
              }
              disabled={type === "edit"}
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="category">
              Category
            </label>
            <Input
              id="category"
              value={blogVariables.category}
              onChange={(e) =>
                setBlogVariables({ ...blogVariables, category: e.target.value })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
              disabled={loading}
            />
          </div>

          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="tags">
              Tags{" "}
              <span className="text-muted-foreground">
                (comma separated) (eg: travel, joke, programming)
              </span>
            </label>
            <Input
              id="tags"
              value={blogVariables.tags}
              onChange={(e) =>
                setBlogVariables({
                  ...blogVariables,
                  tags: e.target.value,
                })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
              disabled={loading}
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="preview">
              Preview (SEO)
            </label>
            <TextareaAutosize
              id="preview"
              value={blogVariables.preview as string}
              onChange={(e) =>
                setBlogVariables({
                  ...blogVariables,
                  preview: e.target.value,
                })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              disabled={loading}
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              value={blogVariables.image as string}
              onChange={(e) =>
                setBlogVariables({
                  ...blogVariables,
                  image: e.target.value,
                })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
              disabled={loading}
            />
          </div>
        </div>
      )}

      {currentTabs === "CONTENT" && (
        <>
          <div className="mt-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50" htmlFor="timeToRead">
                Time To Read{" "}
                <span className="text-muted-foreground">(in minutes)</span>
              </label>
              <Input
                id="timeToRead"
                value={blogVariables.timeToRead}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    timeToRead: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 rounded-md border-2"
                type="text"
                disabled={loading}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="topics">
              Topics{" "}
              <span className="text-muted-foreground">
                (comma separated) (eg: Introduction, What is this?, How it
                works?, Usage, Conclusion)
              </span>
            </label>
            <TextareaAutosize
              id="topics"
              value={blogVariables.topics}
              onChange={(e) =>
                setBlogVariables({
                  ...blogVariables,
                  topics: e.target.value,
                })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              disabled={loading}
            />
          </div>
          <div className="my-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50" htmlFor="content">
                Content <span>(Markdown)</span>
              </label>
              <TextareaAutosize
                id="content"
                className="w-full h-auto mt-5 p-4 border rounded-xl"
                value={blogContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBlogContent(e.target.value)
                }
                disabled={loading}
              />
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default BlogEditor;
