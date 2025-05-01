"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Post, CreatePostData } from "@/types/posts";
import PostForm from "./post-form";
import { createPost, updatePost, deletePost, getPosts } from "@/lib/api/posts";
import { toast } from "sonner";
import PostCard from "@/components/post-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  const { data: posts = initialPosts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialData: initialPosts,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(["posts"], (oldPosts) =>
        oldPosts ? [...oldPosts, newPost] : [newPost]
      );
      setIsCreating(false);
      toast.success("Post created successfully");
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<Post[]>(
        ["posts"],
        (oldPosts) =>
          oldPosts?.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          ) ?? []
      );
      setEditingPost(null);
      toast.success("Post updated successfully");
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
      queryClient.setQueryData<Post[]>(
        ["posts"],
        (oldPosts) => oldPosts?.filter((post) => post.id !== id) ?? []
      );
      return { previousPosts, deletingId: id };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData<Post[]>(["posts"], context.previousPosts);
      }
      if (context?.deletingId === deletingPostId) {
        setDeletingPostId(null);
      }
      toast.error("Failed to delete post");
    },
    onSuccess: (_, id) => {
      if (postToDelete?.id === id) {
        setPostToDelete(null);
        setDeletingPostId(null);
      }
      toast.success("Post deleted successfully");
    },
  });

  const handleDelete = (post: Post) => {
    setPostToDelete(post);
  };

  const handleConfirmDelete = () => {
    if (postToDelete) {
      setDeletingPostId(postToDelete.id);
      deleteMutation.mutate(postToDelete.id);
    }
  };

  const handleSubmit = async (data: CreatePostData) => {
    if (editingPost) {
      updateMutation.mutate({ ...data, id: editingPost.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setIsCreating(false);
      setEditingPost(null);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Posts</h1>
        <Button onClick={() => setIsCreating(true)}>Create New Post</Button>
      </div>

      <Dialog
        open={isCreating || !!editingPost}
        onOpenChange={handleDialogOpenChange}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Edit Post" : "Create New Post"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            {editingPost ? "Edit an existing post" : "Create a new blog post"}
          </DialogDescription>
          <PostForm
            post={editingPost}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsCreating(false);
              setEditingPost(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!postToDelete}
        onOpenChange={(open) => !open && setPostToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              post "{postToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            variant="admin"
            onEdit={setEditingPost}
            onDelete={() => handleDelete(post)}
            isDeleting={deletingPostId === post.id}
          />
        ))}
      </div>
    </div>
  );
}
