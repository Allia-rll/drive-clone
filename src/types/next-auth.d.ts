import { NeonQueryResultHKT } from "drizzle-orm/neon-serverless";
import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      username: string;
      id: number;
      created_at: string | null;
    };
  }
  interface User {
    email: string;
    username: string;
    id: number;
    created_at: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      email: string;
      username: string;
      id: number;
      created_at: string | null;
    };
  }
}
