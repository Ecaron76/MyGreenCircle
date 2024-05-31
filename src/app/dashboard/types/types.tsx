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
