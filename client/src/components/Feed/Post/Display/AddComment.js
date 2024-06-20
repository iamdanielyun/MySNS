import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useAddComment from "../../../../api/Feed/Comment/useAddComment";

export default function AddComment({ currentUser, postId }) {
    const [description, setDescription] = useState("");
    const [msg, setMsg] = useState("");

    const { addComment } = useAddComment();
    const handleComment = () => {
        if(description.trim() != "")
            addComment(description, currentUser, postId);
    };
    
    return (
        <>
            <TextField
                id="outlined-basic"
                label="Comment"
                variant="outlined"
                sx={{ width: "300px", position: "center" }}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            {currentUser ? (
                <Button 
                    variant="text" 
                    onClick={handleComment}
                    sx={{
                        '&:focus': {
                            outline: 'none',
                            boxShadow: 'none',
                        },
                    }}
                >
                    Post
                </Button>
            ) : (
                <Button variant="text" disabled>Post</Button>
            )}
        </>
    );
}
