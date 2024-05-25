import { files } from "../../../db/schema/filesSch";

export { files };
export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;