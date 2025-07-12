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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";

interface Props {
  project: Project | undefined;
}

const Main = ({ project }: Props) => {
  const { isLoaded } = useGoogleMapsStore();
  const { t } = useTranslation();
  const lat = project?.latitude ? Number(project.latitude) : 0;
  const lng = project?.longitude ? Number(project.longitude) : 0;

  return (
    <div className="py-10">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-hel font-light mb-6 text-primary">
          {project?.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-gray-600 mb-8">
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
              .split("-")
              .map((price) => formatCurrency(Number(price)))
              .join(" - ")}
          </Badge>
          <Badge
            variant="secondary"
            className="px-4 py-2 flex items-center gap-2 text-sm"
          >
            <HomeIcon className="w-4 h-4" />
            {t("projectType")}: {t(project?.projectType ?? "")}
          </Badge>
        </div>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-lg">
          {project?.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Developer Info Card */}
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Building2 className="w-5 h-5" />
                {t("developerInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                {project?.developerInformation}
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature Cards */}
            {[
              {
                title: t("neighborhood"),
                icon: <Home className="w-5 h-5" />,
                items: project?.neighborhood,
                color: "bg-blue-100",
                dotColor: "bg-primary",
              },
              {
                title: t("communityFeatures"),
                icon: <Trees className="w-5 h-5" />,
                items: project?.communityFeatures,
                color: "bg-blue-200",
                dotColor: "bg-primary",
              },
              {
                title: t("sustainabilityFeatures"),
                icon: <Leaf className="w-5 h-5" />,
                items: project?.sustainabilityFeatures,
                color: "bg-blue-300",
                dotColor: "bg-primary",
              },
              {
                title: t("amenities"),
                icon: <Coffee className="w-5 h-5" />,
                items: project?.amenities,
                color: "bg-blue-400",
                dotColor: "bg-primary",
              },
            ].map((feature, idx) => (
              <Card
                key={idx}
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className={feature.color}>
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    {feature.icon}
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {feature.items?.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${feature.dotColor}`}
                        />
                        <span className="text-gray-700">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Investment Section */}
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-primary3 text-white">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                {t("investmentPotential")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t(project?.investmentPotential ?? "")}
              </p>
              <Separator className="my-6" />
              <h3 className="font-semibold mb-4 text-gray-800">
                {t("investmentReasons")}
              </h3>
              <ul className="space-y-3">
                {project?.investmentReason.map((reason, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-gray-700">{t(reason)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          {project?.FAQ && project?.FAQ.length > 0 && (
            <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-primary3 text-white">
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  {t("faq")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {project?.FAQ.map((faq, index) => (
                    <div key={index} className="pb-6 last:pb-0">
                      <h3 className="font-semibold mb-3 text-gray-800">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                      {index < project.FAQ.length - 1 && (
                        <Separator className="mt-6" />
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
              <CardTitle className="flex items-center gap-2">
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
