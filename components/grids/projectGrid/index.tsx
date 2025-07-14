import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/cards/projectCard";
import { useTranslation } from "react-i18next";

interface Props {
  projects: Partial<Project>[];
  loading: boolean;
}

const ProjectGrid = ({ projects, loading }: Props) => {
  const { t } = useTranslation();
  return loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} className="rounded-xl h-[60vh]" />
      ))}
    </div>
  ) : projects.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
      <span>{t("noProjects")}</span>
    </div>
  );
};

export default ProjectGrid;


