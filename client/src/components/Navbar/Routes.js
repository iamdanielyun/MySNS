import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreatePostModal from '../Feed/Post/Create/CreatePostModal';
import useGetCurrentUser from '../../api/Auth/useGetCurrentUser';

export default function Routes() {
    
    const user = useGetCurrentUser();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Link to={"/"} style={{ textDecoration: 'none', color: 'white' }}>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                        Explore
                    </Button>
                </Link>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => setOpen(true)}>
                    Create
                </Button>

                {/* Create post */}
                <CreatePostModal open={open} setOpen={setOpen}/>
            </Box>
        </>
    )
}