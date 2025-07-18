// components/map/MapBox.tsx
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";

const MapBox = () => {
    const { isLoaded } = useGoogleMapsStore((state) => state);
    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    const [center] = React.useState({ lat: 11.2403547, lng: -74.2110227 });
    const router = useRouter();

    const properties: Partial<Property>[] = []; // Pass as prop if needed

    if (!isLoaded) return null;

    return (
        <div className="relative w-full h-full rounded-[10px] overflow-hidden shadow">
            {/* // <div className="relative w-full min-h-[300px] lg:min-h-full rounded-[10px] overflow-hidden shadow"> */}

            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                }}
                mapTypeId="hybrid"
                center={center}
                zoom={14}
                onLoad={(map) => {
                    setMap(map);
                }}
            >
                {properties.map((property) => (
                    <Marker
                        onClick={() => router.push(`/properties/${property.id}`)}
                        key={property.id}
                        position={{
                            lat: Number(property.location?.latitude) || 0,
                            lng: Number(property.location?.longitude) || 0,
                        }}
                    />
                ))}
            </GoogleMap>
            <button
                onClick={() => {
                    map?.panTo(center);
                }}
                className="group font-medium absolute top-4 right-4 border shadow bg-white text-black rounded p-2"
            >
                <Target className="text-gray-500 group-hover:text-black" size={22} />
            </button>
        </div>
    );
};

export default MapBox;
