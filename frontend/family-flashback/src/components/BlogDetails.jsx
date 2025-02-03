import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
        try {
          const response = await fetch(`http://localhost:8080/blog`, {
              credentials: 'include'
          });
          
          if (response.status === 204) {
              setBlog(null);
            } else if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            } else {
              const data = await response.json();
              setBlog(data);
              setHeader(data.header || "");
              setBody(data.body || "");
            }
          } catch (error) {
            console.error("Error fetching blog:", error);
          }
        };
  
      fetchBlog();
    }, [id]);

  




  return <h1>Blog Details: {blogId}</h1>;
}
export default BlogDetails;