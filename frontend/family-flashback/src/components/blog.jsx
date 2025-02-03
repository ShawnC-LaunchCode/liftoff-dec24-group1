import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../blog.css';
import Comments from "./Comments";
import BlogList from "./BlogList";

const Blog = () => {
  const [userBlogExists, setUserBlogExists] = useState(false);
  const [userBlog, setUserBlog] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/blog/session`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserId(data.id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    
      const fetchUserBlog = async () => {
        try {
          const blogResponse = await fetch(`http://localhost:8080/blog`, {
            credentials: 'include'
          });
          if (blogResponse.status === 204) {
            setUserBlogExists(false);
          } else if (!blogResponse.ok) {
            throw new Error(`HTTP error! status: ${blogResponse.status}`);
          } else {
            const blogData = await blogResponse.json();
            setUserBlogExists(true);
            setUserBlog(blogData);
            console.log(userBlogExists);
            //console.log(`Fetched blogId: ${blogData.id}`);
          }
        } catch (error) {
          console.error("Error fetching user's blog:", error);
        }
      };

      if (userId) {
      fetchUserBlog();
    }
  }, [userId]);
  

  const handleCreateClick = () => {
    navigate("/blog/create");
  };

  const handleBlogClick = () => {
    navigate(`/blog/${userBlog.id}`);
  };

  return (
    <div>
      <h1>Blog Page</h1>
      {userBlogExists ? (
        <div>
          <button onClick={handleBlogClick}>Go to My Blog</button>
        </div>
      ) : (
        <div>
          <button onClick={handleCreateClick}>Create Blog</button>
        </div>
      )}
      <BlogList />
    </div>
  );
};

export default Blog;
