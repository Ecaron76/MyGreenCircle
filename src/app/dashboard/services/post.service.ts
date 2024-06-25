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

export const PostVisibility = async (
  postId: number,
  isVisible: boolean
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/post/item/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isVisible }),
    });

    if (!response.ok) {
      throw new Error("Failed to toggle post visibility");
    }
  } catch (error) {
    console.error("Failed to toggle post visibility", error);
    throw error;
  }
};
