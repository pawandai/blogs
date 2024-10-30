"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Edit } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Post } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BlogEditor from "./editor";
import { useAction } from "@/hooks/useAction";
import { deleteBlog } from "@/actions/deleteBlog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type BlogCardProps = {
  post?: Post;
  thumbnail: string;
  title: string;
  slug: string;
  preview: string;
};

export function BlogCard({
  thumbnail,
  title,
  slug,
  preview,
  post,
}: BlogCardProps) {
  const router = useRouter();
  const { execute, loading } = useAction(deleteBlog, {
    onSuccess: (data) => {
      toast.success(data);
      setTimeout(() => {
        router.refresh();
      }, 3000);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <main className="group relative select-none rounded-lg border-2 border-border mx-2 group w-full p-2 flex flex-col justify-between">
      <div>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg mb-2">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="transition-all ease-in-out duration-500 mb-4 object-cover group-hover:scale-105"
          />
        </AspectRatio>
        <Link
          href={`/${slug}`}
          className={`text-xl font-semibold hover:underline ml-2`}
        >
          {title}
        </Link>
        <p className="px-2 my-2">{preview}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm px-2">
          {new Date().getFullYear()}
        </p>
        <Link
          href={`/${slug}`}
          className={`text-primary font-bold ${buttonVariants({
            variant: "link",
            size: "lg",
          })}`}
        >
          Read Full Article &nbsp;
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {process.env.NODE_ENV === "development" && (
        <Dialog>
          <DialogTrigger
            className={`${buttonVariants({ variant: "outline" })} mb-2`}
          >
            <Edit className="h-6 w-6 mr-2" />
            Edit
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogTitle></DialogTitle>
            <BlogEditor post={post!} type="edit" />
          </DialogContent>
        </Dialog>
      )}
      <Button
        variant="destructive"
        onClick={() => execute({ slug: slug })}
        disabled={loading}
      >
        Delete
      </Button>
    </main>
  );
}
