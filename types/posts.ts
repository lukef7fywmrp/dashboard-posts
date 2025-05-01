// Post Type
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Create Post Form Data
export type CreatePostData = Omit<Post, "id">;

// Update Post Form Data
export type UpdatePostData = Post;
