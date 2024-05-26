"use client";

import { useState } from "react";
import { onUpload } from "./actions/onUpload";
import UploadZone from "./components/UploadZone";
import UploadButton from "./components/UploadButton";

export default function Upload() {
  const [open, setOpen] = useState(false);

  const handlerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handlerChange");
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await onUpload(formData);
  };

  return (
    <div className="flex flex-col flex-shrink-0 items-end">
      <UploadButton onClick={() => setOpen(!open)} />
      {open && (
        <div className="relative z-50 w-96 h-max mt-3">
          <UploadZone />
        </div>
      )}
    </div>
  );
}
