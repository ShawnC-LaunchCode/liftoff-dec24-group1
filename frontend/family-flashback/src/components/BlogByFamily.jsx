import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import '../blog.css';

const BlogByFamily = () => {
  const { blogId } = useParams(); 
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:8080/blog/${blogId}`, {
          method: 'GET',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blogData = await response.json();
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog by family:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  return (
    <div className="blog-page-container">
      {blog && (
        <div>
          <h1 className="blog-header"> {blog.header}</h1>
          <p className="blog-content">{blog.body}</p>
          <div className="comments-section">
            <Comments blogId={blog.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogByFamily;
