"use client";
import Hero from "@/components/common/hero";
import React from "react";
import img from "@/assets/hero.jpg";
import SocialIcons from "@/components/contact/socialIcons";
import ContactForm from "@/components/contact/contactForm";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Hero img={img.src} title={t("contact")} />
      <ContactForm />
      <SocialIcons />
    </div>
  );
};

export default Contact;
