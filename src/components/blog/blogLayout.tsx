"use client";

import { useMemo, useState } from "react";
import MenuOptions from "../doublesidebar/menuoptions";
import { Glasses, Loader2, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./card";
import Container from "../ui/container";
import { useGetAllPosts } from "@/hooks/useSelector";

interface BlogFilterProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  loading?: boolean;
}

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BlogFilter = ({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  tags,
  selectedTags,
  setSelectedTags,
  loading,
}: BlogFilterProps) => {
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const searchTermFromUrl = query.get("searchQuery") || "";
    const categoryFromUrl = query.get("category") || "";
    const tagsFromUrl = query.get("tags")?.split(",") || [];

    setSearchTerm(searchTermFromUrl);
    setSelectedCategory(categoryFromUrl);
    setSelectedTags(tagsFromUrl);
  }, [setSearchTerm, setSelectedCategory, setSelectedTags]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const query = {
        searchTerm,
        category: selectedCategory,
        tags: selectedTags.join(","),
      };
      router.push(
        `?searchQuery=${query.searchTerm}&category=${query.category}&tags=${query.tags}`
      );
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, selectedTags, router]);

  return (
    <div className="bg-background p-2 pt-16 overflow-y-scroll">
      <div>
        <div className="mb-6">
          {/* Search Filter */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              className="pl-10 pr-4 py-2 rounded-lg bg-muted w-full dark:bg-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 dark:text-dark-foreground">
            Filter by categories
          </h3>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-center" />
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? null : category
                    )
                  }
                  className={`px-4 py-2 rounded-lg dark:border dark:border-black ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground dark:bg-black dark:text-white"
                      : "text-muted-foreground hover:bg-muted/50 dark:hover:bg-dark-muted/70"
                  }`}
                >
                  {category}
                </Button>
              ))
            ) : (
              <p className="dark:text-dark-muted-foreground">
                No Categories found...
              </p>
            )}
          </div>
        </div>

        <div className="mb-6"></div>
        <h3 className="text-lg font-semibold mb-2 dark:text-dark-foreground">
          Filter by tags
        </h3>
        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-center dark:text-dark-muted-foreground" />
          ) : tags.length > 0 ? (
            tags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                className={`px-4 py-2 rounded-lg dark:border dark:border-black ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground dark:bg-black dark:text-white"
                    : "text-muted-foreground hover:bg-muted/50 dark:hover:bg-dark-muted/70"
                }`}
              >
                {tag}
              </Button>
            ))
          ) : (
            <p className="dark:text-dark-muted-foreground">No Tags Found...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const BlogLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: blogPosts, loading, error } = useGetAllPosts();

  const filteredPosts = useMemo(
    () =>
      blogPosts?.filter((post) => {
        if (selectedCategory && post.category !== selectedCategory) {
          return false;
        }
        if (
          selectedTags.length > 0 &&
          !selectedTags.every((tag) => post.tags.includes(tag))
        ) {
          return false;
        }
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }),
    [blogPosts, searchTerm, selectedCategory, selectedTags]
  );

  // Most popular categories
  const categories = useMemo(() => {
    const categoryCounts = blogPosts?.reduce<Record<string, number>>(
      (counts, post) => {
        counts[post.category] = (counts[post.category] || 0) + 1;
        return counts;
      },
      {}
    );

    const popularCategories = Object.entries(categoryCounts || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map((entry) => entry[0]);

    return popularCategories;
  }, [blogPosts]);

  // Most popular tags
  const tags = useMemo(() => {
    const allTags = blogPosts
      ?.map((post) => post.tags.split(",").map((tag) => tag.trim()))
      .flat();

    const tagCounts = allTags?.reduce<Record<string, number>>((counts, tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
      return counts;
    }, {});

    const popularTags = Object.entries(tagCounts || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map((entry) => entry[0]);

    return popularTags;
  }, [blogPosts]);

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-background">
        <Container className="text-center gap-4">
          <h2 className="text-2xl font-semibold mb-0">Something went wrong.</h2>
          <p className="text-muted-foreground">Please come back later, OR</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Container>
      </div>
    );

  return (
    <Container className="grid md:grid-cols-[240px_1fr] grid-cols-1 gap-8 p-4 sm:p-8">
      <aside>
        <MenuOptions defaultOpen={true}>
          <BlogFilter
            categories={categories}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            setSearchTerm={setSearchTerm}
            setSelectedCategory={setSelectedCategory}
            setSelectedTags={setSelectedTags}
            tags={tags}
            loading={loading}
          />
        </MenuOptions>
        <MenuOptions>
          <BlogFilter
            categories={categories}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            setSearchTerm={setSearchTerm}
            setSelectedCategory={setSelectedCategory}
            setSelectedTags={setSelectedTags}
            tags={tags}
            loading={loading}
          />
        </MenuOptions>
      </aside>
      {loading ? (
        <div className="h-[75vh] w-full flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <section
          className={`grid grid-cols-1 ${
            filteredPosts.length > 0 && "sm:grid-cols-2"
          } md:grid-cols-1 ${
            filteredPosts.length > 0 ? "lg:grid-cols-2" : ""
          } gap-4 align-middle items-center`}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard
                post={post}
                key={post.slug}
                preview={post.preview}
                slug={post.slug}
                thumbnail={post.image}
                title={post.title}
              />
            ))
          ) : (
            <div className="text-muted-foreground flex flex-col gap-2 items-center justify-center h-[60vh] text-center">
              <Glasses className="h-12 w-12" />
              <span>No blog posts found.</span>
            </div>
          )}
        </section>
      )}
    </Container>
  );
};

export default BlogLayout;
