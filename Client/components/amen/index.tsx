import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AmenitiesSectionProps {
    amenities: {
        name: string;
        sub_amenities: string[];
    }[];
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities }) => {
    const { t } = useTranslation();

    return (
        <Card className="overflow-hidden border-[1px] border-gray-300 bg-[#f7f3e8]">
            <CardHeader className="bg-[#f7f3e8]">
                <CardTitle className="flex items-center gap-2 text-gray-700">
                    <Coffee className="w-5 h-5" />
                    {t("amenities")}
                </CardTitle>
            </CardHeader>

            <CardContent className="px-6 py-3 bg-[#f7f3e8]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {amenities?.map((cat, catIndex) => (
                        <Card
                            key={catIndex}
                            className="overflow-hidden border-[1px] border-gray-300 bg-white"
                        >
                            <CardHeader className="bg-white p-3">
                                <CardTitle className="text-gray-700 text-sm">
                                    {t(cat.name)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 py-2 bg-white">
                                {cat.sub_amenities && cat.sub_amenities.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {cat.sub_amenities.map((item, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex px-3 py-1 bg-primary text-white text-xs rounded-md whitespace-nowrap"
                                            >
                                                {t(item)}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-sm">{t("No Amenities")}</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default AmenitiesSection;
