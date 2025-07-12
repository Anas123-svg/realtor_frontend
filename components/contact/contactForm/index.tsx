"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    reason: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.country ||
      !formData.city ||
      !formData.reason ||
      !formData.message
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-us`,
        formData
      );
      toast.success("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        reason: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-hel text-center text-secondary mb-4">
        {t("getInTouch")}
      </h1>
      <p className="text-center mb-4">{t("getInTouchText")}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full">
            <label className="block text-sm font-semibold" htmlFor="fullName">
              {t("name")}*
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder={t("namePlaceholder")}
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold" htmlFor="email">
              {t("email")}*
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder={t("emailPlaceholder")}
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="number"
            >
              {t("phone")}*
            </label>
            <input
              type="text"
              id="number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder={t("phonePlaceholder")}
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="country"
            >
              {t("country")}*
            </label>
            <input
              type="text"
              id="country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              placeholder={t("countryPlaceholder")}
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full">
            <label className="block text-sm font-semibold mb-2" htmlFor="city">
              {t("city")}*
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder={t("cityPlaceholder")}
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-semibold mb-4"
              htmlFor="reason"
            >
              {t("whyContact")}*
            </label>
            <Select
              value={formData.reason}
              onValueChange={(value) => {
                setFormData({ ...formData, reason: value });
              }}
            >
              <SelectTrigger className="w-full h-[3.6rem] border-none border border-gray-300 bg-white/50 mt-2 focus:ring-0">
                <SelectValue placeholder={t("reason")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">{t("buy")}</SelectItem>
                <SelectItem value="sell">{t("sell")}</SelectItem>
                <SelectItem value="rent">{t("rent")}</SelectItem>
                <SelectItem value="other">{t("other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="message">
            {t("message")}*
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder={t("messagePlaceholder")}
            className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            rows={5}
          ></textarea>
        </div>
        <div>
          <Button
            variant="primary"
            disabled={loading}
            type="submit"
            className="text-white p-8 text-lg"
          >
            {loading ? t("sending") : t("send")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
