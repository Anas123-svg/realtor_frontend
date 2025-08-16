"use client";
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PROPERTY_TYPES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  VIEW_OPTIONS,
  OUTDOOR_OPTIONS,
  PROPERTY_STYLES,
  FLOOR_OPTIONS,
  NOISE_LEVELS,
  LAUNDRY_OPTIONS,
  SECURITY_FEATURES,
  AMENITIES,
  INTERNET_TYPES,
  HEATING_TYPES,
  COOLING_TYPES,
  RADIUS_OPTIONS,
  PROPERTY_STATUS,
  NEARBY_INFRASTRUCTURE,
  POWER_BACKUP,
  locations,
  AMENITIESF,
  AMENITIES_WITH_I,
  PARKIING_OPTIONS,
} from "@/constants";
import { SearchCardProps, SearchFilters, Location } from "@/types/searchTypes";
import {
  parseSearchParams,
  buildSearchQuery,
} from "@/components/common/searchCard/utility";
// import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";
import { Checkbox } from "@headlessui/react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const MIN_PRICE_RENTAL = 500000;
const MAX_PRICE_RENTAL = 10000000;
const MIN_PRICE_SALE = 50000000;
const MAX_PRICE_SALE = 5000000000;

const AMIN_PRICE_RENTAL = 50000;
const AMAX_PRICE_RENTAL = 10000000;
const AMIN_PRICE_SALE = 50000;
const AMAX_PRICE_SALE = 1000000;

const STEP_PRICE_SALE = 50_000_000;
const STEP_PRICE_RENTAL = 500_000;

const ASTEP_PRICE_RENTAL = 50_000;


// Reusable Filter Button Component
const FilterButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, isSelected, onClick }) => (
  <button
    aria-label={`Select ${label}`}
    role="checkbox"
    aria-checked={isSelected}
    className={
      isSelected
        ? "py-2 px-3 bg-primary text-white"
        : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
    }
    onClick={onClick}
  >
    {label}
  </button>
);



const SearchCard: React.FC<SearchCardProps> = ({ onSearchComplete }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  // const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  // const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Parse initial search params
  const initialFilters = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams]
  );
  const [location, setLocation] = useState<Location[]>(
    initialFilters.location || []
  );


  const [filters, setFilters] = useState<SearchFilters>({
    dealType: initialFilters.dealType || "",
    condition: initialFilters.condition || "",
    propertyType: initialFilters.propertyType || [],
    minPrice:
      initialFilters.minPrice ??
      (initialFilters.dealType === "Sale" ? MIN_PRICE_SALE : MIN_PRICE_RENTAL),
    maxPrice:
      initialFilters.amaxPrice ??
      (initialFilters.dealType === "Sale" ? MAX_PRICE_SALE : MAX_PRICE_RENTAL),
    aminPrice:
      initialFilters.aminPrice ??
      (initialFilters.dealType === "Sale" ? AMIN_PRICE_SALE : AMIN_PRICE_RENTAL),
    amaxPrice:
      initialFilters.maxPrice ??
      (initialFilters.dealType === "Sale" ? AMAX_PRICE_SALE : AMAX_PRICE_RENTAL),
    radius: initialFilters.radius || "",
    minArea: initialFilters.minArea || 0,
    maxArea: initialFilters.maxArea || 1000,
    beds: initialFilters.beds || [],
    baths: initialFilters.baths || [],
    parking: initialFilters.parking || [],
    views: initialFilters.views || [],
    outdoor: initialFilters.outdoor || [],
    propertyStyle: initialFilters.propertyStyle || [],
    propertyStatus: initialFilters.propertyStatus || [],
    floors: initialFilters.floors || [],
    noiseLevel: initialFilters.noiseLevel || [],
    laundry: initialFilters.laundry || [],
    securityFeatures: initialFilters.securityFeatures || [],
    amenities: initialFilters.amenities || [],
    internet: initialFilters.internet || [],
    heating: initialFilters.heating || [],
    cooling: initialFilters.cooling || [],
    nearbyInfrastructure: initialFilters.nearbyInfrastructure || [],
    powerBackup: initialFilters.powerBackup || [],
    location: initialFilters.location || [], // now an array
    sortBy: initialFilters.sortBy || "",
  });



  useEffect(() => {
    const [min, max] =
      filters.dealType === "Sale"
        ? [MIN_PRICE_SALE, MAX_PRICE_SALE]
        : [MIN_PRICE_RENTAL, MAX_PRICE_RENTAL];

    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  }, [filters.dealType]);



  useEffect(() => {
    const [min, max] = getPriceRange();
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  }, [filters.dealType]);




  const getStep = () => {
    return filters.dealType === "Sale" ? STEP_PRICE_SALE : STEP_PRICE_RENTAL;
  };

  const getPriceRange = () => {
    return filters.dealType === "Sale"
      ? [MIN_PRICE_SALE, MAX_PRICE_SALE]
      : [MIN_PRICE_RENTAL, MAX_PRICE_RENTAL];
  };


  const handleLocationChange = useCallback((value: string) => {
    const selectedLocation = locations.find(
      (loc) => loc.id === parseInt(value, 10)
    );
    if (!selectedLocation) return;

    setFilters((prev) => {
      const exists = prev.location?.some(
        (loc) => loc.id === selectedLocation.id
      );

      return {
        ...prev,
        location: exists
          ? prev.location?.filter((loc) => loc.id !== selectedLocation.id) || []
          : [...(prev.location || []), selectedLocation],
      };
    });
  }, [locations]);


  // Generic filter update method
  const updateFilter = useCallback(
    <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Toggle array-based filters
  const toggleArrayFilter = useCallback(
    <K extends keyof SearchFilters>(
      key: K,
      item: SearchFilters[K] extends Array<infer U> ? U : never
    ) => {
      setFilters((prev) => {
        const currentArray = prev[key] as Array<unknown>;
        const newArray = currentArray.includes(item)
          ? currentArray.filter((v) => v !== item)
          : [...currentArray, item];
        return { ...prev, [key]: newArray };
      });
    },
    []
  );

  const handlePriceChange = useCallback((value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  }, []);

  const handleAreaChange = useCallback((value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      minArea: value[0],
      maxArea: value[1],
    }));
  }, []);



  const handlePriceChangea = useCallback((value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      aminPrice: value[0],
      amaxPrice: value[1],
    }));
  }, []);

  const ahandlePriceChange = (value: [number, number]) => {
    handlePriceChangea(value); // Or directly update filters.aminPrice, amaxPrice
  };



  // Format numbers to short form (50K, 1M)
  const formatShort = (value: number): string => {
    if (value >= 1_000_000) return `${value / 1_000_000}M`;
    if (value >= 1_000) return `${value / 1_000}K`;
    return value.toString();
  };

  // Parse input like "50K", "1M" into numbers
  const parseShort = (val: string): number => {
    const clean = val.toUpperCase().replace(/[^\dKM]/g, "");
    if (clean.endsWith("M")) return parseFloat(clean) * 1_000_000;
    if (clean.endsWith("K")) return parseFloat(clean) * 1_000;
    return parseFloat(clean);
  };




  const formatToMillions = (value: number) => `${Math.round(value / 1_000_000)}M`;
  const parseMillions = (value: string): number => {
    const match = value.toUpperCase().replace(/[^0-9M]/g, '');
    if (match.includes("M")) {
      return parseInt(match.replace("M", "")) * 1_000_000;
    }
    return parseInt(match);
  };


  // Handle search with validation
  // const handleSearch = useCallback(() => {
  //   let updatedFilters = { ...filters };
  //   if (location.latitude && location.longitude)
  //     updatedFilters = { ...filters, location };
  //   else updatedFilters = { ...filters, location: undefined };

  //   const query = buildSearchQuery(updatedFilters);

  //   // Optional callback for external handling
  //   onSearchComplete?.(updatedFilters);

  //   // Navigate to properties page with search params
  //   router.push(`/properties?${query.toString()}`);
  // }, [filters, location, router, onSearchComplete]);

  // const handleSearch = useCallback(() => {
  //   let updatedFilters = { ...filters };

  //   if (location.length > 0) {
  //     // Store full array of selected locations
  //     updatedFilters = { ...filters, location };
  //   } else {
  //     // No locations selected
  //     updatedFilters = { ...filters, location: [] };
  //   }

  //   const query = buildSearchQuery(updatedFilters);

  //   // Optional callback for external handling
  //   onSearchComplete?.(updatedFilters);



  //   // Navigate to properties page with search params
  //   router.push(`/properties?${query.toString()}`);

  // }, [filters, location, router, onSearchComplete]);


  const handleSearch = () => {
    console.log("Filters for search:", filters);
    const queryString = buildSearchQuery(filters).toString();
    console.log("Query string:", queryString);
    router.push(`/properties?${queryString}`);
  };


  return (
    <div className="bg-white  gap-3 px-6 py-8 border rounded-[20px]  flex justify-between items-center w-full shadow-lg sticky top-10 z-20">
      {/* // <div className="bg-white border rounded-md px-4 py-10 shadow-sm w-full sticky top-10 z-20"> */}



      {/* import { Check } from "lucide-react"; // icon for the tick */}


      <label className="flex-1">
        <Select
          onValueChange={handleLocationChange}
          value="" // keep empty so it doesn't overwrite with single value
        >
          {/* Fixed height, horizontal scroll for multiple locations */}
          <SelectTrigger
            className="border px-2 py-1 rounded w-full text-left h-9 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300"
          >
            {filters.location?.length
              ? filters.location.length > 1
                ? `${filters.location[0].label}...`
                : filters.location[0].label
              : t("location")}

          </SelectTrigger>

          <SelectContent>
            {locations
              .slice()
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((location) => {
                const isSelected = filters.location?.some((l) => l.id === location.id);
                return (
                  <SelectItem
                    key={location.id}
                    value={location.id.toString()}
                    // Flex layout so tick appears left of text
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">

                      <span>{location.label}</span>
                      {/* Check icon always on the left when selected */}
                      {isSelected && (
                        <Check className="w-4 h-4 text-black flex-shrink-0" />
                      )}
                    </div>
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      </label>





      <label className="flex-1">
        <Select
          onValueChange={(e) => updateFilter("radius", e)}
          disabled={location.length === 0}
          value={filters.radius}
        >

          <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
            {t("radius")}
          </SelectTrigger>
          <SelectContent>
            {RADIUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.value + " " + t("miles")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
              {filters.radius
                ? filters.radius + " " + t("miles")
                : t("selectRadius")}
            </p> */}
      </label>

      {/* price range */}
      {/* <label className="flex-1">
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

                key={filters.dealType} 
                min={getPriceRange()[0]}
                max={getPriceRange()[1]}
                step={getStep()}
                value={[filters.minPrice, filters.maxPrice]}
                onInput={handlePriceChange}



                aria-label="Price range slider"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-1/2">
                <input
                  type="text"
                  aria-label="Minimum Price"
                  inputMode="text"
                  value={`${formatToMillions(filters.minPrice)} COP`}
                  onChange={(e) => {
                    const parsed = parseMillions(e.target.value);
                    const [minRange, maxRange] = getPriceRange();
                    if (!isNaN(parsed) && parsed >= minRange && parsed <= filters.maxPrice) {
                      handlePriceChange([parsed, filters.maxPrice]);
                    }
                  }}
                  placeholder={t("min")}
                  className="border border-black rounded-none w-full p-2 pr-10 outline-none font-light"
                />
              </div>

              <div className="relative w-1/2">
                <input
                  type="text"
                  aria-label="Maximum Price"
                  inputMode="text"
                  value={`${formatToMillions(filters.maxPrice)} COP`}
                  onChange={(e) => {
                    const parsed = parseMillions(e.target.value);
                    const [minRange, maxRange] = getPriceRange();
                    if (!isNaN(parsed) && parsed <= maxRange && parsed >= filters.minPrice) {
                      handlePriceChange([filters.minPrice, parsed]);
                    }
                  }}
                  placeholder={t("max")}
                  className="border border-black rounded-none w-full p-2 pr-1 outline-none font-light"
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </label> */}

      <label className="flex-1">
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
            {/* Slider */}
            <div id="range" className="mb-4">
              <RangeSlider
                key={filters.dealType} // Forces re-render when deal type changes
                min={getPriceRange()[0]}
                max={getPriceRange()[1]}
                step={getStep()}
                value={[filters.minPrice, filters.maxPrice]}
                onInput={handlePriceChange}
                aria-label="Price range slider"
              />
            </div>

            {/* Read-only Display */}
            <div className="flex items-center gap-2">
              {/* Min Price */}
              <div className="relative w-1/2">
                <input
                  type="text"
                  aria-label="Minimum Price"
                  value={`${filters.minPrice / 1_000_000}M`}
                  readOnly
                  className="bg-transparent border-none w-full p-2 text-center outline-none font-light"
                />
              </div>

              {/* Max Price */}
              <div className="relative w-1/2">
                <input
                  type="text"
                  aria-label="Maximum Price"
                  value={`${filters.maxPrice / 1_000_000}M`}
                  readOnly
                  className="bg-transparent border-none w-full p-2 text-center outline-none font-light"
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>

      <label className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full flex items-center justify-between rounded-md p-2 text-left bg-white"
            >
              <span>
                {t("propertyType")}
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


      {/* Area Range */}

      <label className="flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="w-full border-none p-0 text-left outline-none"
            aria-label="Area"
          >
            <div className="flex h-10 w-full items-center justify-between py-2">
              <p>{t("Area")}</p>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-5 w-[300px]">
            {/* Slider */}
            <div id="range" className="mb-4">
              <RangeSlider
                key={filters.dealType} // Forces re-render when deal type changes
                min={10}
                max={1000}
                step={5}
                value={[filters.minArea, filters.maxArea]}
                onInput={handleAreaChange}
                aria-label="Area range slider"
              />
            </div>

            {/* Read-only Display */}
            <div className="flex items-center gap-2">
              {/* Min Price */}
              <div className="relative w-1/2">
                <input
                  type="text"
                  aria-label="Minimum Area"
                  value={`${filters.minArea}m²`}
                  readOnly
                  className="bg-transparent border-none w-full p-2 text-center outline-none font-light"
                />
              </div>

              {/* Max Price */}
              <div className="relative w-1/2">
                <input
                  type="text"
                  aria-label="Maximum Area"
                  value={`${filters.maxArea}m²`}
                  readOnly
                  className="bg-transparent border-none w-full p-2 text-center outline-none font-light"
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>





{/*<label className="flex-1"> 
//   <Select 
//     onValueChange={(e) =>
//       updateFilter("beds", [e] as SearchFilters["beds"])
//     }
//     value={filters.beds.toString()}
//   >
//     <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
//       {t("beds")}
//     </SelectTrigger>
//     <SelectContent>
//       <SelectItem value="1">1</SelectItem>
//       <SelectItem value="2">2</SelectItem>
//       <SelectItem value="3">3</SelectItem>
//       <SelectItem value="4">4</SelectItem>
//       <SelectItem value="4+">4+</SelectItem>
//     </SelectContent>
//   </Select>
//   {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 whitespace-nowrap">
//         {filters.beds.length > 0
//           ? filters.beds.join(", ")
//           : t("selectBeds")}
//       </p> */}
 {/*</label>

// <label className="flex-1">
//   <Select
//     onValueChange={(e) =>
//       updateFilter("baths", [e] as SearchFilters["baths"])
//     }
//     value={filters.baths.toString()}
//   >
//     <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
//       {t("baths")}
//     </SelectTrigger>
//     <SelectContent>
//       <SelectItem value="1">1</SelectItem>
//       <SelectItem value="2">2</SelectItem>
//       <SelectItem value="3">3</SelectItem>
//       <SelectItem value="4">4</SelectItem>
//       <SelectItem value="4+">4+</SelectItem>
//     </SelectContent>
//   </Select>
//   {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 whitespace-nowrap">
//         {filters.baths.length > 0
//           ? filters.baths.join(", ")
//           : t("selectBaths")}
//       </p> */}
{/*</label>

// <label className="flex-1">
//   <Select
//     onValueChange={(e) =>
//       updateFilter("parking", [e] as SearchFilters["parking"])
//     }
//     value={filters.parking.toString()}
//   >
//     <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
//       {t("parking")}
//     </SelectTrigger>
//     <SelectContent>
//       <SelectItem value="1">1</SelectItem>
//       <SelectItem value="2">2</SelectItem>
//       <SelectItem value="3">3</SelectItem>
//       <SelectItem value="4">4</SelectItem>
//       <SelectItem value="4+">4+</SelectItem>
//     </SelectContent>
//   </Select>
//   {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 whitespace-nowrap">
//         {filters.baths.length > 0
//           ? filters.baths.join(", ")
//           : t("selectBaths")}
//       </p> */}
 {/*</label>*/}










      {/* Beds Filter */}
      <label className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-between w-full h-10 px-2 bg-white rounded-md text-left text-base focus:outline-none"
            >
              <span className="truncate">
                {t("beds")}

              </span>
              <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="start"
            className="w-full max-w-[200px] p-2 bg-white rounded-md shadow-md"
          >
            <div className="flex flex-col gap-2">
              {(() => {
                const allValues = ["1", "2", "3", "4", "4+"] as SearchFilters["beds"][number][];
                const allSelected = filters.beds?.length === allValues.length;

                return (
                  <label
                    className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={allSelected}
                        onChange={() => {
                          setFilters((prev): SearchFilters => ({
                            ...prev,
                            beds: allSelected ? [] : allValues,
                          }));
                        }}
                      />
                      <span>{t("SelectAll")}</span>
                    </div>
                    {allSelected && <Check className="w-4 h-4 text-green-600" />}
                  </label>
                );
              })()}

              {(["1", "2", "3", "4", "4+"] as SearchFilters["beds"][number][]).map(
                (value) => {
                  const isSelected = filters.beds?.includes(value);
                  return (
                    <label
                      key={value}
                      className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => {
                            setFilters((prev): SearchFilters => {
                              const current = prev.beds || [];
                              return {
                                ...prev,
                                beds: isSelected
                                  ? current.filter((v) => v !== value)
                                  : [...current, value],
                              };
                            });
                          }}
                        />
                        <span>{value}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-green-600" />}
                    </label>
                  );
                }
              )}
            </div>
          </PopoverContent>
        </Popover>
      </label>



            {/* Baths Filter */}

      <label className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-between w-full h-10 px-2 bg-white rounded-md text-left text-base focus:outline-none"
            >
              <span className="truncate">
                {t("baths")}

              </span>

              <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="start"
            className="w-full max-w-[200px] p-2 bg-white rounded-md shadow-md"
          >
            <div className="flex flex-col gap-2">
              {(() => {
                const allValues = ["1", "2", "3", "4", "4+"] as SearchFilters["baths"][number][];
                const allSelected = filters.baths?.length === allValues.length;

                return (
                  <label
                    className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={allSelected}
                        onChange={() => {
                          setFilters((prev): SearchFilters => ({
                            ...prev,
                            baths: allSelected ? [] : allValues,
                          }));
                        }}
                      />
                      <span>{t("SelectAll")}</span>
                    </div>
                    {allSelected && <Check className="w-4 h-4 text-green-600" />}
                  </label>
                );
              })()}

              {(["1", "2", "3", "4", "4+"] as SearchFilters["baths"][number][]).map(
                (value) => {
                  const isSelected = filters.baths?.includes(value);
                  return (
                    <label
                      key={value}
                      className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => {
                            setFilters((prev): SearchFilters => {
                              const current = prev.baths || [];
                              return {
                                ...prev,
                                baths: isSelected
                                  ? current.filter((v) => v !== value)
                                  : [...current, value],
                              };
                            });
                          }}
                        />
                        <span>{value}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-green-600" />}
                    </label>
                  );
                }
              )}
            </div>
          </PopoverContent>
        </Popover>
      </label>

      {/* Parking Filter */}
      <label className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-between w-full h-10 px-2 bg-white rounded-md text-left text-base focus:outline-none"
            >
              <span className="truncate">
                {t("parking")}
              </span>

              <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="start"
            className="w-full max-w-[200px] p-2 bg-white rounded-md shadow-md"
          >
            <div className="flex flex-col gap-2">
              {(() => {
                const allValues = ["1", "2", "3", "4", "4+"] as SearchFilters["parking"][number][];
                const allSelected = filters.parking?.length === allValues.length;

                return (
                  <label
                    className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={allSelected}
                        onChange={() => {
                          setFilters((prev): SearchFilters => ({
                            ...prev,
                            parking: allSelected ? [] : allValues,
                          }));
                        }}
                      />
                      <span>{t("SelectAll")}</span>
                    </div>
                    {allSelected && <Check className="w-4 h-4 text-green-600" />}
                  </label>
                );
              })()}

              {(["1", "2", "3", "4", "4+"] as SearchFilters["parking"][number][]).map(
                (value) => {
                  const isSelected = filters.parking?.includes(value);
                  return (
                    <label
                      key={value}
                      className="flex justify-between items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => {
                            setFilters((prev): SearchFilters => {
                              const current = prev.parking || [];
                              return {
                                ...prev,
                                parking: isSelected
                                  ? current.filter((v) => v !== value)
                                  : [...current, value],
                              };
                            });
                          }}
                        />
                        <span>{value}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-green-600" />}
                    </label>
                  );
                }
              )}
            </div>
          </PopoverContent>
        </Popover>
      </label>



      <label className="flex-1">
        <Select
          onValueChange={(val) =>
            updateFilter("sortBy", val as SearchFilters["sortBy"])
          }
          value={filters.sortBy}
        >
          <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
            {t("sortBy")}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">{t("recent")}</SelectItem>
            <SelectItem value="priceLowToHigh">{t("priceLowToHigh")}</SelectItem>
            <SelectItem value="priceHighToLow">{t("priceHighToLow")}</SelectItem>
            <SelectItem value="areaHighToLow">{t("areaHighToLow")}</SelectItem>
            <SelectItem value="areaLowToHigh">{t("areaLowToHigh")}</SelectItem>
          </SelectContent>
        </Select>
      </label>




      <div className="flex  flex-row w-[20%] justify-between">
        <Sheet>
          <SheetTrigger className="w-[45%] mr-[-20px] bg-secondary rounded-md border border-neutral-200 text-white px-3 py-2 whitespace-nowrap hover:bg-secondary2 transition duration-300">
            {t("more")}
          </SheetTrigger>
          <SheetContent >
            <SheetTitle className="mb-5 text-center text-secondary font-bold text-3xl">
              {t("advanceFilters")}
            </SheetTitle>
            <div className="flex flex-col h-full gap-3 overflow-y-scroll scrollbar scrollbar-none pb-12">
              {/* Property Type Filter */}

              {/* Price Range Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("administration")}
                </p>

                {/* Slider */}
                <div id="administration" className="mb-4">
                  <RangeSlider
                    type="range"
                    min={50_000}
                    max={1_000_000}
                    step={50_000}
                    value={[
                      Math.min(Math.max(filters.aminPrice, 50_000), 1_000_000),
                      Math.min(Math.max(filters.amaxPrice, 50_000), 1_000_000),
                    ]}
                    onInput={ahandlePriceChange}
                    aria-label="Price range slider"
                  />
                </div>


                {/* Inputs */}
                <div className="flex items-center gap-2">
                  {/* Min Price */}
                  <div className="relative w-1/2">
                    <input
                      type="number"
                      aria-label="Minimum Price"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={filters.aminPrice || ""}
                      onChange={(e) => {
                        const parsed = parseInt(e.target.value, 10);
                        if (!isNaN(parsed)) {
                          ahandlePriceChange([parsed, filters.amaxPrice]);
                        } else {
                          ahandlePriceChange([0, filters.amaxPrice]);
                        }
                      }}
                      placeholder={t("min")}
                      className="border border-black rounded-none w-full p-2 pr-12 outline-none font-light"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                      COP
                    </span>
                  </div>

                  {/* Max Price */}
                  <div className="relative w-1/2">
                    <input
                      type="number"
                      aria-label="Maximum Price"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={filters.amaxPrice || ""}
                      onChange={(e) => {
                        const parsed = parseInt(e.target.value, 10);
                        if (!isNaN(parsed)) {
                          ahandlePriceChange([filters.aminPrice, parsed]);
                        } else {
                          ahandlePriceChange([filters.aminPrice, 0]);
                        }
                      }}
                      placeholder={t("max")}
                      className="border border-black rounded-none w-full p-2 pr-12 outline-none font-light"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                      COP
                    </span>
                  </div>
                </div>
              </div>




              {/* <div>
                <p className="py-2 font-semibold text-primary">
                  {t("propertyType")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {PROPERTY_TYPES.map((type) => (
                    <FilterButton
                      key={type}
                      label={t(type)}
                      isSelected={filters.propertyType.includes(type)}
                      onClick={() => toggleArrayFilter("propertyType", type)}
                    />
                  ))}
                </div>
              </div> */}
              {/* Bedrooms Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("beds")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {BEDROOM_OPTIONS.map((bed) => (
                    <FilterButton
                      key={bed}
                      label={bed}
                      isSelected={filters.beds.includes(bed)}
                      onClick={() => toggleArrayFilter("beds", bed)}
                    />
                  ))}
                </div>
              </div>
              {/* Bathrooms Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("baths")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {BATHROOM_OPTIONS.map((bath) => (
                    <FilterButton
                      key={bath}
                      label={bath}
                      isSelected={filters.baths.includes(bath)}
                      onClick={() => toggleArrayFilter("baths", bath)}
                    />
                  ))}
                </div>
              </div>
              {/* parking spot */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("parking")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {PARKIING_OPTIONS.map((parking) => (
                    <FilterButton
                      key={parking}
                      label={parking}
                      isSelected={filters.parking.includes(parking)}
                      onClick={() => toggleArrayFilter("parking", parking)}
                    />
                  ))}
                </div>
              </div>
              {/* Views Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("views")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {VIEW_OPTIONS.map((view) => (
                    <FilterButton
                      key={view}
                      label={t(view)}
                      isSelected={filters.views.includes(view)}
                      onClick={() => toggleArrayFilter("views", view)}
                    />
                  ))}
                </div>
              </div>





              {/* Outdoor Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("outdoor")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {OUTDOOR_OPTIONS.map((out) => (
                    <FilterButton
                      key={out}
                      label={t(out)}
                      isSelected={filters.outdoor.includes(out)}
                      onClick={() => toggleArrayFilter("outdoor", out)}
                    />
                  ))}
                </div>
              </div>
              {/* Property Style Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("propertyStyle")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {PROPERTY_STYLES.map((style) => (
                    <FilterButton
                      key={style}
                      label={t(style)}
                      isSelected={filters.propertyStyle.includes(style)}
                      onClick={() =>
                        toggleArrayFilter("propertyStyle", style)
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("propertyStatus")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {PROPERTY_STATUS.map((status) => (
                    <FilterButton
                      key={status}
                      label={t(status)}
                      isSelected={filters.propertyStatus.includes(status)}
                      onClick={() =>
                        toggleArrayFilter("propertyStatus", status)
                      }
                    />
                  ))}
                </div>
              </div>
              {/* Floors Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("floors")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {FLOOR_OPTIONS.map((floor) => (
                    <FilterButton
                      key={floor}
                      label={t(floor)}
                      isSelected={filters.floors.includes(floor)}
                      onClick={() => toggleArrayFilter("floors", floor)}
                    />
                  ))}
                </div>
              </div>
              {/* Noise Level Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("noiseLevel")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {NOISE_LEVELS.map((noise) => (
                    <FilterButton
                      key={noise}
                      label={t(noise)}
                      isSelected={filters.noiseLevel.includes(noise)}
                      onClick={() => toggleArrayFilter("noiseLevel", noise)}
                    />
                  ))}
                </div>
              </div>
              {/* Laundry Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("laundry")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {LAUNDRY_OPTIONS.map((laund) => (
                    <FilterButton
                      key={laund}
                      label={t(laund)}
                      isSelected={filters.laundry.includes(laund)}
                      onClick={() => toggleArrayFilter("laundry", laund)}
                    />
                  ))}
                </div>
              </div>
              {/* Security Features Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("securityFeatures")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {SECURITY_FEATURES.map((sec) => (
                    <FilterButton
                      key={sec}
                      label={t(sec)}
                      isSelected={filters.securityFeatures.includes(sec)}
                      onClick={() =>
                        toggleArrayFilter("securityFeatures", sec)
                      }
                    />
                  ))}
                </div>
              </div>



              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("amenities")}
                </p>

                <div className="flex flex-col gap-4">
                  {AMENITIES_WITH_I.map((category) => (
                    <div key={category.id}>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        {t(category.name)}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {category.items.map((amenity) => (
                          <FilterButton
                            key={amenity}
                            label={t(amenity)}
                            isSelected={filters.amenities.includes(amenity)}
                            onClick={() => toggleArrayFilter("amenities", amenity)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Internet Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("internet")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {INTERNET_TYPES.map((net) => (
                    <FilterButton
                      key={net}
                      label={t(net)}
                      isSelected={filters.internet.includes(net)}
                      onClick={() => toggleArrayFilter("internet", net)}
                    />
                  ))}
                </div>
              </div>
              {/* Heating Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("waterHeater")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {HEATING_TYPES.map((heat) => (
                    <FilterButton
                      key={heat}
                      label={t(heat)}
                      isSelected={filters.heating.includes(heat)}
                      onClick={() => toggleArrayFilter("heating", heat)}
                    />
                  ))}
                </div>
              </div>
              {/* Cooling Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("coolingSystem")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {COOLING_TYPES.map((cool) => (
                    <FilterButton
                      key={cool}
                      label={t(cool)}
                      isSelected={filters.cooling.includes(cool)}
                      onClick={() => toggleArrayFilter("cooling", cool)}
                    />
                  ))}
                </div>
              </div>
              {/* Nearby Infrastructure Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("nearbyInfrastructure")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {NEARBY_INFRASTRUCTURE.map((infra) => (
                    <FilterButton
                      key={infra}
                      label={t(infra)}
                      isSelected={filters.nearbyInfrastructure.includes(
                        infra
                      )}
                      onClick={() =>
                        toggleArrayFilter("nearbyInfrastructure", infra)
                      }
                    />
                  ))}
                </div>
              </div>
              {/* Power Backup Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  {t("powerBackup")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {POWER_BACKUP.map((power) => (
                    <FilterButton
                      key={power}
                      label={t(power)}
                      isSelected={filters.powerBackup.includes(power)}
                      onClick={() => toggleArrayFilter("powerBackup", power)}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-5 flex w-full mb-20">
                <SheetClose
                  onClick={() => {
                    setFilters({
                      dealType: "",
                      condition: filters.condition,
                      propertyType: [],
                      minPrice: 50,
                      maxPrice: 500,
                      aminPrice: 50,
                      amaxPrice: 500,
                      minArea: 0,
                      maxArea: 1000,
                      radius: "",
                      beds: [],
                      baths: [],
                      parking: [],
                      views: [],
                      outdoor: [],
                      propertyStyle: [],
                      propertyStatus: [],
                      floors: [],
                      noiseLevel: [],
                      laundry: [],
                      securityFeatures: [],
                      amenities: [],
                      internet: [],
                      heating: [],
                      cooling: [],
                      location: location,
                      nearbyInfrastructure: [],
                      powerBackup: [],
                      sortBy: "",
                    });
                    router.push(`/properties?dealType=${filters.dealType}`);
                  }}
                  className="text-black text-lg py-1 rounded-none bg-neutral-200 hover:bg-neutral-300 w-full"
                >
                  {t("clear")}
                </SheetClose>
                <SheetClose
                  onClick={handleSearch}
                  className="text-white text-lg rounded-none py-1 bg-secondary hover:bg-secondary2 w-full"
                >
                  {t("search")}
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Button
          variant="primary"
          onClick={handleSearch}
          className="text-white text-lg px-6 rounded-md w-[45%]  "
        >
          {t("search")}
        </Button>
      </div>

    </div>
    //   </div >
    // </div >
  );
};

export default SearchCard;
