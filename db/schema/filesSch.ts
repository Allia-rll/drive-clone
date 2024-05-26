import { index, pgTable, integer, text, serial, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./userSch";

export const files = pgTable(
  "files",
  {
    id: serial("id").primaryKey(),
    filename: text("filename").notNull(),
    url: text("url").notNull(),
    type: text("type").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    owner: integer("owner")
      .notNull()
      .references(() => users.id),
    description: text("description"),
    id_project: text("id_project").notNull(),
  },
  (table) => ({
    id_Files_index: index("id_Files_index").on(table.id),
    id_project_index: index("id_project_index").on(table.id_project),
  })
);

export const filesRelations = relations(files, ({ one }) => ({
  user: one(users, {
    fields: [files.owner],
    references: [users.id],
  }),
}));
