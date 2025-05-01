import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPost } from "@/lib/api/posts";
import PostContent from "@/components/post-content";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const post = await getPost(parseInt(id));
      if (!post) throw new Error("Post not found");
      return post;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostContent id={id} />
    </HydrationBoundary>
  );
}
