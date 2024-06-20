import { useState, useEffect } from "react";

export default function useGetExploreFeed() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {

        //Fetch all posts
        fetch(`${process.env.REACT_APP_URL}/api/v1/posts/`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPosts(data.data);
        })
        .catch(err => console.error("src/api/Feeds/useGetExploreFeed(): ", err));
    }, [])
    return posts;
}