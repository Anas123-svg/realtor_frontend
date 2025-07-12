"use client";
import React from "react";
import Hero from "@/components/common/hero";
import img from "@/assets/hero.jpg";
import Banner from "@/components/home/banner";
import About from "@/components/home/about";
import Calculator from "@/components/sell-rent/calculator";
import { useTranslation } from "react-i18next";

const SellRent = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Hero img={img.src} title={t("Sell/Rent")} />
      <Calculator />
      <About />
      <Banner />
      {/* <CallToAction /> */}
    </div>
  );
};

export default SellRent;
