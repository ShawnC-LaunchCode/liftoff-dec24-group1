import React, { useEffect, useState } from 'react';
import Comments from './Comments';

const BlogByUser = () => {

  const [userBlog, setUserBlog] = useState(null);

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
        const data = await response.json();
        console.log(data);
        setUserBlog(data);
      } catch (error) {
        console.error("Error fetching user blog:", error);
      }
    };

    fetchUserBlog();
  }, []);

  return (
    <div>
      {userBlog && (
        <div>
          <h2>{userBlog.header}</h2>
          <p>{userBlog.body}</p>
          {/* Display more blog details as needed */}
          <Comments blogId={userBlog.id} />
        </div>
      )}
    </div>
  );
};

export default BlogByUser;