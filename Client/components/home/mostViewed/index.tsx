"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import GridFour from "@/components/grids/gridFour";
import ProjectGrid from "@/components/grids/projectGrid";

const MostViewed = () => {
  const [selected, setSelected] = useState<
    "New-Developments" | "Used-Properties" | "Rentals"
  >("Used-Properties");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [newDevelopments, setNewDevelopments] = useState<Partial<Project>[]>(
    []
  );
  const [usedProperties, setUsedProperties] = useState<Partial<Property>[]>([]);
  const [Rentals, setRentals] = useState<Partial<Property>[]>([]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/most-viewed/properties`
      );
      console.log(response.data);
      setNewDevelopments(response.data.newDevelopments || []);
      setUsedProperties(response.data.saleProperties || []);
      setRentals(response.data.rent || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const properties =
    selected === "New-Developments"
      ? newDevelopments
      : selected === "Used-Properties"
        ? usedProperties
        : Rentals;

  return (
    <div className="container py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-hel mb-4">
        {t("mostViewed")}
      </h1>
      <p className="text-center mb-8">{t("mostViewedSubtitle")}</p>
      {/* Mobile Button Group (Improved) */}
      <div className="flex justify-between flex-wrap items-center gap-2 bg-white shadow-md p-3 rounded-lg">
        <Button
          className={`flex-1 text-center text-sm sm:text-base h-14 rounded-lg px-4 whitespace-nowrap transition duration-200 ${selected === "Used-Properties"
              ? "bg-primary text-white shadow-lg"
              : "bg-gray-200 text-black hover:bg-primary hover:text-white"
            }`}
          onClick={() => setSelected("Used-Properties")}
        >
          {t("usedProperties")}
        </Button>
        <Button
          className={`flex-1 text-center text-sm sm:text-base h-14 rounded-lg px-4 whitespace-nowrap transition duration-200 ${selected === "New-Developments"
              ? "bg-primary text-white shadow-lg"
              : "bg-gray-200 text-black hover:bg-primary hover:text-white"
            }`}
          onClick={() => setSelected("New-Developments")}
        >
          {t("newDevelopments")}
        </Button>
        <Button
          className={`flex-1 text-center text-sm sm:text-base h-14 rounded-lg px-4 whitespace-nowrap transition duration-200 ${selected === "Rentals"
              ? "bg-primary text-white shadow-lg"
              : "bg-gray-200 text-black hover:bg-primary hover:text-white"
            }`}
          onClick={() => setSelected("Rentals")}
        >
          {t("rentals")}
        </Button>
      </div>
      {selected === "New-Developments" ? (
        <ProjectGrid
          loading={loading}
          projects={properties as Partial<Project>[]}
        />
      ) : (
        <GridFour
          loading={loading}
          products={properties as Partial<Property>[]}
        />
      )}

    </div>
  );
};

export default MostViewed;
