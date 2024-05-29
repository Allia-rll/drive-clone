"use server";

import { notFound } from "next/navigation";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { getProjectByOwner } from "../lib/projectStament";

export default async function onDisplayProjects() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) {
    return notFound();
  }

  const projects = await getProjectByOwner(user?.id);
  console.log(projects);
  return projects;
}
