import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCardTwo from "@/components/cards/projectCardTwo";
import { useTranslation } from "react-i18next";
import MapBox from "@/components/common/mapbox";

interface Props {
    projects: Partial<Project>[];
    loading: boolean;
}

const ProjectGridTwoS = ({ projects, loading }: Props) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="flex flex-col gap-10 my-10">
                <Skeleton className="w-full h-96 rounded-xl" />
                {[...Array(9)].map((_, index) => (
                    <Skeleton key={index} className="w-full h-60 rounded-none" />
                ))}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
                <span>{t("noProjects")}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10 my-10">
            {/* Map comes first */}
            <div className="w-full h-[400px]">
                <MapBox />
            </div>

            {/* All project cards below */}
            {projects.map((project) => (
                <ProjectCardTwo key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectGridTwoS;
