"use client";

import { onUpload } from "./actions/onUpload";

export default function Upload() {

  const handlerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handlerChange");
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await onUpload(formData);
  };

  return (
    <div>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-20 h-7 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-800/80"
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-white">
            <span className="font-semibold">Upload</span>
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handlerChange}
        />
      </label>
    </div>
  );
}
