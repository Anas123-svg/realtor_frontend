"use client";
import Slider from "@/components/projectDetails/slider";
import Main from "@/components/projectDetails/main";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GridFour from "@/components/grids/gridFour";
import { useTranslation } from "react-i18next";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`
      );
      setProject(response.data.project);
      setProperties(response.data.properties);
      console.log(response.data.properties);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return (
    <div className="pt-16">
      <Slider images={project?.images ?? []} />
      <div className="container">
        <Main project={project} />
        <h1 className="text-4xl font-hel mb-5 mt-10">
          {t("propertiesInProject")}
        </h1>
        <GridFour products={properties} loading={loading} />
      </div>
    </div>
  );
};

export default ProjectDetails;
