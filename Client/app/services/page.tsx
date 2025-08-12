"use client";

import Link from "next/link";

// import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { FaCheck, FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function SellRent() {
    // const router = useRouter();

    const comparisonData = [
        {
            category: "Property management",
            services: [
                {
                    name: "Professional cleaning and laundry",
                    ptk: true,
                    competitor: true,
                },
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
                {
                    name: "Dedicated local account manager",
                    ptk: true,
                    competitor: false,
                },
                {
                    name: "Professional property photography",
                    ptk: true,
                    competitor: false,
                },
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

            <div className="h-28" />
            <section
                className="relative bg-cover bg-center text-white py-12  md:py-20  px-4 md:px-6"
                style={{ backgroundImage: "url('/Kitchen-bg.png')" }}
            >
                <div className="absolute inset-0 bg-black/30 to-transparent"></div>

                <div className="absolute inset-0  bg-black/20"></div>
                <div className="relative max-w-[60%] mx-auto text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                        {t("heroTitle")}
                    </h1>
                    <p className="shadow-blue-900 w-[40%] max-w-xl mx-auto text-7xl sm:text-lg md:text-xl mb-8 text-center whitespace-pre-line">
                        {t("heroSubtitle")}
                    </p>
                </div>
            </section>

            {/* Why Stay Section */}
            <section className="w-[85%] mx-auto py-20  sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#070a65]">
                    {t("whyStayTitle")}
                </h2>
                <p className="text-center text-xl sm:text-2xl text-[#000] font-sans mb-6">
                    {t("whyStaySubtitle")}
                </p>
                <div className="relative">
                    <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {/* Card 1 */}
                        <div className="flex-none w-[280px] sm:w-[300px] bg-white shadow p-4 sm:p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 mx-2">
                            <img
                                src="/pillo.png"
                                alt="Cleaning"
                                className="mb-4 rounded-2xl w-full"
                            />
                            <h3 className="font-semibold mb-2 text-sm sm:text-base">
                                {t("cardCleaningTitle")}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                {t("cardCleaningDesc")}
                            </p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                {t("moreInfoButton")}
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className="flex-none w-[280px] sm:w-[300px] bg-white shadow p-4 sm:p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 mx-2">
                            <img
                                src="/un-table.png"
                                alt="24/7"
                                className="mb-4 rounded-2xl w-full"
                            />
                            <h3 className="font-semibold mb-2 text-sm sm:text-base">
                                {t("cardCustomerServiceTitle")}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                {t("cardCustomerServiceDesc")}
                            </p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                {t("moreInfoButton")}
                            </button>
                        </div>

                        {/* Card 3 */}
                        <div className="flex-none w-[280px] sm:w-[300px] bg-white shadow p-4 sm:p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 mx-2">
                            <img
                                src="/buddy.jpg"
                                alt="Ads"
                                className="mb-4 rounded-2xl w-full"
                            />
                            <h3 className="font-semibold mb-2 text-sm sm:text-base">
                                {t("moreInfoButton")}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                {t("cardAdManagementDesc")}
                            </p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                {t("cardAdManagementTitle")}
                            </button>
                        </div>

                        {/* Card 4 */}
                        <div className="flex-none w-[280px] sm:w-[300px] bg-white shadow p-4 sm:p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 mx-2">
                            <img
                                src="/white-lep.png"
                                alt="Extra Service"
                                className="mb-4 rounded-2xl w-full"
                            />
                            <h3 className="font-semibold mb-2 text-sm sm:text-base">
                                {t("cardPortalTitle")}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                {t("cardPortalDesc")}
                            </p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                {t("moreInfoButton")}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Services Section */}
            <section className="w-[85%] mx-auto text-center mb-8 ">
                <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">
                    {t("accommodationServicesTitle")}
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    {t("accommodationServicesDesc")}
                </p>
            </section>

            {/* Single Card Comparison Table */}
            <section className="w-[85%] mx-auto bg-white rounded-lg shadow-md py-4 sm:p-6">
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] md:min-w-full rounded-lg border border-gray-200">
                        {/* Table Header with connected border */}
                        <div className="grid grid-cols-3 border-b border-gray-200">
                            <div className="col-span-1 p-4"></div> {/* Empty spacer */}
                            <div className="text-center bg-[#eeee] p-3 rounded-t-xl border-t-4 border-[#070a65]">
                                {t("comparisonTitlePtk")}
                            </div>
                            <div className="text-center bg-[#eeee] p-3 rounded-t-xl border-t-4 border-[#070a65] ml-2">
                                {t("comparisonTitleCompetitor")}
                            </div>
                        </div>

                        {/* Services List */}
                        {comparisonData.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                {/* Section Header */}
                                <div className="bg-gray-50 p-3 font-medium text-gray-800 border-t border-b border-gray-200">
                                    {section.category}
                                </div>

                                {/* Service Items */}
                                {section.services.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className={`grid grid-cols-3 p-4 ${itemIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            }`}
                                    >
                                        <div className="text-gray-700 pr-4">{item.name}</div>
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

            {/* Airbnb Co-Host Section */}
            <section className="mt-6 bg-gray-50 p-4 sm:p-6 w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    {/* Left Side - Image */}
                    <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                            alt="Airbnb Logo"
                            className="h-16 mx-auto sm:mx-0"
                        />
                    </div>
                    {/* Right Side - Text */}
                    <div className="w-full sm:w-2/3 text-center sm:text-left">
                        <h1 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
                            {t("airbnbTitle")}
                        </h1>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            {t("airbnbDesc")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Vacation Rental Management in Spain Section */}
            <section className="w-[85%] mx-auto py-4 my-10 sm:p-6 text-center relative top-16 sm:top-0 rounded-2xl">
                <h1 className="text-2xl sm:text-4xl font-bold text-yellow-600 mb-2">
                    <span className="text-[#070a65]">
                        {t("vacationRentalSpainTitle")}
                    </span>{" "}
                    Spain
                </h1>
                <p className="text-gray-600 text-sm sm:text-lg mb-6">
                    {t("vacationRentalSpainSubtitle")}
                </p>

                {/* Card Section */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-md py-6 px-10">
                        <div className="flex justify-center mb-2">
                            <img
                                src="https://www.passthekeys.com/static/new_site/assets/images/text_icons/question.59f4f8c022d2.svg"
                                alt="Icon"
                                className="w-12 h-12"
                            />
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">
                            {t("whyHostCardTitle")}
                        </h2>
                        <p className="text-gray-700 text-sm">{t("whyHostCardDesc")}</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-md py-6 px-10">
                        <div className="flex justify-center mb-2">
                            <img
                                src="https://www.passthekeys.com/static/new_site/assets/images/text_icons/location.585b5336238e.svg"
                                alt="Icon"
                                className="w-12 h-12"
                            />
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">
                            {t("whereProfitableCardTitle")}
                        </h2>
                        <p className="text-gray-700 text-sm">
                            {t("whereProfitableCardDesc")}
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-md py-6 px-10">
                        <div className="flex justify-center mb-2">
                            <img
                                src="https://www.passthekeys.com/static/new_site/assets/images/text_icons/management.065293862ef6.svg"
                                alt="Icon"
                                className="w-12 h-12"
                            />
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">
                            {t("whyManagementCardTitle")}
                        </h2>
                        <p className="text-gray-700 text-sm">
                            {t("whyManagementCardDesc")}
                        </p>
                    </div>
                </div>

                {/* CTA Section */}

                <h1 className="text-blue-900 font-bold text-3xl pt-12 pb-8">
                    {t("spanishTerritoriesTitle")}
                </h1>

                <section className="w-full mx-auto flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-8 px-4 py-8">
                    {/* Spain Image Card */}
                    <Link
                        href="/properties?dealType=Rental"
                        className="relative w-full md:w-[50rem] h-60 md:h-80 rounded-2xl overflow-hidden group block hover:cursor-pointer"
                    >
                        <img
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                            src="https://media.passthekeys.com/media/images/shutterstock_473238115.max-1000x500.jpg"
                            alt="Spain vacation rentals"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                            <h1 className="text-white font-bold text-2xl md:text-3xl drop-shadow-lg text-center">
                                {t("spanishTerritoriesSantaMarta")}
                            </h1>
                        </div>
                    </Link>

                    <Link
                        href="/properties?dealType=Rental"
                        className="relative w-full md:w-[50rem] h-60 md:h-80 rounded-2xl overflow-hidden group block hover:cursor-pointer"
                    >
                        {/* Owners Image Card */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                            <img
                                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                                src="https://media.passthekeys.com/media/images/shutterstock_1151020133.max-1000x500.jpg"
                                alt="Property owners"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                                <div className="h-full flex flex-col justify-center">
                                    <h1 className="text-white font-bold text-2xl md:text-3xl drop-shadow-lg">
                                        {t("spanishTerritoriesOwners")}
                                    </h1>
                                    <p className="text-white text-sm md:text-base mt-2 max-w-md mx-auto">
                                        {t("spanishTerritoriesOwnersDesc")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            </section>
        </div>
    );
}

export default SellRent;
