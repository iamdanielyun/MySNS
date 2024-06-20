import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RedAlert from '../Alert/RedAlert';
import useRegisterUser from '../../api/Auth/useRegisterUser';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [counter, setCounter] = useState(0);
    const [msg, setMsg] = useState("");

    const {registerUser} = useRegisterUser();
    const handleRegister = (e) => {
        e.preventDefault();

        if(username.trim() == "" || password.trim() == "" || confirmation.trim() == "")
        {
            const spaces = ' '.repeat(counter);   
            const message = `Please fill out all fields${spaces}`;
            setMsg(message);
            setCounter(prev => prev + 1);
        }
        else
            registerUser(setMsg, username, password, confirmation);
    }

    return (
        <>
            <div className='login-container'>
                <h1>
                    Hi there!
                </h1>
                <TextField id="outlined-basic" label="Username" variant="standard" sx={{width: "40%"}} onChange={(e) => setUsername(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="standard" sx={{width: "40%"}} onChange={(e) => setPassword(e.target.value)}/>
                <TextField id="outlined-basic" label="Confirm password" variant="standard" sx={{width: "40%"}} onChange={(e) => setConfirmation(e.target.value)}/>
                <Button variant="outlined" size="large" onClick={handleRegister}>Register</Button>

                <h6>
                    Already have an account? <Link to={"/login"}>Login</Link>
                </h6>
                {/* Display error if any */}
                {msg != "" && msg != "Success" ?
                    <RedAlert message={msg} marginTop="0"/>

                : null}
            </div>
        </>
    )
}