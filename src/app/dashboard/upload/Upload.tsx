"use client";

import { useState } from "react";
import { onUpload } from "./actions/onUpload";
import UploadZone from "./components/UploadZone";
import UploadButton from "./components/UploadButton";
import { FileInput } from "@/types/formsInterfaces/fileInput";
import UploadForm from "./components/UploadForm";

export default function Upload() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onFileUploaded = async (data : FileInput) => {
    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("filename", data.filename);
    formData.append("id_project", data.id_project);
    formData.append("description", data.description || "");
    await onUpload(formData);
    setOpen(false);
    setFile(null);
  };

  const onFileAdded = (file: File) => {
    setFile(file);
  };

  return (
    <div className="flex flex-col flex-shrink-0 items-end">
      <UploadButton
        open={open}
        onClick={() => {
          setOpen(!open);
          setFile(null);
        }}
      />
      {open && (
        <div className="relative z-50 w-96 h-max mt-3">
          {file === null ? (
            <UploadZone onFileAdded={onFileAdded} />
          ) : (
            <UploadForm onFileUploaded={onFileUploaded} file={file} />
          )}
        </div>
      )}
    </div>
  );
}
