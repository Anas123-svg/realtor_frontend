import GridFour from "@/components/grids/gridFour";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  properties: Property[];
}

const Similar = ({ properties }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <h1 className="text-4xl font-hel mb-5">{t("similarProperties")}</h1>
      <p className="text-gray-600 mb-5">{t("similarPropertiesText")}</p>
      <GridFour products={properties} loading={false} />
    </div>
  );
};

export default Similar;
