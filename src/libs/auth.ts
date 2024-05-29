import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByUsername } from "../app/auth/lib/userStatements";
import { comparePass } from "../app/auth/utils/encryptPass";
import { User } from "@/types/models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      // @ts-ignore
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const [user] = (await getUserByUsername(username)) as User[];
        console.log(user);
        if (!user) {
          throw new Error("No user found");
        }

        const matchPassword = await comparePass(password, user.password);

        if (!matchPassword) {
          throw new Error("Password does not match");
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as {
          id: number;
          username: string;
          email: string;
          created_at: string | null;
        };
      }
      return Promise.resolve(token); // JWT interface we declared in next-auth.d.ts
    },
    async session({ session, token }) {
      session.user = token.user;
      return session; // Session interface we declared in next-auth.d.ts
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthOptions;
