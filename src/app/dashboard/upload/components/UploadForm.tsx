"use client";

import { FileInput } from "@/types/formsInterfaces/fileInput";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { type Project } from "./DropdownOptions";
import DropdownOptions from "./DropdownOptions";
import onDisplayProjects from "../actions/onDisplayProjects";
import { set } from "zod";

interface UploadFormProps {
  onFileUploaded: SubmitHandler<FileInput>;
  file: File | null;
}

export default function UploadForm({ onFileUploaded, file }: UploadFormProps) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FileInput>();

  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<string>("");

  const onSubmit = async (data: FileInput) => {
    try {
      await onFileUploaded(data);
    } catch (error) {
      if (error instanceof Error) {
        setError("filename", { type: "manual", message: error.message });
      }
    }
  };

  const onOptionSelected = (value: string) => {
    setValue("id_project", value);
    setOpen(false);
  };

  const openDropdown = async () => {
    const projects = await onDisplayProjects();
    setProjects(projects);
    setOpen(true);
  };

  return (
    <div className="relative w-full max-w-md max-h-full">
      <div className="relative bg-slate-700 rounded-lg shadow">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Upload New File
          </h3>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                File Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Madrid-Fondo-de-pantalla.jpg"
                {...(file && { defaultValue: file.name })}
                {...register("filename", {
                  required: {
                    value: true,
                    message: "File name is required",
                  },
                })}
              />
              {errors.filename && (
                <span className="text-red-600 py-8">
                  {errors.filename.message}
                </span>
              )}
            </div>
            <button
              id="dropdownProject"
              className="col-span-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              onClick={openDropdown}
              {...register("id_project", {
                required: {
                  value: true,
                  message: "ID Project is required",
                },
                validate: (value) => {
                  if (value === "ID Project" || value === "") {
                    return "ID Project is required";
                  }
                  return true;
                },
              })}
            >
              {watch("id_project") || "ID Project"}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </button>
            {open && (
              <div
                id="dropdownDivider"
                className="z-10 bg-gray-700 divide-y divide-gray-600 rounded-lg shadow w-max"
              >
                <DropdownOptions
                  projects={projects}
                  onClick={onOptionSelected}
                />
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    <input
                      id="id-project"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="New Project ID"
                      value={newProject}
                      onChange={(e) => setNewProject(e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-blue-600"
                      onClick={() => onOptionSelected(newProject)}
                    >
                      Add
                    </button>
                  </a>
                </div>
              </div>
            )}
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write product description here"
                {...register("description")}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add new File
          </button>
        </form>
      </div>
    </div>
  );
}
