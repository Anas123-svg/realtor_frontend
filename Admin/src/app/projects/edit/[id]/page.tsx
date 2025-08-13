"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  AMENITIES,
  INVESTMENT_POTENTIAL,
  PROJECT_TYPE,
  NEIGHBORHOOD,
  COMMUNITY_FEATURES,
  SUSTAINABILITY_FEATURES,
  INVESTMENT_REASON,
  AMENITIE,
} from "@/constants";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import Modal from "react-modal";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { IoMdClose } from "react-icons/io";
import PhotosUploader from "@/components/Uploader";
import axios from "axios";
import toast from "react-hot-toast";
import { Property } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  projectType: z.string().min(1, "Project type is required"),
  price: z.number().min(1, "Price is required"),
  videos: z.array(z.string()).optional(),
  address: z.string().min(1, "Address is required"),
  longitude: z.number(),
  latitude: z.number(),
  region: z.string().min(1, "Region is required"),
  developerInformation: z.string().min(1, "Developer information is required"),
  delivery_time: z.string().min(1, "Delivery time is required"),
  neighborhood: z
    .array(z.string())
    .min(1, "At least one neighborhood is required"),
  communityFeatures: z
    .array(z.string())
    .min(1, "At least one community feature is required"),
  sustainabilityFeatures: z
    .array(z.string())
    .min(1, "At least one sustainability feature is required"),
  investmentReason: z
    .array(z.string())
    .min(1, "At least one investment reason is required"),
  amenities: z.array(
    z.object({
      name: z.string(),
      sub_amenities: z.array(z.string())
    })
  ),
  progress: z
    .preprocess(val => val === "" ? undefined : Number(val), z.number().min(0).optional()),
  investmentPotential: z.string().min(1, "Investment potential is required"),
  FAQ: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      }),
    )
    .optional(),
  // properties: z.array(z.number()).min(1, "At least one property is required"),
  properties: z.array(z.number()).default([]),

});

type MapComponentProps = {
  onLocationSelect: (location: {
    address: string;
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
                address: newAddress,
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
            address: place.formatted_address || "",
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

type ProjectFormData = z.infer<typeof ProjectSchema>;
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
        {/* <div className="flex flex-wrap gap-2">
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
        </div> */}

        <div className="flex flex-wrap gap-2">
          {Array.isArray(options) &&
            options.map((option) => (
              <button
                key={option}
                type="button"
                className={`rounded border border-stroke px-3 py-2 text-sm font-medium text-black dark:border-strokedark ${selectedOptions?.includes(option)
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

const EditProject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      images: [],
      title: "",
      description: "",
      projectType: "",
      price: 0,
      videos: [],
      address: "",
      longitude: 0,
      latitude: 0,
      region: "",
      developerInformation: "",
      delivery_time: "",
      neighborhood: [],
      communityFeatures: [],
      sustainabilityFeatures: [],
      investmentReason: [],
      amenities: Object.keys(AMENITIES).map((name) => ({
        name,
        sub_amenities: [],
      })), progress: 0,
      investmentPotential: "",
      FAQ: [],
      properties: [],
    },
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [faqModalIsOpen, setFaqModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const [properties, setProperties] = useState<Property[]>([]);
  const [videoLink, setVideoLink] = useState<string>("");
  const { t } = useTranslation();
  const [faq, setFaq] = useState<{ question: string; answer: string }>({
    question: "",
    answer: "",
  });

  const { id } = useParams();
  const router = useRouter();
  const [search, setSearch] = useState("");



  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
      );

      const project = response.data.project ?? response.data;

      setValue("images", project.images);
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("projectType", project.projectType);
      setValue("price", Number(project.price));
      setValue("videos", project.videos);
      setValue("address", project.address);
      setValue("longitude", Number(project.longitude));
      setValue("latitude", Number(project.latitude));
      setValue("region", project.region);
      setValue("developerInformation", project.developerInformation);
      setValue("delivery_time", project.delivery_time);
      setValue("neighborhood", project.neighborhood);
      setValue("communityFeatures", project.communityFeatures);
      setValue("sustainabilityFeatures", project.sustainabilityFeatures);
      setValue("investmentReason", project.investmentReason);

      setValue(
        "amenities",
        Object.keys(AMENITIE).map((name) => {
          const matched = project.amenities?.find((item: any) => item.name === name);
          return {
            name,
            sub_amenities: matched?.sub_amenities || [],
          };
        })
      );

      setValue("progress", project.progress);
      setValue("investmentPotential", project.investmentPotential);
      setValue("FAQ", project.FAQ);
      setValue("properties", project.properties);
    } catch (error: any) {
      toast.error(error.response?.data.message || "Failed to fetch project");
    }
  };


  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`,
      );
      setProperties(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to fetch properties");
    }
  };

  useEffect(() => {
    fetchProject();
    fetchProperties();
  }, []);

  const handleLocationSelect = useCallback(
    (location: {
      address: string;
      latitude: number;
      longitude: number;
      region: string;
    }) => {
      setValue("address", location.address);
      setValue("longitude", location.longitude);
      setValue("latitude", location.latitude);
      setValue("region", location.region);
    },
    [setValue],
  );




  // Filtered properties based on search query
  const filteredProperties = properties.filter((property) =>
    (property.title + " - " + t(property.dealType))
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  // const onSubmit = async (data: ProjectFormData) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.put(
  //       `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
  //       data,
  //     );
  //     toast.success(response.data.message || "Project edited successfully");
  //     router.push("/projects");
  //   } catch (error: any) {
  //     toast.error(error.response.data.message || "Failed to edit project");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);

      // 🆕 Log URL and payload for debugging
      console.log("PUT request to:", `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`);
      console.log("Payload:", data);

      // ✅ Send request
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
        data
      );

      // 🆕 Safer success message access
      toast.success(response.data?.message || "Project edited successfully");

      router.push("/projects");
    } catch (error: any) {
      // 🆕 Safe optional chaining to prevent 'Cannot read properties of undefined'
      console.error("Edit project error:", error);
      toast.error(error.response?.data?.message || "Failed to edit project");
    } finally {
      setLoading(false);
    }
  };


  const addVideoLink = (link: string) => {
    const videos = watch("videos") || [];
    setValue("videos", [...videos, link]);
  };

  const removeVideoLink = (index: number) => {
    setValue(
      "videos",
      (watch("videos") || []).filter((_, i) => i !== index),
    );
  };

  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb prev={t("projects")} pageName={t("editProject")} />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {t("editProject")}
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
                    name="projectType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="dealType"
                        >
                          {t("projectType")}{" "}
                          {errors.projectType && (
                            <span className="text-red">
                              - {errors.projectType.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="projectType"
                          {...field}
                        >
                          <option value="">{t("select")}</option>
                          {PROJECT_TYPE.map((type) => (
                            <option key={type} value={type}>
                              {t(type)}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="mb-5.5 w-full">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="location"
                      >
                        {t("location")}{" "}
                        {errors.address && (
                          <span className="text-red">
                            - {errors.address?.message}
                          </span>
                        )}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          id="address"
                          placeholder={t("location")}
                          {...field}
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
                      lat: watch("latitude") || 11.236529500744,
                      lng: watch("longitude") || -74.1995372,
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
                      name="progress"
                      control={control}
                      render={({ field }) => (
                        <>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="progress"
                          >
                            {t("progress")}{" "}
                            {errors.progress && (
                              <span className="text-red">
                                - {errors.progress.message}
                              </span>
                            )}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            id="progress"
                            placeholder={t("progress")}
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
                      name="developerInformation"
                      control={control}
                      render={({ field }) => (
                        <>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="developerInformation"
                          >
                            {t("developerInfo")}{" "}
                            {errors.developerInformation && (
                              <span className="text-red">
                                - {errors.developerInformation.message}
                              </span>
                            )}
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            id="developerInformation"
                            placeholder={t("developerInfo")}
                            {...field}
                          />
                        </>
                      )}
                    />
                  </div>
                  <div className="mb-5.5 w-full">
                    <Controller
                      name="investmentPotential"
                      control={control}
                      render={({ field }) => (
                        <>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="investmentPotential"
                          >
                            {t("investmentPotential")}{" "}
                            {errors.investmentPotential && (
                              <span className="text-red">
                                - {errors.investmentPotential.message}
                              </span>
                            )}
                          </label>
                          <select
                            className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            id="investmentPotential"
                            {...field}
                          >
                            <option value="">{t("select")}</option>
                            {INVESTMENT_POTENTIAL.map((type) => (
                              <option key={type} value={type}>
                                {t(type)}
                              </option>
                            ))}
                          </select>
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="mb-5.5">
                  <Controller
                    name="delivery_time"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="delivery_time"
                        >
                          {t("deliveryTime")}{" "}
                          {errors.delivery_time && (
                            <span className="text-red">
                              - {errors.delivery_time.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="investmentPotential"
                          {...field}
                        >
                          <option value="">{t("select")}</option>
                          <option value="Immediate">{t("Immediate")}</option>
                          <option value="Under 6 months">
                            {t("Under 6 months")}
                          </option>
                          <option value="Under a year">
                            {t("Under a year")}
                          </option>
                          <option value="Under 2 years">
                            {t("Under 2 years")}
                          </option>
                          <option value="Under 3 years">
                            {t("Under 3 years")}
                          </option>
                          <option value="Under 5 years">
                            {t("Under 5 years")}
                          </option>
                        </select>
                      </>
                    )}
                  />
                </div>
                <ToggleButtonGroup
                  label={t("investmentReason")}
                  error={errors.investmentReason?.message}
                  options={INVESTMENT_REASON}
                  selectedOptions={watch("investmentReason")}
                  onChange={(selected) =>
                    setValue("investmentReason", selected)
                  }
                />
                <ToggleButtonGroup
                  label={t("communityFeatures")}
                  error={errors.communityFeatures?.message}
                  options={COMMUNITY_FEATURES}
                  selectedOptions={watch("communityFeatures")}
                  onChange={(selected) =>
                    setValue("communityFeatures", selected)
                  }
                />
                <ToggleButtonGroup
                  label={t("sustainabilityFeatures")}
                  error={errors.sustainabilityFeatures?.message}
                  options={SUSTAINABILITY_FEATURES}
                  selectedOptions={watch("sustainabilityFeatures")}
                  onChange={(selected) =>
                    setValue("sustainabilityFeatures", selected)
                  }
                />


                {/*                 
                <ToggleButtonGroup
                  label={t("amenities")}
                  error={errors.amenities?.message}
                  options={AMENITIES}
                  selectedOptions={watch("amenities")}
                  onChange={(selected) => setValue("amenities", selected)}
                /> */}


                <h1 className="font-bold text-black mt-4">{t("amenities")}</h1>
                <div className="w-full h-[1px] bg-slate-300 mb-4" />

                {Object.entries(AMENITIE).map(([name, options]) => (
                  <ToggleButtonGroup
                    key={name}
                    label={t(name)}
                    error={errors.amenities?.message}
                    options={options}
                    selectedOptions={
                      watch("amenities")?.find((item: any) => item.name === name)?.sub_amenities || []
                    }
                    onChange={(selected) => {
                      const updatedAmenities = [...(watch("amenities") || [])];
                      const categoryIndex = updatedAmenities.findIndex((item: any) => item.name === name);

                      if (categoryIndex > -1) {
                        updatedAmenities[categoryIndex].sub_amenities = selected;
                      } else {
                        updatedAmenities.push({ name, sub_amenities: selected });
                      }

                      setValue("amenities", updatedAmenities);
                    }}
                  />
                ))}

                <div className="w-full h-[1px] mb-4 bg-slate-300" />




                <ToggleButtonGroup
                  label={t("neighborhood")}
                  error={errors.neighborhood?.message}
                  options={NEIGHBORHOOD}
                  selectedOptions={watch("neighborhood")}
                  onChange={(selected) => setValue("neighborhood", selected)}
                />
                <div className="mb-5.5 w-full">
                  <Controller
                    name="videos"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="block text-sm font-medium text-black dark:text-white"
                          htmlFor="videos"
                        >
                          {t("videoLink")} ({t("optional")})
                        </label>
                        <p className="mb-3 block text-xs font-medium text-black dark:text-white">
                          {t("instruction")}
                        </p>
                        <div className="mb-3 flex items-center gap-2">
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            id="videoInput"
                            placeholder={t("videoLink")}
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!videoLink) {
                                toast.error("Video link is required");
                                return;
                              }
                              const urlMatch = videoLink.match(/src="([^"]+)"/);
                              if (urlMatch) {
                                addVideoLink(urlMatch[1]);
                              } else {
                                addVideoLink(videoLink);
                              }
                              setVideoLink("");
                            }}
                            className="flex justify-center whitespace-nowrap rounded bg-primary px-4 py-3 text-sm font-medium text-gray hover:bg-opacity-90"
                          >
                            Add
                          </button>
                        </div>
                        <ul>
                          {field.value?.map((video: string, index: number) => (
                            <li
                              key={index}
                              className="mb-2 flex items-center justify-between rounded border border-stroke bg-gray p-2 dark:border-strokedark dark:bg-meta-4"
                            >
                              <span className="max-w-[80%] truncate text-sm text-black dark:text-white">
                                {video}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeVideoLink(index)}
                                className="text-red-500 hover:text-red-700 px-2"
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  />
                </div>
                {/* <ToggleButtonGroup
                  label={t("properties")}
                  error={errors.properties?.message}
                  options={properties.map(
                    (property) => property.title + " - " + t(property.dealType),
                  )}
                  selectedOptions={watch("properties").map(
                    (id) =>
                      properties.find((property) => property.id === id)?.title +
                      " - " +
                      properties.find((property) => property.id === id)
                        ?.dealType,
                  )}
                  onChange={(selectedTitles) => {
                    const selectedIDs = properties
                      .filter((property) =>
                        selectedTitles.includes(
                          property.title + " - " + property.dealType,
                        ),
                      )
                      .map((property) => property.id);
                    setValue("properties", selectedIDs);
                  }}
                /> */}

                <h1 className="text-black">{t("properties")}</h1>

                {/* Search input */}
                <input
                  type="text"
                  placeholder={t("Search property...")}
                  className="w-full  bg-gray    border rounded px-3 py-2 mb-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {/* Scrollable container with hidden scrollbar */}
                <div className="max-h-[300px] overflow-y-auto border rounded p-2 scrollbar-hide">
                  <ToggleButtonGroup
                    label=""
                    error={errors.properties?.message}
                    options={filteredProperties.map(
                      (property) => property.title + " - " + t(property.dealType)
                    )}
                    selectedOptions={watch("properties").map((id) => {
                      const prop = properties.find((property) => property.id === id);
                      return prop ? prop.title + " - " + t(prop.dealType) : "";
                    })}
                    onChange={(selectedTitles) => {
                      const selectedIDs = properties
                        .filter((property) =>
                          selectedTitles.includes(
                            property.title + " - " + t(property.dealType)
                          )
                        )
                        .map((property) => property.id);
                      setValue("properties", selectedIDs);
                    }}
                  />
                </div>



                <div className="mb-5.5 w-full">
                  <Controller
                    name="FAQ"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="FAQ"
                        >
                          {t("FAQ")} ({t("optional")})
                        </label>
                        <button
                          type="button"
                          onClick={() => setFaqModalIsOpen(true)}
                          className="flex justify-center whitespace-nowrap rounded bg-primary px-4 py-3 text-sm font-medium text-gray hover:bg-opacity-90"
                        >
                          {t("addFaq")}
                        </button>
                        <Modal
                          isOpen={faqModalIsOpen}
                          onRequestClose={() => setFaqModalIsOpen(false)}
                          style={customStyles}
                        >
                          <div className="mb-5 flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-white dark:text-white">
                              {t("addFaq")}
                            </h4>
                            <button
                              onClick={() => setFaqModalIsOpen(false)}
                              className="dark:text-white dark:hover:text-white"
                            >
                              <IoMdClose size={18} />
                            </button>
                          </div>
                          <div className="mb-5">
                            <label
                              className="mb-3 block text-sm font-medium text-white"
                              htmlFor="question"
                            >
                              {t("question")}
                            </label>
                            <input
                              type="text"
                              id="question"
                              value={faq.question}
                              onChange={(e) =>
                                setFaq({ ...faq, question: e.target.value })
                              }
                              className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              placeholder={t("question")}
                            />
                          </div>
                          <div className="mb-5">
                            <label
                              className="mb-3 block text-sm font-medium text-white"
                              htmlFor="answer"
                            >
                              {t("answer")}
                            </label>
                            <textarea
                              id="answer"
                              value={faq.answer}
                              onChange={(e) =>
                                setFaq({ ...faq, answer: e.target.value })
                              }
                              className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              placeholder={t("answer")}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (!faq.question || !faq.answer) {
                                toast.error("Question and answer are required");
                                return;
                              }
                              field.onChange([...(field.value || []), faq]);
                              setFaq({ question: "", answer: "" });
                              setFaqModalIsOpen(false);
                            }}
                            className="flex justify-center whitespace-nowrap rounded bg-primary px-4 py-3 text-sm font-medium text-gray hover:bg-opacity-90"
                          >
                            {t("addFaq")}
                          </button>
                        </Modal>
                        <ul className="mt-5">
                          {field.value?.map(
                            (
                              faq: { question: string; answer: string },
                              index: number,
                            ) => (
                              <li
                                key={index}
                                className="mb-2 flex items-center justify-between rounded border border-stroke bg-gray p-2 dark:border-strokedark dark:bg-meta-4"
                              >
                                <span className="max-w-[80%] truncate text-sm text-black dark:text-white">
                                  <strong>{faq.question}</strong>
                                  <br />
                                  {faq.answer}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.onChange(
                                      field.value?.filter(
                                        (_, i) => i !== index,
                                      ),
                                    );
                                  }}
                                  className="text-red-500 hover:text-red-700 px-2"
                                >
                                  Remove
                                </button>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  />
                </div>
              </div>
              <button
                className="flex w-full justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                disabled={loading}
              >
                {loading ? t("loading") : t("editProject")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditProject;
