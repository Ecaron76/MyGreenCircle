import { Post } from "../types/types";

const BASE_URL = "/api";

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${BASE_URL}/post`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch post data:", error);
    throw error;
  }
};

export const createPost = async (postData: any): Promise<Post> => {
  try {
    const response = await fetch(`${BASE_URL}/post/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Post = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};
