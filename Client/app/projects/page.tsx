"use client";
import React, { useEffect, useState } from "react";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Marker } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LayoutGrid, Rows3, Target } from "lucide-react";
// import ProjectGrid from "@/components/grids/projectGrid";
import ProjectGridTwo from "@/components/grids/projectGridTwo";
import ProjectSearchCard from "@/components/common/projectSearchCard";
import { useTranslation } from "react-i18next";
import ProjectGrids from "@/components/grids/projGridScr";
import ProjectGridTwoS from "@/components/grids/projGridtwoS";
const Projects = () => {
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { t } = useTranslation();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [view, setView] = useState("grid");
  const router = useRouter();
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 11.2403547,
    lng: -74.2110227,
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="pt-16">
      {/* {isLoaded && !loading ? (
        <div className="mt-1 md:mt-2 relative">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "500px",
            }}
            mapTypeId="hybrid"
            center={center}
            zoom={14}
            onLoad={(map) => {
              setMap(map);
            }}
          >
            {projects.map((project) => (
              <Marker
                onClick={() => router.push(`/projects/${project.id}`)}
                key={project.id}
                position={{
                  lat: Number(project.latitude) || 0,
                  lng: Number(project.longitude) || 0,
                }}
              />
            ))}
          </GoogleMap>
          <button
            onClick={() => {
              map?.panTo(center);
            }}
            className="group font-medium absolute top-14 right-[0.6rem] border shadow bg-white text-black rounded-none p-2"
          >
            <Target
              className="text-gray-500 group-hover:text-black"
              size={22}
            />
          </button>
        </div>
      ) : (
        <Skeleton className="mt-1 md:mt-2 w-full h-[500px]" />
      )} */}

      <div className="container flex justify-center mb-4">
        <ProjectSearchCard />
      </div>
      <h1 className="py-1 mb-0 font-hel text-2xl sm:text-3xl md:text-4xl text-primary text-center">
        {t("newDevelopments")}
      </h1>

      <div className="container">
        <div className="hidden md:block w-full relative h-1">
          <div className="flex gap-3 absolute right-0">
            <button onClick={() => setView("grid")}>
              <LayoutGrid size={30} className="text-primary" />
            </button>
            <button onClick={() => setView("list")}>
              <Rows3 size={30} className="text-primary" />
            </button>
          </div>
        </div>
        {view === "grid" ? (
          <ProjectGrids projects={projects} loading={loading} />
        ) : (
          <ProjectGridTwoS projects={projects} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Projects;
