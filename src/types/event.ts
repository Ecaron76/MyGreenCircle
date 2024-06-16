import { Event, User } from '@prisma/client';

export type EventWithCreator = {
  eventId: number;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  createdBy: {
    username: string;
  };
  participants: {
    userId: string;
  }[];
};
