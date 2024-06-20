import { useNavigate } from "react-router-dom";

export default function useLogoutUser() {
    const navigate = useNavigate();

    const logoutUser = () => {
        fetch(`${process.env.REACT_APP_URL}/auth/logout`, {
            credentials: 'include',
            method: "POST",
        })
        .then(() => {
            navigate("/");
            window.location.reload(true);
        })
        .catch(err => console.error("src/api/Auth/userLogoutUser: ", err));
    }
    return {logoutUser};
}