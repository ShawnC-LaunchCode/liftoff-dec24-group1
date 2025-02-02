import { useEffect, useState } from "react";
import "./commentSystem.css";
// import Comment from "./Comment";
import CommentForm from "./CommentForm";

// Contains the whole comment section
const Comments = ({blogId}) => {

  const[comments, setComments] = useState([]);
  const[error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeComment, setActiveComment] = useState(null);


  //fetches need .then()
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/comments/blog/${blogId}`, {
          credentials: 'include',
        }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch comments: ${response.status}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCurrentUser = async (userId) => {
      const response = await fetch(`http://localhost:8080/user/blog/${userId}`, {
          method: 'GET',
          credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCurrentUserId(data.id);
  };
  
    fetchComments();
    fetchCurrentUser();
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
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const newComment = await response.json();
      setComments([...comments, newComment]);
  } catch (error) {
      setError(error.message);
  }
};



return (
  <div className="comments">
      <h3 className="comments-title">Comments</h3>
      {error && <div className="error-message">Error: {error}</div>}
      <div className="comment-form-title">Write a comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
          {comments.map(comment => (
              <Comment
                  key={comment.id}
                  comment={comment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  addComment={addComment}
                  // deleteComment={deleteComment}
                  // updateComment={updateComment}
                  currentUserId={currentUserId}
              />
          ))}
      </div>
  </div>
);
};



export default Comments;
