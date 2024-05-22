import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./userSch";

export const files = sqliteTable(
  "files",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    filename: text("filename").notNull(),
    url: text("path").notNull(),
    created_at: text("created_at").default(sql`current_timestamp`),
    owner: integer("owner")
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    id_Files_index: index("id_Files_index").on(table.id),
  })
);

export const userRelations = relations(files, ({ one }) => ({
  users: one(users, {
    fields: [files.owner],
    references: [users.id],
  }),
}));
