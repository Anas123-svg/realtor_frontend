"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PROPERTY_TYPES,
  VIEW_OPTIONS,
  OUTDOOR_OPTIONS,
  PROPERTY_STYLES,
  NOISE_LEVELS,
  LAUNDRY_OPTIONS,
  SECURITY_FEATURES,
  AMENITIES,
  INTERNET_TYPES,
  HEATING_TYPES,
  COOLING_TYPES,
  NEARBY_INFRASTRUCTURE,
  POWER_BACKUP,
  PROPERTY_STATUS,
} from "@/constants";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import Modal from "react-modal";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { IoMdClose } from "react-icons/io";
import PhotosUploader from "@/components/Uploader";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// Zod schema for strong type validation
const PropertySchema = z.object({
  images: z.array(z.string()).min(1, "At least one image is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.object({
    longitude: z.number(),
    latitude: z.number(),
    region: z.string().min(1, "Location is required"),
  }),
  bedrooms: z
    .number()
    .min(0, "Bedrooms must be 0 or greater")
    .max(100, "Bedrooms must be less than 100"),
  bathrooms: z
    .number()
    .min(0, "Bathrooms must be 0 or greater")
    .max(100, "Bathrooms must be less than 100"),
  area: z
    .number()
    .min(1, "Area must be greater than 0")
    .max(10000, "Area must be less than 10000"),
  propertyType: z.string().min(1, "Property type is required"),
  propertyStatus: z.string().min(1, "Property status is required"),
  dealType: z.enum(["Sale", "Rental", "Tourist Rental", "Residential Rental"]),
  view: z.array(z.string()).min(1, "At least one view option is required"),
  outdoor: z
    .array(z.string())
    .min(1, "At least one outdoor option is required"),
  propertyStyle: z
    .array(z.string())
    .min(1, "At least one property style is required"),
  floors: z
    .number()
    .min(1, "Number of floors is required")
    .max(100, "Number of floors must be less than 100"),
  noiseLevel: z.string().min(1, "Noise level is required"),
  laundry: z.string().min(1, "Laundry option is required"),
  securityFeatures: z
    .array(z.string())
    .min(1, "At least one security feature is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  internet: z.string().min(1, "Internet type is required"),
  heating: z
    .array(z.string())
    .min(1, "At least one heating option is required"),
  cooling: z
    .array(z.string())
    .min(1, "At least one cooling option is required"),
  powerBackup: z
    .array(z.string())
    .min(1, "At least one power backup option is required"),
  nearbyInfrastructure: z
    .array(z.string())
    .min(1, "At least one infrastructure is required"),
  condition: z.enum(["New", "Used"]),
  video: z.string().optional(),
  price: z.number().min(1, "Price must be greater than 0"),
  priceType: z.enum(["Cash", "Financing Options"]),
});

type MapComponentProps = {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    region: string;
  }) => void;
  initialLocation?: { lat: number; lng: number };
  defaultZoom?: number;
};

const MapComponent = memo(
  ({
    onLocationSelect,
    initialLocation = { lat: 11.236529500744, lng: -74.1995372 },
    defaultZoom = 15,
  }: MapComponentProps) => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
      null,
    );
    const markerRef = useRef<google.maps.Marker | null>(null);
    const [currentLocation, setCurrentLocation] = useState(initialLocation);
    const [address, setAddress] = useState("");

    const handleMapClick = useCallback(
      (event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();

        if (lat && lng) {
          setCurrentLocation({ lat, lng });
          if (markerRef.current) {
            markerRef.current.setPosition({ lat, lng });
          }

          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
              const newAddress = results[0].formatted_address;
              setAddress(newAddress);
              onLocationSelect({
                latitude: lat,
                longitude: lng,
                region: newAddress,
              });
            }
          });
        }
      },
      [onLocationSelect],
    );

    const handlePlaceChanged = useCallback(() => {
      if (autocompleteRef.current) {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setCurrentLocation({ lat, lng });
          setAddress(place.formatted_address || "");
          if (markerRef.current) {
            markerRef.current.setPosition({ lat, lng });
          }
          if (mapRef.current) {
            mapRef.current.panTo({ lat, lng });
          }
          onLocationSelect({
            latitude: lat,
            longitude: lng,
            region: place.formatted_address || "",
          });
        }
      }
    }, [onLocationSelect]);

    useEffect(() => {
      return () => {
        mapRef.current = null;
        autocompleteRef.current = null;
        markerRef.current = null;
      };
    }, []);
    const { t } = useTranslation();
    return (
      <div className="w-full">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            placeholder={t("searchLocation")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Autocomplete>
        <div className="mt-4 h-[400px] w-full">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={currentLocation}
            zoom={defaultZoom}
            onClick={handleMapClick}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            <Marker
              position={currentLocation}
              onLoad={(marker) => (markerRef.current = marker)}
            />
          </GoogleMap>
        </div>
      </div>
    );
  },
);
MapComponent.displayName = "MapComponent";

type PropertyFormData = z.infer<typeof PropertySchema>;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "650px",
    maxHeight: "90vh",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    border: "1px solid #4b5563",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

// Memoized ToggleButtonGroup component
const ToggleButtonGroup = memo(
  ({
    label,
    error,
    options,
    selectedOptions,
    onChange,
  }: {
    label: string;
    error?: string;
    options: string[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
  }) => {
    const handleToggle = useCallback(
      (value: string) => {
        onChange(
          selectedOptions.includes(value)
            ? selectedOptions.filter((opt) => opt !== value)
            : [...selectedOptions, value],
        );
      },
      [selectedOptions, onChange],
    );
    const { t } = useTranslation();
    return (
      <div className="mb-5.5">
        <p className="mb-3 block text-sm font-medium text-black dark:text-white">
          {label} {error && <span className="text-red">- {error}</span>}
        </p>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`rounded border border-stroke px-3 py-2 text-sm font-medium text-black dark:border-strokedark ${
                selectedOptions.includes(option)
                  ? "bg-primary text-white"
                  : "bg-gray dark:bg-meta-4 dark:text-white"
              }`}
              onClick={() => handleToggle(option)}
            >
              {t(option)}
            </button>
          ))}
        </div>
      </div>
    );
  },
);
ToggleButtonGroup.displayName = "ToggleButtonGroup";

const EditProperty = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      images: [],
      title: "",
      description: "",
      location: {
        longitude: 0,
        latitude: 0,
        region: "",
      },
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      propertyType: "",
      propertyStatus: "",
      dealType: "Sale",
      view: [],
      outdoor: [],
      propertyStyle: [],
      floors: 0,
      noiseLevel: "",
      laundry: "",
      securityFeatures: [],
      amenities: [],
      internet: "",
      heating: [],
      cooling: [],
      powerBackup: [],
      nearbyInfrastructure: [],
      condition: "New",
      video: "",
      price: 0,
      priceType: "Cash",
    },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const { id } = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
      );
      const property = response.data.property;
      const location = {
        latitude: Number(property.location.latitude),
        longitude: Number(property.location.longitude),
        region: property.location.region,
      };
      setValue("images", property.images);
      setValue("title", property.title);
      setValue("description", property.description);
      setValue("location", location);
      setValue("bedrooms", property.bedrooms);
      setValue("bathrooms", property.bathrooms);
      setValue("area", property.area);
      setValue("propertyType", property.propertyType);
      setValue("propertyStatus", property.propertyStatus);
      setValue("dealType", property.dealType);
      setValue("view", property.view);
      setValue("outdoor", property.outdoor);
      setValue("propertyStyle", property.propertyStyle);
      setValue("floors", property.floors);
      setValue("noiseLevel", property.noiseLevel);
      setValue("laundry", property.laundry);
      setValue("securityFeatures", property.securityFeatures);
      setValue("amenities", property.amenities);
      setValue("internet", property.internet);
      setValue("heating", property.heating);
      setValue("cooling", property.cooling);
      setValue("powerBackup", property.powerBackup);
      setValue("nearbyInfrastructure", property.nearbyInfrastructure);
      setValue("condition", property.condition);
      setValue("price", property.price);
      setValue("priceType", property.priceType);
      if (property.video) setValue("video", property.video);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  const handleLocationSelect = useCallback(
    (location: { latitude: number; longitude: number; region: string }) => {
      setValue("location", {
        latitude: location.latitude,
        longitude: location.longitude,
        region: location.region,
      });
    },
    [setValue],
  );

  const onSubmit = async (data: PropertyFormData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
        data,
      );
      toast.success(response.data.message || "Property edited successfully");
      router.push("/properties");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb prev={t("properties")} pageName={t("editProperty")} />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {t("editProperty")}
            </h3>
          </div>
          <div className="p-7">
            <form
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-5.5 w-full">
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
                    <>
                      <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                        {t("images")} (Max 50){" "}
                        {errors.images && (
                          <span className="text-red">
                            - {errors.images.message}
                          </span>
                        )}
                      </p>
                      <PhotosUploader
                        maxPhotos={50}
                        addedPhotos={field.value}
                        onChange={field.onChange}
                      />
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="title"
                        >
                          {t("title")}{" "}
                          {errors.title && (
                            <span className="text-red">
                              - {errors.title.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          id="title"
                          placeholder={t("title")}
                          {...field}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="dealType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="dealType"
                        >
                          {t("dealType")}{" "}
                          {errors.dealType && (
                            <span className="text-red">
                              - {errors.dealType.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="dealType"
                          {...field}
                        >
                          <option value="Sale">{t("Sale")}</option>
                          <option value="Rental">{t("Rental")}</option>
                          <option value="Tourist Rental">
                            {t("Tourist Rental")}
                          </option>
                          <option value="Residential Rental">
                            {t("Residential Rental")}
                          </option>
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="mb-5.5 w-full">
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="location"
                      >
                        {t("location")}{" "}
                        {errors.location && (
                          <span className="text-red">
                            - {errors.location?.region?.message}
                          </span>
                        )}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          id="address"
                          placeholder={t("location")}
                          value={field.value.region}
                          readOnly
                        />
                        <button
                          onClick={() => setModalIsOpen(true)}
                          type="button"
                          className="flex justify-center whitespace-nowrap rounded bg-primary p-3.5 text-sm font-medium text-gray hover:bg-opacity-90"
                        >
                          {t("findOnMap")}
                        </button>
                      </div>
                    </>
                  )}
                />
              </div>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Find on Map"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="text-xl font-semibold text-white">
                    {t("findOnMap")}
                  </h4>
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="dark:text-white dark:hover:text-white"
                  >
                    <IoMdClose size={18} />
                  </button>
                </div>
                {isLoaded && (
                  <MapComponent
                    onLocationSelect={handleLocationSelect}
                    initialLocation={{
                      lat: watch("location").latitude || 11.236529500744,
                      lng: watch("location").longitude || -74.1995372,
                    }}
                  />
                )}
              </Modal>
              <div className="mb-5.5 w-full">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="description"
                      >
                        {t("description")}{" "}
                        {errors.description && (
                          <span className="text-red">
                            - {errors.description.message}
                          </span>
                        )}
                      </label>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        id="description"
                        placeholder={t("description")}
                        rows={5}
                        {...field}
                      />
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="price"
                        >
                          {t("price")}{" "}
                          {errors.price && (
                            <span className="text-red">
                              - {errors.price.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="price"
                          placeholder={t("price")}
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="priceType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="priceType"
                        >
                          {t("priceType")}{" "}
                          {errors.priceType && (
                            <span className="text-red">
                              - {errors.priceType.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="priceType"
                          {...field}
                        >
                          <option value="Cash">{t("Cash")}</option>
                          <option value="Financing Options">
                            {t("Financing Options")}
                          </option>
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="bedrooms"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="bedrooms"
                        >
                          {t("beds")}{" "}
                          {errors.bedrooms && (
                            <span className="text-red">
                              - {errors.bedrooms.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="bedrooms"
                          placeholder={t("beds")}
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="bathrooms"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="bathrooms"
                        >
                          {t("baths")}{" "}
                          {errors.bathrooms && (
                            <span className="text-red">
                              - {errors.bathrooms.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="bathrooms"
                          placeholder={t("baths")}
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="area"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="area"
                        >
                          {t("area")} ( m² ){" "}
                          {errors.area && (
                            <span className="text-red">
                              - {errors.area.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="area"
                          placeholder={t("area")}
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="floors"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="floors"
                        >
                          {t("floors")}{" "}
                          {errors.floors && (
                            <span className="text-red">
                              - {errors.floors.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="floors"
                          placeholder={t("floors")}
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="propertyType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="propertyType"
                        >
                          {t("propertyType")}{" "}
                          {errors.propertyType && (
                            <span className="text-red">
                              - {errors.propertyType.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="propertyType"
                          {...field}
                        >
                          <option value="">{t("select")}</option>
                          {PROPERTY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {t(type)}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="propertyStatus"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="leaseTerm"
                        >
                          {t("propertyStatus")}{" "}
                          {errors.propertyStatus && (
                            <span className="text-red">
                              - {errors.propertyStatus.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="leaseTerm"
                          {...field}
                        >
                          <option value="">{t("select")}</option>
                          {PROPERTY_STATUS.map((status) => (
                            <option key={status} value={status}>
                              {t(status)}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="noiseLevel"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="noiseLevel"
                        >
                          {t("noiseLevel")}{" "}
                          {errors.noiseLevel && (
                            <span className="text-red">
                              - {errors.noiseLevel.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="noiseLevel"
                          {...field}
                        >
                          <option value="">{t("select")}</option>
                          {NOISE_LEVELS.map((level) => (
                            <option key={level} value={level}>
                              {t(level)}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="laundry"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="laundry"
                        >
                          {t("laundry")}{" "}
                          {errors.laundry && (
                            <span className="text-red">
                              - {errors.laundry.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="laundry"
                          {...field}
                        >
                          <option value="">{t("select")}</option>
                          {LAUNDRY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {t(option)}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="internet"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="internet"
                        >
                          {t("internet")}{" "}
                          {errors.internet && (
                            <span className="text-red">
                              - {errors.internet.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="internet"
                          {...field}
                        >
                          <option value="">{t("select")}</option>
                          {INTERNET_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {t(type)}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="condition"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="condition"
                        >
                          {t("condition")}{" "}
                          {errors.condition && (
                            <span className="text-red">
                              - {errors.condition.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="condition"
                          {...field}
                        >
                          <option value="New">{t("New")}</option>
                          <option value="Used">{t("Used")}</option>
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>
              <ToggleButtonGroup
                label={t("propertyStyle")}
                error={errors.propertyStyle?.message}
                options={PROPERTY_STYLES}
                selectedOptions={watch("propertyStyle")}
                onChange={(selected) => setValue("propertyStyle", selected)}
              />
              <ToggleButtonGroup
                label={t("amenities")}
                error={errors.amenities?.message}
                options={AMENITIES}
                selectedOptions={watch("amenities")}
                onChange={(selected) => setValue("amenities", selected)}
              />
              <ToggleButtonGroup
                label={t("views")}
                error={errors.view?.message}
                options={VIEW_OPTIONS}
                selectedOptions={watch("view")}
                onChange={(selected) => setValue("view", selected)}
              />
              <ToggleButtonGroup
                label={t("outdoor")}
                error={errors.outdoor?.message}
                options={OUTDOOR_OPTIONS}
                selectedOptions={watch("outdoor")}
                onChange={(selected) => setValue("outdoor", selected)}
              />
              <ToggleButtonGroup
                label={t("securityFeatures")}
                error={errors.securityFeatures?.message}
                options={SECURITY_FEATURES}
                selectedOptions={watch("securityFeatures")}
                onChange={(selected) => setValue("securityFeatures", selected)}
              />
              <ToggleButtonGroup
                label={t("waterHeater")}
                error={errors.heating?.message}
                options={HEATING_TYPES}
                selectedOptions={watch("heating")}
                onChange={(selected) => setValue("heating", selected)}
              />
              <ToggleButtonGroup
                label={t("coolingSystem")}
                error={errors.cooling?.message}
                options={COOLING_TYPES}
                selectedOptions={watch("cooling")}
                onChange={(selected) => setValue("cooling", selected)}
              />
              <ToggleButtonGroup
                label={t("powerBackup")}
                error={errors.powerBackup?.message}
                options={POWER_BACKUP}
                selectedOptions={watch("powerBackup")}
                onChange={(selected) => setValue("powerBackup", selected)}
              />
              <ToggleButtonGroup
                label={t("nearbyInfrastructure")}
                error={errors.nearbyInfrastructure?.message}
                options={NEARBY_INFRASTRUCTURE}
                selectedOptions={watch("nearbyInfrastructure")}
                onChange={(selected) =>
                  setValue("nearbyInfrastructure", selected)
                }
              />
              {/* <div className="mb-5.5 w-full">
                <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Upload Video{" "}
                  {errors.video && (
                    <span className="text-red">- {errors.video.message}</span>
                  )}
                </p>
                <VideosUploader
                  maxVideos={1}
                  addedVideos={watch("video") ? [watch("video")] : []}
                  onChange={(videos) => setValue("video", videos[0])}
                />
              </div> */}
              <div className="mb-5.5 w-full">
                <Controller
                  name="video"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="video"
                      >
                        {t("videoLink")} ({t("optional")})
                      </label>
                      <p className="mb-3 block text-xs font-medium text-black dark:text-white">
                        {t("instruction")}
                      </p>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        id="video"
                        placeholder={t("videoLink")}
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          const url = value.match(/src="([^"]+)"/);
                          if (url) {
                            field.onChange(url[1]);
                          } else {
                            field.onChange(value);
                          }
                        }}
                      />
                    </>
                  )}
                />
              </div>
              <button
                className="flex w-full justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                disabled={loading}
              >
                {loading ? t("loading") : t("editProperty")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditProperty;
