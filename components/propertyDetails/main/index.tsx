import React from "react";
import Form from "./form";
import { useTranslation } from "react-i18next";

interface Props {
  property: Property;
  admin: any;
}

const Main = ({ property, admin }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="pt-5 pb-10">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-hel font-light mb-2">
        {property.title}
      </h1>
      <p className="mb-5 text-xl font-light">
        {property.bedrooms} {t("beds")} - {property.bathrooms} {t("baths")} -{" "}
        {property.area} m²
      </p>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 lg:w-3/5 xl:w-2/3">
          <p className="mb-5">{property.description}</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-hel font-light mb-5">
            {property.price.toLocaleString()} COP
          </p>
          <p className="mb-5 text-xl font-light">
            {t("lastUpdated")}:{" "}
            {new Date(property.updated_at).toLocaleDateString() ===
            new Date().toLocaleDateString()
              ? t("today")
              : new Date(property.updated_at).toLocaleDateString() ===
                new Date(
                  new Date().setDate(new Date().getDate() - 1)
                ).toLocaleDateString()
              ? t("yesterday")
              : new Date(property.updated_at).toLocaleDateString()}{" "}
            - {t("views")} {property.views} - {t("likes")} {property.likes}
          </p>
        </div>
        <div className="hidden md:block md:w-1/2 lg:w-2/5 xl:w-1/3">
          <Form admin={admin} />
        </div>
      </div>
    </div>
  );
};

export default Main;
