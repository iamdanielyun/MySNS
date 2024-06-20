import { useNavigate } from "react-router-dom";

export default function useCreatePost() {
    const navigate = useNavigate();

    const createPost = (setMsg, username, description, imageUrl) => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('description', description);
        params.append('imageUrl', imageUrl);

        fetch(`${process.env.REACT_APP_URL}/api/v1/posts/add`, {
            credentials: 'include',
            method: "POST",
            body: params
        })
        .then(response => response.json())
        .then(data => {
            setMsg(data.data);

            if(data.code === 200)
            {
                navigate(`user/${username}`);
                window.location.reload(true);
            }
        })
        .catch(err => console.error("src/api/Feed/Post/useCreatePost: ", err));
    }
    return {createPost};
}