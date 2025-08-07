import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import { groupAmenities } from "@/lib/amenities";

interface Props {
  characteristics: string[];
}

const Characteristics: React.FC<Props> = ({ characteristics }) => {
  const { t } = useTranslation();
  const grouped = groupAmenities(characteristics);

  return (
    <div className="py-10 border-y border-black">
      <h2 className="text-4xl font-hel mb-5">{t("characteristics")}</h2>

      <Card className="overflow-hidden border border-gray-300 bg-[#f7f3e8]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <Coffee className="w-5 h-5" />
            {t("amenities")}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-4 bg-[#f7f3e8]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped.map((cat) => (
              <Card
                key={cat.id}
                className="overflow-hidden border border-gray-300 bg-[#f7f3e8]"
              >
                <CardHeader className="bg-[#f7f3e8] p-3">
                  <CardTitle className="text-sm font-semibold text-gray-800">
                    {t(cat.name)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <ul className="list-disc marker:text-xl marker:text-black list-inside text-sm text-black ">
                    {cat.items.map((itm, idx) => (
                      <li key={idx}>{t(itm)}</li>
                    ))}
                  </ul>

                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Characteristics;
