"use client";

interface DropdownOptionsProps {
  onClick: (value: string) => void;
  projects: Project[];
}

export type Project = {
  project_id: string;
};

export default function DropdownOptions({
  onClick,
  projects,
}: DropdownOptionsProps) {
  return (
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
      {projects.map((project) => (
        <li
          key={project.project_id}
          onClick={() => onClick(project.project_id)}
        >
          <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            {project.project_id}
          </p>
        </li>
      ))}
    </ul>
  );
}
