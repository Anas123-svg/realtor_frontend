import React, { useState } from "react";
import { MapPin, Bed, Bath, LandPlot, Heart, Car } from "lucide-react";
import Link from "next/link";
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
const CardFour = ({ product }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="rounded-2xl border border-white bg-white overflow-hidden hover:scale-105 transition duration-300">
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
        className="mySwiper w-full h-60"
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
      <Link href={`/properties/${product.id}`} className="block p-5">
        <h3 className="font-semibold mb-2 line-clamp-2 min-h-12">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-4">
          {product.description}
        </p>
        <p className="text-gray-500 flex items-center text-sm gap-1 mb-4">
          <MapPin strokeWidth={0.75} size={18} className="shrink-0" />
          <span className="truncate">
            {product.location?.region.split(",").slice(1).join(", ")}
          </span>
        </p>
        <p className="text-gray-500 flex items-center text-sm gap-1 mb-4">
          <span className="truncate">
            {product.reference_no}
          </span>
        </p>
        <p className="text-gray-500 flex items-center text-sm gap-1 mb-4">
          <span className="truncate">
            {product.neighborhood || 'N/A'}
          </span>
        </p>
        <div className="flex gap-2 mb-4 whitespace-nowrap">
          <div className="flex items-center gap-1 bg-neutral-200 rounded-full p-3">
            <Bed strokeWidth={0.5} size={22} />
            <span className="text-xs">{product.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-200 rounded-full p-3">
            <Bath strokeWidth={0.5} size={22} />
            <span className="text-xs">{product.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-200 rounded-full p-3">
            <Car strokeWidth={0.5} size={22} />
            <span className="text-xs">{product.parkingSpace}</span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-200 rounded-full p-3">
            <LandPlot strokeWidth={0.5} size={22} />
            <span className="text-xs">{product.area} m²</span>
          </div>

        </div>
        <div className="pt-5 border-t">
          <p className="text-xl font-semibold">
            {formatCurrency(product.price ?? 0)} COP
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CardFour;
