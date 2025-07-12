"use client";
import BlogGrid from "@/components/grids/blogGrid";
import Link from "next/link";
import React, { useState } from "react";
import img from "@/assets/product.jpg";

const Blogs = () => {
  const [blogs, setBlogs] = useState<Partial<Blog>[]>([
    {
      id: 1,
      titleImage: img.src,
      title: "ARB TO Sign Agreement For Village",
      description:
        "The ARB is set to sign an agreement with the village council to build a new school.",
    },
    {
      id: 2,
      titleImage: img.src,
      title: "ARB TO Sign Agreement For Village",
      description:
        "The ARB is set to sign an agreement with the village council to build a new school.",
    },
    {
      id: 3,
      titleImage: img.src,
      title: "ARB TO Sign Agreement For Village",
      description:
        "The ARB is set to sign an agreement with the village council to build a new school.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  useState;
  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-hel">
          Latest Updates
        </h1>
        <Link
          href="#"
          className="bg-primary py-2 text-lg px-8 whitespace-nowrap text-white rounded-md hover:bg-primary2 transition duration-300"
        >
          View All
        </Link>
      </div>
      <BlogGrid blogs={blogs} loading={loading} />
    </div>
  );
};

export default Blogs;
