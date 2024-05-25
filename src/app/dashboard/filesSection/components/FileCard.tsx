import { type File } from "@/types/models/files";
import DropDownCard from "./DropDownCard";

interface FileCardProps {
  file: File;
}

export default function FileCard({ file }: FileCardProps) {
  return (
    <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow ">
      <div className="rounded-t-lg my-2 h-6 flex items-center">
        <h5 className="flex-grow mx-4 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold tracking-tight text-white">
          {file.filename}
        </h5>
        <DropDownCard key={file.id} id={file.id} />
      </div>
      <div className="max-w-sm h-24 mx-4">
        <img
          className="rounded-lg object-cover w-full h-full"
          src={file.type.includes("image") ? file.url : "/icons/default-file-icon.png"}
          alt={file.filename}
        />
      </div>
      <div className="py-2 px-4">
        <p className="mb-3 font-normal text-sm text-gray-400">
          Created at: {file.created_at}
        </p>
      </div>
    </div>
  );
}
