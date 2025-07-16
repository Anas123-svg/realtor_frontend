import { useJsApiLoader, Libraries } from "@react-google-maps/api";

const GOOGLE_MAPS_LIBRARIES = ["places", "geocoding"];

export const useGoogleMapsApi = (apiKey: string) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAPS_LIBRARIES as Libraries,
  });

  return { isLoaded, loadError };
};
