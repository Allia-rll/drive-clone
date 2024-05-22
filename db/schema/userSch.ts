import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { files } from "./filesSch";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").unique().notNull(),
    password: text("password").notNull(),
    email: text("email").unique().notNull(),
    created_at: text("created_at").default(sql`current_timestamp`),
  },
  (table) => ({
    id_Users_index: index("id_Users_index").on(table.id),
  })
);

export const userRelations = relations(users, ({ many }) => ({
  files: many(files),
}));
