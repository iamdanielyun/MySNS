import { useNavigate } from "react-router-dom";

export default function useRegisterUser() {
    const navigate = useNavigate();

    const registerUser = (setMsg, username, password, confirmation) => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('confirmation', confirmation);

        fetch(`${process.env.REACT_APP_URL}/auth/register`, {
            credentials: 'include',
            method: "POST",
            body: params
        })
        .then(response => response.json())
        .then(data => {
            setMsg(data.data);
            
            if(data.code === 200)
            {
                navigate("/");
                window.location.reload(true);
            }
        })
        .catch(err => console.error("src/api/Auth/useRegisterUser: ", err));
    }
    
    return {registerUser};
}