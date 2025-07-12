"use client";
import React, { useState, useRef, useCallback, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PhotosUploader from "../Uploader";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface Location {
  latitude: number;
  longitude: number;
  region: string;
}

interface PropertyDetails {
  name: string;
  email: string;
  phone: string;
  country: string;
  propertyType: string;
  propertyTitle: string;
  propertySize: string;
  images: string[];
  location: Location;
  bedrooms: number;
  bathrooms: number;
  dealType: "Sale" | "Rental" | "Tourist Renal" | "Residential Rental";
}

const Calculator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof PropertyDetails, string>>
  >({});
  const [propertyDetails, setPropertyDetails] = useState<
    Partial<PropertyDetails>
  >({
    dealType: "Sale",
    images: [],
    location: {
      latitude: 0,
      longitude: 0,
      region: "",
    },
  });

  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const validateStep = (currentStep: number): boolean => {
    const errors: Partial<Record<keyof PropertyDetails, string>> = {};

    switch (currentStep) {
      case 1:
        if (!propertyDetails.name?.trim())
          errors.name = "Full Name is required";

        if (!propertyDetails.email?.trim()) errors.email = "Email is required";
        else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(propertyDetails.email))
            errors.email = "Invalid email format";
        }

        if (!propertyDetails.phone?.trim())
          errors.phone = "Phone Number is required";
        else {
          const phoneRegex = /^[+]?[\d\s()-]{10,}$/;
          if (!phoneRegex.test(propertyDetails.phone))
            errors.phone = "Invalid phone number format";
        }

        if (!propertyDetails.country?.trim())
          errors.country = "Country is required";
        break;

      case 2:
        if (!propertyDetails.dealType)
          errors.dealType = "Deal type is required";

        if (!propertyDetails.images || propertyDetails.images.length === 0)
          errors.images = "At least one image is required";

        if (!propertyDetails.location?.region?.trim())
          errors.location = "Location is required";

        if (!propertyDetails.propertyTitle?.trim())
          errors.propertyTitle = "Property Title is required";

        if (!propertyDetails.propertySize?.trim())
          errors.propertySize = "Property Size is required";
        else {
          const sizeNum = parseFloat(propertyDetails.propertySize);
          if (isNaN(sizeNum) || sizeNum <= 0)
            errors.propertySize = "Invalid property size";
        }

        if (!propertyDetails.bedrooms || propertyDetails.bedrooms <= 0)
          errors.bedrooms = "Number of Bedrooms is required";

        if (!propertyDetails.bathrooms || propertyDetails.bathrooms <= 0)
          errors.bathrooms = "Number of Bathrooms is required";

        if (!propertyDetails.propertyType)
          errors.propertyType = "Property Type is required";
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (key: keyof PropertyDetails, value: any) => {
    setPropertyDetails((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear specific error when input changes
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const handlePlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const location = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          region: place.formatted_address || "",
        };
        handleInputChange("location", location);
      }
    }
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (lat !== undefined && lng !== undefined) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: event.latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
          const location = {
            latitude: lat,
            longitude: lng,
            region: results[0].formatted_address || "",
          };
          handleInputChange("location", location);
        }
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateStep(2)) {
      try {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/property/eval`, {
          ...propertyDetails,
          location: propertyDetails.location?.region,
        });
        setStep(3);
      } catch (error) {
        console.log(error);
        toast.error("Failed to submit property details");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderErrorMessage = (field: keyof PropertyDetails) => {
    return formErrors[field] ? (
      <span className="text-red-500 text-sm mt-1">{formErrors[field]}</span>
    ) : null;
  };

  return (
    <div className="container py-10 md:py-20">
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        className="bg-primary2 p-10 rounded-3xl text-white"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-hel text-center mb-4">
          {step === 3 ? t("calcThanks") : t("calcQues")}
        </h1>
        <p className="text-[#F98124] text-center max-w-2xl mx-auto mb-10">
          {step === 3 ? t("calcThanksDesc") : t("calcQuesDesc")}
        </p>

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="fullName"
                >
                  {t("name")}*
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={propertyDetails.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("name")}
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold" htmlFor="email">
                  {t("email")}*
                </label>
                <input
                  type="email"
                  id="email"
                  value={propertyDetails.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("email")}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="phoneNumber"
                >
                  {t("phone")}*
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={propertyDetails.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("phone")}
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="country"
                >
                  {t("country")}*
                </label>
                <input
                  type="text"
                  id="country"
                  value={propertyDetails.country || ""}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder={t("countryPlaceholder")}
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("country")}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <RadioGroup
              defaultValue="sale"
              value={propertyDetails.dealType}
              onValueChange={(value: string) =>
                handleInputChange("dealType", value)
              }
              className="flex flex-wrap justify-center gap-10 mx-auto"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sale" id="sale" />
                <Label htmlFor="sale" className="text-lg">
                  {t("sale")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rental" id="rental" />
                <Label htmlFor="rental" className="text-lg">
                  {t("rental")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Tourist Rental" id="tourist" />
                <Label htmlFor="tourist" className="text-lg">
                  {t("touristRental")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Residential Rental" id="residential" />
                <Label htmlFor="residential" className="text-lg">
                  {t("residentialRental")}
                </Label>
              </div>
            </RadioGroup>
            {renderErrorMessage("dealType")}

            <div>
              <p className="text-sm font-semibold mb-2">{t("images")}*</p>
              <PhotosUploader
                maxPhotos={10}
                addedPhotos={propertyDetails.images || []}
                onChange={(photos) => handleInputChange("images", photos)}
              />
              {renderErrorMessage("images")}
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full">
                <p className="text-sm font-semibold mb-2">{t("location")}*</p>
                <div className="flex mt-2">
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRef.current = autocomplete)
                    }
                    onPlaceChanged={handlePlaceChanged}
                    className="w-full"
                  >
                    <input
                      type="text"
                      id="location"
                      value={propertyDetails.location?.region || ""}
                      onChange={(e) =>
                        handleInputChange("location", {
                          ...propertyDetails.location,
                          region: e.target.value,
                        })
                      }
                      placeholder={t("locationPlaceholder")}
                      className="w-full p-4 border-none bg-white text-black"
                    />
                  </Autocomplete>
                  <Dialog>
                    <DialogTrigger className="bg-secondary2 whitespace-nowrap px-8">
                      {t("findOnMap")}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Find on map</DialogTitle>
                      {isLoaded && (
                        <GoogleMap
                          mapContainerStyle={{ width: "100%", height: "400px" }}
                          center={{
                            lat: propertyDetails.location?.latitude || 0,
                            lng: propertyDetails.location?.longitude || 0,
                          }}
                          zoom={15}
                          onClick={handleMapClick}
                          onLoad={(map) => {
                            mapRef.current = map;
                          }}
                        >
                          <Marker
                            position={{
                              lat: propertyDetails.location?.latitude || 0,
                              lng: propertyDetails.location?.longitude || 0,
                            }}
                          />
                        </GoogleMap>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                {renderErrorMessage("location")}
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="propertyTitle"
                >
                  {t("propertyTitle")}*
                </label>
                <input
                  type="text"
                  id="propertyTitle"
                  value={propertyDetails.propertyTitle || ""}
                  onChange={(e) =>
                    handleInputChange("propertyTitle", e.target.value)
                  }
                  placeholder={t("propertyTitlePlaceholder")}
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("propertyTitle")}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="propertySize"
                >
                  {t("propertySize")} (m²)*
                </label>
                <input
                  type="text"
                  id="propertySize"
                  value={propertyDetails.propertySize || ""}
                  onChange={(e) =>
                    handleInputChange("propertySize", e.target.value)
                  }
                  placeholder={t("propertySizePlaceholder")}
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("propertySize")}
              </div>
              <div className="w-full">
                <p className="block text-sm font-semibold mb-2">
                  {t("propertyType")}*
                </p>
                <Select
                  value={propertyDetails.propertyType}
                  onValueChange={(value) =>
                    handleInputChange("propertyType", value)
                  }
                >
                  <SelectTrigger className="w-full h-14 border-none text-black">
                    <SelectValue placeholder={t("propertyTypePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {renderErrorMessage("propertyType")}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="bedrooms"
                >
                  {t("beds")}*
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  value={propertyDetails.bedrooms || ""}
                  onChange={(e) =>
                    handleInputChange("bedrooms", parseInt(e.target.value))
                  }
                  placeholder={t("bedsPlaceholder")}
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("bedrooms")}
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="bathrooms"
                >
                  {t("baths")}*
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  value={propertyDetails.bathrooms || ""}
                  onChange={(e) =>
                    handleInputChange("bathrooms", parseInt(e.target.value))
                  }
                  placeholder={t("bathsPlaceholder")}
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("bathrooms")}
              </div>
            </div>
          </div>
        )}

        {step === 3 ? (
          <div className="flex flex-col gap-5 text-center">
            <p className="text-2xl font-bold">{t("success")}</p>
            <p className="text-secondary2">{t("successMessage")}</p>
          </div>
        ) : (
          <div className="flex justify-between mt-10">
            {step !== 1 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-32 sm:w-40 h-14 relative group border-white border hover:border-background transition duration-300 text-white hover:text-black"
              >
                <span className="absolute w-full h-full top-0 left-0 bg-background scale-x-0 group-hover:scale-x-100 origin-left transition duration-300"></span>
                <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                  {t("previous")}
                </span>
              </button>
            )}
            {step === 1 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="ml-auto relative group w-32 sm:w-40 h-14 border-[#F98124] border hover:border-white transition duration-300"
              >
                <span className="absolute w-full h-full top-0 left-0 bg-[#F98124] scale-x-100 group-hover:scale-x-0 origin-right transition duration-300"></span>
                <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                  {t("next")}
                </span>
              </button>
            )}
            {step === 2 && (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto relative group w-32 sm:w-40 h-14 border-[#F98124] border hover:border-white transition duration-300"
              >
                <span className="absolute w-full h-full top-0 left-0 bg-[#F98124] scale-x-100 group-hover:scale-x-0 origin-right transition duration-300"></span>
                <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                  {loading ? t("submitting") : t("submit")}
                </span>
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Calculator;
