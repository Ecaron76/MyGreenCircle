import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session:{
    strategy: 'jwt'
  },
  pages: {
    signIn: '/authentification'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email}
        })
        if (!existingUser) {
          return null
        }

        const passwordMatch = await compare(credentials.password, existingUser.password)

        if (!passwordMatch) {
          return null;
        }

        return {
          id:  `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
          admin: existingUser.admin
        }
      },
    }),
  ],

  callbacks:{
    async jwt({ token, user }){
      console.log(token, user)
      console.log(token)
      if (user) {
        return {
          ...token,
          username: user.username,
          admin: user.admin,
          id: user.id
        }
      }
      return token
    
    },
    async session({session, token}){
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          admin: token.admin,
          id: token.id
        }
      }
    }
  }
};
export const getAuthSession = () => getServerSession(authOptions)