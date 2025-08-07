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
import { useTranslation } from "react-i18next";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`,
      );
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(
    (property) =>
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.reference_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.region.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb pageName={t("properties")} />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-center px-4 py-6 md:px-6 xl:px-7.5">
            {/* Top Row: All Properties + Filters + Search */}
            <div className="flex items-center gap-4 overflow-x-auto px-1 py-6 md:px-6 xl:px-7.5">
              {/* Left: All Properties */}
              {/* <h4 className="text-xl font-semibold text-black dark:text-white whitespace-nowrap">
                {t("allProperties")}
              </h4> */}

              {/* Filters in the middle */}
              <div className="flex items-center gap-4 flex-1 min-w-max">
                {/* Property Type */}
                <div className="flex flex-col items-center gap-2">
                  <span className="font-medium whitespace-nowrap">{t("propertyType")}:</span>
                  <select className="rounded border border-stroke bg-gray px-2 py-1 text-sm dark:border-strokedark dark:bg-meta-4">
                    <option>Casa</option>
                    <option>Apartamento</option>
                    <option>Local Comercial</option>
                    <option>Lotes</option>
                    <option>Bodegas</option>
                    <option>Oficinas</option>
                    <option>Apartasuite</option>
                  </select>
                </div>

                {/* Property Status */}
                <div className="flex flex-col items-center gap-2">
                  <span className="font-medium whitespace-nowrap">{t("propertyStatus")}:</span>
                  <select className="rounded border border-stroke bg-gray px-2 py-1 text-sm dark:border-strokedark dark:bg-meta-4">
                    <option>Usados</option>
                    <option>Nuevos</option>
                    <option>Sobre Planos</option>
                  </select>
                </div>

                {/* Property Style */}
                <div className="flex flex-col items-center gap-2">
                  <span className="font-medium whitespace-nowrap">{t("propertyStyle")}:</span>
                  <select className="rounded border border-stroke bg-gray px-2 py-1 text-sm dark:border-strokedark dark:bg-meta-4">
                    <option>Moderno</option>
                    <option>Clásico</option>
                    <option>Contemporáneo</option>
                    <option>Campestre</option>
                    <option>Colonial</option>
                  </select>
                </div>

                {/* Location */}
                {/* <div className="flex flex-col items-center gap-2">
                  <span className="font-medium whitespace-nowrap">{t("location")}:</span>
                  <select className="rounded border border-stroke bg-gray px-2 py-1 text-sm dark:border-strokedark dark:bg-meta-4">
                    Fill with alphabetical locations
                  </select>
                </div> */}

                {/* Amenities */}
                {/* <div className="flex flex-col items-center gap-2">
                  <span className="font-medium whitespace-nowrap">{t("amenities")}:</span>
                  <select className="rounded border border-stroke bg-gray px-2 py-1 text-sm dark:border-strokedark dark:bg-meta-4">
                    Sports, Social, Wellness...
                  </select>
                </div> */}

                {/* Nearby Infrastructure */}
                <div className="flex flex-col items-center gap-2">
                  <span className="font-medium whitespace-nowrap">{t("nearbyInfrastructure")}:</span>
                  <select className="rounded border border-stroke bg-gray px-2 py-1 text-sm dark:border-strokedark dark:bg-meta-4">
                    <option>Airport</option>
                    <option>Universities</option>
                    <option>Natural Reserves</option>
                  </select>
                </div>
              </div>

              {/* Right: Search */}
              <input
                type="text"
                placeholder={t("searchProperties")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 rounded border border-stroke bg-gray px-4 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              />

              {/* Add Property Button */}

              <div className="">
                <Link
                  href="/properties/add"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
                >
                  {t("addProperty")}
                </Link>
              </div>
            </div>



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
                      fetch={fetchProperties}
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
                        fetch={fetchProperties}
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
