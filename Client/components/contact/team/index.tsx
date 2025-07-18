import React from "react";
import { team } from "@/constants";
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation();
  const TeamMemberCard = ({
    item,
    isLeader,
  }: {
    item: (typeof team)[number];
    isLeader: boolean;
  }) => (
    <div className="flex flex-col items-center max-w-xs sm:max-w-sm w-full p-5 bg-white shadow rounded-lg transition-all duration-300 hover:shadow-xl">
      <img
        src={item.img}
        alt={item.name}
        className={`rounded-full object-cover object-top mb-4 transition-transform hover:scale-110 duration-300
          ${
            isLeader ? "h-52 w-52 md:h-60 md:w-60" : "h-40 w-40 md:h-48 md:w-48"
          }`}
      />
      <h3 className="text-center font-bold text-lg md:text-xl text-gray-900">
        {item.name}
      </h3>
      <p className="text-center text-sm md:text-base text-gray-600 mt-2 mb-4 max-w-md">
        {t(item.description)}
      </p>
      <a
        href={item.whatsapp}
        target="_blank"
        className="inline-flex items-center justify-center px-6 py-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-transform duration-300 hover:scale-105"
      >
        {t("contactOnWhatsApp")}
      </a>
    </div>
  );

  return (
    <div className="container py-10">
      <h1 className="text-secondary text-3xl md:text-4xl mb-10 text-center font-hel">
        {t("meet")}
      </h1>

      {/* Leaders Section */}
      <div className="flex flex-wrap justify-center gap-10 mb-12">
        {team.slice(0, 2).map((item) => (
          <TeamMemberCard key={item.name} item={item} isLeader={true} />
        ))}
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
        {team.slice(2).map((item) => (
          <TeamMemberCard key={item.name} item={item} isLeader={false} />
        ))}
      </div>
    </div>
  );
};

export default Team;
