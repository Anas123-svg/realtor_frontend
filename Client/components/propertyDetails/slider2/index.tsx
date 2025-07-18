"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  FreeMode,
  Thumbs,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider2 = ({ photos }: { photos: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any | null>(null);
  const goToPrev = () => swiperRef.current?.slidePrev();
  const goToNext = () => swiperRef.current?.slideNext();
  const goToSlide = (index: number) => swiperRef.current?.slideTo(index);
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Thumbs, Autoplay]}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper2 h-[50vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] relative"
      >
        {photos?.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <Zoom>
                <img
                  src={photo}
                  className="h-[50vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] object-cover mx-auto w-full"
                  loading="lazy"
                />
              </Zoom>
            </SwiperSlide>
          );
        })}
        {photos.length > 0 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-10">
            <button
              onClick={goToPrev}
              className="text-white hover:text-secondary transition-colors duration-300"
            >
              <ChevronLeft size={30} />
            </button>
            <div className="flex gap-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-1 rounded-full transition-all duration-300 ${activeIndex === index
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
        )}
      </Swiper>
      <Swiper
        // @ts-ignore
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        pagination={{
          dynamicBullets: false,
          clickable: true,
        }}
        modules={[FreeMode, Thumbs, Scrollbar]}
        scrollbar={{ draggable: true, hide: false }}
        className="mySwiper mt-5"
      >
        {photos?.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={photo}
                className="h-[10vh] w-full object-cover cursor-pointer"
                loading="lazy"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider2;
