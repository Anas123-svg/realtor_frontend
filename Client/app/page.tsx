import About from "@/components/home/about";
import Banner from "@/components/home/banner";
import Hero from "@/components/home/hero";
import SearchCard from "@/components/home/hero/search";
import MostViewed from "@/components/home/mostViewed";
import Testimonials from "@/components/home/testimonials";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <div className="container lg:hidden py-10 md:py-20">
        <SearchCard />
      </div>
      <MostViewed />
      {/* <Blogs /> */}
      <About />
      {/* <Testimonials /> */}
      <Banner />
      {/* <CallToAction /> */}
    </div>
  );
};

export default page;
