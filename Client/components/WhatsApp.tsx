import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

const WhatsApp = () => {
  return (
    <a
      className="fixed bottom-5 left-6 bg-primary p-3 rounded-full"
      href="https://wa.me/+573173190385"

      target="_blank"
      rel="noopener noreferrer"
      style={{
        zIndex: 1000,
      }}
    >
      <IoLogoWhatsapp className="text-4xl text-white" />
    </a>
  );
};

export default WhatsApp;
