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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface Filters {
  propertyType: string[];
  location: string[];

  dealType: "" | "Sale" | "New" | "Rental" | "ResidentialRental" | "TouristRental";
  areaSize: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  beds: string;
  baths: string;
}



const MIN_PRICE_RENTAL = 50000000;
const MAX_PRICE_RENTAL = 5000000000;
const MIN_PRICE_SALE = 50000000;
const MAX_PRICE_SALE = 5000000000;
const MIN_AREA = 10;
const MAX_AREA = 1000;

const SearchCard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();



  const [filters, setFilters] = useState<Filters>({
    propertyType: [],
    location: [],
    minPrice: MIN_PRICE_SALE,
    maxPrice: MAX_PRICE_SALE,
    minArea: MIN_AREA,
    maxArea: MAX_AREA,
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
    const minArea = MIN_AREA;
    const maxArea = MAX_AREA;

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
      minArea: Number(searchParams.get("minArea")) || minArea,
      maxArea: Number(searchParams.get("maxArea")) || maxArea,
    });
  }, [searchParams]);

  const handleAreaChange = useCallback((value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      minArea: value[0],
      maxArea: value[1],
    }));
    setAreaChanged(true); // mark that user changed the range

  }, []);

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



  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     // If no location is selected, stop early




  //     const queryParams = new URLSearchParams({
  //       propertyType: JSON.stringify(filters.propertyType),
  //       locations: JSON.stringify(
  //         selectedLocations.map(loc => ({
  //           latitude: loc.latitude,
  //           longitude: loc.longitude,
  //           region: loc.region,
  //           id: loc.id
  //         }))
  //       ),
  //       dealType: filters.dealType,
  //       minPrice: filters.minPrice.toString(),
  //       maxPrice: filters.maxPrice.toString(),
  //       beds: filters.beds,
  //       baths: filters.baths,
  //       areaSize: filters.areaSize,
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
      const queryParams = new URLSearchParams({
        propertyType: JSON.stringify(filters.propertyType),
        locations: JSON.stringify(
          selectedLocations.map(loc => ({
            latitude: loc.latitude,
            longitude: loc.longitude,
            region: loc.region,
            id: loc.id,
          }))
        ),
        dealType: filters.dealType,
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        minArea: filters.minArea.toString(),
        maxArea: filters.maxArea.toString(),
        beds: filters.beds,
        baths: filters.baths,
      });

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${baseUrl}/properties/all?${queryParams.toString()}`);

      const url = await response.text();
      if (`?${url}`) {
        router.push(url);
      } else {
        console.error('Server did not return a URL');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };



  const [priceChanged, setPriceChanged] = useState(false);
  const [areaChanged, setAreaChanged] = useState(false);


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

        {/* Deal Type */}
        <label className="w-full">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-md p-2 text-left bg-white h-9"
              >
                <span className="truncate">
                  {t("dealType")}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="start"
              className="w-full max-w-[300px] sm:max-w-[350px] p-2 bg-white rounded-md shadow-md"
            >
              <div className="flex flex-col gap-1">
                {[
                  { value: "Sale", label: t("existingProperties") },
                  { value: "New", label: t("newDevelopments") },
                  { value: "ResidentialRental", label: t("residentialRental") },
                  { value: "TouristRental", label: t("touristRental") }
                ].map(({ value, label }) => {
                  const isSelected = filters.dealType === value;
                  return (
                    <label
                      key={value}
                      className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          dealType: prev.dealType === value ? "" : (value as Filters["dealType"]),
                          minPrice:
                            value === "Sale" || value === "New"
                              ? MIN_PRICE_SALE
                              : value === "ResidentialRental" || value === "TouristRental"
                                ? MIN_PRICE_RENTAL
                                : prev.minPrice,
                          maxPrice:
                            value === "Sale" || value === "New"
                              ? MAX_PRICE_SALE
                              : value === "ResidentialRental" || value === "TouristRental"
                                ? MAX_PRICE_RENTAL
                                : prev.maxPrice,
                        }));
                      }}
                    >
                      <span>{label}</span>
                      {isSelected && <Check className="w-4 h-4 text-green-600" />}
                    </label>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          {filters.dealType && (
            <p className="mt-1 text-xs text-center text-gray-600">
              {filters.dealType === "Sale"
                ? t("existingProperties")
                : filters.dealType === "New"
                  ? t("newDevelopments")
                  : filters.dealType === "ResidentialRental"
                    ? t("residentialRental")
                    : t("touristRental")}
            </p>
          )}
        </label>


        {/* Property Type */}
        <label className="w-full">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-md p-2 text-left bg-white"
              >
                <span>
                  {filters.propertyType?.length > 0
                    ? filters.propertyType.length === 1
                      ? t(filters.propertyType[0])
                      : `${t(filters.propertyType[0])} ...`
                    : t("propertyType")}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="start"
              className="w-full max-w-[300px] sm:max-w-[350px] p-2 bg-white rounded-md shadow-md"
            >
              <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">

                {/* Select All */}
                <label
                  className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded font-medium"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={filters.propertyType?.length === PROPERTY_TYPES.length}
                      onChange={() => {
                        setFilters((prev) => ({
                          ...prev,
                          propertyType:
                            filters.propertyType?.length === PROPERTY_TYPES.length
                              ? [] // unselect all
                              : PROPERTY_TYPES, // select all
                        }));
                      }}
                    />
                    <span>{t("SelectAll")}</span>
                  </div>
                  {filters.propertyType?.length === PROPERTY_TYPES.length && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </label>

                {/* Property types list */}
                {PROPERTY_TYPES.map((type) => {
                  const isSelected = filters.propertyType?.includes(type);
                  return (
                    <label
                      key={type}
                      className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => {
                            setFilters((prev) => {
                              const current = prev.propertyType || [];
                              return isSelected
                                ? { ...prev, propertyType: current.filter((t) => t !== type) }
                                : { ...prev, propertyType: [...current, type] };
                            });
                          }}
                        />
                        <span>{t(type)}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-green-600" />}
                    </label>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </label>


        {/* Location */}

        <label className="w-full">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-md p-2 text-left bg-white" // removed border
              >
                <span>
                  {filters.location?.length > 0
                    ? filters.location.length === 1
                      ? locations.find((l) => l.id.toString() === filters.location[0])?.label
                      : `${locations.find((l) => l.id.toString() === filters.location[0])?.label} ...`
                    : t("location")}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="start"
              className="w-full max-w-[300px] sm:max-w-[350px] p-2 bg-white rounded-md shadow-md"
            >
              <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">

                {/* Select All option */}
                <label
                  className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded font-medium"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={filters.location?.length === locations.length}
                      onChange={() => {
                        setFilters((prev) => ({
                          ...prev,
                          location:
                            filters.location?.length === locations.length
                              ? [] // unselect all
                              : locations.map((l) => l.id.toString()), // select all
                        }));
                      }}
                    />
                    <span>{t("SelectAll")}</span>
                  </div>
                  {filters.location?.length === locations.length && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </label>

                {/* Individual locations */}
                {locations.map((location) => {
                  const isSelected = filters.location?.includes(location.id.toString());
                  return (
                    <label
                      key={location.id}
                      className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => {
                            setFilters((prev) => {
                              const current = prev.location || [];
                              return isSelected
                                ? { ...prev, location: current.filter((loc) => loc !== location.id.toString()) }
                                : { ...prev, location: [...current, location.id.toString()] };
                            });
                          }}
                        />
                        <span>{location.label}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-green-600" />}
                    </label>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
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
          min={500_000_000} // 500M
          max={5_000_000_000} // 5000M
          step={50_000_000}   // 50M
          value={[filters.minPrice, filters.maxPrice]}
          onInput={handlePriceChange}
          aria-label="Price range slider"
        />
      </div>

      {/* Read-only display boxes */}
      <div className="flex items-center">
        <input
          type="text"
          aria-label="Minimum price"
          value={`${filters.minPrice / 1_000_000}M`}
          readOnly
          className="bg-transparent border-none w-1/2 p-2 outline-none text-center font-light"
        />
        <span className="mx-2">-</span>
        <input
          type="text"
          aria-label="Maximum price"
          value={`${filters.maxPrice / 1_000_000}M`}
          readOnly
          className="bg-transparent border-none w-1/2 p-2 outline-none text-center font-light"
        />
      </div>
    </DropdownMenuContent>
  </DropdownMenu>

  {/* Show price range after change */}
  {priceChanged && (
    <p className="mt-1 text-xs text-center text-gray-600">
      {filters.minPrice / 1_000_000}M - {filters.maxPrice / 1_000_000}M
    </p>
  )}
</label>


        {/* Area Range */}
<label className="w-full">
  <DropdownMenu>
    <DropdownMenuTrigger className="w-full border-none p-0 text-left outline-none">
      <div className="flex h-10 w-full items-center justify-between py-2">
        <p>{t("areaRange")}</p>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="p-5 w-[300px]">
      {/* Slider */}
      <div id="range" className="mb-4">
        <RangeSlider
          min={10}
          max={1000}
          step={5}
          value={[filters.minArea, filters.maxArea]}
          onInput={handleAreaChange}
          aria-label="Area range slider"
        />
      </div>

      {/* Read-only display boxes */}
      <div className="flex items-center">
        <input
          type="text"
          aria-label="Minimum area"
          value={`${filters.minArea}m²`}
          readOnly
          className="bg-transparent border-none w-1/2 p-2 outline-none text-center font-light"
        />
        <span className="mx-2">-</span>
        <input
          type="text"
          aria-label="Maximum area"
          value={`${filters.maxArea}m²`}
          readOnly
          className="bg-transparent border-none w-1/2 p-2 outline-none text-center font-light"
        />
      </div>
    </DropdownMenuContent>
  </DropdownMenu>

  {/* Show range after change */}
  {areaChanged && (
    <p className="mt-1 text-xs text-center text-gray-600">
      {filters.minArea}m² - {filters.maxArea}m²
    </p>
  )}
</label>


        {/* Area Size
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
        </label> */}

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
