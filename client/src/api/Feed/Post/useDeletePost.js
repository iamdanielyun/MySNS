import { useNavigate } from "react-router-dom";

export default function useDeletePost() {
    const navigate = useNavigate();

    const deletePost = (setMsg, postId) => {
        const params = new URLSearchParams();

        fetch(`${process.env.REACT_APP_URL}/api/v1/posts/delete/${postId}`, {
            credentials: 'include',
            method: "DELETE",
            body: params
        })
        .then(response => response.json())
        .then(data => {
            setMsg(data.data);

            if(data.code === 200)
            {
                // navigate("/");
                window.location.reload(true);
            }
        })
        .catch(err => console.error("src/api/Feed/Post/useDeletePost: ", err));
    }
    return {deletePost};
}