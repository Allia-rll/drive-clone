"use server";
import { notFound } from "next/navigation";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { getFileByOwner } from "../lib/fileStatements";
import FileCard from "./components/FileCard";

export default async function FilesSections() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) {
    return notFound();
  }

  const files = await getFileByOwner(user?.id);

  return (
    <div className="grid items-start gap-4 grid-cols-auto-fill-minmax-200px-1fr p-5">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
