import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCardTwo from "@/components/cards/projectCardTwo";
import { useTranslation } from "react-i18next";

interface Props {
  projects: Partial<Project>[];
  loading: boolean;
}

const ProjectGridTwo = ({ projects, loading }: Props) => {
  const { t } = useTranslation();
  return loading ? (
    <div className="flex flex-col gap-10 my-10">
      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} className="w-full h-60 rounded-none" />
      ))}
    </div>
  ) : projects.length > 0 ? (
    <div className="flex flex-col gap-10 my-10">
      {projects.map((project) => (
        <ProjectCardTwo key={project.id} project={project} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
      <span>{t("noProjects")}</span>
    </div>
  );
};

export default ProjectGridTwo;
