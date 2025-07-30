"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Project } from "@/types";
import axios from "axios";
import Loader from "@/components/common/Loader";
import Delete from "@/components/Delete";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`,
      );
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { t } = useTranslation();
  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb pageName={t("projects")} />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-start justify-between px-4 py-6 sm:flex-row sm:items-center md:px-6 xl:px-7.5">
            <h4 className="mb-4 text-xl font-semibold text-black dark:text-white sm:mb-0">
              {t("allProjects")}
            </h4>
            <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder={t("searchProjects")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded border border-stroke bg-gray px-4 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary sm:w-auto"
              />
              <Link
                href="/projects/add"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
              >
                {t("addProject")}
              </Link>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="grid grid-cols-8 gap-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("cover")}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("title")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("projectType")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("location")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("price")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("progress")}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <p className="font-medium text-black dark:text-white">
                  {t("actions")}
                </p>
              </div>
            </div>
            {loading ? (
              <Loader className="h-[60vh]" />
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="grid grid-cols-8 items-center gap-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                >
                  <div className="col-span-1 flex items-center">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-black dark:text-white">
                      {project.title}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      {t(project.projectType)}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      {project.region}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      {project.price} COP
                    </p>
                  </div>
                  <div className="col-span-1">
                    <div className="h-2 w-full rounded-full bg-stroke dark:bg-strokedark">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-black dark:text-white">
                      {project.progress}%
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <Link
                      href={`/projects/edit/${project.id}`}
                      className="dark:text-white"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <Delete
                      api={`/projects/${project.id}`}
                      message="Project deleted successfully"
                      fetch={fetchProjects}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-black dark:text-white">
                {t("noProjectsFound")}
              </div>
            )}
          </div>
          <div className="block px-4 sm:hidden">
            {loading ? (
              <Loader className="h-[60vh]" />
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="mb-4 rounded-lg border border-stroke p-4 shadow-sm dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="mb-4 flex flex-col">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="mt-4">
                      <p className="mb-2 font-semibold text-black dark:text-white">
                        {project.title}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("projectType")}: {t(project.projectType)}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("location")}:{project.region}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("price")}: {project.price} COP
                      </p>
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-stroke dark:bg-strokedark">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <p className="mt-1 text-xs text-black dark:text-white">
                          {t("progress")}: {project.progress}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/projects/edit/${project.id}`}
                        className="dark:text-white"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <Delete
                        api={`/projects/${project.id}`}
                        message="Project deleted successfully"
                        fetch={fetchProjects}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-black dark:text-white">
                {t("noProjectsFound")}
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Projects;
