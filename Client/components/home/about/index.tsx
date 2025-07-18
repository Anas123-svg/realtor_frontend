"use client";
import Link from "next/link";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useTranslation } from "react-i18next";
import img1 from "@/assets/a1.jpeg";
import img2 from "@/assets/a2.png";
import img3 from "@/assets/a3.jpeg";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="container py-10">
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-hel font-medium max-w-sm">
            {t("heroAboutTitle")}
          </h1>
          <div className="w-full md:w-1/2">
            <p className="mt-8 md:mt-0 mb-8">{t("heroAboutText")}</p>
            <Link
              href="/about"
              className="bg-primary py-4 px-8 text-lg hover:bg-primary2 text-white transition duration-300 rounded-md"
            >
              {t("heroAboutButton")}
            </Link>
          </div>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="border-none gap-2 md:gap-4 flex-col md:flex-row"
        >
          {/* Left Panel */}
          <ResizablePanel defaultSize={100} className="md:defaultSize-[50]">
            <img
              src={img2.src}
              alt="Panel Image 1"
              className="h-[40vh] md:h-[50vh] w-full object-cover rounded-2xl"
            />
          </ResizablePanel>

          {/* Horizontal Handle */}
          <ResizableHandle className="hidden md:block" />

          {/* Right Panel */}
          <ResizablePanel defaultSize={100} className="md:defaultSize-[50]">
            <ResizablePanelGroup
              direction="vertical"
              className="gap-2 md:gap-4"
            >
              {/* Top Right Panel */}
              <ResizablePanel
                defaultSize={100}
                className="md:defaultSize-[60] rounded-2xl"
              >
                <img
                  src={img1.src}
                  alt="Panel Image 2"
                  className="h-[40vh] md:h-full w-full object-top object-cover"
                />
              </ResizablePanel>

              {/* Vertical Handle */}
              <ResizableHandle className="hidden md:block" />

              {/* Bottom Right Panel */}
              <ResizablePanel
                defaultSize={100}
                className="md:defaultSize-[40] rounded-2xl"
              >
                <img
                  src={img3.src}
                  alt="Panel Image 3"
                  className="h-[40vh] md:h-full w-full object-cover"
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div>
        <h1 className="text-center font-hel text-4xl mb-10">
          {t("whyChooseUs")}
        </h1>
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="w-full md:w-1/3">
            {/* <img
              src={img.src}
              alt=""
              className="rounded-2xl h-60 w-full object-cover mb-4"
            /> */}
            <h1 className="text-2xl font-bold mb-2">
              {t("whyChooseUsPara1title")}
            </h1>
            <p className="text-sm">{t("whyChooseUsPara1text")}</p>
          </div>
          <div className="w-full md:w-1/3">
            {/* <img
              src={img.src}
              alt=""
              className="rounded-2xl h-60 w-full object-cover mb-4"
            /> */}
            <h1 className="text-2xl font-bold mb-2">
              {t("whyChooseUsPara2title")}
            </h1>
            <p className="text-sm">{t("whyChooseUsPara2text")}</p>
          </div>
          <div className="w-full md:w-1/3">
            {/* <img
              src={img.src}
              alt=""
              className="rounded-2xl h-60 w-full object-cover mb-4"
            /> */}
            <h1 className="text-2xl font-bold mb-2">
              {t("whyChooseUsPara3title")}
            </h1>
            <p className="text-sm">{t("whyChooseUsPara3text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
