// src/utils/searchUtils.ts
import { locations } from "@/constants";
import { SearchFilters } from "@/types/searchTypes";

export const parseSearchParams = (
  searchParams: URLSearchParams
): Partial<SearchFilters> => {
  const parseJsonParam = <T>(param: string | null): T[] =>
    param ? JSON.parse(param) : [];

  return {
    dealType: searchParams.get("dealType") || undefined,
    condition: searchParams.get("condition") || undefined,

    location: searchParams.get("locations")
      ? JSON.parse(searchParams.get("locations")!)
      : [],

    radius: searchParams.get("radius") || undefined,
    propertyType: parseJsonParam(searchParams.get("propertyType")),
    minPrice: Number(searchParams.get("min")) || undefined,
    maxPrice: Number(searchParams.get("max")) || undefined,
    minArea: Number(searchParams.get("min")) || undefined,
    maxArea: Number(searchParams.get("max")) || undefined,

    beds: parseJsonParam(searchParams.get("beds")),
    baths: parseJsonParam(searchParams.get("baths")),
    views: parseJsonParam(searchParams.get("views")),
    outdoor: parseJsonParam(searchParams.get("outdoor")),
    propertyStyle: parseJsonParam(searchParams.get("propertyStyle")),
    propertyStatus: parseJsonParam(searchParams.get("propertyStatus")),
    floors: parseJsonParam(searchParams.get("floors")),
    noiseLevel: parseJsonParam(searchParams.get("noiseLevel")),
    laundry: parseJsonParam(searchParams.get("laundry")),
    securityFeatures: parseJsonParam(searchParams.get("securityFeatures")),
    amenities: parseJsonParam(searchParams.get("amenities")),
    internet: parseJsonParam(searchParams.get("internet")),
    heating: parseJsonParam(searchParams.get("heating")),
    cooling: parseJsonParam(searchParams.get("cooling")),
    nearbyInfrastructure: parseJsonParam(
      searchParams.get("nearbyInfrastructure")
    ),
    powerBackup: parseJsonParam(searchParams.get("powerBackup")),
  };
};



// utils/searchUtils.ts
export const buildSearchQuery = (filters: Record<string, any>) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      if (key === "location" || key === "locations") {
        // Serialize full location objects as JSON string in "locations" param
        if (value.length) params.set("locations", JSON.stringify(value));
      } else {
        if (value.length) params.set(key, JSON.stringify(value));
      }
    } else {
      params.set(key, String(value));
    }
  });

  return params;
};
