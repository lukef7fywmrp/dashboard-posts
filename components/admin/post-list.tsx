"use client";

import PostCard from "@/components/post-card";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createPost, deletePost, getPosts, updatePost } from "@/lib/api/posts";
import { CreatePostData, Post } from "@/types/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import PostForm from "./post-form";

export default function PostList() {
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      // Create a temporary post with a temporary ID
      const tempPost = {
        ...newPost,
        id: Date.now(), // Temporary ID that will be replaced on success
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Post[]>(["posts"], (oldPosts) =>
        oldPosts ? [tempPost, ...oldPosts] : [tempPost]
      );

      setIsCreating(false);
      return { previousPosts };
    },
    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(
        ["posts"],
        (oldPosts) =>
          oldPosts?.map((post) =>
            // Replace the temporary post with the real one
            post.id === newPost.id ? newPost : post
          ) ?? []
      );
      toast.success("Post created successfully");
    },
    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData<Post[]>(["posts"], context.previousPosts);
      }
      toast.error("Failed to create post");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      // Create a complete post object for optimistic update
      const optimisticPost = {
        ...previousPosts?.find((p) => p.id === updatedPost.id), // Get existing post data
        ...updatedPost, // Override with new data
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Post[]>(
        ["posts"],
        (oldPosts) =>
          oldPosts?.map((post) =>
            post.id === updatedPost.id ? optimisticPost : post
          ) ?? []
      );

      setEditingPost(null);
      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData<Post[]>(["posts"], context.previousPosts);
      }
      toast.error("Failed to update post");
    },
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<Post[]>(
        ["posts"],
        (oldPosts) =>
          oldPosts?.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          ) ?? []
      );
      toast.success("Post updated successfully");
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
      setEditingPost(null); // Close dialog immediately
      updateMutation.mutate({ ...data, id: editingPost.id });
    } else {
      setIsCreating(false); // Close dialog immediately
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
    <div className="container mx-auto px-4 py-8">
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
              post &quot;{postToDelete?.title}&quot;.
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
        {data?.map((post) => (
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
