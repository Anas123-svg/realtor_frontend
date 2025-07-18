import Link from "next/link";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";

interface Props {
  product: Partial<Property>;
}
const CardTwo = ({ product }: Props) => {
  const { t } = useTranslation();
  return (
    <Link
      href={`/properties/${product.id}`}
      className="relative rounded-xl h-60 group"
    >
      <div className="w-full h-full object-cover absolute top-0 left-0 rounded-xl -z-10 overflow-hidden">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper w-full h-60"
        >
          {product.images?.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={product.title}
                className="w-full h-60 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full absolute left-0 bottom-0 p-5">
        <div className="bg-white rounded-lg p-5 group-hover:scale-105 transition duration-300">
          <div className="flex justify-between">
            <h1 className="font-bold mb-2 w-2/3 truncate">{product.title}</h1>
            <span className="font-bold text-secondary whitespace-nowrap">
              {product.dealType && t(product.dealType)}
            </span>
          </div>
          <p className="text-sm text-center line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardTwo;
