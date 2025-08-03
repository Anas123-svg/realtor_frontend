"use client";
import React, { useEffect, useState } from "react";
import Slider from "@/components/propertyDetails/slider";
import { Heart, Forward } from "lucide-react";
import Main from "@/components/propertyDetails/main";
import Video from "@/components/propertyDetails/video";
import Map from "@/components/propertyDetails/map";
import Characteristics from "@/components/propertyDetails/characteristics";
import About from "@/components/propertyDetails/about";
import Similar from "@/components/propertyDetails/similar";
import Slider2 from "@/components/propertyDetails/slider2";
import { useParams } from "next/navigation";
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import whatsapp from "@/assets/whatsapp.png";
import tiktok from "@/assets/tiktok.png";

import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Form from "@/components/propertyDetails/main/form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const page = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property>();
  const [similar, setSimilar] = useState<Property[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const { t } = useTranslation();
  const [admin, setAdmin] = useState();

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`
      );
      setProperty(response.data.property);
      setAdmin(response.data.property.admin);
      setSimilar(response.data.similarProperties);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementView = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}/increment-views`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const incrementLike = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}/increment-likes`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperty();
    incrementView();
  }, []);

  return property ? (
    <div className="pt-28">
      <div className=" lg:block ">
        <Slider property={property} />
      </div>
      <div className="container">
        {/* <div className="lg:hidden">
          <Slider2 photos={property.images} />
        </div> */}
        <Main property={property} admin={admin} />
        <div className="flex gap-5 mb-5 lg:hidden">
          <button
            onClick={() => {
              incrementLike();
              setIsLiked(!isLiked);
            }}
            className="flex gap-2 items-center hover:scale-105 transition duration-300 bg-white py-2 px-4 rounded-full shadow"
          >
            <Heart
              color={isLiked ? "#ff2600" : "#000"}
              fill={isLiked ? "#FF0000" : "transparent"}
              size={18}
            />
            <span className="font-hel">{isLiked ? t("liked") : t("like")}</span>
          </button>
          <Dialog>
            <DialogTrigger className="flex gap-2 items-center hover:scale-105 transition duration-300 bg-white py-2 px-4 rounded-full shadow">
              <Forward size={18} />
              <span className="font-hel">{t("share")}</span>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-xl font-semibold text-gray-800 text-center">
                {t("shareProperty")}
              </DialogTitle>
              <div className="flex flex-col items-center gap-6 mt-6">
                <p className="text-center text-gray-600 text-sm">
                  {t("sharePropertyText")}
                  <br />
                  <span className="font-medium">{property.title}</span>
                  <br />
                  <span className="italic">{property.location.region}</span>.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}&quote=${encodeURIComponent(
                          `Check out this amazing property: ${property.title} located at ${property.location.region}!`
                        )}`,
                        "_blank"
                      )
                    }
                    className="p-2 bg-blue-600 rounded-full transition-transform transform hover:scale-110 hover:bg-blue-700"
                  >
                    <img
                      src={facebook.src}
                      alt="facebook"
                      className="w-8 h-8"
                    />
                  </button>
                  <button
                    onClick={() =>
                      window.open(`https://www.instagram.com/`, "_blank")
                    }
                    className="p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full transition-transform transform hover:scale-110"
                  >
                    <img
                      src={instagram.src}
                      alt="instagram"
                      className="w-8 h-8 bg-white rounded-lg"
                    />
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(
                          `Check out this amazing property: ${property.title} located at ${property.location.region}! ${window.location.href}`
                        )}`,
                        "_blank"
                      )
                    }
                    className="p-2 bg-green-500 rounded-full transition-transform transform hover:scale-110 hover:bg-green-600"
                  >
                    <img
                      src={whatsapp.src}
                      alt="whatsapp"
                      className="w-8 h-8"
                    />
                  </button>
                  <button
                    onClick={() =>
                      window.open(`https://www.tiktok.com/`, "_blank")
                    }
                    className="p-2 bg-black rounded-full transition-transform transform hover:scale-110 hover:bg-gray-800"
                  >
                    <img src={tiktok.src} alt="tiktok" className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Check out this amazing property: ${property.title} located at ${property.location.region}! ${window.location.href}`
                      );
                      toast.success("Link copied to clipboard!");
                    }}
                    className="py-2 px-4 bg-gray-300 rounded-full transition-transform transform hover:scale-110 hover:bg-gray-400"
                  >
                    <span className="text-black font-semibold text-sm">
                      {t("copyLink")}
                    </span>
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* <Video photos={property.images} video={property.video} /> */}
        <Map
          latitude={Number(property.location.latitude)}
          longitude={Number(property.location.longitude)}
          region={property.location.region}
        />
        <Characteristics characteristics={property.amenities} />
        <About property={property} />
        <div id="full-video">
          <Video photos={property.images} video={property.video} />
        </div>

        {admin && (
          <div className="md:hidden">
            <Form admin={admin} />
          </div>
        )}
        <Similar properties={similar} />
      </div>
    </div>
  ) : (
    <div>
      {/* skeletons */}
      <div className="py-28 container">
        <div className="hidden lg:block">
          <Skeleton className="h-[500px]" />
        </div>
        <div className="lg:hidden">
          <Skeleton className="h-[300px]" />
        </div>
        <div className="flex gap-5 mt-5">
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
        </div>
      </div>
    </div>
  );
};

export default page;
