"use client";
import Hero from "@/components/common/hero";
import React, { useEffect, useState } from "react";
import img1 from "@/assets/hero.jpg";
import img from "@/assets/product.jpg";
import SearchCard from "@/components/home/hero/search";
import GridTwo from "@/components/grids/gridTwo";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

const AllProperties = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [properties, setProperties] = useState<Partial<Property>[]>([]);
  const searchParams = useSearchParams();
  const fetchProperties = async () => {
    try {
      const propertyType = searchParams.get("propertyType");
      const dealType = searchParams.get("dealType");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const longitude = searchParams.get("longitude");
      const latitude = searchParams.get("latitude");
      const region = searchParams.get("region");
      const radius = searchParams.get("radius");
      const queryParams = new URLSearchParams({
        ...(propertyType && { propertyType }),
        ...(dealType && { dealType }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(longitude && { longitude }),
        ...(latitude && { latitude }),
        ...(region && { region }),
        ...(radius && { radius }),
      }).toString();
      console.log(
        `${process.env.NEXT_PUBLIC_API_URL}/search/properties${
          queryParams ? `?${queryParams}` : ""
        }`
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/search/properties${
          queryParams ? `?${queryParams}` : ""
        }`
      );
      setProperties(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  return (
    <div>
      <Hero title={t("allProperties")} img={img1.src} />
      <div className="container mx-auto flex justify-center py-10">
        <SearchCard />
      </div>
      <div className="container">
        <GridTwo products={properties} loading={loading} />
      </div>
    </div>
  );
};

export default AllProperties;
