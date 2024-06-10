import { User } from "../types/types";

const BASE_URL = "/api";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${BASE_URL}/user`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch group data:", error);
    throw error;
  }
};
