import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogCreate = () => {
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = { header, body };
      fetch(`http://localhost:8080/blog`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error creating blog:", error)); 
    };

    const handleCreateClick = () => {
      navigate("/blog/user");
    };

    return (
      <div className="create-blog-container">
        <h1 className="create-blog-header">Create Blog</h1>
        <form className="create-blog-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input 
              type="text" 
              value={header} 
              onChange={(event) => setHeader(event.target.value)} 
              className="create-blog-input"
            />
          </label>
          <label>
            Content:
            <textarea 
              value={body} 
              onChange={(event) => setBody(event.target.value)} 
              className="create-blog-textarea"
            />
          </label>
          <button 
            type="submit" 
            onClick={handleCreateClick} 
            className="create-blog-button"
          >
            Create Blog
          </button>
        </form>
      </div>
  );
  
};

export default BlogCreate;