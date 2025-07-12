import React from "react";

interface Props {
  image: string;
  name: string;
  comment: string;
  rating: number;
}

const TestimonialCard = ({ image, name, comment, rating }: Props) => {
  return (
    <div className="bg-white rounded-2xl flex flex-col items-center p-4 md:p-6 lg:p-8 xl:p-10 hover:scale-105 transition duration-300">
      <img
        src={image}
        alt=""
        className="rounded-full object-cover h-24 w-24 mb-4"
      />
      <h1 className="text-xl lg:text-2xl text-center font-bold mb-4">{name}</h1>
      <p className="text-center mb-4">{comment}</p>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((item) => (
          <svg
            key={item}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 fill-current ${
              item <= rating ? "text-primary" : "text-gray-300"
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fillRule="evenodd"
              d="M12 2l2.5 6.1L21 9l-5 4.3 1.7 6.1L12 16.4 7.3 19.4l1.7-6.1L3 9l5.5-0.9L12 2z"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
