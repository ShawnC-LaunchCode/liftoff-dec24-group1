import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';
import '../blog.css';

const BlogByUser = () => {

  const [userBlog, setUserBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBlog = async () => {
      try {
        const response = await fetch(`http://localhost:8080/blog`, {
          method: 'GET',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const responseText = await response.text();
        // console.log("Raw response:", responseText);
  
        if (responseText) {
          const data = JSON.parse(responseText);
          setUserBlog(data);
        } else {
          console.error("Empty response from server");
        }
      } catch (error) {
        console.error("Error fetching user blog:", error);
      }
    };

    fetchUserBlog();
  }, []);

  const handleEditClick = () => {
    navigate("/blog/edit");
  };

  return (
    <div className="blog-page-container">
      {userBlog && (
        <div>
          <h2 className="blog-header">{userBlog.header}</h2>
          <p className="blog-content">{userBlog.body}</p>
          <button onClick={handleEditClick}>Edit</button>
          <div className="comments-section">
            <Comments blogId={userBlog.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogByUser;