import React from "react";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Home,
  Trees,
  Leaf,
  Coffee,
  LineChart,
  HelpCircle,
  HomeIcon,
  Building,
  ClipboardCheck,
  Ruler,
  Bed,
  Bath,
  Layers,
  Car,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";
import { AMENITIES_WITH_I, AMENITIES_WITH_ID } from "@/constants";

interface Props {
  project: Project | undefined;
}

const Main = ({ project }: Props) => {
  const { isLoaded } = useGoogleMapsStore();
  const { t } = useTranslation();
  const lat = project?.latitude ? Number(project.latitude) : 0;
  const lng = project?.longitude ? Number(project.longitude) : 0;


  const hasValidAmenities =
    (project?.amenities?.length ?? 0) > 0 &&
    project?.amenities.some((cat) => {
      const category = AMENITIES_WITH_I.find((c) => c.name === cat.name);
      return category && cat.sub_amenities?.length > 0;
    });


  return (
    <div className="py-10">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-hel font-light mb-6 text-primary">
          {project?.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600 mb-8">
          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <MapPin className="w-4 h-4" />
            {t("location")}: {project?.address}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <DollarSign className="w-4 h-4" />
            {t("priceRange")}:{" "}
            {project?.priceRange
              ? project.priceRange
                .split("-")
                .map((price) => formatCurrency(Number(price)))
                .join(" - ")
              : "N/A"}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <DollarSign className="w-4 h-4" />
            {project?.adminFeeRange
              ? project.adminFeeRange
                .split("-")
                .map((price) => formatCurrency(Number(price)))
                .join(" - ")
              : "N/A"}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <Building className="w-4 h-4" />
            {t("projectType")}: {t(project?.projectType ?? "")}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <ClipboardCheck className="w-4 h-4" />
            {t("projectStatus")}: {t(project?.projectStatus ?? "N/A")}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <HomeIcon className="w-4 h-4" />
            {t("housingType")}: {t(project?.housingType ?? "N/A")}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <Ruler className="w-4 h-4" />
            {t("areaRange")}: {t(project?.areaRange ?? "N/A")}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <Bed className="w-4 h-4" />
            {t("bedroomRange")}: {t(project?.bedroomRange ?? "N/A")}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <Bath className="w-4 h-4" />
            {t("bathroomRange")}: {t(project?.bathroomRange ?? "N/A")}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <Layers className="w-4 h-4" />
            {t("floorRange")}: {t(project?.floorRange ?? "N/A")}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <Car className="w-4 h-4" />
            {t("parkingRange")}: {t(project?.parkingRange ?? "N/A")}
          </Badge>

          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <Clock className="w-4 h-4" />
            {t("delivery_time")}: {t(project?.delivery_time ?? "N/A")}
          </Badge>



        </div>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-lg">
          {project?.description}
        </p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}



        <div className="lg:col-span-2 space-y-8 ">
          {/* Developer Info Card */}
          <Card className="overflow-hidden border-[1px] border-gray-300">
            <CardHeader className="bg-[#f7f3e8]">
              <CardTitle className="flex font-hel items-center gap-2 text-gray-700">
                <Building2 className="w-5 h-5" />
                {t("developerInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-3 bg-[#f7f3e8]">
              <p className="text-gray-700 leading-relaxed">
                {project?.developerInformation}
              </p>
            </CardContent>
          </Card>

          {/* <div className="bg-blue-300">
            <div className="flex">
              <Building2 className="w-5 h-5" />
              {t("developerInfo")}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {project?.developerInformation}
            </p>

          </div> */}



          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: t("neighborhood"),
                icon: <Home className="w-5 h-5" />,
                items: project?.neighborhood,
                color: "bg-[#f7f3e8]",
                dotColor: "bg-primary",
              },
              {
                title: t("nearbyInfrastructure"),
                icon: <Home className="w-5 h-5" />,
                items: project?.nearbyInfrastructure,
                color: "bg-[#f7f3e8]",
                dotColor: "bg-primary",
              },
              {
                title: t("communityFeatures"),
                icon: <Trees className="w-5 h-5" />,
                items: project?.communityFeatures,
                color: "bg-[#f7f3e8]",
                dotColor: "bg-primary",
              },
              {
                title: t("sustainabilityFeatures"),
                icon: <Leaf className="w-5 h-5" />,
                items: project?.sustainabilityFeatures,
                color: "bg-[#f7f3e8]",
                dotColor: "bg-primary",
              },
            ].map((feature, idx) => (
              <Card
                key={idx}
                className="overflow-hidden border-[1px] border-gray-300 bg-[#f7f3e8]"
              >
                <CardHeader className={feature.color}>
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    {feature.icon}
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-3 bg-[#f7f3e8]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {feature.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 bg-[#f7f3e8] rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
                      >
                        <div className={`w-2 h-2 rounded-full ${feature.dotColor}`} />
                        <span className="text-gray-700 text-sm">{t(item)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: t("neighborhood"),
                icon: <Home className="w-5 h-5" />,
                items: project?.neighborhood,
                color: "bg-[#f7f3e8]",
                dotColor: "bg-primary",
              },
              {
                title: t("nearbyInfrastructure"),
                icon: <Home className="w-5 h-5" />,
                items: project?.nearbyInfrastructure,
                color: "bg-[#f7f3e8]",
                dotColor: "bg-primary",
              },
              {
                title: t("communityFeatures"),
                icon: <Trees className="w-5 h-5" />,
                items: project?.communityFeatures,
                color: "bg-[#f7f3e8]",
                dotColor: "bg-primary",
              },
              {
                title: t("sustainabilityFeatures"),
                icon: <Leaf className="w-5 h-5" />,
                items: project?.sustainabilityFeatures,
                color: "bg-[#f7f3e8]",
                dotColor: "bg-primary",
              },
            ]
              .filter((feature) => Array.isArray(feature.items) && feature.items.length > 0)
              .map((feature, idx) => (
                <Card
                  key={idx}
                  className="overflow-hidden border-[1px] border-gray-300 bg-[#f7f3e8]"
                >
                  <CardHeader className={feature.color}>
                    <CardTitle className="flex font-hel items-center gap-2 text-gray-700">
                      {feature.icon}
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-3 bg-[#f7f3e8]">
                    {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-2"> */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {feature.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 bg-[#f7f3e8] rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
                        >
                          <div className={`w-2 h-2 rounded-full ${feature.dotColor}`} />
                          <span className="text-gray-700 text-sm">{t(item)}</span>
                        </div>
                      ))}
                    </div>

                    {/* </div> */}
                  </CardContent>
                </Card>
              ))}
          </div>


          {/* <Card className="overflow-hidden border-[1px] border-gray-300 bg-[#f7f3e8]">
            <CardHeader className="bg-[#f7f3e8]">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Coffee className="w-5 h-5" />
                {t("amenities")}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-6 py-3 bg-[#f7f3e8]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project?.amenities?.map((cat, catIndex) => {
                  const category = AMENITIES_WITH_ID.find((c) => c.id === cat.id);
                  if (!category) return null;

                  const subAmenities = cat.sub_amenities.map(
                    (subId) => category.items[subId - 1]
                  );

                  return (
                    <Card
                      key={catIndex}
                      className="overflow-hidden border-[1px] border-gray-300 bg-[#f7f3e8]"
                    >
                      <CardHeader className="bg-[#f7f3e8]">
                        <CardTitle className="flex items-center gap-2 text-gray-700 text-sm">
                          {t(category.name)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 py-2 bg-[#f7f3e8]">
                        {subAmenities.length > 0 ? (
                          <ul className="space-y-2">
                            {subAmenities.map((item, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-gray-700 text-sm">{t(item)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600 text-sm">{t("No Amenities")}</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card> */}


          {project && hasValidAmenities && (
            <Card className="overflow-hidden border border-gray-300 bg-[#f7f3e8]">
              <CardHeader className="bg-[#f7f3e8]">
                <CardTitle className="flex font-hel items-center gap-2 text-gray-700">
                  <Coffee className="w-5 h-5" />
                  {t("amenities")}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-6 py-3 bg-[#f7f3e8]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.amenities
                    .filter(
                      (cat) =>
                        AMENITIES_WITH_I.find((c) => c.name === cat.name) &&
                        cat.sub_amenities.length > 0
                    )
                    .map((cat, catIndex) => {
                      const category = AMENITIES_WITH_I.find((c) => c.name === cat.name);
                      if (!category) return null;

                      const subAmenities = cat.sub_amenities.filter((item) =>
                        category.items.includes(item)
                      );

                      if (subAmenities.length === 0) return null;

                      return (
                        <Card
                          key={catIndex}
                          className="overflow-hidden border border-gray-300 bg-[#f7f3e8]"
                        >
                          <CardHeader className="bg-[#f7f3e8]">
                            <CardTitle className="flex font-hel items-center gap-2 text-gray-700 text-sm">
                              {t(category.name)}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="px-6 pb-6 bg-[#f7f3e8]">
                            <ul className="space-y-2">
                              {subAmenities.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <span className="text-gray-700 text-sm">{t(item) || item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          )}








          <Card className="overflow-hidden border-[1px] border-gray-300 ">
            <CardHeader className="bg-[#f7f3e8] text-gray-800">
              <CardTitle className="flex font-hel items-center gap-2">
                <LineChart className="w-5 h-5" />
                {t("investmentPotential")}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-3 bg-[#f7f3e8]">
              <p className="text-gray-700 leading-relaxed">
                {t(project?.investmentPotential ?? "")}
              </p>

              <Separator className="my-2" />

              <h3 className="font-semibold mb-3 text-gray-800">
                {t("investmentReasons")}
              </h3>

              <div className="flex flex-wrap gap-2">
                {project?.investmentReason.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-[#f7f3e8] rounded-lg shadow-sm border border-gray-300 hover:shadow-md transition w-auto"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-gray-700 text-sm">{t(reason)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>




          {/* FAQ Section */}
          {project?.FAQ && project?.FAQ.length > 0 && (
            <Card className="overflow-hidden border-[1px] border-gray-300">
              <CardHeader className="bg-[#f7f3e8] text-black">
                <CardTitle className="flex font-hel items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  {t("faq")}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-3 bg-[#f7f3e8]">
                <div className="space-y-2">
                  {project?.FAQ.map((faq, index) => (
                    <div key={index} className="pb-3 last:pb-0">
                      <h3 className="font-semibold mb-3 text-gray-800">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                      {index < project.FAQ.length - 1 && (
                        <Separator className="mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-8">
          {/* Map Card */}
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={{ lat, lng }}
                  zoom={15}
                >
                  <Marker position={{ lat, lng }} />
                </GoogleMap>
              )}
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-primary2 text-white">
              <CardTitle className="flex font-hel items-center gap-2">
                <Clock className="w-5 h-5" />
                {t("projectProgress")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4">
                <Progress value={project?.progress} className="h-3" />
              </div>
              <p className="text-right text-sm text-gray-600">
                {project?.progress}% {t("complete")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Main;
