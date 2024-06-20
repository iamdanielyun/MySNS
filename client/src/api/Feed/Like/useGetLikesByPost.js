import { useState, useEffect } from "react";

export default function useGetLikesByPost(postId) {
    const [likes, setLikes] = useState([]);
    useEffect(() => {

        //Fetch this post's likes
        fetch(`${process.env.REACT_APP_URL}/api/v1/likes/post/${postId}`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setLikes(data.data);
        })
        .catch(err => console.error("src/api/Feed/Like/useGetLikesByPost(): ", err));
    }, [])

    return likes;
}