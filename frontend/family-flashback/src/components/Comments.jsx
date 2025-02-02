import { useEffect, useState } from "react";
import "./commentSystem.css";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

// Contains the whole comment section
const Comments = ({blogId}) => {

  const[comments, setComments] = useState([]);
  const[error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/comments/blog/${blogId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch comments: ${response.status}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchComments();
  }, [blogId]);

  const addComment = async (text) => {
    try {
      const response = await fetch(`http://localhost:8080/comments/${blogId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ body: text }),
        }
      })
    }
  }










  













  return
    <div>Comments</div>;
};



export default Comments;
