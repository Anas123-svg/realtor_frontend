
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardFour from "@/components/cards/cardFour";
import { useTranslation } from "react-i18next";
import MapBox from "@/components/common/mapbox"; // Assuming you move map code into this component

interface Props {
    products: Partial<Property>[];
    loading: boolean;
}

const GridFourS = ({ products, loading }: Props) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
                {[...Array(9)].map((_, index) => (
                    <Skeleton key={index} className="rounded-xl h-[60vh]" />
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

    const firstTwo = products.slice(0, 2);
    const remaining = products.slice(2);

    return (
        <div className="my-10 space-y-6">
            {/* First Row: Two Cards + Map */}
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {firstTwo.map((product) => (
                        <CardFour key={product.id} product={product} />
                    ))}
                </div>
                <div className="w-full lg:w-[49%] ">
                    <MapBox />
                </div>
            </div>

            {/* Remaining cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {remaining.map((product) => (
                    <CardFour key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default GridFourS;
