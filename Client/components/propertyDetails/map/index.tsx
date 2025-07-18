import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  latitude: number;
  longitude: number;
  region: string;
}

const Map = ({ latitude, longitude, region }: Props) => {
  const { isLoaded } = useGoogleMapsStore();
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <h2 className="text-4xl font-hel mb-5">{t("exploreArea")}</h2>
      <p className="mb-5">{region}</p>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: latitude, lng: longitude }}
          zoom={15}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
