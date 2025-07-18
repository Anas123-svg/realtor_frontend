import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  characteristics: string[];
}

const Characteristics = (characteristics: Props) => {
  const { t } = useTranslation();
  return (
    <div className="py-10 border-y border-black">
      <h2 className="text-4xl font-hel mb-5">{t("characteristics")}</h2>
      <div className="flex flex-wrap gap-5">
        {characteristics.characteristics.map((characteristic, index) => (
          <div key={index} className="bg-primary4 text-white p-5 rounded-lg">
            <span className="text-lg font-hel">{t(characteristic)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characteristics;
