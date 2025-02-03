import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../blog.css';

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
        navigate(`/blog/family/${blogId}`); //might have to change
      };

      return (
        <div className="blog-list-container">
          <h1 className="blog-list-header">Blogs</h1>
          {blogs.length > 0 ? (
            <ul className="blog-list">
              {blogs.map((blog) => (
                <li key={blog.id} className="blog-list-item">
                  <button className="blog-button" onClick={() => handleBlogClick(blog.id)}>{blog.header}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-blogs-message">No blogs have been created yet!</p>
          )}
        </div>
      );

};

export default BlogList;