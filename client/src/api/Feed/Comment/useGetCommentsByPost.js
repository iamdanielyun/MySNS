import { useState, useEffect } from "react";

export default function useGetCommentsByPost(postId) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/api/v1/comments/post/${postId}`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setComments(data.data);
        })
        .catch(err => {
            console.error("src/api/Feed/Comment/useGetCommentsByPost(): ", err);
        });
    }, []);
    return comments;
}
