import NextAuth from "next-auth";

interface UserRole {
  groupId: number;
  role: string;
}

declare module "next-auth" {
  interface User {
    username: string;
    roles: UserRole[];
  }

  interface Session {
    user: User & {
      username: string;
      roles: UserRole[];
    }

    token: {
      username: string;
    }
  }
}
