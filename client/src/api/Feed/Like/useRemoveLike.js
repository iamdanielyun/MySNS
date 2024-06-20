export default function useRemoveLike() {
    const removeLike = (setMsg, username, postId) => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('postId', postId);

        return fetch(`${process.env.REACT_APP_URL}/api/v1/likes/delete`, {
            credentials: 'include',
            method: "DELETE",
            body: params
        })
        .then(response => response.json())
        .then(data => {
            setMsg(data.data);
        })
        .catch(err => {
            console.error("src/api/Feed/Like/useAddLike: ", err);
        });
    };
    return {removeLike};
}
