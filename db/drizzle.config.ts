import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./schema/*.ts",
  out: "./migrations",
  dbCredentials: {
    url: "./dev.db",
  },
  verbose: true,
  strict: true,
});
