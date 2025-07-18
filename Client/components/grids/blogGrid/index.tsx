import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "@/components/cards/blogCard";

interface Props {
  blogs: Partial<Blog>[];
  loading: boolean;
}
const BlogGrid = ({ blogs, loading }: Props) => {
  return loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-10 min-h-screen">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="rounded-2xl" />
      ))}
    </div>
  ) : blogs.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
      <span>No blogs found</span>
    </div>
  );
};

export default BlogGrid;
