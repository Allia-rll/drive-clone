"use server";

import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { createFile } from "../../lib/fileStatements";
import { FileInput } from "@/types/formsInterfaces/fileInput";

export const saveFile = async (inputFile: FileInput) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = session.user;

    const insertFile = {
      filename: inputFile.filename,
      type: inputFile.type,
      url: inputFile.url,
      owner: user.id,
    };

    const newFile = await createFile(insertFile);
    if (!newFile[0]) {
      throw new Error("Error creating file");
    }

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
