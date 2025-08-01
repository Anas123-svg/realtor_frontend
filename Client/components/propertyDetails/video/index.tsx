import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  video: string;
  photos: string[];
}

const Video = ({ video, photos }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const swiperRef = useRef<any | null>(null);
  const goToPrev = () => swiperRef.current?.slidePrev();
  const goToNext = () => swiperRef.current?.slideNext();
  const goToSlide = (index: number) => swiperRef.current?.slideTo(index);

  return (
    <div className="py-10 border-y flex flex-col md:flex-row gap-10  border-black">

      {/* <div className="w-full h-[50vh] flex flex-col items-center">
        <Swiper
          className="mySwiper2 h-full w-full relative"
          direction={"vertical"}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          modules={[Autoplay]}
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <Zoom>
                <img
                  src={photo}
                  alt="img"
                  className="w-full h-[50vh] object-cover"
                />
              </Zoom>
            </SwiperSlide>
          ))}
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
          )}
        </Swiper>
        <p className="text-xl mt-5">{t("photos")}</p>
      </div> */}

      <div className="w-full flex flex-col items-center">
        <video
          src={video}
          controls
          className="w-full h-[66.15vh] object-cover"
        />
        <p className="text-xl mt-5">{t("Video")}</p>
      </div>
    </div>
  );
};

export default Video;
