import { getPosts } from "@/lib/api/posts";
import PostList from "@/components/admin/post-list";

export default async function AdminPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      <PostList initialPosts={posts} />
    </div>
  );
}
