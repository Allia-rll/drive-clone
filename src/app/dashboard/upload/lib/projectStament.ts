"use server";
import db from "@/libs/db/db";
import { files } from "@/types/models/files";
import { eq } from "drizzle-orm";

export const getProjectByOwner = async (idOwner: number) => {
  const projects = await db
    .selectDistinct({
      project_id: files.id_project,
    })
    .from(files)
    .where(eq(files.owner, idOwner));
  return Promise.resolve(projects);
};
