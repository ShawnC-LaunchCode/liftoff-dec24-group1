import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const response = await fetch(`http://localhost:8080/blog/all`, {
              credentials: 'include',
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBlogs(data);
          } catch (error) {
            console.error("Error fetching blogs:", error);
          }
        };
    
        fetchBlogs();
      }, []);

      const handleBlogClick = (blogId) => {
        navigate(`/blog/${blogId}`); //might have to change
      };

      return (
        <div>
          <h1>Blogs</h1>
          {blogs.length > 0 ? (
            <ul>
              {blogs.map((blog) => (
                <li key={blog.id}>
                  <a onClick={() => handleBlogClick(blog.id)}>{blog.header}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No blogs have been created yet!</p>
          )}
        </div>
      );

};

export default BlogList;