import Link from "next/link";
import React, { useState } from "react";
import { Bed, Bath, LandPlot } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Slider2 from "@/components/propertyDetails/slider2";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "800px",
    maxHeight: "95vh",
    padding: 20,
    position: "relative" as const,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};
interface Props {
  product: Partial<Property>;
}

const CardOne = ({ product }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 xl:p-8 shadow-lg hover:scale-105 transition duration-300 h-fit">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="mySwiper w-full h-60 rounded-xl overflow-hidden mb-4"
      >
        {product.images?.map((img, i) => (
          <SwiperSlide key={i} onClick={openModal}>
            <img
              src={img}
              alt={product.title}
              className="w-full h-60 object-cover"
            />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next bg-white p-10 rounded-full scale-[0.4] translate-x-6 -translate-y-2 hover:scale-[0.45] transition duration-300" />
        <div className="swiper-button-prev bg-white p-10 rounded-full scale-[0.4] -translate-x-6 -translate-y-2 hover:scale-[0.45] transition duration-30" />
      </Swiper>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Images Modal"
      >
        <Slider2 photos={product.images ?? []} />
        <Link
          href={`/properties/${product.id}`}
          className="absolute bg-primary text-white p-2 rounded-md text-sm hover:bg-primary3 transition duration-300 z-10 left-1/2 -translate-x-1/2 bottom-44"
        >
          {t("viewProperty")}
        </Link>
      </Modal>

      <h1 className="font-bold mb-2 truncate">{product.title}</h1>
      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center mb-8">
        <p className="text-xl font-semibold">
          {formatCurrency(product?.price ?? 0)} COP
        </p>
        <Link
          href={`/properties/${product.id}`}
          className="hidden sm:inline-block bg-primary text-white p-2 rounded-md text-sm hover:bg-primary3 transition duration-300"
        >
          {t("viewMore")}
        </Link>
      </div>
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1">
          <Bed strokeWidth={0.75} size={20} />
          <span>
            {product.bedrooms} {t("beds")}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Bath strokeWidth={0.75} size={20} />
          <span>
            {product.bathrooms} {t("baths")}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LandPlot strokeWidth={0.75} size={20} />
          <span>{product.area} m²</span>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
