"use client";

import ContentSection from "@/components/blog/content";
import DoubleSidebar from "@/components/doublesidebar";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useGetPostDetails } from "@/hooks/useSelector";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BlogDetailsPage = () => {
  const { slug }: { slug: string } = useParams();
  const [mounted, setMounted] = useState<boolean>(false);
  const { error, data: post, loading } = useGetPostDetails(slug);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-background">
        <Container className="text-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin" />
        </Container>
      </div>
    );

  if (!mounted) return;

  return (
    <DoubleSidebar selectedPost={post!}>
      <ContentSection content={post?.content} />
    </DoubleSidebar>
  );
};

export default BlogDetailsPage;
