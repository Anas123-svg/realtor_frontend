import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardOne from "@/components/cards/cardOne";
import { useTranslation } from "react-i18next";

interface Props {
  products: Partial<Property>[];
  loading: boolean;
}

const GridOne = ({ products, loading }: Props) => {
  const { t } = useTranslation();
  return loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10 mt-10">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="rounded-2xl" />
      ))}
    </div>
  ) : products.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10 mt-10">
      {products.map((product) => (
        <CardOne key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
      <span>{t("noProperties")}</span>
    </div>
  );
};

export default GridOne;
