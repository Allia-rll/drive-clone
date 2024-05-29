"use server";
import qb from "@/libs/db/queryGenerator";
import { files } from "@/types/models/files";
import { eq } from "drizzle-orm";

export const getProjectByOwner = async (idOwner: number) => {
  const projects = qb
    .selectDistinct()
    .from(files)
    .where(eq(files.owner, idOwner)).groupBy().toSQL();
  console.log(projects);
};
