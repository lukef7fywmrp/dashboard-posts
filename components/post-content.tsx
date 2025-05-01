"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getPost } from "@/lib/api/posts";
import { Post } from "@/types/posts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function PostContent({ id }: { id: string }) {
  const { data: post, error } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const post = await getPost(parseInt(id));
      if (!post) throw new Error("Post not found");
      return post;
    },
  });

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              There was an error loading the post. Please try again later.
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Post Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The post you're looking for doesn't exist.</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Link>
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <div className="space-y-4">
              {post.body.split("\n").map((paragraph: string, index: number) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </CardContent>
      </Card>
    </main>
  );
}
