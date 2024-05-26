import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as userSchema from "../../../db/schema/userSch";
import * as filesSchema from "../../../db/schema/filesSch";

const drizzleClientSingleton = async () => {
  const client = new Client({
    user: "scloud",
    password: "scloud",
    host: "localhost",
    port: 1521,
    database: "scloud",
  });
  await client.connect();
  const db = drizzle(client)
  return db;
};

declare global {
  var drizzle: ReturnType<typeof drizzleClientSingleton> | undefined;
}

const db = global.drizzle ?? drizzleClientSingleton();

export default db;

if (process.env.NODE_ENV === "development") {
  global.drizzle = db;
}
