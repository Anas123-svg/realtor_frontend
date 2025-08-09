"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES, RADIUS_OPTIONS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Switch } from "@/components/ui/switch";
import { locations } from "@/constants";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";

interface Filters {
  propertyType: string[];
  location: string[]; // change to string[] instead of array of objects

  dealType: "Sale" | "New" | "Rental";
  areaSize: string;
  minPrice: number;
  maxPrice: number;
  beds: string;
  baths: string;
}



const MIN_PRICE_RENTAL = 500000;
const MAX_PRICE_RENTAL = 10000000;
const MIN_PRICE_SALE = 50000000;
const MAX_PRICE_SALE = 5000000000;

const SearchCard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();



  const [filters, setFilters] = useState<Filters>({
    propertyType: [],
    location: [],
    minPrice: MIN_PRICE_SALE,
    maxPrice: MAX_PRICE_SALE,
    areaSize: "",
    beds: "",
    baths: "",
    dealType: "Sale",
  });




  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const dealType =
      (searchParams.get("dealType") as "Sale" | "Rental") || "Sale";
    const minPrice = dealType === "Sale" ? MIN_PRICE_SALE : MIN_PRICE_RENTAL;
    const maxPrice = dealType === "Sale" ? MAX_PRICE_SALE : MAX_PRICE_RENTAL;

    setFilters({
      propertyType: searchParams.get("propertyType")
        ? JSON.parse(searchParams.get("propertyType")!) // ["House", "Apartment"]
        : [],

      location: searchParams.get("locations")
        ? JSON.parse(searchParams.get("locations")!).map((id: number) =>
          locations.find((l) => l.id === id)
        ).filter(Boolean) // keep only valid ones
        : [],
      dealType,
      areaSize: searchParams.get("areaSize") || "",
      beds: searchParams.get("beds") || "",
      baths: searchParams.get("baths") || "",
      minPrice: Number(searchParams.get("minPrice")) || minPrice,
      maxPrice: Number(searchParams.get("maxPrice")) || maxPrice,
    });
  }, [searchParams]);

  const handlePriceChange = useCallback((value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedLocation = locations[+filters.location];
      const queryParams = new URLSearchParams({
        propertyType: JSON.stringify(filters.propertyType), // ["House", "Apartment"]
        dealType: filters.dealType,
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        beds: filters.beds,
        baths: filters.baths,
        longitude: selectedLocation.longitude.toString(),
        latitude: selectedLocation.latitude.toString(),
        region: selectedLocation.region,
        areaSize: filters.areaSize,
        id: selectedLocation.id.toString(),
      });


      router.push(`/properties/all?${queryParams.toString()}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedLocation = locations[+filters.location];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-5 gap-10 justify-center flex flex-col lg:flex-row text-center sm:text-left items-center whitespace-nowrap shadow-lg"
      role="search"
    >
      <div className="w-full flex flex-col sm:flex-row gap-10">






        <label className="w-full">
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
            value="" // keep empty so placeholder stays
          >
            <SelectTrigger
              className="border-none gap-2 focus:ring-0 p-0 text-base"
              aria-label="Property Type"
            >
              {t("propertyType")}
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => {
                const selected = filters.propertyType?.includes(type);
                return (
                  <SelectItem
                    key={type}
                    value={type}
                    className="flex  justify-between items-center"
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
        </label>



        <label className="w-full">
          <Select
            onValueChange={(value) => {
              setFilters((prev) => {
                // Toggle selection for multi-select
                const current = prev.location || [];
                if (current.includes(value)) {
                  return { ...prev, location: current.filter((loc) => loc !== value) };
                } else {
                  return { ...prev, location: [...current, value] };
                }
              });
            }}
            value="" // Keep empty so it doesn't show the selected items in the trigger
          >
            <SelectTrigger
              className="border-none gap-2 focus:ring-0 p-0 text-base"
              aria-label="Location"
            >
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
        </label>






      </div>

      <div className="w-full flex flex-col sm:flex-row items-center gap-10">
        <label className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="w-full border-none p-0 text-left outline-none"
              aria-label="Price Range"
            >
              <div className="flex h-10 w-full items-center justify-between py-2">
                <p>{t("priceRange")}</p>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-5 w-[300px]">
              <div id="range" className="mb-4">
                <RangeSlider
                  min={
                    filters.dealType === "Sale"
                      ? MIN_PRICE_SALE
                      : MIN_PRICE_RENTAL
                  }
                  max={
                    filters.dealType === "Sale"
                      ? MAX_PRICE_SALE
                      : MAX_PRICE_RENTAL
                  }
                  step={500000}
                  value={[filters.minPrice, filters.maxPrice]}
                  onInput={handlePriceChange}
                  aria-label="Price range slider"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  aria-label="Minimum price"
                  value={`${formatCurrency(filters.minPrice)} COP`}
                  readOnly
                  className="border border-black rounded-none w-1/2 p-2 outline-none placeholder:font-light font-light"
                />
                <span className="mx-2">-</span>
                <input
                  type="text"
                  aria-label="Maximum price"
                  value={`${formatCurrency(filters.maxPrice)} COP`}
                  readOnly
                  className="border border-black rounded-none w-1/2 p-2 outline-none placeholder:font-light font-light"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <p className="font-semibold">
            {formatCurrency(filters.minPrice)} COP -{" "}
            {formatCurrency(filters.maxPrice)} COP
          </p> */}
        </label>


        <label className="w-full">
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, areaSize: value }))
            }
            value={filters.areaSize}
          >
            <SelectTrigger className="border-none rounded-md gap-2 focus:ring-0 p-0 text-base">
              {filters.areaSize
                ? `${filters.areaSize} m²`
                : t("areaSize")}
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="10">10 m²</SelectItem>
              <SelectItem value="20">20 m²</SelectItem>
              <SelectItem value="50+">50+ m²</SelectItem>
            </SelectContent>
          </Select>
        </label>


      </div>


      <div className="w-full flex flex-col sm:flex-row items-center gap-10">

        <label className="w-full">
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, beds: value }))
            }
            value={filters.beds}
          >
            <SelectTrigger className="border-none rounded-md gap-2 focus:ring-0 p-0 text-base">
              {filters.beds ? `${filters.beds} ${t("beds")}` : t("beds")}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="4+">4+</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="w-full">
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, baths: value }))
            }
            value={filters.baths}
          >
            <SelectTrigger className="border-none rounded-md gap-2 focus:ring-0 p-0 text-base">
              {filters.baths ? `${filters.baths} ${t("baths")}` : t("baths")}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="4+">4+</SelectItem>
            </SelectContent>
          </Select>
        </label>




        <label className="w-full flex flex-col  items-center justify-center gap-3">
          {/* <span className="font-bold">{t("propertyType")}</span> */}
          <Select
            value={filters.dealType}
            onValueChange={(value: "Sale" | "New" | "Rental") => {
              setFilters((prev) => ({
                ...prev,
                dealType: value,
                minPrice:
                  value === "Sale" || value === "New"
                    ? MIN_PRICE_SALE
                    : MIN_PRICE_RENTAL,
                maxPrice:
                  value === "Sale" || value === "New"
                    ? MAX_PRICE_SALE
                    : MAX_PRICE_RENTAL,
              }));
            }}

          >
            <SelectTrigger className=" rounded-md">
              <span>
                {filters.dealType === "Sale"
                  ? t("existingProperties")
                  : filters.dealType === "New"
                    ? t("newDevelopments")
                    : t("rentalProperties")}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sale">{t("existingProperties")}</SelectItem>
              <SelectItem value="New">{t("newDevelopments")}</SelectItem>
              <SelectItem value="Rental">{t("rentalProperties")}</SelectItem>
            </SelectContent>
          </Select>
          {/* <p className="font-semibold ">{t(filters.dealType)}</p> */}

        </label>


      </div>

      <Button
        type="submit"
        variant="primary"
        className="rounded-xl w-full lg:w-auto py-8 px-10"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("searching") : t("searchProperty")}
      </Button>
    </form>
  );
};

export default SearchCard;
