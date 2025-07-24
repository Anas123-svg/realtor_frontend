import React, { useState } from "react";
import Link from "next/link"; // Importing Next.js Link
import logo from "@/assets/logo.png";
import {
  Facebook,
  Instagram,
  Info,
  Phone,
  BookOpen,
  Home,
  Building,
  FileText,
  MapPin,
  DollarSign,
  Shield,
} from "lucide-react"; // Importing icons
import { useTranslation } from "react-i18next";
import PoliticaTratamientoDatosModal from "../dialogue";

const Footer = () => {
  const { t } = useTranslation();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="bg-white mt-10 py-10">
      <div className="container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8 px-6">
        {/* Logo and Address */}
        <div>
          <img src={logo.src} alt="Logo" className="w-44 mb-4" />
          <p className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2 shrink-0" /> Cra. 7 #116A-94, Santa
            Marta, Magdalena, Colombia
          </p>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-bold text-lg mb-4">{t("navAbout")}</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Info className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                {t("navAbout")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Phone className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                {t("navContact")}
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Shield className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                {t("Data and Privacy")}
              </button>
            </li>

            {/* Modal */}
            <PoliticaTratamientoDatosModal
              isOpen={isPrivacyOpen}
              onClose={() => setIsPrivacyOpen(false)}
            />
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">{t("footerQuickLinks")}</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/properties?condition=Used&dealType=Sale"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all whitespace-nowrap"
              >
                <Home className="w-5 h-5 mr-2 hover:scale-110 transition-transform shrink-0" />{" "}
                {t("navExistingProperties")}
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Building className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                {t("navNewDevelopments")}
              </Link>
            </li>
            <li>
              <Link
                href="/properties?dealType=Rental"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <FileText className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                {t("navRentals")}
              </Link>
            </li>
            <li>
              <Link
                href="/sell-rent"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all whitespace-nowrap"
              >
                <DollarSign className="w-5 h-5 mr-2 hover:scale-110 transition-transform shrink-0" />{" "}
                {t("navSellRent")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4">{t("footerSocialMedia")}</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.facebook.com/reservaelcortijosuitehouse?mibextid=ZbWKwL"
                target="_blank"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Facebook className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/reservaelcortijo?igsh=cnRud2Nxc21uOGtt"
                target="_blank"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Instagram className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Map Section */}
        <div className="col-span-2 flex flex-col items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4038.562459935862!2d-74.22465590023253!3d11.147806131225584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef45880e69553e5%3A0xe76f473bf059868b!2sCra.%207%20%23116A-94%2C%20Santa%20Marta%2C%20Magdalena%2C%20Colombia!5e0!3m2!1sen!2s!4v1737404208533!5m2!1sen!2s"
            title="Google Maps"
            className="w-full h-[30vh] border-0 rounded-lg"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {t("footerCopyRight")}
        </p>
      </div>
    </div>
  );
};

export default Footer;
