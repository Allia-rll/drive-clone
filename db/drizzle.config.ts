import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema/*.ts",
  out: "./migrations",
  dbCredentials: {
    user: "scloud",
    password: "scloud",
    host: "localhost",
    port: 1521,
    database: "xe",
  },
  verbose: true,
  strict: true,
});
