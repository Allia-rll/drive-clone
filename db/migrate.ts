import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import db from "../src/libs/db/db";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};
main();
