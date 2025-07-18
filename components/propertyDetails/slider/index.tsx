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
// import { FreeMode, Thumbs, Scrollbar, Autoplay } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import facebook from "@/assets/facebook.png";
// import instagram from "@/assets/instagram.png";
// import whatsapp from "@/assets/whatsapp.png";
// import tiktok from "@/assets/tiktok.png";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Heart, Forward } from "lucide-react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";
// import toast from "react-hot-toast";

// const Slider = ({ property }: { property: Property }) => {
//   const { t } = useTranslation();
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [isLiked, setIsLiked] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef<any | null>(null);
//   const goToPrev = () => swiperRef.current?.slidePrev();
//   const goToNext = () => swiperRef.current?.slideNext();
//   const goToSlide = (index: number) => swiperRef.current?.slideTo(index);

//   const incrementLike = async () => {
//     try {
//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_URL}/properties/${property.id}/increment-likes`
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex w-full h-[70vh]">
//       <div className="w-[80%] relative">
//         <Swiper
//           spaceBetween={10}
//           direction="vertical"
//           thumbs={{ swiper: thumbsSwiper }}
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           modules={[FreeMode, Thumbs, Autoplay]}
//           onBeforeInit={(swiper) => (swiperRef.current = swiper)}
//           onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//           className="mySwiper2 h-full"
//         >
//           {property.images.map((photo, index) => (
//             <SwiperSlide key={index}>
//               <Zoom>
//                 <img
//                   src={photo}
//                   alt={`Slide ${index}`}
//                   className="object-cover h-[75vh] w-full"
//                   loading="lazy"
//                 />
//               </Zoom>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         {property.images.length > 0 && (
//           <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-10">
//             <button
//               onClick={goToPrev}
//               className="text-white hover:text-secondary transition-colors duration-300"
//             >
//               <ChevronLeft size={30} />
//             </button>
//             <div className="flex gap-2">
//               {property.images.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-3 h-1 rounded-full transition-all duration-300 ${
//                     activeIndex === index
//                       ? "bg-secondary w-6"
//                       : "bg-white hover:bg-secondary/70"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//             <button
//               onClick={goToNext}
//               className="text-white hover:text-secondary transition-colors duration-300"
//             >
//               <ChevronRight size={30} />
//             </button>
//           </div>
//         )}
//         <div className="flex gap-2 absolute bottom-4 left-4 z-10">
//           <button
//             onClick={() => {
//               incrementLike();
//               setIsLiked(!isLiked);
//             }}
//             className="flex gap-2 items-center hover:scale-105 transition duration-300 bg-white py-2 px-4 rounded-full shadow"
//           >
//             <Heart
//               size={18}
//               color={isLiked ? "#ff2600" : "#000"}
//               fill={isLiked ? "#FF0000" : "transparent"}
//             />
//             <span className="font-hel">{isLiked ? t("liked") : t("like")}</span>
//           </button>
//           <Dialog>
//             <DialogTrigger className="flex gap-2 items-center hover:scale-105 transition duration-300 bg-white py-2 px-4 rounded-full shadow">
//               <Forward size={18} />
//               <span className="font-hel">{t("share")}</span>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogTitle className="text-xl font-semibold text-gray-800 text-center">
//                 {t("shareProperty")}
//               </DialogTitle>
//               <div className="flex flex-col items-center gap-6 mt-6">
//                 <p className="text-center text-gray-600 text-sm">
//                   {t("sharePropertyText")}
//                   <br />
//                   <span className="font-medium">{property.title}</span>
//                   <br />
//                   <span className="italic">{property.location.region}</span>.
//                 </p>
//                 <div className="flex justify-center gap-4">
//                   <button
//                     onClick={() =>
//                       window.open(
//                         `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                           window.location.href
//                         )}&quote=${encodeURIComponent(
//                           `Check out this amazing property: ${property.title} located at ${property.location.region}!`
//                         )}`,
//                         "_blank"
//                       )
//                     }
//                     className="p-2 bg-blue-600 rounded-full transition-transform transform hover:scale-110 hover:bg-blue-700"
//                   >
//                     <img
//                       src={facebook.src}
//                       alt="facebook"
//                       className="w-8 h-8"
//                     />
//                   </button>
//                   <button
//                     onClick={() =>
//                       window.open(`https://www.instagram.com/`, "_blank")
//                     }
//                     className="p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full transition-transform transform hover:scale-110"
//                   >
//                     <img
//                       src={instagram.src}
//                       alt="instagram"
//                       className="w-8 h-8 bg-white rounded-lg"
//                     />
//                   </button>
//                   <button
//                     onClick={() =>
//                       window.open(
//                         `https://wa.me/?text=${encodeURIComponent(
//                           `Check out this amazing property: ${property.title} located at ${property.location.region}! ${window.location.href}`
//                         )}`,
//                         "_blank"
//                       )
//                     }
//                     className="p-2 bg-green-500 rounded-full transition-transform transform hover:scale-110 hover:bg-green-600"
//                   >
//                     <img
//                       src={whatsapp.src}
//                       alt="whatsapp"
//                       className="w-8 h-8"
//                     />
//                   </button>
//                   <button
//                     onClick={() =>
//                       window.open(`https://www.tiktok.com/`, "_blank")
//                     }
//                     className="p-2 bg-black rounded-full transition-transform transform hover:scale-110 hover:bg-gray-800"
//                   >
//                     <img src={tiktok.src} alt="tiktok" className="w-8 h-8" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigator.clipboard.writeText(
//                         `Check out this amazing property: ${property.title} located at ${property.location.region}! ${window.location.href}`
//                       );
//                       toast.success("Link copied to clipboard!");
//                     }}
//                     className="py-2 px-4 bg-gray-300 rounded-full transition-transform transform hover:scale-110 hover:bg-gray-400"
//                   >
//                     <span className="text-black font-semibold text-sm">
//                       {t("copyLink")}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="w-[20%] ml-4 h-full scrollbar">
//         <Swiper
//           // @ts-ignore
//           onSwiper={setThumbsSwiper}
//           spaceBetween={20}
//           slidesPerView={4}
//           freeMode={true}
//           scrollbar={{
//             draggable: true,
//             hide: false,
//           }}
//           watchSlidesProgress={true}
//           direction="vertical"
//           modules={[FreeMode, Thumbs, Scrollbar]}
//           className="mySwiper h-full"
//         >
//           {property.images.map((photo, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={photo}
//                 alt={`Thumbnail ${index}`}
//                 className="object-cover cursor-pointer w-full h-full"
//                 loading="lazy"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default Slider;



"use client";
import React, { useState } from "react";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";

const Slider = ({ property }: { property: Property }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const images = property.images || [];

  const openLightbox = (index: number) => {
    if (index === 0) {
      setActiveIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () =>
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <>
      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-0 w-full h-[65vh]">
        {/* Left large image */}
        <div className="w-full lg:w-1/2 h-full">
          <img
            src={images[0]}
            alt="Main"
            onClick={() => openLightbox(0)}
            className="w-full h-full object-cover rounded-[2px] cursor-pointer"
          />

        </div>

        {/* Right 2x2 grid */}
        {/* Right 2x2 grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-0 h-full">
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative w-full h-full">
              <img
                src={img}
                alt={`Thumb ${i + 1}`}
                className="w-full h-full object-cover rounded-[2px] border-2 transition-all duration-300"
              />

              {/* Camera icon only on last (4th) image */}
              {i === 3 && (
                <button
                  onClick={() => openLightbox(0)}
                  className="absolute bottom-4 left-10 bg-black/50 px-6 py-2 rounded-full flex items-center gap-1 text-xs font-medium shadow hover:bg-black transition"
                >
                  <Camera size={14} className="text-white" />
                  <span className="text-white">{images.length} Photos</span>
                </button>
              )}
            </div>
          ))}
        </div>





      </div>

      {/* Lightbox Modal (only from image[0]) */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-black hover:text-red-500"
          >
            <X size={30} />
          </button>

          {/* Prev button */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-black hover:text-secondary"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Full image */}
          <img
            src={images[activeIndex]}
            alt={`Preview ${activeIndex}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-[2px]"
          />

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-4 text-black hover:text-secondary"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-2 text-black text-sm font-medium">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
