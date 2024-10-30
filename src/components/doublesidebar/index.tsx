"use client";

import Container from "@/components/ui/container";
import Link from "next/link";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import MenuOptions from "./menuoptions";
import { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Edit, NotebookPen, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import BlogEditor from "../blog/editor";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tag from "@/components/ui/tag";
import Typography from "@/components/ui/typography";
import Header from "../shared/header";
import { useGetAllPosts } from "@/hooks/useSelector";

interface DoubleSidebarProps {
  children: ReactNode;
  className?: string;
  selectedPost: Post;
}

const SimilarBlogs = ({ similarPosts }: { similarPosts: Post[] }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <div className="bg-background flex-1 mt-16">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold">Similar Posts</h2>
        <Link
          href="/"
          className={buttonVariants({ variant: "link", size: "sm" })}
        >
          See All Posts &nbsp;
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {similarPosts.length > 0 ? (
        <ul className="space-y-6">
          {similarPosts.map((post) => (
            <li key={post.slug} className="">
              <Link
                href={`/${post.slug}`}
                className="text-lg font-normal p-1 hover:underline"
              >
                {post.title}
              </Link>
              <div className="flex flex-wrap gap-2 my-2">
                {post.tags
                  .split(",")
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="hover:bg-secondary/50 select-none"
                    >
                      {tag.trim()}
                    </Badge>
                  ))
                  .slice(0, 5)}
              </div>
              {similarPosts.length > 1 && <Separator />}
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
          <SearchX className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">No similar posts found.</p>
        </div>
      )}
    </div>
  );
};

const DoubleSidebar = ({
  className,
  children,
  selectedPost,
}: DoubleSidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const SCROLL_OFFSET = 85;

  const { data } = useGetAllPosts();

  const blogPosts: Post[] = useMemo(() => data || [], [data]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Capture section references once content is available
  useEffect(() => {
    const sections = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    sectionRefs.current.clear();
    sections.forEach((section) => {
      if (section.id) {
        sectionRefs.current.set(section.id, section as HTMLElement);
      }
    });
  }, [blogPosts]);

  // Set up IntersectionObserver to detect section visibility
  useEffect(() => {
    if (typeof window === "undefined" || sectionRefs.current.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            // Update URL hash without scrolling
            window.history.replaceState(null, "", `#${id}`);
          }
        });
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -50% 0px`, threshold: 0.1 }
    );

    const currentSectionRefs = sectionRefs.current;
    currentSectionRefs.forEach((section) => observer.observe(section));

    return () => {
      currentSectionRefs.forEach((section) => observer.unobserve(section));
    };
  }, [blogPosts]);

  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -SCROLL_OFFSET;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
      // Update URL hash
      window.history.pushState(null, "", `#${id}`);
    }
  };

  // Find similar posts based on category and tags
  const similarPosts = useMemo(() => {
    if (
      !selectedPost?.category &&
      selectedPost?.tags?.split(",").map((tag) => tag.trim()).length === 0
    ) {
      return [];
    }
    return blogPosts.filter((post) => {
      if (post.slug === selectedPost.slug) {
        return false;
      }
      if (selectedPost?.category && post.category === selectedPost?.category) {
        return true;
      }
      const selectedPostTags = selectedPost?.tags
        ?.split(",")
        .map((tag) => tag.trim());
      if (
        selectedPost?.tags?.split(",").map((tag) => tag.trim()).length > 0 &&
        selectedPostTags.every((tag) => post.tags.includes(tag))
      ) {
        return true;
      }
      return false;
    });
  }, [
    blogPosts,
    selectedPost?.category,
    selectedPost?.tags,
    selectedPost?.slug,
  ]);

  if (!mounted) return;

  return (
    <>
      <Header />
      <Container
        className={`grid lg:grid-cols-[240px_1fr_240px] md:grid-cols-[240px_1fr] grid-cols-1 gap-8 p-4 md:p-8 ${className}`}
      >
        {/* Left Sidebar */}
        <div>
          <MenuOptions className="p-2 pl-4" defaultOpen={true}>
            <SimilarBlogs similarPosts={similarPosts as Post[]} />
          </MenuOptions>
          <MenuOptions>
            <SimilarBlogs similarPosts={similarPosts as Post[]} />
          </MenuOptions>
        </div>

        {/* Blog Content */}
        <article className="mb-8">
          {/* Category */}
          <div className="flex gap-2 items-center justify-center mb-4">
            Category: <Tag label={selectedPost.category} className="w-fit" />
          </div>
          <Typography variant="h2" className="mb-2">
            {selectedPost.title}
          </Typography>
          <Tag label={`${selectedPost.timeToRead} min read`} className="mb-4" />
          <div className="dark:bg-slate-800 mb-16">{children}</div>
          {/* Tags */}
          <Typography variant="subtitle" className="font-semibold">
            Tags:
          </Typography>
          <div className="flex gap-2 items-center justify-center mb-4 mt-2 flex-wrap">
            {selectedPost.tags
              .split(",")
              .map((tag) => tag.trim())
              .map((tag, index) => (
                <Tag key={index} label={tag} className="w-fit" />
              ))}
          </div>
        </article>

        {/* Topics (Right Sidebar) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Topics</h3>
            <Separator />
            <nav className="space-y-2">
              {selectedPost?.topics ? (
                selectedPost.topics
                  .split(",")
                  .map((topic) => topic.trim())
                  .map((topic) => {
                    const topicId = topic.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <button
                        key={topicId}
                        onClick={() => handleScrollTo(topicId)}
                        className={`block text-left w-full ${
                          activeSection === topicId
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground"
                        } hover:text-foreground transition-colors`}
                      >
                        {topic}
                      </button>
                    );
                  })
              ) : (
                <div className="h-[60vh] flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <NotebookPen className="h-12 w-12" />
                  <span>No Topics Added</span>
                </div>
              )}
            </nav>
          </div>
        </div>

        {process.env.NODE_ENV === "development" && (
          <Dialog>
            <DialogTrigger
              className={`${buttonVariants({
                size: "lg",
              })} fixed bottom-4 right-4`}
            >
              <Edit />
              &nbsp; Edit Post
            </DialogTrigger>
            <DialogContent className="">
              <DialogTitle></DialogTitle>
              <BlogEditor post={selectedPost} type="edit" />
            </DialogContent>
          </Dialog>
        )}
      </Container>
    </>
  );
};

export default DoubleSidebar;
