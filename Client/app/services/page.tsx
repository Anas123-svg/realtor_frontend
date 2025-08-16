"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes } from "react-icons/fa";

function SellRent() {
    const comparisonData = [
        {
            category: "Property management",
            services: [
                { name: "Professional cleaning and laundry", ptk: true, competitor: true },
                { name: "Photos after each cleaning", ptk: true, competitor: false },
                {
                    name: "Owner dashboard with reports, booking calendar, and photos of your property",
                    ptk: true,
                    competitor: true,
                },
                { name: "Unlimited self-booking", ptk: true, competitor: true },
                { name: "Maintenance", ptk: true, competitor: false },
            ],
        },
        {
            category: "Guest management",
            services: [
                { name: "Guest review and selection", ptk: true, competitor: false },
                { name: "Accidental damage insurance", ptk: true, competitor: false },
                { name: "Digital Welcome Guide", ptk: true, competitor: false },
                { name: "24/7 Support", ptk: true, competitor: false },
                { name: "Remote guest registration", ptk: true, competitor: false },
            ],
        },
        {
            category: "Managing ads on specialized platforms",
            services: [
                { name: "Dedicated local account manager", ptk: true, competitor: false },
                { name: "Professional property photography", ptk: true, competitor: false },
                { name: "Multi-platform ad positioning", ptk: true, competitor: false },
                { name: "Price optimization", ptk: true, competitor: false },
                { name: "Multi-channel distribution", ptk: true, competitor: false },
            ],
        },
    ];

    const { t } = useTranslation();

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="h-20 sm:h-28" />
            <section
                className="relative bg-cover bg-center text-white py-12 md:py-20 px-4 md:px-6"
                style={{ backgroundImage: "url('/Kitchen-bg.png')" }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative max-w-4xl mx-auto text-center px-2">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                        {t("heroTitle")}
                    </h1>
                    <p className="max-w-lg mx-auto text-base sm:text-lg md:text-xl mb-6 text-center whitespace-pre-line">
                        {t("heroSubtitle")}
                    </p>
                </div>
            </section>

            {/* Why Stay Section */}
            <section className="w-[90%] md:w-[85%] mx-auto py-12 sm:py-20">
                <h2 className="text-xl sm:text-3xl font-bold text-center mb-6 text-[#070a65]">
                    {t("whyStayTitle")}
                </h2>
                <p className="text-center text-base sm:text-xl text-[#000] mb-6">
                    {t("whyStaySubtitle")}
                </p>

                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {[
                        {
                            img: "/pillo.png",
                            title: t("cardCleaningTitle"),
                            desc: t("cardCleaningDesc"),
                        },
                        {
                            img: "/un-table.png",
                            title: t("cardCustomerServiceTitle"),
                            desc: t("cardCustomerServiceDesc"),
                        },
                        {
                            img: "/buddy.jpg",
                            title: t("moreInfoButton"),
                            desc: t("cardAdManagementDesc"),
                        },
                        {
                            img: "/white-lep.png",
                            title: t("cardPortalTitle"),
                            desc: t("cardPortalDesc"),
                        },
                        {
                            img: "/buddy.jpg",
                            title: t("moreInfoButton"),
                            desc: t("cardAdManagementDesc"),
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="flex-none w-64 bg-white shadow p-4 sm:p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300"
                        >
                            <img
                                src={card.img}
                                alt={card.title}
                                className="mb-4 rounded-2xl w-full h-40 object-cover"
                            />
                            <h3 className="font-semibold mb-2 text-sm sm:text-base">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">{card.desc}</p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                {t("moreInfoButton")}
                            </button>
                        </div>
                    ))}
                </div>

            </section>

            {/* Accommodation Services */}
            <section className="w-[90%] md:w-[85%] mx-auto text-center mb-8">
                <h1 className="text-xl sm:text-3xl font-bold text-indigo-900">
                    {t("accommodationServicesTitle")}
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    {t("accommodationServicesDesc")}
                </p>
            </section>

            {/* Comparison Table */}
            <section className="w-[90%] md:w-[85%] mx-auto bg-white rounded-lg shadow-md py-4 sm:p-6">
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] md:min-w-full rounded-lg border border-gray-200">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 border-b border-gray-200">
                            <div className="col-span-1 p-4"></div>
                            <div className="text-center bg-gray-100 p-3 rounded-t-xl border-t-4 border-[#070a65]">
                                {t("comparisonTitlePtk")}
                            </div>
                            <div className="text-center bg-gray-100 p-3 rounded-t-xl border-t-4 border-[#070a65] ml-2">
                                {t("comparisonTitleCompetitor")}
                            </div>
                        </div>

                        {/* Table Rows */}
                        {comparisonData.map((section, si) => (
                            <div key={si}>
                                <div className="bg-gray-50 p-3 font-medium text-gray-800 border-t border-b border-gray-200">
                                    {section.category}
                                </div>
                                {section.services.map((item, ii) => (
                                    <div
                                        key={ii}
                                        className={`grid grid-cols-3 p-4 ${ii % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                    >
                                        <div className="text-gray-700 pr-4 text-sm sm:text-base">{item.name}</div>
                                        <div className="flex justify-center">
                                            {item.ptk ? (
                                                <FaCheck className="text-green-500 text-lg" />
                                            ) : (
                                                <FaTimes className="text-red-500 text-lg" />
                                            )}
                                        </div>
                                        <div className="flex justify-center">
                                            {item.competitor ? (
                                                <FaCheck className="text-green-500 text-lg" />
                                            ) : (
                                                <FaTimes className="text-red-500 text-lg" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Airbnb Section */}
            <section className="mt-6 bg-gray-50 p-4 sm:p-6 w-full">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                    <div className="w-full sm:w-1/3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                            alt="Airbnb Logo"
                            className="h-12 sm:h-16 mx-auto sm:mx-0"
                        />
                    </div>
                    <div className="w-full sm:w-2/3 text-center sm:text-left">
                        <h1 className="text-lg sm:text-2xl font-bold text-indigo-900 mb-2">{t("airbnbTitle")}</h1>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{t("airbnbDesc")}</p>
                    </div>
                </div>
            </section>

            {/* Spain Section */}
            <section className="w-[90%] md:w-[85%] mx-auto py-11 text-center">
                <h1 className="text-xl sm:text-4xl font-bold text-[#070a65] mb-2">
                    {t("vacationRentalSpainTitle")} <span className="text-yellow-600">Spain</span>
                </h1>
                <p className="text-gray-600 text-sm sm:text-lg mb-6">{t("vacationRentalSpainSubtitle")}</p>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        {
                            img: "https://www.passthekeys.com/static/new_site/assets/images/text_icons/question.59f4f8c022d2.svg",
                            title: t("whyHostCardTitle"),
                            desc: t("whyHostCardDesc"),
                        },
                        {
                            img: "https://www.passthekeys.com/static/new_site/assets/images/text_icons/location.585b5336238e.svg",
                            title: t("whereProfitableCardTitle"),
                            desc: t("whereProfitableCardDesc"),
                        },
                        {
                            img: "https://www.passthekeys.com/static/new_site/assets/images/text_icons/management.065293862ef6.svg",
                            title: t("whyManagementCardTitle"),
                            desc: t("whyManagementCardDesc"),
                        },
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md py-6 px-6">
                            <img src={card.img} alt={card.title} className="w-12 h-12 mx-auto mb-2" />
                            <h2 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">{card.title}</h2>
                            <p className="text-gray-700 text-sm">{card.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <h1 className="text-xl sm:text-3xl font-bold text-blue-900 mb-8">{t("spanishTerritoriesTitle")}</h1>

                <div className="flex flex-col md:flex-row gap-6">
                    <Link
                        href="/properties?dealType=Rental"
                        className="relative w-full h-52 md:h-80 rounded-2xl overflow-hidden group"
                    >
                        <img
                            className="w-full h-full object-cover transform group-hover:scale-105 transition"
                            src="https://media.passthekeys.com/media/images/shutterstock_473238115.max-1000x500.jpg"
                            alt="Spain rentals"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                            <h1 className="text-white font-bold text-lg sm:text-3xl drop-shadow-lg text-center">
                                {t("spanishTerritoriesSantaMarta")}
                            </h1>
                        </div>
                    </Link>

                    <Link
                        href="/properties?dealType=Rental"
                        className="relative w-full h-52 md:h-80 rounded-2xl overflow-hidden group"
                    >
                        <img
                            className="w-full h-full object-cover transform group-hover:scale-105 transition"
                            src="https://media.passthekeys.com/media/images/shutterstock_1151020133.max-1000x500.jpg"
                            alt="Property owners"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
                            <div>
                                <h1 className="text-white font-bold text-lg sm:text-3xl drop-shadow-lg">
                                    {t("spanishTerritoriesOwners")}
                                </h1>
                                <p className="text-white text-sm sm:text-base mt-2">{t("spanishTerritoriesOwnersDesc")}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default SellRent;
