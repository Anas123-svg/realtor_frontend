



import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardThree from "@/components/cards/cartThree";
import { useTranslation } from "react-i18next";

interface Props {
  products: Partial<Property>[];
  loading: boolean;
}

const GridThree = ({ products, loading }: Props) => {
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

  return (
    <div className="flex flex-col gap-10 my-10">
      {products.map((product) => (
        <CardThree key={product.id} product={product} />
      ))}
    </div>
  );
};

export default GridThree;
