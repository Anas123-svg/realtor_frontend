"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import SearchCard from "./search";
import line from "@/assets/line-yellow.png";
import { t } from "i18next";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [properties, setProperties] = useState<Property[]>([]);
  const swiperRef = useRef<any | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/properties/hero-section`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const goToPrev = () => {
    if (activeIndex === 0) {
      swiperRef.current?.slideTo(properties.length - 1);
    } else {
      swiperRef.current?.slidePrev();
    }
  };
  const goToNext = () => {
    if (activeIndex === properties.length - 1) {
      swiperRef.current?.slideTo(0);
    } else {
      swiperRef.current?.slideNext();
    }
  };
  const goToSlide = (index: number) => swiperRef.current?.slideTo(index);

  return (
    <div className="h-[80vh] lg:h-screen relative">
      <div className="absolute h-full w-full -z-10">
        <Swiper
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="mySwiper w-full h-full"
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <img
                src={property.images[0]}
                alt="Hero Background"
                className="h-full w-full object-cover object-top"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute h-full w-full bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="absolute h-full w-full flex justify-center items-center">
        <div className="container flex flex-col items-center justify-center">
          <h1
            className="text-white text-5xl max-[480px]:text-4xl font-hel text-center max-w-5xl md:leading-[4rem]"
            dangerouslySetInnerHTML={{
              __html: t("heroText", {
                lineSrc: line.src,
              }),
            }}
          ></h1>
          <div className="w-full my-5 md:my-10 justify-center hidden lg:flex">
            <SearchCard />
          </div>
        </div>
      </div>

      {properties.length > 0 && (
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-5">
          {properties.length > 0 && (
            <Link
              href={`/properties/${properties[activeIndex]?.id}`}
              className="group inline-flex items-center gap-2 text-white bg-secondary hover:bg-white hover:text-secondary py-2 px-3 text-sm rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t("heroButton")}
              <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={goToPrev}
              className="text-white hover:text-secondary transition-colors duration-300"
            >
              <ChevronLeft size={30} />
            </button>
            <div className="flex gap-2">
              {properties.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-1 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-secondary w-6"
                      : "bg-white hover:bg-secondary/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="text-white hover:text-secondary transition-colors duration-300"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
