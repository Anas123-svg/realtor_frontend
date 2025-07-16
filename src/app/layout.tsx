"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import Login from "@/components/Login";
import { loginBack } from "@/hooks/auth";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { useGoogleMapsApi } from "@/hooks/useGoogleMapsApi";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { setUser, setToken, user } = useAuthStore();
  useEffect(() => {
    handleLoginBack();
  }, []);

  const handleLoginBack = async () => {
    try {
      const res = await loginBack();
      if (!res) {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        return;
      }
      setUser(res?.admin);

      if (res?.token) {
        setToken(res.token);
      }
    } catch (error: any) {
      setToken("");
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const setIsLoaded = useGoogleMapsStore((state) => state.setIsLoaded);
  const { isLoaded } = useGoogleMapsApi(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  );

  useEffect(() => {
    setIsLoaded(isLoaded);
  }, [isLoaded, setIsLoaded]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Admin Panel | Realtor</title>
      </head>
      <body suppressHydrationWarning={true}>
        <I18nextProvider i18n={i18n}>
          {user ? (
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {loading ? <Loader /> : children}
            </div>
          ) : (
            <Login />
          )}
          <Toaster />
        </I18nextProvider>
      </body>
    </html>
  );
}
