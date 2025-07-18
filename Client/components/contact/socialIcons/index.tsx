import React from "react";
import whatsapp from "@/assets/whatsapp.png";
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import tiktok from "@/assets/tiktok.png";
import { useTranslation } from "react-i18next";

const SocialIcons = () => {
  const { t } = useTranslation();
  return (
    <div className="container py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-hel mb-10">
        {t("contactTitle")}
      </h1>
      <div className="flex justify-center gap-5 sm:gap-10 md:gap-20">
        <a
          href="https://wa.me/+573012921856"
          target="_blank"
          className="hover:scale-105 transition duration-300"
        >
          <img
            src={whatsapp.src}
            alt="whatsapp"
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </a>
        <a
          href="https://www.facebook.com/reservaelcortijosuitehouse?mibextid=ZbWKwL"
          target="_blank"
          className="hover:scale-105 transition duration-300"
        >
          <img
            src={facebook.src}
            alt="facebook"
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </a>
        <a
          href="https://www.instagram.com/reservaelcortijo?igsh=cnRud2Nxc21uOGtt"
          target="_blank"
          className="hover:scale-105 transition duration-300"
        >
          <img
            src={instagram.src}
            alt="instagram"
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </a>
        <a
          href="https://www.tiktok.com/@realtor.caribe?_t=ZS-8sSbFcxn9U2&_r=1"
          className="hover:scale-105 transition duration-300"
        >
          <img
            src={tiktok.src}
            alt="twitter"
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
