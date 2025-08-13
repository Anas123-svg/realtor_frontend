"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logoWhite.png";
import { navLinks } from "@/constants";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import TranslateButton from "../TranslateButton";
import { motion } from "framer-motion";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(-1);
  const [scroll, setScroll] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={
        "fixed z-50 w-full " +
        (scroll
          ? "shadow bg-white text-primary"
          : pathname !== "/"
            ? "shadow bg-background text-primary"
            : "bg-transparent text-white")
      }
    >
      <div className="flex justify-between items-center py-4 px-5 sm:px-8 lg:px-16 whitespace-nowrap">
        <Link href="/">
          <img
            src={scroll || pathname !== "/" ? logo.src : logoWhite.src}
            alt="Logo"
            className="w-24 lg:w-36 hover:scale-105 transition duration-300"
          />
        </Link>
        <div className="hidden xl:flex items-center lg:gap-5">
          <ul className="flex divide-x divide-secondary text-sm">
            {navLinks.map((link, index) => (
              <li
                key={link.title}
                className="px-2 relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(-1)}
              >
                <Link
                  href={link.url}
                  className="border-b border-transparent hover:border-secondary hover:bg-secondary2/20 transition duration-300 py-1 px-2"
                >
                  {t(link.title)}
                </Link>
                {link.children && activeDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 text-base"
                  >
                    <div className="mt-2 shadow-xl flex flex-col bg-white border border-gray-200 p-4 whitespace-nowrap w-full divide-y divide-secondary">
                      {link.children.map((subLink, index) => (
                        <Link
                          key={index}
                          href={subLink.url}
                          className="text-gray-600 hover:bg-secondary2/20 transition-colors duration-300 p-2"
                        >
                          {t(subLink.title)}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
          <TranslateButton />
          <Link
            href="/contact"
            className="px-4 lg:px-8 bg-primary hover:bg-primary2 text-white rounded-md py-2 transition duration-300"
          >
            {t("navContact")}
          </Link>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
