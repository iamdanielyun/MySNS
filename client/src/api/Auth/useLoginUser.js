import { useNavigate } from "react-router-dom";

export default function useLoginUser() {
    const navigate = useNavigate();

    const loginUser = (setMsg, username, password) => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        fetch(`${process.env.REACT_APP_URL}/auth/login`, {
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
        .catch(err => console.error("src/api/Auth/useLoginUser: ", err));
    }
    
    return {loginUser};
}