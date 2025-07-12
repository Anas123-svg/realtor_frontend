"use client";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { useEffect } from "react";
import { useGoogleMapsApi } from "@/hooks/useGoogleMapsApi";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import WhatsApp from "@/components/WhatsApp";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import axios from "axios";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

const inter = Inter({ subsets: ["latin"] });
const hel = localFont({
  src: "../fonts/heldane.otf",
  variable: "--font-hel",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setIsLoaded = useGoogleMapsStore((state) => state.setIsLoaded);
  const { isLoaded, loadError } = useGoogleMapsApi(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  );

  const increaseSiteView = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/increment-site-views`
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    increaseSiteView();
  }, []);

  useEffect(() => {
    setIsLoaded(isLoaded);
  }, [isLoaded, setIsLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }
  return (
    <html lang="en" className={hel.variable}>
      <head>
        <title>Realtor Caribe</title>
      </head>
      <body className={`antialiased ${inter.className}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <I18nextProvider i18n={i18n}>
            <Navbar />
            {children}
            <Footer />
            <WhatsApp />
            <Toaster />
          </I18nextProvider>
        </Suspense>
        <Script
          strategy="lazyOnload"
          src="https://embed.tawk.to/67af9cf5f983a4190a32ba0a/1ik2vq8en"
        />
      </body>
    </html>
  );
}
