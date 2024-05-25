/* import { index, sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { files } from "./filesSch";

export const thumbnails = sqliteTable(
  "thumbnails",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fileId: integer("fileId")
      .notNull()
      .references(() => files.id),
    urlThumb: text("urlThumb").notNull(),
  },
  (table) => ({
    id_thumbnails_index: index("id_thumbnails_index").on(table.id),
  })
);
 */
