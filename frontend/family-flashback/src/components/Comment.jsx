import CommentForm from "./CommentForm";
import "./commentSystem.css";
import userIcon from "./assets/user-icon.png";


const Comment = ({
  comment,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const canEdit = currentUserId === comment.user_id;
  const canDelete = currentUserId === comment.user_id;
  const update_dt = new Date (comment.update_dt).toLocaleDateString();
   

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
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm submitLabel="Update" 
            hasCancelButton 
            initialText={comment.body} 
            handleSubmit={(text) => updateComment(text, comment.id)} 
            handleCancel={() => setActiveComment(null)} 
          />
        )}
        <div className="comment-actions">
            {canEdit && (
                <div 
                    className="comment-action"
                    onClick={() => setActiveComment({ id: comment.id, type: "editing" })}
                >
                Edit
                </div>)}
            { canDelete && (
                <div 
                    className="comment-action"
                    onClick={() => deleteComment(comment.id)}
                >
                Delete
                </div>)}
        </div>
      </div>
    </div>
  );
};

export default Comment;
