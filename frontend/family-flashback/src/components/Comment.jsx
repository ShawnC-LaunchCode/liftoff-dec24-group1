import CommentForm from "./CommentForm";
import "./commentSystem.css";
import userIcon from "./assets/user-icon.png";

//Renders individual comment

const Comment = ({
  comment,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;
  const update_dt = comment.update_dt;
  console.log(update_dt); //needs fixed

  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src={userIcon}/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.name}</div>
          <div>{update_dt}</div>
        </div>
        <div className="comment-text">{comment.body}</div>
      </div>
    </div>
  );
};

export default Comment;
