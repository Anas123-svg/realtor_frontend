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
import { PROPERTY_TYPES } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Switch } from "@/components/ui/switch";
import { locations } from "@/constants";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";

interface Filters {
  propertyType: string;
  location: string;
  dealType: "Sale" | "Rental";
  minPrice: number;
  maxPrice: number;
}

const MIN_PRICE_RENTAL = 500000;
const MAX_PRICE_RENTAL = 10000000;
const MIN_PRICE_SALE = 50000000;
const MAX_PRICE_SALE = 5000000000;

const SearchCard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    propertyType: "House",
    location: "0",
    dealType: "Sale",
    minPrice: MIN_PRICE_SALE,
    maxPrice: MAX_PRICE_SALE,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const dealType =
      (searchParams.get("dealType") as "Sale" | "Rental") || "Sale";
    const minPrice = dealType === "Sale" ? MIN_PRICE_SALE : MIN_PRICE_RENTAL;
    const maxPrice = dealType === "Sale" ? MAX_PRICE_SALE : MAX_PRICE_RENTAL;

    setFilters({
      propertyType: searchParams.get("propertyType") || "House",
      location: searchParams.get("id") || "0",
      dealType,
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
        propertyType: filters.propertyType,
        dealType: filters.dealType,
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        longitude: selectedLocation.longitude.toString(),
        latitude: selectedLocation.latitude.toString(),
        region: selectedLocation.region,
        radius: "5",
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
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, propertyType: value }))
            }
            value={filters.propertyType}
          >
            <SelectTrigger
              className="border-none gap-2 focus:ring-0 p-0 text-base"
              aria-label="Property Type"
            >
              {t("propertyType")}
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {t(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="font-semibold ">{t(filters.propertyType)}</p>
        </label>

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
          <p className="font-semibold ">{selectedLocation.label}</p>
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
          <p className="font-semibold">
            {formatCurrency(filters.minPrice)} COP -{" "}
            {formatCurrency(filters.maxPrice)} COP
          </p>
        </label>

        <label className="w-full flex items-center justify-center gap-3">
          <span className="font-semibold">{t("sale")}</span>
          <Switch
            checked={filters.dealType === "Rental"}
            onCheckedChange={() => {
              setFilters((prev) => {
                const newDealType =
                  prev.dealType === "Sale" ? "Rental" : "Sale";
                return {
                  ...prev,
                  dealType: newDealType,
                  minPrice:
                    newDealType === "Sale" ? MIN_PRICE_SALE : MIN_PRICE_RENTAL,
                  maxPrice:
                    newDealType === "Sale" ? MAX_PRICE_SALE : MAX_PRICE_RENTAL,
                };
              });
            }}
            aria-label="Toggle between Sale and Rental"
          />
          <span className="font-semibold">{t("rental")}</span>
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
