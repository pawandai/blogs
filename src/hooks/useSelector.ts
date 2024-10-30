"use client";

import { getBlogs } from "@/actions/getBlogs";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { useAction } from "./useAction";
import { getBlogDetails } from "@/actions/getBlogDetails";

export const useGetAllPosts = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getBlogs();
        setData(response.data as Post[]);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong. Please try again later.");
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export const useGetPostDetails = (slug: string) => {
  const { data, execute, error, loading } = useAction(getBlogDetails);

  useEffect(() => {
    const fetchData = async () => {
      await execute({ slug });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
};
