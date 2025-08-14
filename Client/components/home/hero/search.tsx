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

  dealType: "" | "Sale" | "New" | "Rental";
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
    dealType: "",
  });




  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const dealType = (searchParams.get("dealType") as "Sale" | "New" | "Rental") || "";
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
    setPriceChanged(true); // mark that user changed the range

  }, []);


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const selectedLocation = locations[+filters.location];
  //     const queryParams = new URLSearchParams({
  //       propertyType: JSON.stringify(filters.propertyType), // ["House", "Apartment"]
  //       dealType: filters.dealType,
  //       minPrice: filters.minPrice.toString(),
  //       maxPrice: filters.maxPrice.toString(),
  //       beds: filters.beds,
  //       baths: filters.baths,
  //       longitude: selectedLocation.longitude.toString(),
  //       latitude: selectedLocation.latitude.toString(),
  //       region: selectedLocation.region,
  //       areaSize: filters.areaSize,
  //       id: selectedLocation.id.toString(),
  //     });


  //     router.push(`/properties/all?${queryParams.toString()}`);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // If no location is selected, stop early




      const queryParams = new URLSearchParams({
        propertyType: JSON.stringify(filters.propertyType),
        locations: JSON.stringify(
          selectedLocations.map(loc => ({
            latitude: loc.latitude,
            longitude: loc.longitude,
            region: loc.region,
            id: loc.id
          }))
        ),
        dealType: filters.dealType,
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        beds: filters.beds,
        baths: filters.baths,
        areaSize: filters.areaSize,
      });

      router.push(`/properties/all?${queryParams.toString()}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };



  const [priceChanged, setPriceChanged] = useState(false);



  const selectedLocations = locations.filter(loc =>
    filters.location.includes(loc.id.toString())
  );


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-5 gap-10 justify-center flex flex-col lg:flex-row text-center sm:text-left items-center whitespace-nowrap shadow-lg"
      role="search"
    >
      <div className="w-full flex flex-col sm:flex-row gap-10">
        {/* Property Type */}
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
            value=""
          >
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
              {t("propertyType")}
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => {
                const selected = filters.propertyType?.includes(type);
                return (
                  <SelectItem key={type} value={type} className="flex justify-between items-center">
                    <span>{t(type)}</span>
                    {selected && <span className="ml-2">✔</span>}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {filters.propertyType?.length > 0 && (
            <p className="mt-1 text-xs text-center text-gray-600">
              {filters.propertyType.length === 1
                ? t(filters.propertyType[0])
                : `${t(filters.propertyType[0])} ...`}
            </p>
          )}
        </label>

        {/* Location */}
        <label className="w-full">
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
                  <SelectItem key={location.id} value={location.id.toString()} className="flex justify-between items-center">
                    <span>{location.label}</span>
                    {isSelected && <span className="ml-2">✔</span>}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {filters.location?.length > 0 && (
            <p className="mt-1 text-xs text-center text-gray-600">
              {filters.location.length === 1
                ? locations.find((l) => l.id.toString() === filters.location[0])?.label
                : `${locations.find((l) => l.id.toString() === filters.location[0])?.label} ...`}
            </p>
          )}
        </label>
      </div>

      {/* Price Range and Area */}
      {/* Price Range and Area */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-10">

        {/* Price Range */}
        {/* <label className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full border-none p-0 text-left outline-none">
              <div className="flex h-10 w-full items-center justify-between py-2">
                <p>{t("priceRange")}</p>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-5 w-[300px]">
              <div id="range" className="mb-4">
                <RangeSlider
                  min={filters.dealType === "Sale" ? MIN_PRICE_SALE : MIN_PRICE_RENTAL}
                  max={filters.dealType === "Sale" ? MAX_PRICE_SALE : MAX_PRICE_RENTAL}
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

          {priceChanged && (
            <p className="mt-1 text-xs text-center text-gray-600">
              {`${formatCurrency(filters.minPrice)} COP - ${formatCurrency(filters.maxPrice)} COP`}
            </p>
          )}
        </label> */}

        <label className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full border-none p-0 text-left outline-none">
              <div className="flex h-10 w-full items-center justify-between py-2">
                <p>{t("priceRange")}</p>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-5 w-[300px]">
              {/* Slider */}
              <div id="range" className="mb-4">
                <RangeSlider
                  min={filters.dealType === "Sale" ? MIN_PRICE_SALE : MIN_PRICE_RENTAL}
                  max={filters.dealType === "Sale" ? MAX_PRICE_SALE : MAX_PRICE_RENTAL}
                  step={500000}
                  value={[filters.minPrice, filters.maxPrice]}
                  onInput={handlePriceChange}
                  aria-label="Price range slider"
                />
              </div>

              {/* Manual entry */}
              <div className="flex items-center">
                <input
                  type="number"
                  aria-label="Minimum price"
                  min={0}
                  max={1000000000000000000000}
                  value={filters.minPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: isNaN(val) ? 0 : val,
                    }));
                    setPriceChanged(true);
                  }}
                  className="border border-black rounded-none w-1/2 p-2 outline-none font-light"
                />
                <span className="mx-2">-</span>
                <input
                  type="number"
                  aria-label="Maximum price"
                  min={0}
                  max={1000000000000000000000}
                  value={filters.maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: isNaN(val) ? 0 : val,
                    }));
                    setPriceChanged(true);
                  }}
                  className="border border-black rounded-none w-1/2 p-2 outline-none font-light"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Show price range only after user changes it */}
          {priceChanged && (
            <p className="mt-1 text-xs text-center text-gray-600">
              {`${formatCurrency(filters.minPrice)} COP - ${formatCurrency(filters.maxPrice)} COP`}
            </p>
          )}
        </label>

        {/* Area Size */}
        <label className="w-full">
          <Select
            onValueChange={(value) => {
              setFilters((prev) => {
                // If the selected value is already chosen, deselect it
                return {
                  ...prev,
                  areaSize: prev.areaSize === value ? "" : value,
                };
              });
            }}
            value="" // keep empty so placeholder always shows
          >
            <SelectTrigger className="border-none rounded-md gap-2 focus:ring-0 p-0 text-base">
              {t("areaSize")}
            </SelectTrigger>
            <SelectContent>
              {["10", "20", "50+"].map((size) => (
                <SelectItem key={size} value={size} className="flex  justify-between items-center">
                  <span>{`${size} m²`}</span>
                  {filters.areaSize === size && <span className="ml-2">✔</span>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filters.areaSize && (
            <p className="mt-1 text-xs text-center text-gray-600">{`${filters.areaSize} m²`}</p>
          )}
        </label>

      </div>



      {/* Beds, Baths, Deal Type */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-10">
        {/* Beds */}
        <label className="w-full text-center">
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, beds: prev.beds === value ? "" : value }))
            }
            value=""
          >
            <SelectTrigger className="border-none rounded-md gap-2 focus:ring-0 p-0 text-base">
              {t("beds")}
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4", "4+"].map((b) => (
                <SelectItem key={b} value={b} className="flex justify-between items-center">
                  <span>{b}</span>
                  {filters.beds === b && <span className="ml-2">✔</span>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.beds && (
            <p className="mt-1 text-xs text-center text-gray-600">{filters.beds}</p>
          )}
        </label>

        {/* Baths */}
        <label className="w-full">
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, baths: prev.baths === value ? "" : value }))
            }
            value=""
          >
            <SelectTrigger className="border-none rounded-md gap-2 focus:ring-0 p-0 text-base">
              {t("baths")}
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4", "4+"].map((b) => (
                <SelectItem key={b} value={b} className="flex justify-between items-center">
                  <span>{b}</span>
                  {filters.baths === b && <span className="ml-2">✔</span>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.baths && (
            <p className="mt-1 text-xs text-center text-gray-600">{filters.baths}</p>
          )}
        </label>

        {/* Deal Type */}
        <label className="w-full">
          <Select
            value={filters.dealType || ""}
            onValueChange={(value: "Sale" | "New" | "Rental") =>
              setFilters((prev) => ({
                ...prev,
                dealType: prev.dealType === value ? "" : value,
                minPrice:
                  value === "Sale" || value === "New"
                    ? MIN_PRICE_SALE
                    : value === "Rental"
                      ? MIN_PRICE_RENTAL
                      : prev.minPrice,
                maxPrice:
                  value === "Sale" || value === "New"
                    ? MAX_PRICE_SALE
                    : value === "Rental"
                      ? MAX_PRICE_RENTAL
                      : prev.maxPrice,
              }))
            }
          >
            <SelectTrigger className="border-none rounded-md gap-2 focus:ring-0 p-0 text-base">
              {t("dealType")}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sale" className="flex justify-between items-center">
                <span>{t("existingProperties")}</span>
                {filters.dealType === "Sale" && <span className="ml-2">✔</span>}
              </SelectItem>
              <SelectItem value="New" className="flex justify-between items-center">
                <span>{t("newDevelopments")}</span>
                {filters.dealType === "New" && <span className="ml-2">✔</span>}
              </SelectItem>
              <SelectItem value="Rental" className="flex justify-between items-center">
                <span>{t("rentalProperties")}</span>
                {filters.dealType === "Rental" && <span className="ml-2">✔</span>}
              </SelectItem>
            </SelectContent>
          </Select>

          {filters.dealType && (
            <p className="mt-1 text-xs text-center text-gray-600">
              {filters.dealType === "Sale"
                ? t("existingProperties")
                : filters.dealType === "New"
                  ? t("newDevelopments")
                  : t("rentalProperties")}
            </p>
          )}
        </label>



      </div>

      {/* Submit Button */}
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
