import { Event, User } from '@prisma/client';

export interface EventWithCreator extends Event {
  createdBy: User;
}
