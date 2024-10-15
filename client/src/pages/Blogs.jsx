import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/blog/all-blog"
      );
      if (data?.success) {
        console.log(data);

        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem('userId') === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog.image}
            name={blog.user?.name || "Unknown Author"}
            time={new Date(blog.createdAt).toLocaleString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
