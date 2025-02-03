import { useEffect, useState } from "react";
import "./commentSystem.css";
import Comment from "./Comment";
import CommentForm from "./CommentForm";


const Comments = ({blogId}) => {

  const [comments, setComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeComment, setActiveComment] = useState(null);


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
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const fetchCurrentUser = async () => {
      const response = await fetch(`http://localhost:8080/blog/session`, {
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
  }, [blogId]); // Dependency array, runs only when blogId changes



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
      setActiveComment(null);
  } catch (error) {
    console.error('There was a problem with the addComment operation:', error);
  }
};

const deleteComment = async (id) => {
  if (window.confirm("Are you sure you want to delete this comment?")) {
    try {
      const response = await fetch(`http://localhost:8080/comments/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete comment: ${response.status}`);
      }
      const updatedComments = comments.filter(comment => comment.id !== id);
      setComments(updatedComments);
    } catch (error) {
      console.error('There was a problem with the deleteComment operation:', error);
    }
  }
};

const updateComment = async (text, id) => {
  try {
    const response = await fetch(`http://localhost:8080/comments/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: text }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update comment: ${response.status}`);
    }
      const updatedComments = comments.map(comment => {
        if (comment.id === id) {
          return { ...comment, body: text };
        }
        return comment;
      });
      setComments(updatedComments);
      setActiveComment(null);
    } catch (error) {
      console.error('There was a problem with the updateComment operation:', error);
    }
  };





return (
  <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
          {comments.map(comment => (
              <Comment
                  key={comment.id}
                  comment={comment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                  currentUserId={currentUserId}
              />
          ))}
      </div>
  </div>
);
};



export default Comments;
