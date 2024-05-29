import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import * as userSchema from "../../../db/schema/userSch";
import * as filesSchema from "../../../db/schema/filesSch";

const drizzleClientSingleton = () => {
  const sqlite = new Database("");
  const db = drizzle(sqlite, {
    schema: { ...userSchema, ...filesSchema },
  });
  return db;
};

declare global {
  var drizzle: ReturnType<typeof drizzleClientSingleton> | undefined;
}

const queryGenerator = global.drizzle ?? drizzleClientSingleton();

export default queryGenerator;

if (process.env.NODE_ENV === "development") {
  global.drizzle = queryGenerator;
}
