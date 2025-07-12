import Link from "next/link";
import React from "react";

interface Props {
  blog: Partial<Blog>;
}

const BlogCard = ({ blog }: Props) => {
  return (
    <div className="hover:scale-105 transition duration-300">
      <img
        src={blog.titleImage}
        alt="blog"
        className="w-full h-96 object-cover rounded-xl mb-4"
      />
      <h1 className="text-2xl font-bold text-primary mb-2">{blog.title}</h1>
      <p className="line-clamp-2 mb-8">{blog.description}</p>
      <Link
        href={`#`}
        className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary2 transition duration-300"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
