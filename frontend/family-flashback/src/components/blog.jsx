  import React, { useState, useEffect } from "react";
  import { Redirect } from "react-router-dom";
  
  const Blog = () => {
    const [blogExists, setBlogExists] = useState(false);
  
    useEffect(() => {
      const fetchBlogExists = async () => {
        try {
          const response = await fetch(`http://localhost:8080/blog/exists`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setBlogExists(data.exists);
        } catch (error) {
          console.error("Error fetching blog exists:", error);
        }
      };
  
      fetchBlogExists();
    }, []);
  
    if (blogExists) {
      return <Redirect to="/blog/edit" />; // Redirect to the blog edit page if blog exists
    } else {
      return (
            <div>
              {/* Add a button or link to redirect to the blog edit page */}
              <button onClick={() => window.location.href = "/blog/edit"}>Create Blog</button>
            </div>
      );
    }
  };
  
  export default Blog;
