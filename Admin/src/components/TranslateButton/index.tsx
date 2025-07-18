import React from "react";
import { useTranslation } from "react-i18next";

const TranslateButton = () => {
  const { i18n } = useTranslation();
  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      defaultValue={i18n.language}
      className="w-fit appearance-none rounded border border-stroke bg-gray p-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
    >
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
  );
};

export default TranslateButton;
