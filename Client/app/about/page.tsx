"use client";
import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/common/hero";
import img from "@/assets/hero.jpg";
import { CheckCircle2, Target, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import Team from "@/components/contact/team";
import ContactForm from "@/components/contact/contactForm";
import SocialIcons from "@/components/contact/socialIcons";

const About = () => {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <Hero img={img.src} title={t("about")} />
      <Team />
      <ContactForm />
      <SocialIcons />
      <div className="container pb-20">
        {/* Company Overview */}
        <motion.section
          className="py-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-medium font-hel text-primary mb-6 leading-tight">
              {t("aboutTitle")}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t("aboutSubtitle")}
            </p>
          </motion.div>
        </motion.section>
        <section className="py-10">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className=" p-8 rounded-xl shadow-lg bg-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-5">
                <Target className="text-primary w-12 h-12 mr-4" />
                <h3 className="text-2xl sm:text-3xl font-hel font-medium text-primary">
                  {t("mission")}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t("missionText")}
              </p>
            </motion.div>

            <motion.div
              className=" p-8 rounded-xl shadow-lg bg-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-5">
                <Globe className="text-primary w-12 h-12 mr-4" />
                <h3 className="text-2xl sm:text-3xl font-hel font-medium text-primary">
                  {t("vision")}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{t("visionText")}</p>
            </motion.div>
          </div>
        </section>
        <section className="py-10">
          <h3 className="text-3xl md:text-4xl font-hel font-medium text-primary text-center mb-10">
            {t("whyChooseUs")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: t("choose1"),
                description: t("choose1Text"),
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: t("choose2"),
                description: t("choose2Text"),
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: t("choose3"),
                description: t("choose3Text"),
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: t("choose4"),
                description: t("choose4Text"),
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: t("choose5"),
                description: t("choose5Text"),
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: t("choose6"),
                description: t("choose6Text"),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className=" p-6 rounded-xl text-center shadow-md bg-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="py-10 my-10 bg-primary text-white rounded-3xl">
          <motion.div
            className="max-w-3xl mx-auto text-center p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              {t("aboutBanner")}
            </h3>
            <p className="text-xl mb-8 text-gray-200">{t("aboutBannerText")}</p>
            <button className="px-10 py-4 bg-secondary font-semibold rounded-lg hover:bg-secondary2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg text-white">
              {t("aboutBannerBtn")}
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
