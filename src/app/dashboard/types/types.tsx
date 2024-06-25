export interface ColorConfig {
  background: string;
  text: string;
}

export interface DataCardProps {
  type: "user" | "group" | "event" | "post";
  title: string;
  value: string;
}

export interface AddButtonProps {
  disabled?: boolean;
  title?: string;
  onClick: any;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  address: string;
  CP: string;
  ville: string;
  latitude: string;
  longitude: string;
  password: string;
  image: Blob;
  admin: Boolean;
}

export interface Comment {
  commentId: number;
  content: string;
  createdAt: Date;
  userId: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  userId: number;
  comments: Comment[];
}

export interface Group {
  groupId: number;
  groupName: string;
  groupDescription: string;
  groupLocation: string;
  users: User[];
  posts: Post[];
  events: Event[];
}

export interface Participate {
  userId: string;
  eventId: number;
  user: User;
  event: Event;
}

export interface Event {
  id: number;
  title: string;
  location: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  limitSubscriptionDate: Date | null;
  address: string;
  ville: string;
  CP: string;
  latitude: number;
  longitude: number;
  groupId: number;
  group: Group;
  participants: Participate[];
}
