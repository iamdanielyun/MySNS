import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

export default function ProfileLink({ username, profileColor }) {
    return (
        <>
            <Link 
                to={`/user/${username}`} 
                style={{ textDecoration: 'none' }}
                sx={{
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'none',
                    },
                    '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                    }
                }}
            >
                <Avatar sx={{ bgcolor: profileColor[500] }}>
                    {username[0]}
                </Avatar>
            </Link>
        </>
    )
}