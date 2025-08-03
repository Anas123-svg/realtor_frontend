// "use client";
// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/thumbs";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import "swiper/css/autoplay";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";
// import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const Slider = ({ images }: { images: string[] }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef<any | null>(null);
//   const goToPrev = () => swiperRef.current?.slidePrev();
//   const goToNext = () => swiperRef.current?.slideNext();
//   const goToSlide = (index: number) => swiperRef.current?.slideTo(index);

//   return (
//     <div className="w-full relative h-[70vh]">
//       <Swiper
//         spaceBetween={10}
//         direction="vertical"
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         modules={[FreeMode, Thumbs, Autoplay]}
//         onBeforeInit={(swiper) => (swiperRef.current = swiper)}
//         onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//         className="mySwiper2 h-full"
//       >
//         {images.map((photo, index) => (
//           <SwiperSlide key={index}>
//             <Zoom>
//               <img
//                 src={photo}
//                 alt={`Slide ${index}`}
//                 className="object-cover h-[70vh] w-full"
//                 loading="lazy"
//               />
//             </Zoom>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       {images.length > 0 && (
//         <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-10">
//           <button
//             onClick={goToPrev}
//             className="text-white hover:text-secondary transition-colors duration-300"
//           >
//             <ChevronLeft size={30} />
//           </button>
//           <div className="flex gap-2">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-1 rounded-full transition-all duration-300 ${activeIndex === index
//                   ? "bg-secondary w-6"
//                   : "bg-white hover:bg-secondary/70"
//                   }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//           <button
//             onClick={goToNext}
//             className="text-white hover:text-secondary transition-colors duration-300"
//           >
//             <ChevronRight size={30} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Slider;



"use client";
import React, { useState, useEffect } from "react";
import {
  Camera,
  Video,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
} from "lucide-react";

const Slider = ({
  images,
  property,
}: {
  images: string[];
  property: any;
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (lightboxOpen || galleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, galleryOpen]);



  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row gap-1 w-[90%] mx-auto mt-11 h-[65vh] relative">
        {/* Left Main Image */}
        <div className="w-1/2 h-full relative">
          <img
            src={images[0]}
            alt="Main"
            onClick={() => openLightbox(0)}
            className="w-full h-full object-cover rounded-[2px] cursor-pointer"
          />
        </div>

        {/* 2x2 Grid Images */}
        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-1 h-full">
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative w-full h-full">
              <img
                src={img}
                alt={`Thumb ${i + 1}`}
                onClick={() => openLightbox(i + 1)}
                className="w-full h-full object-cover rounded-[2px] cursor-pointer"
              />
              {i === 3 && (
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <button
                    onClick={() => setGalleryOpen(true)}
                    className="bg-black/50 px-4 py-2 rounded-full flex items-center gap-1 text-xs text-white"
                  >
                    <Camera size={14} /> {images.length} Photos
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden w-[90%] mx-auto mt-6 relative">
        <div className="w-full h-[300px] sm:h-[400px] relative">
          <img
            src={images[0]}
            alt="Main"
            onClick={() => openLightbox(0)}
            className="w-full h-full object-cover rounded-[2px] cursor-pointer"
          />
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => setGalleryOpen(true)}
              className="bg-black/50 px-4 py-2 rounded-full flex items-center gap-1 text-xs text-white"
            >
              <Camera size={14} /> {images.length} Photos
            </button>
          </div>
        </div>
      </div>


      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-black hover:text-red-500"
          >
            <X size={30} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-black hover:text-secondary"
          >
            <ChevronLeft size={40} />
          </button>
          <img
            src={images[activeIndex]}
            alt={`Preview ${activeIndex}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-[2px]"
          />
          <button
            onClick={nextImage}
            className="absolute right-4 text-black hover:text-secondary"
          >
            <ChevronRight size={40} />
          </button>
          <div className="absolute bottom-2 text-black text-sm font-medium">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Gallery View */}
      {galleryOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-4 py-3 relative flex justify-center items-center">
            {/* Back Button on the Left */}
            <button
              onClick={() => setGalleryOpen(false)}
              className="absolute left-4 flex items-center gap-2 text-sm hover:text-primary"
            >
              <ArrowLeft size={20} /> Back
            </button>

            {/* Centered Title */}
            <h2 className="text-center font-semibold">Photos</h2>
          </div>

          {/* Zigzag Grid */}
          <div className="p-4 flex flex-col gap-2">
            {(() => {
              const pattern = [2, 3];
              const rows = [];
              let index = 0;
              let toggle = 0;

              while (index < images.length) {
                const count = pattern[toggle % 2];
                const slice = images.slice(index, index + count);
                rows.push({ slice, startIndex: index });
                index += count;
                toggle++;
              }

              return rows.map(({ slice, startIndex }, i) => (
                <div
                  key={i}
                  className={`grid gap-2 ${slice.length === 2 ? "grid-cols-2" : "grid-cols-3"
                    }`}
                >
                  {slice.map((img, j) => (
                    <img
                      key={j}
                      src={img}
                      alt={`Gallery ${startIndex + j}`}
                      onClick={() => {
                        setActiveIndex(startIndex + j);
                        setGalleryOpen(false);
                        setLightboxOpen(true);
                      }}
                      className={`w-full cursor-pointer object-cover ${slice.length === 2 ? "h-96" : "h-60"
                        }`}
                    />
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
