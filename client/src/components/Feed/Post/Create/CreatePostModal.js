import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RedAlert from "../../../Alert/RedAlert";
import SelectImage from './SelectImage';
import useGetCurrentUser from '../../../../api/Auth/useGetCurrentUser';
import useCreatePost from "../../../../api/Feed/Post/useCreatePost";
import { Link } from 'react-router-dom';

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function CreatePostModal({open, setOpen}) {
    const [finalImage, setFinalImage] = useState("");
    const [description, setDescription] = useState("");
    const [counter, setCounter] = useState(0);
    const [msg, setMsg] = useState("");
    const user = useGetCurrentUser();

    //Submit post
    const {createPost} = useCreatePost();
    const handleSubmit = (e) => {
        e.preventDefault();

        if(description.trim() == "" || finalImage.trim() == "")
        {
            const spaces = ' '.repeat(counter);
            setMsg(`Select an image and description${spaces}`);
            setCounter(prev => prev + 1);
        }
        else
            createPost(setMsg, user, description, finalImage);
    }
    
    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{ ...style, width: "30%", height: "auto" }}>
                    <h2>Create post</h2>

                    {/* Display the final image selected */}
                    { finalImage.trim() != "" ? finalImage : null }
                    
                    {/* Select image */}
                    <SelectImage setFinalImage={setFinalImage} />
                    <br />
                    
                    {/* Post content/description */}
                    <TextField variant="outlined" placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                    <br />

                    <center>
                        {user != null ? 
                            <Button variant="text" onClick={handleSubmit}>Post</Button>
                        : 
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <Button variant="text" disabled>Post</Button>
                                <Link to={"/login"} onClick={() => setOpen(false)}>Login</Link>
                            </div>
                        }
                        {/* Display error if any */}
                    </center>

                    {msg != "" ?
                        <RedAlert message={msg} marginTop="5"/>
                    : null}
                </Box>
            </Modal>
        </div>
    );
}