import { useState, useEffect } from "react";

export default function useGetProfileFeed(username) {

    const [posts, setPosts] = useState([]);
    const [code, setCode] = useState();

    useEffect(() => {

        //Fetch all posts
        fetch(`${process.env.REACT_APP_URL}/api/v1/posts/user/${username}`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setPosts(data.data);
            setCode(data.code);
        })
        .catch(err => console.error("src/api/Feed/useGetProfileFeed(): ", err));
    }, [username])
    return { posts, code };
}