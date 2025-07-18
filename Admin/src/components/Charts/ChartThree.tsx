import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#6F8D38", "#A1C96A", "#F4A261", "#E76F51"], // Greenish and Orangish colors
  labels: [
    "New Properties",
    "Used Properties",
    "Rental Properties",
    "Sale Properties",
  ],
  legend: {
    show: false,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val.toFixed()}%`,
    },
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const PropertiesDonutChart: React.FC<{
  newProperties: number;
  usedProperties: number;
  rentalProperties: number;
  saleProperties: number;
}> = ({ newProperties, usedProperties, rentalProperties, saleProperties }) => {
  const total =
    newProperties + usedProperties + rentalProperties + saleProperties;
  const series = [
    Number((newProperties / total) * 100),
    Number((usedProperties / total) * 100),
    Number((rentalProperties / total) * 100),
    Number((saleProperties / total) * 100),
  ];
  const { t } = useTranslation();

  const legendData = [
    {
      label: t("New"),
      value: newProperties,
      percentage: ((newProperties / total) * 100).toFixed(),
      color: "#6F8D38",
    },
    {
      label: t("Used"),
      value: usedProperties,
      percentage: ((usedProperties / total) * 100).toFixed(),
      color: "#A1C96A",
    },
    {
      label: t("rentals"),
      value: rentalProperties,
      percentage: ((rentalProperties / total) * 100).toFixed(),
      color: "#F4A261",
    },
    {
      label: t("sales"),
      value: saleProperties,
      percentage: ((saleProperties / total) * 100).toFixed(),
      color: "#E76F51",
    },
  ];
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h5 className="mb-2 text-xl font-semibold text-black dark:text-white">
        {t("propertiesOverview")}
      </h5>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {t("propertiesOverviewText2")}
      </p>
      <div>
        <div id="propertiesDonutChart" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {legendData.map((item, index) => (
          <div key={index} className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <p className="whitespace-nowrap text-sm font-medium text-black dark:text-white">
                {item.value} {item.label}
              </p>
              <p className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                {item.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesDonutChart;
