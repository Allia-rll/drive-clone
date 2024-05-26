import { index, pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { relations} from "drizzle-orm";
import { files } from "./filesSch";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: text("username").unique().notNull(),
    password: text("password").notNull(),
    email: text("email").unique().notNull(),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    id_Users_index: index("id_Users_index").on(table.id),
  })
);

export const userRelations = relations(users, ({ many }) => ({
  files: many(files),
}));
