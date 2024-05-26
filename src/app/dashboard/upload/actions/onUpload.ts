"use server";

import { FileInput } from "@/types/formsInterfaces/fileInput";
import { saveFile } from "./saveFIle";
import { backendClient } from "@/libs/edgestore-server";
import { revalidatePath, unstable_noStore } from "next/cache";

export const onUpload = async (formData: FormData) => {
  try {
    unstable_noStore();
    const file = formData.get("file") as File;
    const filename = formData.get("filename") as string;
    const id_project = formData.get("id_project") as string;
    const description = formData.get("description") as string;

    if (!file) throw new Error("No file selected");

    const extension = file.name.split(".").pop();
    if (!extension) throw new Error("No extension found");

    let uploader: typeof backendClient.myImages | typeof backendClient.myFiles;
    if (file.type.includes("image")) {
      uploader = backendClient.myImages;
    } else {
      uploader = backendClient.myFiles;
    }

    const res = await uploader.upload({
      content: {
        blob: new Blob([file], { type: file.type }),
        extension: extension,
      },
    });
    
    const inputFile = {
      filename,
      type: file.type,
      url: res.url,
      id_project,
      description,
    } as FileInput;

    await saveFile(inputFile);

    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  } 
};
