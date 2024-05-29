"use server";
import qb from "@/libs/db/queryGenerator";
import db from "@/libs/db/dbOracle";
import { files, File, NewFile } from "@/types/models/files";
import { eq } from "drizzle-orm";

export const createFile = async (file: NewFile) => {
  const newFile = qb
    .insert(files)
    .values(file)
    .toSQL();
  return db.execute(newFile);
};

export const getFileByOwner = async (idOwner: number) => {
  const file = qb.query.files
    .findMany({
      where: eq(files.owner, idOwner),
    })
    .toSQL();
  const res = await db.execute(file);
  return Promise.resolve(res);
};
