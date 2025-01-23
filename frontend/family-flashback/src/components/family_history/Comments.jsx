import { useEffect, useState } from "react";
import { getComments as getCommentsApi } from "./api";
import "./commentSystem.css";
import Comment from "./Comment";

const Comments = ({currentUserId}) => {

    const[backendComments, setBackendComments] = useState([])
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );
    console.log("backendComments", backendComments);

    useEffect(() => {
        // fetch from api will go here
        getCommentsApi().then((data) => {
            setBackendComments(data)
        });

    }, []);

    return (
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment key={rootComment.id} comment={rootComment} />
                ))}

            </div>
        </div>
    );

};

export default Comments;