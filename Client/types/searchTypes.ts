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
  PROPERTY_STATUS,
  NEARBY_INFRASTRUCTURE,
  POWER_BACKUP,
  PARKIING_OPTIONS,
} from "@/constants";

export interface Location {
  id: number;
  label: string;
  longitude: number;
  latitude: number;
  region: string;
}

export interface SearchFilters {
  dealType?: string;
  condition?: string;
  location?: Location[]; // changed from Location to Location[]
  radius?: string;
  propertyType: Array<(typeof PROPERTY_TYPES)[number]>;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  aminPrice: number;
  amaxPrice: number;
  beds: Array<(typeof BEDROOM_OPTIONS)[number]>;
  baths: Array<(typeof BATHROOM_OPTIONS)[number]>;
  parking: Array<(typeof PARKIING_OPTIONS)[number]>;
  views: Array<(typeof VIEW_OPTIONS)[number]>;
  outdoor: Array<(typeof OUTDOOR_OPTIONS)[number]>;
  propertyStyle: Array<(typeof PROPERTY_STYLES)[number]>;
  propertyStatus: Array<(typeof PROPERTY_STATUS)[number]>;
  floors: Array<(typeof FLOOR_OPTIONS)[number]>;
  noiseLevel: Array<(typeof NOISE_LEVELS)[number]>;
  laundry: Array<(typeof LAUNDRY_OPTIONS)[number]>;
  securityFeatures: Array<(typeof SECURITY_FEATURES)[number]>;
  amenities: Array<(typeof AMENITIES)[number]>;
  internet: Array<(typeof INTERNET_TYPES)[number]>;
  heating: Array<(typeof HEATING_TYPES)[number]>;
  cooling: Array<(typeof COOLING_TYPES)[number]>;
  nearbyInfrastructure: Array<(typeof NEARBY_INFRASTRUCTURE)[number]>;
  powerBackup: Array<(typeof POWER_BACKUP)[number]>;
  sortBy?: string;

}

export interface SearchCardProps {
  dealType?: string;
  condition?: string;
  onSearchComplete?: (filters: SearchFilters) => void;
  sortBy?: SearchFilters["sortBy"];
}
