import React, { useState } from "react";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = { title, content };
    fetch(`http://localhost:8080/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error creating blog:", error));
  };

  return (
    <div>
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(event) => setContent(event.target.value)} />
        </label>
        <br />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default BlogCreate;