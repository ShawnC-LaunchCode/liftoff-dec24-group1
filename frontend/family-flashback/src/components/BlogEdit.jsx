import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogEdit = () => {
  const [blog, setBlog] = useState(null);
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

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
  }, []);

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedBlog = { header, body };

    if (!blog) {
      // Create a new blog
      fetch(`http://localhost:8080/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
        credentials: 'include'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Blog created successfully:", data);
        navigate("/blog");
      })
      .catch(error => {
        console.error("Error creating blog:", error);
      });
    } else {
      // Update the existing blog
      const id = blog.id;
      fetch(`http://localhost:8080/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
        credentials: 'include'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Blog updated successfully:", data);
        navigate("/blog");
      })
      .catch(error => {
        console.error("Error updating blog:", error);
      });
    }
  };

  const deleteBlog = () => {
    if (!blog) {
      console.error("No blog to delete");
      return;
    }
    const userId = blog.userId;

    if (window.confirm("Are you sure you want to delete this blog?")) {
      fetch(`http://localhost:8080/blog/${userId}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          window.alert("Blog deleted successfully.");
          navigate("/create-blog");
        })
        .catch((error) => console.error("Error deleting blog:", error));
    }
  };

  return (
    <div>
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={header} onChange={handleHeaderChange} />
        <textarea value={body} onChange={handleBodyChange} />
        <button type="submit">Save</button>
      </form>
      <button onClick={deleteBlog}>Delete Blog</button>
    </div>
  );
};

export default BlogEdit;