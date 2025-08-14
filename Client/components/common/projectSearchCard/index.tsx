import React, { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { RADIUS_OPTIONS, locations } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";

const MIN_PRICE = 50000000;
const MAX_PRICE = 5000000000;

interface Filters {
  location: string;
  radius: string;
  minPrice: number;
  maxPrice: number;
  delivery_time: string;
  reason: string;
}

const ProjectSearchCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    location: "0",
    radius: "",
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
    delivery_time: "",
    reason: "",
  });

  useEffect(() => {
    setFilters({
      location: searchParams.get("id") || "0",
      radius: searchParams.get("radius") || "",
      minPrice: Number(searchParams.get("minPrice")) || MIN_PRICE,
      maxPrice: Number(searchParams.get("maxPrice")) || MAX_PRICE,
      delivery_time: searchParams.get("delivery_time") || "",
      reason: searchParams.get("reason") || "",
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
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        longitude: selectedLocation.longitude.toString(),
        latitude: selectedLocation.latitude.toString(),
        region: selectedLocation.region,
        radius: filters.radius,
        delivery_time: filters.delivery_time,
        reason: filters.reason,
        id: selectedLocation.id.toString(),
      });

      router.push(`/projects?${queryParams.toString()}`);
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
      className="bg-white mt-10 px-6 py-8 border rounded-[20px] flex justify-between items-center w-full shadow-lg whitespace-nowrap"
    >
      <div className="flex flex-col xl:flex-row gap-14 items-end w-full">
        <div className="flex flex-col sm:flex-row gap-5 items-end w-full">
          <label className="w-full">
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, location: value }))
              }
              value={filters.location}
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

          </label>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
            {selectedLocation.label
              ? selectedLocation.label
              : t("selectLocation")}
          </p>



          <label className="w-full">
            <Select
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, radius: e }))
              }
              disabled={
                !selectedLocation.longitude || !selectedLocation.latitude
              }
              value={filters.radius}
            >
              <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                {filters.radius
                  ? `${filters.radius} ${t("miles")}`
                  : t("Radius")}
              </SelectTrigger>

              <SelectContent>
                {RADIUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.value + " " + t("miles")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

        </div>
        {/* <label className="w-full">
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
                  min={MIN_PRICE}
                  max={MAX_PRICE}
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
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 whitespace-nowrap">
            {formatCurrency(filters.minPrice)} COP -{" "}
            {formatCurrency(filters.maxPrice)} COP
          </p>
        </label> */}

        <label className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="w-full border-none p-0 text-left outline-none"
              aria-label="Price Range"
            >
              <div className="flex h-10 w-full items-center justify-between py-2">
                <p className="truncate text-sm text-muted-foreground">
                  {filters.minPrice || filters.maxPrice
                    ? `${formatCurrency(filters.minPrice)} COP - ${formatCurrency(filters.maxPrice)} COP`
                    : t("priceRange")}
                </p>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-5 w-[300px]">
              <div id="range" className="mb-4">
                <RangeSlider
                  min={MIN_PRICE}
                  max={MAX_PRICE}
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
        </label>

        <div className="w-full flex gap-5 flex-col sm:flex-row">
          <label className="w-full">
            <Select
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, delivery_time: e }))
              }
              value={filters.delivery_time}
            >
              <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                {t("deliveryTime")}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Immediate">{t("Immediate")}</SelectItem>
                <SelectItem value="Under 6 months">
                  {t("Under 6 months")}
                </SelectItem>
                <SelectItem value="Under a year">
                  {t("Under a year")}
                </SelectItem>
                <SelectItem value="Under 2 years">
                  {t("Under 2 years")}
                </SelectItem>
                <SelectItem value="Under 3 years">
                  {t("Under 3 years")}
                </SelectItem>
                <SelectItem value="Under 5 years">
                  {t("Under 5 years")}
                </SelectItem>
              </SelectContent>
            </Select>

          </label>
          {/* <p className="rounded-md border border-neutral-200 bg-white  py-2 text-neutral-500 whitespace-nowrap">
            {filters.delivery_time
              ? t(filters.delivery_time)
              : t("selectDeliveryTime")}
          </p> */}



          <label className="w-full">
            <Select
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, reason: e }))
              }
              value={filters.reason}
            >
              <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                {t("typeOfInvestment")}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="For Valuation and Sale">
                  {t("For Valuation and Sale")}
                </SelectItem>
                <SelectItem value="Personal Use">
                  {t("Personal Use")}
                </SelectItem>
                <SelectItem value="Tourist Rental">
                  {"Tourist Rental"}
                </SelectItem>
                <SelectItem value="Long-term Rental">
                  {t("Long-term Rental")}
                </SelectItem>
              </SelectContent>
            </Select>

          </label>
          {/* <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 whitespace-nowrap">
            {filters.reason ? t(filters.reason) : t("selectTypeOfInvestment")}
          </p> */}
        </div>
        <div className=" w-full mx-auto">
          <Button
            variant="primary"
            className="text-white text-lg px-8  rounded-md w-[100%]"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("searching") : t("search")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProjectSearchCard;
