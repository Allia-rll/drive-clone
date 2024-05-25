"use server";
import db from "@/libs/db/db";
import { files, File, NewFile } from "@/types/models/files";
import { eq } from "drizzle-orm";

export const createFile = async (file: NewFile) => {
  const newFile = await db
    .insert(files)
    .values(file)
    .onConflictDoNothing()
    .returning();
  return newFile as File[];
};

export const getFileByOwner = async (idOwner: number) => {
  const file = await db.query.files.findMany({
    where: eq(files.owner, idOwner),
  });
  return Promise.resolve(file);
};
