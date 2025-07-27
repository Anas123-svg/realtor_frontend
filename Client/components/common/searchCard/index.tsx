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
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";
const MIN_PRICE_RENTAL = 500000;
const MAX_PRICE_RENTAL = 10000000;
const MIN_PRICE_SALE = 50000000;
const MAX_PRICE_SALE = 5000000000;

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
  // State management with type safety
  const [location, setLocation] = useState<Location>(
    initialFilters.location || {
      id: 0,
      label: "",
      longitude: 0,
      latitude: 0,
      region: "",
    }
  );
  useEffect(() => {
    if (inputRef.current && location.region) {
      inputRef.current.value = location.region;
    }
  }, [location.region]);

  const [filters, setFilters] = useState<SearchFilters>({
    dealType: initialFilters.dealType || "",
    condition: initialFilters.condition || "",
    propertyType: initialFilters.propertyType || [],
    minPrice:
      initialFilters.minPrice || initialFilters.dealType === "Sale"
        ? MIN_PRICE_SALE
        : MIN_PRICE_RENTAL,
    maxPrice:
      initialFilters.maxPrice || initialFilters.dealType === "Sale"
        ? MAX_PRICE_SALE
        : MAX_PRICE_RENTAL,
    radius: initialFilters.radius || "",
    beds: initialFilters.beds || [],
    baths: initialFilters.baths || [],
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
    location: location,
    sortBy: initialFilters.sortBy || "recent",
  });

  // Handle place selection with error handling
  // const handlePlaceChanged = useCallback(() => {
  //   try {
  //     if (autocompleteRef.current) {
  //       const place = autocompleteRef.current.getPlace();
  //       if (!place.geometry || !place.geometry.location) {
  //         toast.error("Error selecting place. Please try again.");
  //         return;
  //       }

  //       const lat = place.geometry.location?.lat();
  //       const lng = place.geometry.location?.lng();

  //       if (lat !== undefined && lng !== undefined) {
  //         const newLocation = {
  //           latitude: lat,
  //           longitude: lng,
  //           region: place.formatted_address || "",
  //         };
  //         setLocation(newLocation);
  //         setFilters((prev) => ({ ...prev, location: newLocation }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error selecting place:", error);
  //     toast.error("Error selecting place. Please try again.");
  //   }
  // }, []);

  const handleLocationChange = useCallback((value: string) => {
    const selectedLocation = locations.find(
      (loc) => loc.id === parseInt(value)
    );
    if (selectedLocation) {
      setLocation(selectedLocation);
      setFilters((prev) => ({ ...prev, location: selectedLocation }));
    }
  }, []);

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

  // Handle search with validation
  const handleSearch = useCallback(() => {
    let updatedFilters = { ...filters };
    if (location.latitude && location.longitude)
      updatedFilters = { ...filters, location };
    else updatedFilters = { ...filters, location: undefined };

    const query = buildSearchQuery(updatedFilters);

    // Optional callback for external handling
    onSearchComplete?.(updatedFilters);

    // Navigate to properties page with search params
    router.push(`/properties?${query.toString()}`);
  }, [filters, location, router, onSearchComplete]);

  return (
    <div className="bg-white px-4 py-3 border rounded-md  flex justify-between items-center w-full shadow-lg sticky top-10 z-20">
      {/* // <div className="bg-white border rounded-md px-4 py-10 shadow-sm w-full sticky top-10 z-20"> */}

      <div className="flex flex-col lg:flex-row gap-5 items-end w-full">
        <div className="w-full flex flex-col sm:flex-row gap-5 whitespace-nowrap">
          <label className="w-full">
            {/* <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceChanged}
            >
              <Input
                ref={inputRef}
                placeholder="Search by location"
                aria-label="Location search"
              />
            </Autocomplete> */}
            <Select
              onValueChange={handleLocationChange}
              value={filters.location?.id?.toString()}
            >
              <SelectTrigger
                className="border-none gap-2 focus:ring-0 p-0 text-base"
                aria-label="Location"
              >
                {t("location")}
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
              {filters.location?.label
                ? filters.location?.label
                : t("selectLocation")}
            </p> */}
          </label>
          <label className="w-full">
            <Select
              onValueChange={(e) => updateFilter("radius", e)}
              disabled={!location.longitude || !location.latitude}
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
        </div>
        <div className="w-full flex gap-5 flex-col sm:flex-row">
          <label className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-[200px] border-none p-0 text-left outline-none"
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
            {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 whitespace-nowrap">
              {formatCurrency(filters.minPrice)} COP -{" "}
              {formatCurrency(filters.maxPrice)} COP
            </p> */}
          </label>
          <label className="w-full">
            <Select
              onValueChange={(e) =>
                updateFilter("beds", [e] as SearchFilters["beds"])
              }
              value={filters.beds.toString()}
            >
              <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                {t("beds")}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="4+">4+</SelectItem>
              </SelectContent>
            </Select>
            {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 whitespace-nowrap">
              {filters.beds.length > 0
                ? filters.beds.join(", ")
                : t("selectBeds")}
            </p> */}
          </label>
          <label className="w-full">
            <Select
              onValueChange={(e) =>
                updateFilter("baths", [e] as SearchFilters["baths"])
              }
              value={filters.baths.toString()}
            >
              <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                {t("baths")}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="4+">4+</SelectItem>
              </SelectContent>
            </Select>
            {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 whitespace-nowrap">
              {filters.baths.length > 0
                ? filters.baths.join(", ")
                : t("selectBaths")}
            </p> */}
          </label>
          <label className="w-full">
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
              </SelectContent>
            </Select>
          </label>

        </div>
        <div className="flex gap-5 w-full flex-col sm:flex-row">
          <Sheet>
            <SheetTrigger className="w-full bg-secondary rounded-md border border-neutral-200 text-white px-3 py-2 whitespace-nowrap hover:bg-secondary2 transition duration-300">
              {t("more")}
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="mb-5 text-center text-secondary font-bold text-3xl">
                {t("advanceFilters")}
              </SheetTitle>
              <div className="flex flex-col h-full gap-3 overflow-y-scroll scrollbar scrollbar-none pb-12">
                {/* Property Type Filter */}
                <div>
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
                </div>
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
                {/* Amenities Filter */}
                {/* <div>
                  <p className="py-2 font-semibold text-primary text-base">
                    {t("amenities")}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {AMENITIES.map((amen) => (
                      <FilterButton
                        key={amen}
                        label={t(amen)}
                        isSelected={filters.amenities.includes(amen)}
                        onClick={() => toggleArrayFilter("amenities", amen)}
                      />
                    ))}
                  </div>
                </div> */}


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
                        radius: "",
                        beds: [],
                        baths: [],
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
            className="text-white text-lg px-8 rounded-md w-full"
          >
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
