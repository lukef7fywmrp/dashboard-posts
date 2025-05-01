"use client";

import { getPosts } from "@/lib/api/posts";
import { Post } from "@/types/posts";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./post-card";

export default function Posts() {
  const { data } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
