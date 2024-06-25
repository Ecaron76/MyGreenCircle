import { Event } from "../types/types";

const BASE_URL = "/api";

export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${BASE_URL}/event`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Event[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch event data:", error);
    throw error;
  }
};

export const getEventParticipants = async () => {
  try {
    const response = await fetch(`${BASE_URL}/event/userEvents`, {
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
    console.error("Error fetching events:", error);
    throw error;
  }
};
