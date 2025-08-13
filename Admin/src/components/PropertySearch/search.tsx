"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { AMENITIE, NEARBY_INFRASTRUCTURE, PROPERTY_STATUS, PROPERTY_STYLES, PROPERTY_TYPES, RADIUS_OPTIONS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

import { Check } from "lucide-react";
//@ts-ignore
import "react-range-slider-input/dist/style.css";
import { locations } from "@/constants";
import { useTranslation } from "react-i18next";
// import { formatCurrency } from "@/lib/utils";

interface Filters {
    propertyType: string[];
    propertyStyle: string[];
    propertyStatus: string[];
    nearbyInfrastructure: string[];
    location: string[]; // change to string[] instead of array of objects
    amenities: string[]; // ✅ New


}


const SearchCard: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();



    const [filters, setFilters] = useState<Filters>({
        propertyType: [],
        propertyStyle: [],
        propertyStatus: [],
        nearbyInfrastructure: [],
        location: [],
        amenities: [], // ✅ New


    });




    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {


        setFilters({
            propertyType: searchParams.get("propertyType")
                ? JSON.parse(searchParams.get("propertyType")!) // ["House", "Apartment"]
                : [],

            propertyStyle: searchParams.get("propertyStyle")
                ? JSON.parse(searchParams.get("propertyStyle")!) // ["House", "Apartment"]
                : [],
            propertyStatus: searchParams.get("propertyStatus")
                ? JSON.parse(searchParams.get("propertyStatus")!) // ["House", "Apartment"]
                : [],

            nearbyInfrastructure: searchParams.get("nearbyInfrastructure")
                ? JSON.parse(searchParams.get("nearbyInfrastructure")!) // ["House", "Apartment"]
                : [],

            location: searchParams.get("locations")
                ? JSON.parse(searchParams.get("locations")!).map((id: number) =>
                    locations.find((l) => l.id === id)
                ).filter(Boolean) // keep only valid ones
                : [],
            amenities: searchParams.get("amenities")
                ? JSON.parse(searchParams.get("amenities")!) // ["Gym", "Tennis court"]
                : [],

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
            // If no location is selected, stop early


            // Use the first selected location for coordinates
            const selectedLocation = locations.find(
                loc => loc.id.toString() === filters.location[0]
            );


            const queryParams = new URLSearchParams({
                propertyType: JSON.stringify(filters.propertyType),
                propertyStyle: JSON.stringify(filters.propertyStyle),
                propertyStatus: JSON.stringify(filters.propertyStatus),
                nearbyInfrastructure: JSON.stringify(filters.nearbyInfrastructure),
                amenities: JSON.stringify(filters.amenities), // ✅ Added
                locations: JSON.stringify(
                    selectedLocations.map(loc => ({
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        region: loc.region,
                        id: loc.id
                    }))
                )
            });

            router.push(`properties?${queryParams.toString()}`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const selectedLocations = locations.filter(loc =>
        filters.location.includes(loc.id.toString())
    );

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-[95%] mx-auto whitespace-nowrap rounded-xl p-5 gap-4 flex flex-row flex-nowrap text-center sm:text-left items-center border border-zinc-300"
                role="search"
            >
                <div className="w-full flex flex-col sm:flex-row lg:flex-nowrap flex-wrap gap-4">
                    {/* Property Type */}
                    <label className="flex-1 ">
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
                                        <SelectItem
                                            key={type}
                                            value={type}
                                            className="flex justify-between items-center"
                                        >
                                            <div className="flex items-center justify-between gap-2 w-full">
                                                <span>{t(type)}</span>
                                                {selected && <Check className="w-4 h-4" />}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </label>

                    {/* Property Style */}
                    <label className="flex-1 ">
                        <Select
                            onValueChange={(value) => {
                                setFilters((prev) => {
                                    const current = prev.propertyStyle || [];
                                    return {
                                        ...prev,
                                        propertyStyle: current.includes(value)
                                            ? current.filter((t) => t !== value)
                                            : [...current, value],
                                    };
                                });
                            }}
                            value=""
                        >
                            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                                {t("propertyStyle")}
                            </SelectTrigger>
                            <SelectContent>
                                {PROPERTY_STYLES.map((type) => {
                                    const selected = filters.propertyStyle?.includes(type);
                                    return (
                                        <SelectItem
                                            key={type}
                                            value={type}
                                            className="flex justify-between items-center"
                                        >
                                            <div className="flex items-center justify-between gap-2 w-full">
                                                <span>{t(type)}</span>
                                                {selected && <Check className="w-4 h-4" />}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </label>

                    {/* Property Status */}
                    <label className="flex-1 ">
                        <Select
                            onValueChange={(value) => {
                                setFilters((prev) => {
                                    const current = prev.propertyStatus || [];
                                    return {
                                        ...prev,
                                        propertyStatus: current.includes(value)
                                            ? current.filter((t) => t !== value)
                                            : [...current, value],
                                    };
                                });
                            }}
                            value=""
                        >
                            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                                {t("propertyStatus")}
                            </SelectTrigger>
                            <SelectContent>
                                {PROPERTY_STATUS.map((type) => {
                                    const selected = filters.propertyStatus?.includes(type);
                                    return (
                                        <SelectItem
                                            key={type}
                                            value={type}
                                            className="flex justify-between items-center"
                                        >
                                            <div className="flex items-center justify-between gap-2 w-full">
                                                <span>{t(type)}</span>
                                                {selected && <Check className="w-4 h-4" />}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </label>

                    {/* Location */}
                    <label className="flex-1 ">
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
                                        <SelectItem
                                            key={location.id}
                                            value={location.id.toString()}
                                            className="flex justify-between items-center"
                                        >
                                            <span>{location.label}</span>
                                            {isSelected && <span className="ml-2">✔</span>}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </label>

                    {/* Nearby Infrastructure */}
                    <label className="flex-1 ">
                        <Select
                            onValueChange={(value) => {
                                setFilters((prev) => {
                                    const current = prev.nearbyInfrastructure || [];
                                    return {
                                        ...prev,
                                        nearbyInfrastructure: current.includes(value)
                                            ? current.filter((t) => t !== value)
                                            : [...current, value],
                                    };
                                });
                            }}
                            value=""
                        >
                            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                                {t("nearbyInfrastructure")}
                            </SelectTrigger>
                            <SelectContent>
                                {NEARBY_INFRASTRUCTURE.map((type) => {
                                    const selected = filters.nearbyInfrastructure?.includes(type);
                                    return (
                                        <SelectItem
                                            key={type}
                                            value={type}
                                            className="flex justify-between items-center"
                                        >
                                            <div className="flex items-center justify-between gap-2 w-full">
                                                <span>{t(type)}</span>
                                                {selected && <Check className="w-4 h-4" />}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </label>

                    {/* Amenities */}
                    <label className="flex-1 ">
                        <Select
                            onValueChange={(value) => {
                                setFilters((prev) => {
                                    const current = prev.amenities || [];
                                    return {
                                        ...prev,
                                        amenities: current.includes(value)
                                            ? current.filter((t) => t !== value)
                                            : [...current, value],
                                    };
                                });
                            }}
                            value=""
                        >
                            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
                                {t("amenities")}
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(AMENITIE).map(([category, items]) => (
                                    <div key={category}>
                                        <div className="px-3 py-1 font-semibold text-sm text-gray-600">
                                            {t(category)}
                                        </div>
                                        {items.map((item) => {
                                            const selected = filters.amenities?.includes(item);
                                            return (
                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                    className="flex justify-between items-center"
                                                >
                                                    <div className="flex items-center justify-between gap-2 w-full">
                                                        <span>{t(item)}</span>
                                                        {selected && <Check className="w-4 h-4" />}
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </div>
                                ))}
                            </SelectContent>
                        </Select>
                    </label>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    className="rounded-xl w-full lg:w-auto py-4 px-6"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t("searching") : t("searchProperty")}
                </Button>
            </form>
        </>
    );


};

export default SearchCard;
