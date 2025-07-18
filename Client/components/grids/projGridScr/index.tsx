
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/cards/projectCard";
import { useTranslation } from "react-i18next";
import MapBox from "@/components/common/mapbox"; // Reuse your MapBox component

interface Props {
    projects: Partial<Project>[];
    loading: boolean;
}

const ProjectGrids = ({ projects, loading }: Props) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
                {[...Array(9)].map((_, index) => (
                    <Skeleton key={index} className="rounded-xl h-[60vh]" />
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

    const firstTwo = projects.slice(0, 2);
    const remaining = projects.slice(2);

    return (
        <div className="my-10 space-y-6">
            {/* First Row: Two Project Cards + Map */}
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {firstTwo.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                <div className="w-full lg:w-[49%]">
                    <MapBox />
                </div>
            </div>

            {/* Remaining Project Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {remaining.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectGrids;
