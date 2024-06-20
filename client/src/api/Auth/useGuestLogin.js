import { useNavigate } from "react-router-dom";

export default function useGuestLogin() {
    const navigate = useNavigate();

    const guestLoginUser = () => {
        fetch(`${process.env.REACT_APP_URL}/auth/guestRegister`, {
            credentials: 'include',
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {            
            if(data.code === 200)
            {
                navigate("/");
                window.location.reload(true);
            }
        })
        .catch(err => console.error("src/api/Auth/useGuestLogin: ", err));
    }
    
    return {guestLoginUser};
}