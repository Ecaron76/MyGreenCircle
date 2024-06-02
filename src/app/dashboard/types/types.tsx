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
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Comment {
  commentId: number;
  content: string;
  createdAt: Date;
  userId: number;
}

export interface Post {
  id: number;
  postTitle: string;
  postContent: string;
  createdAt: Date;
  userId: number;
  comments: Comment[];
}
