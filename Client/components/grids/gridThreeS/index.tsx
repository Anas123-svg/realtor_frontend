import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardThree from "@/components/cards/cartThree";
import { useTranslation } from "react-i18next";
import MapBox from "@/components/common/mapbox"; // Map component

interface Props {
    products: Partial<Property>[];
    loading: boolean;
}

const GridThreeS = ({ products, loading }: Props) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="flex flex-col gap-10 my-10">
                {[...Array(9)].map((_, index) => (
                    <Skeleton key={index} className="w-full h-60 rounded-none" />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
                <span>{t("noProperties")}</span>
            </div>
        );
    }

    const [, ...remaining] = products; // skip the first card, we will show map

    return (
        <div className="flex flex-col gap-10 my-10">
            {/* Show Map instead of first card */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden">
                <MapBox />
            </div>

            {/* Remaining cards */}
            {remaining.map((product) => (
                <CardThree key={product.id} product={product} />
            ))}
        </div>
    );
};

export default GridThreeS;