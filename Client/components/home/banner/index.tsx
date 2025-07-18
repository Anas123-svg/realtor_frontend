"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const BannerWithCTA = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-10">
      <div className="bg-primary2 rounded-3xl overflow-hidden transition duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center py-16 px-8">
          {/* Banner Section */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-hel text-white text-center max-w-2xl mb-8">
            {t("banner")}
          </h1>

          {/* Call to Action Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl">
            <h2 className="text-xl md:text-2xl text-center font-hel mb-4 text-white">
              {t("callToActionTitle")}
            </h2>
            <p className="text-center text-white/90 mb-8">
              {t("callToActionText")}
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="bg-white py-3 px-8 text-lg rounded-md text-primary font-medium hover:bg-gray-100 transition duration-300"
              >
                {t("callToActionBtn")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerWithCTA;
