import NextAuth from "next-auth";

interface UserRole {
  groupId: number;
  role: string;
}

declare module "next-auth" {
  interface User {
    username: string;
    roles: UserRole[];
    admin: boolean
    roles: UserRole[];
  }

  interface Session {
    user: User & {
      username: string;
      roles: UserRole[];
    }

    token: {
      user: User;
      username: string;
    }
  }
}
