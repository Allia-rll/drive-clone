import db from "@/libs/db/dbOracle";
import qb from "@/libs/db/queryGenerator";
import { users, NewUser, User } from "@/types/models/user";
import { eq } from "drizzle-orm";

export const createUser = async (user: NewUser) => {
  const newUser = qb.insert(users).values(user).toSQL();
  const result = await db.execute(newUser);
  return result;
};

export const getUserByUsername = async (username: string) => {
  const user = qb.query.users
    .findFirst({
      where: eq(users.username, username),
    })
    .toSQL();

  const result = await db.execute(user);
  return Promise.resolve(result);
};
