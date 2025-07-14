// src/utils/searchUtils.ts
import { SearchFilters } from "@/types/searchTypes";

export const parseSearchParams = (
  searchParams: URLSearchParams
): Partial<SearchFilters> => {
  const parseJsonParam = <T>(param: string | null): T[] =>
    param ? JSON.parse(param) : [];

  return {
    dealType: searchParams.get("dealType") || undefined,
    condition: searchParams.get("condition") || undefined,
    location: searchParams.get("location")
      ? JSON.parse(searchParams.get("location")!)
      : undefined,
    radius: searchParams.get("radius") || undefined,
    propertyType: parseJsonParam(searchParams.get("propertyType")),
    minPrice: Number(searchParams.get("min")) || undefined,
    maxPrice: Number(searchParams.get("max")) || undefined,
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

export const buildSearchQuery = (
  filters: Partial<SearchFilters>
): URLSearchParams => {
  const query = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value) && value.length > 0) {
        query.append(key, JSON.stringify(value));
      } else if (!Array.isArray(value)) {
        query.append(
          key,
          typeof value === "object" ? JSON.stringify(value) : value.toString()
        );
      }
    }
  });






  return query;
};
