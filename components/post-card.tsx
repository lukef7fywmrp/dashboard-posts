import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/types/posts";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import TiptapEditor from "./tiptap-editor";

interface PostCardProps {
  post: Post;
  variant?: "default" | "admin";
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

function PostCard({
  post,
  variant = "default",
  onEdit,
  onDelete,
  isDeleting,
}: PostCardProps) {
  return (
    <Card key={post.id}>
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <TiptapEditor content={post.body} editable={false} />
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <Button asChild>
          <Link href={`/posts/${post.id}`}>Read More</Link>
        </Button>
        {variant === "admin" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(post)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(post.id)}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default PostCard;
