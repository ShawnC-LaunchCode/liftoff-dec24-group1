import React, { useState, useEffect } from "react";

const BlogEdit = () => {
  const [blog, setBlog] = useState({});
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:8080/blog`, {
            credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setBlog(data);
        setHeader(data.header || "");
        setBody(data.body || "");
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, []);

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);

  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedBlog = { header, body };
    const id = blog.id;

    fetch(`http://localhost:8080/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
        credentials: 'include'
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error("Error updating blog:", error));
};

  return (
    <div>
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={header} onChange={handleHeaderChange} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={body} onChange={handleBodyChange} />
        </label>
        <br />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default BlogEdit;