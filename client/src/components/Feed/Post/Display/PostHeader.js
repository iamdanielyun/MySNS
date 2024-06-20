import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeletePost from '../../../../api/Feed/Post/useDeletePost';
import ProfileLink from '../../../User/ProfileLink';

//Warning modal for deleting post
function AlertDialog({ open, setOpen, setMsg, currentUser, username, postId }) {
    const { deletePost } = useDeletePost();
    const handleDeletePost = () => {
        // Only delete if the current user is the owner of the post
        if (currentUser === username) {
            deletePost(setMsg, postId);
        } else {
            console.log("You are not the owner of this post!");
        }
    };

    return (
        <>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="error">Cancel</Button>
                    <Button onClick={handleDeletePost}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default function PostHeader({ postId, currentUser, username, profileColor, formattedDate }) {
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);

    // Delete post
    // const { deletePost } = useDeletePost();
    // const handleDeletePost = () => {
    //     // Only delete if the current user is the owner of the post
    //     if (currentUser === username) {
    //         deletePost(setMsg, postId);
    //     } else {
    //         console.log("You are not the owner of this post!");
    //     }
    // };

    // Conditionally render delete button if currentUser === username
    const actionButton = currentUser === username && (
        <IconButton
            edge="end"
            // onClick={handleDeletePost}
            onClick={() => setOpen(true)}
            sx={{
                marginRight: "10%",
                '&:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                },
            }}
        >
            <DeleteIcon />
        </IconButton>
    );

    return (
        <>
            <AlertDialog 
                open={open} 
                setOpen={setOpen} 
                setMsg={setMsg}
                currentUser={currentUser}
                username={username}
                postId={postId}
            />
            <CardHeader
                avatar={
                    <ProfileLink username={username} profileColor={profileColor} />
                }
                title={
                    <Typography>
                        {currentUser === username ? <b>{username}</b> : username}
                    </Typography>
                }
                subheader={formattedDate}
                action={actionButton}  
            />
        </>
    );
}
