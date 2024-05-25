"use server";

import { FileInput } from "@/types/formsInterfaces/fileInput";
import { saveFile } from "./saveFIle";
import { backendClient } from "@/libs/edgestore-server";
import { revalidatePath, unstable_noStore } from "next/cache";

export const onUpload = async (formData: FormData) => {
  try {
    unstable_noStore();
    const file = formData.get("file") as File;
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
      filename: file.name,
      type: file.type,
      url: res.url,
    } as FileInput;

    await saveFile(inputFile);

    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  } 
};
