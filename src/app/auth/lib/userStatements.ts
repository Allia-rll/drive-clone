import db from "@/libs/db/db";
import { users, NewUser, User } from "@/types/models/user";
import { eq } from "drizzle-orm";

export const createUser = async (user: NewUser) => {
  const newUser = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return newUser as User[];
};

export const getUserByUsername = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  return Promise.resolve(user);
};
