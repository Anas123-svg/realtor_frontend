import React from "react";
import {
  Building2,
  Home,
  CheckCircle2,
  Banknote,
  Ruler,
  Bed,
  Bath,
  Building,
  Construction,
  Volume2,
  WashingMachine,
  Wifi,
  Flame,
  Fan,
  LandPlot,
  Power,
  Shield,
  Coffee,
  Trees,
  Mountain,
  Clock,
  DollarSign,
  Car,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  property: Property;
}

const About = (props: Props) => {
  const iconClass = "text-white shrink-0";
  const { t } = useTranslation();

  const PropertyCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number | string[];
  }) => (
    <div className="bg-white rounded-2xl flex items-center gap-5 p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
      <div className="bg-secondary p-3 rounded-xl h-fit">
        <Icon className={iconClass} size={24} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">
          {Array.isArray(value)
            ? value.map((v) => t(String(v))).join(", ")
            : t(String(value))}
        </p>
      </div>
    </div>
  );

  const categories = [
    {
      title: t("basicInfo"),
      items: [
        {
          icon: Building2,
          label: t("propertyType"),
          value: props.property.propertyType,
        },
        {
          icon: Home,
          label: t("propertyStyle"),
          value: props.property.propertyStyle,
        },
        {
          icon: CheckCircle2,
          label: t("propertyStatus"),
          value: props.property.propertyStatus,
        },
        {
          icon: Banknote,
          label: t("dealType"),
          value: props.property.dealType,
        },
        {
          icon: Clock,
          label: t("dateBuilt"),
          value: props.property.dateBuilt,
        },
        {
          icon: DollarSign,
          label: t("administrationFee"),
          value: props.property.administrationFee,
        },
      ],
    },
    {
      title: t("propertyDetails"),
      items: [
        { icon: Ruler, label: t("area"), value: `${props.property.area} m²` },
        { icon: Bed, label: t("beds"), value: props.property.bedrooms },
        { icon: Bath, label: t("baths"), value: props.property.bathrooms },
        { icon: Building, label: t("floors"), value: props.property.floors },
        {
          icon: Construction,
          label: t("condition"),
          value: props.property.condition,
        },
        { icon: Car, label: t("parkingSpace"), value: `${props.property.parkingSpace} ` },

      ],
    },
    {
      title: t("facilitiesComfort"),
      items: [
        {
          icon: Volume2,
          label: t("noiseLevel"),
          value: props.property.noiseLevel,
        },
        {
          icon: WashingMachine,
          label: t("laundry"),
          value: props.property.laundry,
        },
        { icon: Wifi, label: t("internet"), value: props.property.internet },
        { icon: Flame, label: t("waterHeater"), value: props.property.heating },
        { icon: Fan, label: t("coolingSystem"), value: props.property.cooling },
      ],
    },
    {
      title: t("environmentSecurity"),
      items: [
        {
          icon: LandPlot,
          label: t("nearbyInfrastructure"),
          value: props.property.nearbyInfrastructure,
        },
        {
          icon: Power,
          label: t("powerBackup"),
          value: props.property.powerBackup,
        },
        {
          icon: Shield,
          label: t("securityFeatures"),
          value: props.property.securityFeatures,
        },
        {
          icon: Coffee,
          label: t("amenities"),
          value: props.property.amenities,
        },
        { icon: Trees, label: t("outdoor"), value: props.property.outdoor },
        { icon: Mountain, label: t("views"), value: props.property.view },
      ],
    },
  ];

  return (
    <div className="py-10 border-b border-black">
      <div>
        <h1 className="text-4xl font-hel mb-5">{t("aboutProperty")}</h1>
        <p className="text-gray-600 mb-5">{t("aboutPropertyText")}</p>
        <div className="space-y-12">
          {categories.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-hel font-medium text-gray-800 mb-3">
                {category.title}
              </h2>
              <div className="flex flex-wrap gap-6">
                {category.items.map((item, index) => (
                  <PropertyCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
