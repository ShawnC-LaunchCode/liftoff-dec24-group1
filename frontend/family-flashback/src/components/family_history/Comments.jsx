import { useEffect, useState } from "react";
import "./commentSystem.css";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { 
    getComments as getCommentsApi, 
    createComment as createCommentApi, 
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi} from "./api";


const Comments = ({currentUserId}) => {

    const[backendComments, setBackendComments] = useState([]);
    
    const[activeComment, setActiveComment] = useState(null);

    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );
    
    const getReplies = commentId => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, 
            b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
    };

    const addComment = (text, parentId) => {
        console.log("addComment", text, parentId);
        // fetch goes here
        createCommentApi(text, parentId).then(comment => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });
    };

    const deleteComment = (commentId) => {
        //fetch goes here as well i think to update database
        if (window.confirm('Are you sure you want to delete this comment?')) {
            deleteCommentApi(commentId).then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updatedBackendComments);
            });
        };
    };

    const updateComment = (text, commentId) => {
        //fetch here as well
        updateCommentApi(text, commentId).then(() =>{
            const updatedBackendComments = backendComments.map(backendComment => {
                if (backendComment.id === commentId) {
                    return {...backendComment, body: text };
                    };
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    };

    useEffect(() => {
        // fetch from api will go here
        getCommentsApi().then((data) => {
            setBackendComments(data)
        });

    }, []);

    return (
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
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