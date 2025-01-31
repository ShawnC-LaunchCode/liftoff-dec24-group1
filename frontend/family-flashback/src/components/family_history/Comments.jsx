import { useEffect, useState } from "react";
import "./commentSystem.css";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);

  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (id) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const fetchComments = async () => {
    const response = await fetch("http://localhost:8080/comments", {
        credentials: "include"
    });
    const data = await response.json();
    console.log(data);
    setBackendComments(data);
  };

  const addComment = async (text, parentId) => {
    const response = await fetch("http://localhost:8080/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: text, parentId }),
    });
    const comment = await response.json();
    setBackendComments([comment, ...backendComments]);
    setActiveComment(null);
  };
  const deleteComment = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await fetch(`http://localhost:8080/comments/${id}`, {
        method: "DELETE",
      });
      const updatedBackendComments = backendComments.filter(
        (backendComment) => backendComment.id !== id
      );
      setBackendComments(updatedBackendComments);
    }
  };

  const updateComment = async (text, id) => {
    await fetch(`http://localhost:8080/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: text }),
    });
    const updatedBackendComments = backendComments.map((backendComment) => {
      if (backendComment.id === id) {
        return { ...backendComment, body: text };
      }
      return backendComment;
    });
    setBackendComments(updatedBackendComments);
    setActiveComment(null);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>

      <CommentForm submitLabel="Comment" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            updateComment={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
