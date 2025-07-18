"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { GiOpenBook } from "react-icons/gi";
import { FaHouseChimney } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import PropertiesChart from "../Charts/ChartOne";
import { Property } from "@/types";
import Loader from "../common/Loader";
const PropertiesDonutChart = dynamic(
  () => import("@/components/Charts/ChartThree"),
  {
    ssr: false,
  },
);

const Dashboard: React.FC = () => {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    properties: [] as Property[],
    siteViews: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDashboardStats(response.data);
    } catch (error) {
      console.log("Error fetching dashboard stats: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats
          title="siteViewers"
          total={dashboardStats.siteViews.toString()}
        >
          <FaEye className="fill-primary dark:fill-white" size={20} />
        </CardDataStats>
        <CardDataStats
          title="totalProperties"
          total={dashboardStats.properties.length.toString()}
        >
          <FaHouseChimney className="fill-primary dark:fill-white" size={20} />
        </CardDataStats>
        <CardDataStats title="totalBlogs" total="10">
          <GiOpenBook className="fill-primary dark:fill-white" size={20} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <PropertiesChart properties={dashboardStats.properties} />
        <PropertiesDonutChart
          newProperties={
            dashboardStats.properties.filter(
              (property) => property.condition === "new",
            ).length
          }
          usedProperties={
            dashboardStats.properties.filter(
              (property) => property.condition === "used",
            ).length
          }
          rentalProperties={
            dashboardStats.properties.filter((property) =>
              property.dealType.includes("Rental"),
            ).length
          }
          saleProperties={
            dashboardStats.properties.filter((property) =>
              property.dealType.includes("Sale"),
            ).length
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
