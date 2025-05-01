/**
 * Posts API Service
 *
 * Note: This service uses JSONPlaceholder (https://jsonplaceholder.typicode.com/) as a mock API.
 * All changes (create, update, delete) are simulated and not actually persisted on the server.
 * The API returns success responses but data will reset on page refresh.
 * This is intentional for development and testing purposes.
 */

import { CreatePostData, Post, UpdatePostData } from "@/types/posts";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const createPost = async (post: CreatePostData): Promise<Post> => {
  console.log("Creating post:", post);
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  return response.json();
};

export const updatePost = async (post: UpdatePostData): Promise<Post> => {
  console.log("Updating post:", post);
  const response = await fetch(`${API_URL}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  return response.json();
};

export const deletePost = async (id: number): Promise<void> => {
  console.log("Deleting post:", id);
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
};

export async function getPost(id: number): Promise<Post | null> {
  console.log("Fetching post:", id);
  try {
    const res = await fetch(`${API_URL}/posts/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
