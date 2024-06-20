import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RedAlert from '../Alert/RedAlert';
import useLoginUser from '../../api/Auth/useLoginUser';
import useGuestLogin from '../../api/Auth/useGuestLogin';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [counter, setCounter] = useState(0);
    const [msg, setMsg] = useState("");

    //Regular login
    const {loginUser} = useLoginUser();
    const handleLogin = (e) => {
        e.preventDefault();

        if(username.trim() == "" || password.trim() == "")
        {
            const spaces = ' '.repeat(counter);   
            const message = `Please fill out all fields${spaces}`;
            setMsg(message);
            setCounter(prev => prev + 1);
        }
        else
            loginUser(setMsg, username, password);
    }

    //Continue as guest
    const {guestLoginUser} = useGuestLogin();
    const handleGuestLogin = (e) => {
        e.preventDefault();
        guestLoginUser();
    }
    return (
        <>
            <div className='login-container'>
                <h1>
                    Welcome back
                </h1>
                <TextField id="outlined-basic" label="Username" variant="standard" sx={{width: "40%"}} onChange={(e) => setUsername(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="standard" sx={{width: "40%"}} onChange={(e) => setPassword(e.target.value)}/>
                
                <div style={{display: "flex", flexDirection: "column", width: "10%", gap: "1vh"}}>
                    <Button variant="outlined" size="large" onClick={handleLogin}>Login</Button>
                    <center>or</center>
                    <Button variant="outlined" size="large" onClick={handleGuestLogin}>Continue as guest</Button>
                </div>                    
                
                <h6>
                    Don't have an account? <Link to={"/register"}>Register</Link>
                </h6>


                {/* Display error if any */}
                {msg != "" && msg != "Success" ?
                    <RedAlert message={msg} marginTop="0"/>

                : null}
            </div>
        </>
    )
}