import { NeonQueryResultHKT } from "drizzle-orm/neon-serverless";
import NextAuth, { User, type DefaultSession } from "next-auth";
import type { User as UserModel } from "@/types/models/user";

type UserSession = Omit<UserModel, "password">;

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User extends UserSession {
    id: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
