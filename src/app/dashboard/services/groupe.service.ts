import { Group } from "../types/types";

const BASE_URL = "/api";

export const getAllGroups = async (): Promise<Group[]> => {
  try {
    const response = await fetch(`${BASE_URL}/groupe`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Group[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch group data:", error);
    throw error;
  }
};

export async function deleteGroup(groupId: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/groupe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupId }),
    });

    if (response.ok) {
      console.log("Group deleted successfully");
    } else {
      const errorData = await response.json();
      console.error("Failed to delete group:", errorData.message);
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
}
