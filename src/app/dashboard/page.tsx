"use server";
import React from "react";
import Upload from "./upload/Upload";
import FilesSections from "./filesSection/FilesSections";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import LogOut from "./components/LogOut";
import { notFound } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) {
    return notFound();
  }

  return (
    <>
      <div className="w-screen h-16 flex items-center text-white">
        <div className="w-1/4 h-max text-lg pl-6">
          <h3 className="font-bold">{user?.username}</h3>
        </div>

        <div className="flex-grow flex justify-center ">
          <h2 className="bg-gray-800 h-max py-2 px-6 rounded-lg font-bold text-xl">My Files</h2>
        </div>
        <div className="flex w-1/4 right-24 justify-end">
          <Upload />
          <LogOut />
        </div>
      </div>

      <FilesSections />
    </>
  );
}
