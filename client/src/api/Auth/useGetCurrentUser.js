import { useState, useEffect } from "react";

export default function useGetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        
        //see who the current user is (basically get the session)
        fetch(`${process.env.REACT_APP_URL}/auth/currentUser`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setUser(data.data);
        })
        .catch(err => console.error("src/api/Auth/useGetCurrentUser(): ", err));
    }, [])

    return user;
}

   