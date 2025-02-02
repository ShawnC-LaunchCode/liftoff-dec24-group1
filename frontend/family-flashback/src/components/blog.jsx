import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../blog.css';
import Comments from "./Comments";

const Blog = () => {
  const [blogExists, setBlogExists] = useState(false);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogExists = async () => {
      try {
        const response = await fetch(`http://localhost:8080/blog`, {
          credentials: 'include'
        });
        if (response.status === 204) {
          setBlogExists(false);
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          setBlogExists(true);
          setBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blog exists:", error);
      }
    };

    fetchBlogExists();
  }, []);

  const handleEditClick = () => {
    navigate("/blog/edit");
  };

  if (blogExists) {
    return (
      <div>
        <h1>{blog.header}</h1>
        <p>{blog.body}</p>
        <button onClick={handleEditClick}>Edit Blog</button>
        <Comments blogId={blog.id} />
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => navigate("/blog/edit")}>Create Blog</button>
      </div>
    );
  }
};

export default Blog;
