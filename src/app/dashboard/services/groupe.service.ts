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
