"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const CallToAction = () => {
  const { t } = useTranslation();
  return (
    <div className="container flex flex-col items-center py-10">
      <h1 className="text-3xl md:text-4xl text-center font-hel mb-4">
        {t("callToActionTitle")}
      </h1>
      <p className="text-center max-w-2xl mb-8">{t("callToActionText")}</p>
      <Link
        href="/contact"
        className="bg-primary py-4 px-8 text-lg rounded-md text-white hover:bg-primary2 transition duration-300"
      >
        {t("callToActionBtn")}
      </Link>
    </div>
  );
};

export default CallToAction;
