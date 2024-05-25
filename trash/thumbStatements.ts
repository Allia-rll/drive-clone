/* import db from "@/libs/db/db";
import { thumbnails, Thumbnail, NewThumbnail } from "@/types/models/thumbnails";

export const createThumb = async (thumbail: NewThumbnail) => {
  const newThumbnail = await db
    .insert(thumbnails)
    .values(thumbail)
    .onConflictDoNothing()
    .returning();
  return newThumbnail as Thumbnail[];
};
 */