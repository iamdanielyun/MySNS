import { useNavigate } from "react-router-dom";

export default function useAddComment() {
    const navigate = useNavigate();

    const addComment = (description, username, postId) => {
        const params = new URLSearchParams();
        params.append('description', description);
        params.append('username', username);
        params.append('postId', postId);

        fetch(`${process.env.REACT_APP_URL}/api/v1/comments/add`, {
            credentials: 'include',
            method: "POST",
            body: params
        })
        .then(response => response.json())
        .then(data => {
            if(data.code === 200)
            {
                // navigate("/");
                window.location.reload(true);
            }
        })
        .catch(err => {
            console.error("src/api/Feed/Comment/useAddComment: ", err);
        });
    };
    return {addComment};
}
