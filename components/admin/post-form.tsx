"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Post, CreatePostData } from "@/types/posts";
import TiptapEditor from "@/components/tiptap-editor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  userId: z.number().min(1, "User ID is required"),
  body: z.string().min(1, "Content is required"),
});

interface PostFormProps {
  post?: Post | null;
  onSubmit: (data: CreatePostData) => Promise<void>;
  onCancel: () => void;
}

export default function PostForm({ post, onSubmit, onCancel }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreatePostData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      userId: post?.userId || 1,
      body: post?.body || "",
    },
  });

  const handleSubmit = async (values: CreatePostData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TiptapEditor
                  content={field.value}
                  onChange={(content) => {
                    field.onChange(content);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
