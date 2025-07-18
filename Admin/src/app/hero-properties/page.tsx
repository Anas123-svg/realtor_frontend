"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "@/components/common/Loader";
import { Property } from "@/types";
import { useTranslation } from "react-i18next";

const HeroProperties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [heroProperties, setHeroProperties] = useState<Property[]>([]);
  const [nonHeroProperties, setNonHeroProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hero");
  const { t } = useTranslation();

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/hero-property/list`,
      );
      const { heroProperties, nonHeroProperties } = res.data;
      setHeroProperties(heroProperties);
      setNonHeroProperties(nonHeroProperties);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (id: number) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/hero-property/add/${id}`,
        {},
      );
      toast.success("Property added to hero section");
      getProperties();
    } catch (error) {
      console.error("Failed to add property:", error);
      toast.error("Failed to add property");
    }
  };

  const handleRemoveProperty = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/hero-property/remove/${id}`,
      );
      toast.success("Property removed from hero section");
      getProperties();
    } catch (error) {
      console.error("Failed to remove property:", error);
      toast.error("Failed to remove property");
    }
  };

  const getFilteredProperties = () => {
    const properties =
      activeTab === "hero" ? heroProperties : nonHeroProperties;
    return properties.filter((property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb pageName={t("heroProperties")} />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex border-b border-stroke dark:border-strokedark">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "hero"
                  ? "border-b-2 border-primary text-primary"
                  : "text-black dark:text-white"
              }`}
              onClick={() => setActiveTab("hero")}
            >
              {t("heroProperties")} ({heroProperties.length})
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "nonHero"
                  ? "border-b-2 border-primary text-primary"
                  : "text-black dark:text-white"
              }`}
              onClick={() => setActiveTab("nonHero")}
            >
              {t("availableProperties")} ({nonHeroProperties.length})
            </button>
          </div>
          <div className="flex flex-col items-start justify-between px-4 py-6 sm:flex-row sm:items-center md:px-6 xl:px-7.5">
            <h4 className="mb-4 text-xl font-semibold text-black dark:text-white sm:mb-0">
              {activeTab === "hero"
                ? t("heroProperties")
                : t("availableProperties")}
            </h4>
            <div>
              <input
                type="text"
                placeholder={t("searchProperties")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          {loading ? (
            <Loader className="h-[60vh]" />
          ) : getFilteredProperties().length > 0 ? (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-6 xl:p-7.5">
              {getFilteredProperties().map((property) => (
                <div
                  key={property.id}
                  className="rounded-md border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark"
                >
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-40 w-full rounded-md object-cover"
                  />
                  <h4 className="mt-4 line-clamp-2 h-14 text-lg font-semibold text-black dark:text-white">
                    {property.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 h-16 text-sm text-black dark:text-white">
                    {property.description}
                  </p>
                  <div className="mt-4 flex items-center justify-end gap-2">
                    {activeTab === "hero" ? (
                      <button
                        onClick={() => handleRemoveProperty(property.id)}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-danger px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
                      >
                        {t("remove")}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddProperty(property.id)}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
                      >
                        {t("add")}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="w-full px-4 py-6 text-center text-black dark:text-white">
              {t("noPropertiesFound")}
            </p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HeroProperties;
