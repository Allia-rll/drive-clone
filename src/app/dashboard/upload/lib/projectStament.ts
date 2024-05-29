"use server";
import qb from "@/libs/db/queryGenerator";
import db from "@/libs/db/dbOracle";
import { files } from "@/types/models/files";
import { eq, sql } from "drizzle-orm";
import { string } from "zod";
import { Project } from "../components/DropdownOptions";

export const getProjectByOwner = async (idOwner: number) => {
  const sq = qb
    .selectDistinct({ id_project: sql`id_project` })
    .from(files)
    .where(eq(files.owner, idOwner))
    .toSQL();

  const res = await db.execute(sq);
  let projects: Project[] = [];
  res.map((r: any) => {
    projects.push({
      project_id: r.id_project,
    });
  });

  return Promise.resolve(projects as Project[]);
};
