import TestimonialCard from "@/components/cards/testimonialCard";
import React from "react";
import img1 from "@/assets/p1.jpg";
import img2 from "@/assets/p2.jpg";
import img3 from "@/assets/p3.jpg";

const TestimonialData = [
  {
    image: img3.src,
    name: "Olivia Wilson",
    comment:
      "I am very satisfied with Havenova service. They helped me find my dream home in no time.",
    rating: 5,
  },
  {
    image: img2.src,
    name: "Reese Miller",
    comment:
      "Thank you to the Havenova team for helping me find profitable property investments.",
    rating: 5,
  },
  {
    image: img1.src,
    name: "Taylor Alonso",
    comment:
      "Strategic location, complete facilities, rental always sells. Profitable investment, comfortable lifestyle.",
    rating: 5,
  },
];
const Testimonials = () => {
  return (
    <div className="container py-10 md:py-20">
      <h1 className="text-center text-3xl md:text-4xl  font-hel mb-10">
        What They Say About Us
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-5 lg:gap-10">
        {TestimonialData.map((item, index) => (
          <TestimonialCard
            key={index}
            image={item.image}
            name={item.name}
            comment={item.comment}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
