"use client";
import dynamic from "next/dynamic";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Load components dynamically (to avoid SSR hydration mismatch)
const Slider = dynamic(() => import("@/components/projectDetails/slider"), { ssr: false });
const Main = dynamic(() => import("@/components/projectDetails/main"), { ssr: false });
const GridFour = dynamic(() => import("@/components/grids/gridFour"), { ssr: false });

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchProject = async () => {
    if (!id) return; // Avoid fetching before params are available
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`
      );


      const project = response.data.project ?? response.data;


      setProject(project);
      setProperties(response.data.properties || []);
    } catch (error) {
      console.error("Failed to fetch project:", error);
      setProject(null);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 container text-center">
        <p className="text-lg text-gray-500">{t("loading") || "Loading..."}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-16 container text-center">
        <p className="text-lg text-red-500">{t("projectNotFound") || "Project not found"}</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {project.images?.length > 0 && <Slider images={project.images} property={project} />}
      <div className="container">
        <Main project={project} />
        {properties.length > 0 && (
          <>
            <h1 className="text-4xl font-hel mb-5 mt-10">
              {t("propertiesInProject")}
            </h1>
            <GridFour products={properties} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
