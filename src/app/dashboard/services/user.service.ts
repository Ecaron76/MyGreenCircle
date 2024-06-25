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
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export async function deleteUser(userId: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      console.log("User deleted successfully");
    } else {
      const errorData = await response.json();
      console.error("Failed to delete user:", errorData.message);
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export const getOneUser = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
