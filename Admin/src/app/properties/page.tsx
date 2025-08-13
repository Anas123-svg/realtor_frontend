"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Property } from "@/types";
import axios from "axios";
import Loader from "@/components/common/Loader";
import Delete from "@/components/Delete";
import { FaEdit } from "react-icons/fa";
import SearchCard from "@/components/PropertySearch/search";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { AMENITIE, BATHROOMS, NEARBY_INFRASTRUCTURE, PROPERTY_STATUS, PROPERTY_STYLES, PROPERTY_TYPES, } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

import { Check } from "lucide-react";
//@ts-ignore
import "react-range-slider-input/dist/style.css";
import { locations } from "@/constants";
import { useTranslation } from "react-i18next";


interface Filters {
  propertyType: string[];
  bathrooms: string[];
  propertyStatus: string[];
  nearbyInfrastructure: string[];
  location: string[]; // change to string[] instead of array of objects
  amenities: string[]; // ✅ New


}

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const [filters, setFilters] = useState<Filters>({
    propertyType: [],
    bathrooms: [],
    propertyStatus: [],
    nearbyInfrastructure: [],
    location: [],
    amenities: []
  });



  const fetchProperties = async (currentFilters: Filters) => {
    try {
      const queryParams = new URLSearchParams({
        propertyType: JSON.stringify(currentFilters.propertyType),
        bathrooms: JSON.stringify(currentFilters.bathrooms),
        propertyStatus: JSON.stringify(currentFilters.propertyStatus),
        nearbyInfrastructure: JSON.stringify(currentFilters.nearbyInfrastructure),
        amenities: JSON.stringify(currentFilters.amenities),
        locations: JSON.stringify(currentFilters.location)
      });

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties?}`
      );
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
  }, [filters]);


  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.reference_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.region.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (filters.propertyType.length === 0 || filters.propertyType.includes(property.propertyType)) &&
      (filters.bathrooms.length === 0 || filters.bathrooms.includes(String(property.bathrooms))) &&
      (filters.propertyStatus.length === 0 || filters.propertyStatus.includes(property.propertyStatus)) &&
      (filters.nearbyInfrastructure.length === 0 || filters.nearbyInfrastructure.some(ni => property.nearbyInfrastructure.includes(ni))) &&
      (filters.amenities.length === 0 || filters.amenities.some(am => property.amenities.includes(am))) &&
      (filters.location.length === 0 || filters.location.includes(property.location.id.toString())
      );

    return matchesSearch && matchesFilters;
  });



  const searchParams = useSearchParams();






  // const [isSubmitting, setIsSubmitting] = useState(false);


  const router = useRouter();






  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {

  //     const queryParams = new URLSearchParams({
  //       propertyType: JSON.stringify(filters.propertyType),
  //       propertyStyle: JSON.stringify(filters.propertyStyle),
  //       propertyStatus: JSON.stringify(filters.propertyStatus),
  //       nearbyInfrastructure: JSON.stringify(filters.nearbyInfrastructure),
  //       amenities: JSON.stringify(filters.amenities), // ✅ Added
  //       locations: JSON.stringify(
  //         selectedLocations.map(loc => ({
  //           latitude: loc.latitude,
  //           longitude: loc.longitude,
  //           region: loc.region,
  //           id: loc.id
  //         }))
  //       )
  //     });

  //     router.push(`properties?${queryParams.toString()}`);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const clearAllFilters = () => {
    setFilters({
      propertyType: [],
      bathrooms: [],
      propertyStatus: [],
      nearbyInfrastructure: [],
      amenities: [],
      location: []
    });
  };



  const selectedLocations = locations.filter(loc =>
    filters.location.includes(loc.id.toString())
  );

  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb pageName={t("properties")} />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-center px-4 py-6 md:px-6 xl:px-7.5">
            {/* Top Row: All Properties + Filters + Search */}
            <div className="flex items-center justify-between w-full">

              {/* Left: Heading */}
              <h4 className="text-xl font-semibold text-black dark:text-white whitespace-nowrap">
                {t("allProperties")}
              </h4>

              {/* Right: Search + Add Button */}
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder={t("searchProperties")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48 rounded border border-stroke bg-gray px-4 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                />
                <Link
                  href="/properties/add"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
                >
                  {t("addProperty")}
                </Link>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-start w-full overflow-x-auto scrollbar-hide border-y border-stroke dark:border-strokedark py-4">
            <form
              // onSubmit={
              className="bg-white w-full max-w-[95%] mx-auto whitespace-nowrap rounded-xl p-5 gap-4 flex flex-row flex-nowrap text-center sm:text-left items-center border border-zinc-300"
              role="search"
            >
              <div className="w-full flex flex-col sm:flex-row lg:flex-nowrap flex-wrap gap-4">

                {/* Property Type */}
                <label className="flex-1 flex flex-col">
                  <Select
                    onValueChange={(value) => {
                      setFilters((prev) => {
                        const current = prev.propertyType || [];
                        return {
                          ...prev,
                          propertyType: current.includes(value)
                            ? current.filter((t) => t !== value)
                            : [...current, value],
                        };
                      });
                    }}
                    value=""
                  >
                    <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                      {t("propertyType")}
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => {
                        const selected = filters.propertyType?.includes(type);
                        return (
                          <SelectItem
                            key={type}
                            value={type}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <span>{t(type)}</span>
                              {selected && <Check className="w-4 h-4" />}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {filters.propertyType.length > 0 && (
                    <span className="text-sm text-center text-gray-500 mt-1 truncate">
                      {t(filters.propertyType[0])}
                      {filters.propertyType.length > 1 && " ..."}
                    </span>
                  )}
                </label>

                {/* Property Style */}
                <label className="flex-1 flex flex-col">
                  <Select
                    onValueChange={(value) => {
                      // const numValue = Number(value); // only if using number[]
                      setFilters((prev) => {
                        const current = prev.bathrooms || [];
                        return {
                          ...prev,
                          bathrooms: current.includes(value)
                            ? current.filter((t) => t !== value)
                            : [...current, value],
                        };
                      });
                    }}

                    value=""
                  >
                    <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                      {t("baths")}
                    </SelectTrigger>
                    <SelectContent>
                      {BATHROOMS.map((type) => {
                        const selected = filters.bathrooms?.includes(type);
                        return (
                          <SelectItem
                            key={type}
                            value={type}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <span>{t(type)}</span>
                              {selected && <Check className="w-4 h-4" />}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {filters.bathrooms.length > 0 && (
                    <span className="text-sm text-center text-gray-500 mt-1 truncate">
                      {t(filters.bathrooms[0])}
                      {filters.bathrooms.length > 1 && " ..."}
                    </span>
                  )}
                </label>

                {/* Property Status */}
                <label className="flex-1 flex flex-col">
                  <Select
                    onValueChange={(value) => {
                      setFilters((prev) => {
                        const current = prev.propertyStatus || [];
                        return {
                          ...prev,
                          propertyStatus: current.includes(value)
                            ? current.filter((t) => t !== value)
                            : [...current, value],
                        };
                      });
                    }}
                    value=""
                  >
                    <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                      {t("propertyStatus")}
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_STATUS.map((type) => {
                        const selected = filters.propertyStatus?.includes(type);
                        return (
                          <SelectItem
                            key={type}
                            value={type}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <span>{t(type)}</span>
                              {selected && <Check className="w-4 h-4" />}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {filters.propertyStatus.length > 0 && (
                    <span className="text-sm text-center text-gray-500 mt-1 truncate">
                      {t(filters.propertyStatus[0])}
                      {filters.propertyStatus.length > 1 && " ..."}
                    </span>
                  )}
                </label>

                {/* Location */}
                <label className="flex-1 flex flex-col">
                  <Select
                    onValueChange={(value) => {
                      setFilters((prev) => {
                        const current = prev.location || [];
                        return current.includes(value)
                          ? { ...prev, location: current.filter((loc) => loc !== value) }
                          : { ...prev, location: [...current, value] };
                      });
                    }}
                    value=""
                  >
                    <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                      {t("location")}
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => {
                        const isSelected = filters.location?.includes(location.id.toString());
                        return (
                          <SelectItem
                            key={location.id}
                            value={location.id.toString()}
                            className="flex justify-between items-center"
                          >
                            <span>{location.label}</span>
                            {isSelected && <span className="ml-2">✔</span>}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {filters.location.length > 0 && (
                    <span className="text-sm text-center text-gray-500 mt-1 truncate">
                      {locations.find(l => l.id.toString() === filters.location[0])?.label}
                      {filters.location.length > 1 && " ..."}
                    </span>
                  )}
                </label>

                {/* Nearby Infrastructure */}
                <label className="flex-1 flex flex-col">
                  <Select
                    onValueChange={(value) => {
                      setFilters((prev) => {
                        const current = prev.nearbyInfrastructure || [];
                        return {
                          ...prev,
                          nearbyInfrastructure: current.includes(value)
                            ? current.filter((t) => t !== value)
                            : [...current, value],
                        };
                      });
                    }}
                    value=""
                  >
                    <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                      {t("nearbyInfrastructure")}
                    </SelectTrigger>
                    <SelectContent>
                      {NEARBY_INFRASTRUCTURE.map((type) => {
                        const selected = filters.nearbyInfrastructure?.includes(type);
                        return (
                          <SelectItem
                            key={type}
                            value={type}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <span>{t(type)}</span>
                              {selected && <Check className="w-4 h-4" />}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {filters.nearbyInfrastructure.length > 0 && (
                    <span className="text-sm text-center text-gray-500 mt-1  truncate">
                      {t(filters.nearbyInfrastructure[0])}
                      {filters.nearbyInfrastructure.length > 1 && " ..."}
                    </span>
                  )}
                </label>

                {/* Amenities */}
                <label className="flex-1 flex flex-col">
                  <Select
                    onValueChange={(value) => {
                      setFilters((prev) => {
                        const current = prev.amenities || [];
                        return {
                          ...prev,
                          amenities: current.includes(value)
                            ? current.filter((t) => t !== value)
                            : [...current, value],
                        };
                      });
                    }}
                    value=""
                  >
                    <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                      {t("amenities")}
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AMENITIE).map(([category, items]) => (
                        <div key={category}>
                          <div className="px-3 py-1 font-semibold text-sm text-gray-600">
                            {t(category)}
                          </div>
                          {items.map((item) => {
                            const selected = filters.amenities?.includes(item);
                            return (
                              <SelectItem
                                key={item}
                                value={item}
                                className="flex justify-between items-center"
                              >
                                <div className="flex items-center justify-between gap-2 w-full">
                                  <span>{t(item)}</span>
                                  {selected && <Check className="w-4 h-4" />}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  {filters.amenities.length > 0 && (
                    <span className="text-sm text-center text-gray-500 mt-1 truncate">
                      {t(filters.amenities[0])}
                      {filters.amenities.length > 1 && " ..."}
                    </span>
                  )}
                </label>

                <button
                  type="button"

                  onClick={clearAllFilters}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
                >
                  {t("clearallfiltter")}
                </button>

              </div>
            </form>
          </div>





          <div className="hidden sm:block">
            <div className="grid grid-cols-11 gap-4 border-t border-stroke px-3 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
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
              <div className="col-span-2 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("location")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("views")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("likes")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("reference_no")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("dealType")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("price")}
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
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="grid grid-cols-11 items-center gap-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                >
                  <div className="col-span-1 flex items-center">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-black dark:text-white">
                      {property.title}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-black dark:text-white">
                      {/* {property.location.region} */}
                      {property.location?.region ?? "N/A"}

                    </p>
                  </div>
                  <div className="col-span-1 pl-3">
                    <p className="text-sm text-black dark:text-white">
                      {property.views}
                    </p>
                  </div>
                  <div className="col-span-1 pl-3">
                    <p className="text-sm text-black dark:text-white">
                      {property.likes}
                    </p>
                  </div>
                  <div className="col-span-1 ">
                    <p className="text-sm text-black dark:text-white">
                      {property.reference_no}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      {t(property.dealType)}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      {property.price} COP / {t(property.priceType)}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <Link
                      href={`/properties/edit/${property.id}`}
                      className="dark:text-white"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <Delete
                      api={`/properties/${property.id}`}
                      message="Property deleted successfully"
                      fetch={() => fetchProperties(filters)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-black dark:text-white">
                {t("noPropertiesFound")}
              </div>
            )}
          </div>
          <div className="block px-4 sm:hidden">
            {loading ? (
              <Loader className="h-[60vh]" />
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="mb-4 rounded-lg border border-stroke p-4 shadow-sm dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="mb-4 flex flex-col">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="mt-4">
                      <p className="mb-2 font-semibold text-black dark:text-white">
                        {property.title}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {/* {t("location")}: {property.location.region} */}
                        {t("location")}: {property.location?.region ?? "N/A"}

                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("views")}: {property.views}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("likes")}: {property.likes}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("dealType")}: {property.dealType}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("price")}: {property.price} COP /{" "}
                        {property.priceType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/properties/edit/${property.id}`}
                        className="dark:text-white"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <Delete
                        api={`/properties/${property.id}`}
                        message="Property deleted successfully"
                        fetch={() => fetchProperties(filters)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-black dark:text-white">
                {t("noPropertiesFound")}
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Properties;
