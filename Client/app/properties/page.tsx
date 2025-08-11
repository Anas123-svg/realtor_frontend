"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import SearchCard from "@/components/common/searchCard";
import GridThree from "@/components/grids/gridThree";
import { LayoutGrid, Rows3, Target } from "lucide-react";
import GridFour from "@/components/grids/gridFour";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { useRouter } from "next/navigation";
import {
  buildSearchQuery,
  parseSearchParams,
} from "@/components/common/searchCard/utility";
import { SearchFilters } from "@/types/searchTypes";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import GridFourS from "@/components/grids/gridFourS";
import GridThreeS from "@/components/grids/gridThreeS";
const Properties = () => {
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams]
  );
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 11.2403547, lng: -74.2110227 });
  const [properties, setProperties] = useState<Partial<Property>[]>([]);
  const { t } = useTranslation();

  const initialFilters = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams]
  );

  const fetchProperties = useCallback(
    async (filters: Partial<SearchFilters>) => {
      const query =
        filters && Object.keys(filters).length > 0
          ? buildSearchQuery(filters)
          : "";

      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/search/properties?${query}`
        );

        setProperties(response.data.data || []);

        if (Array.isArray(filters.location) && filters.location.length > 0) {
          const firstValidLocation = filters.location.find(
            (loc) => loc.latitude && loc.longitude
          );

          if (firstValidLocation) {
            setCenter({
              lat: Number(firstValidLocation.latitude),
              lng: Number(firstValidLocation.longitude),
            });
          }
        }

      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProperties(initialFilters);
  }, [fetchProperties, initialFilters]);

  const handleSearchComplete = useCallback(
    async (filters: SearchFilters) => {
      await fetchProperties(filters);
    },
    [fetchProperties]
  );



  return (
    <div className="pt-16">
      <div className="container mt-[2.2%] py-2 flex justify-center mb-2">
        <SearchCard onSearchComplete={handleSearchComplete} />
      </div>

      <h1 className="py-1 my-0 font-hel text-2xl sm:text-3xl md:text-4xl text-primary text-center">
        {filters.dealType == "Sale"
          ? t("existingProperties")
          : filters.dealType == "Rental"
            ? t("rentalProperties")
            : null}
      </h1>



      <div className="container">
        <div className="hidden md:block w-full relative h-1">
          <div className="flex gap-3 absolute right-0">
            <button onClick={() => setView("grid")}>
              <LayoutGrid size={30} className="text-primary" />
            </button>
            <button onClick={() => setView("list")}>
              <Rows3 size={30} className="text-primary" />
            </button>
          </div>
        </div>
        {view === "grid" ? (
          <GridFourS products={properties} loading={loading} />
        ) : (
          <GridThreeS products={properties} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Properties;
