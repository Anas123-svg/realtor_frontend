// "use client";
// import React from "react";
// import Hero from "@/components/common/hero";
// import img from "@/assets/hero.jpg";
// import Banner from "@/components/home/banner";
// import About from "@/components/home/about";
// import Calculator from "@/components/sell-rent/calculator";
// import { useTranslation } from "react-i18next";

// const SellRent = () => {
//   const { t } = useTranslation();
//   return (
//     <div>
//       <Hero img={img.src} title={t("ComprehensiveVacationRentalService")} />
//       <Calculator />
//       <About />
//       <Banner />
//       {/* <CallToAction /> */}
//     </div>
//   );
// };

// export default SellRent;


"use client";

import { FaCheck, FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function SellRent() {
    const comparisonData = [
        {
            category: "Property management",
            services: [
                { name: "Professional cleaning and laundry", ptk: true, competitor: true },
                { name: "Photos after each cleaning", ptk: true, competitor: false },
                { name: "Owner dashboard with reports, booking calendar, and photos of your property", ptk: true, competitor: true },
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

    return (
        <div className="w-full">
            {/* Hero Section */}

            <div className="h-28" />
            <section
                className="relative bg-cover bg-center text-white py-12  md:py-20  px-4 md:px-6"
                style={{ backgroundImage: "url('/Kitchen-bg.png')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-transparent"></div>

                <div className="absolute inset-0  bg-black/20"></div>
                <div className="relative max-w-6xl mx-auto text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                        Comprehensive vacation rental service
                    </h1>
                    <p className=" shadow-blue-900 text-6xl sm:text-lg md:text-xl mb-8">
                        Flexible and hassle-free vacation rental <br /> management that optimizes
                        your income. <br /> Request a quote now.
                    </p>
                </div>
            </section>

            {/* Why Stay Section */}
            <section className="w-[85%] mx-auto py-20  sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#070a65]">
                    Why stay with Pass the Keys?
                </h2>
                <p className="text-center text-xl sm:text-2xl text-[#000] font-sans mb-6">
                    England's best-known full-service vacation rental management agency
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
                                Cleaning and Bedding
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Hotel quality, professionally laundered linens, all managed to an
                                exceptional standard.
                            </p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                More information
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
                                24/7 Customer Service
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                We manage all guest communications, from check-in to check-out, so
                                you don't have to get involved.
                            </p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                More information
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
                                Ad Management
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Professional photos, continuously updated prices, and your
                                property listed on 20 different platforms, including Airbnb and
                                Booking.com.
                            </p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                More information
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
                                Owner's Portal
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Full access to all your reservations, payments, and financial
                                information. We even take photos after each cleaning so you can
                                rest assured knowing your property is well cared for.
                            </p>
                            <button className="mt-4 px-4 py-2 border border-[#070a65] text-[#070a65] font-semibold rounded-lg shadow-sm hover:bg-[#070a65] hover:text-white transition">
                                More information
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Services Section */}
            <section className="w-[85%] mx-auto text-center mb-8 ">
                <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">
                    What accommodation services does Pass the Keys offer?
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    We can also provide additional services to help you manage your
                    property, discuss pricing with your local account manager.
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
                                Pass the Keys
                            </div>
                            <div className="text-center bg-[#eeee] p-3 rounded-t-xl border-t-4 border-[#070a65] ml-2">
                                Average competitor
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
                                        className={`grid grid-cols-3 p-4 ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
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
                            What is an Airbnb professional co-host?
                        </h1>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            Due to the size of our property portfolio and the consistent quality
                            of our service, Pass the Keys® was invited to become an official
                            Airbnb Co-Host in 2018. This exclusive status provided Pass the
                            Keys with a key account manager and direct integration with their
                            systems so we could dynamically update pricing, report on guest
                            behavior, and other key metrics. We have retained our benefits as a
                            valued partner even though Airbnb has since retired the program
                            (2022).
                        </p>
                    </div>
                </div>
            </section>

            {/* Vacation Rental Management in Spain Section */}
            <section className="w-[85%] mx-auto py-4 my-10 sm:p-6 text-center relative top-16 sm:top-0 rounded-2xl">
                <h1 className="text-2xl sm:text-4xl font-bold text-yellow-600 mb-2">
                    <span className="text-[#070a65]">Vacation Rental Management in</span> Spain
                </h1>
                <p className="text-gray-600 text-sm sm:text-lg mb-6">
                    In Spain, there are thousands of towns, cities, and regions with high
                    demand for vacation rental properties. As a host, you can increase the
                    profitability of your property without doing any of the work.
                </p>

                {/* Card Section */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-center mb-2">
                            <img
                                src="https://www.passthekeys.com/static/new_site/assets/images/text_icons/question.59f4f8c022d2.svg"
                                alt="Icon"
                                className="w-12 h-12"
                            />
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">
                            Why become an Airbnb host?
                        </h2>
                        <p className="text-gray-700 text-sm">
                            Domestic and international travel has driven an increase in demand
                            for vacation rental properties, allowing owners to maximize their
                            income with Pass the Keys. Our local teams can help you take
                            advantage of this profitable source of income.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-center mb-2">
                            <img
                                src="https://www.passthekeys.com/static/new_site/assets/images/text_icons/location.585b5336238e.svg"
                                alt="Icon"
                                className="w-12 h-12"
                            />
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">
                            Where in Spain is vacation rentals profitable?
                        </h2>
                        <p className="text-gray-700 text-sm">
                            Spain is home to some of the most sought-after destinations for
                            international guests: demand for vacation rentals is high in both
                            cities and rural and coastal destinations.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-center mb-2">
                            <img
                                src="https://www.passthekeys.com/static/new_site/assets/images/text_icons/management.065293862ef6.svg"
                                alt="Icon"
                                className="w-12 h-12"
                            />
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">
                            Why use a vacation rental management company in Spain?
                        </h2>
                        <p className="text-gray-700 text-sm">
                            A local vacation rental management company can help you optimize
                            your pricing strategy to ensure you get the best possible revenue.
                            We'll also ensure you achieve a high occupancy rate listing your
                            property on various sites like Airbnb, Booking.com, and Vrbo.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-indigo-50 p-4 sm:p-6 rounded-lg mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-2">
                        Get started today or talk to a vacation rental expert.
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                        Schedule a call with our vacation rental experts today and get all
                        your questions answered.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-2xl hover:bg-yellow-600 w-full sm:w-auto">
                            Calculate your income
                        </button>
                        <button className="bg-white text-[#6e6f98] px-4 py-2 rounded-2xl border border-[#6e6f98] hover:bg-gray-100 w-full sm:w-auto">
                            Book a call
                        </button>
                    </div>
                </div>




                <section className="w-full mx-auto flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-8 px-4 py-8">
                    {/* Spain Image Card */}
                    <div className="relative w-full md:w-[50rem] h-60 md:h-80 rounded-2xl overflow-hidden hover:cursor-pointer group">
                        <img
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                            src="https://media.passthekeys.com/media/images/shutterstock_473238115.max-1000x500.jpg"
                            alt="Spain vacation rentals"
                        />
                        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
                            <h1 className="text-white font-bold text-2xl md:text-3xl drop-shadow-lg">
                                Spain
                            </h1>
                        </div>
                    </div>

                    {/* Owners Image Card */}
                    <div className="relative w-full md:w-[50rem] h-60 md:h-80 rounded-2xl overflow-hidden hover:cursor-pointer group">
                        <img
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                            src="https://media.passthekeys.com/media/images/shutterstock_1151020133.max-1000x500.jpg"
                            alt="Property owners"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                            <h1 className="text-white font-bold text-2xl md:text-3xl drop-shadow-lg">
                                Owners
                            </h1>
                            <p className="text-white text-sm md:text-base mt-2">
                                The UK's leading vacation rental management service for hosts has arrived in Spain.
                            </p>
                        </div>
                    </div>
                </section>

            </section>
        </div>
    );
}

export default SellRent;