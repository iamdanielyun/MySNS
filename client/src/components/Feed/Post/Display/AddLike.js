import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import useAddLike from '../../../../api/Feed/Like/useAddLike';
import useRemoveLike from '../../../../api/Feed/Like/useRemoveLike';

export default function AddLike({ currentUser, postId, likedByCurrentUser, setLikedByCurrentUser }) {
    const [msg, setMsg] = useState("");

    // Handle like/unlike
    const {addLike} = useAddLike();
    const {removeLike} = useRemoveLike();

    const handleLikeClick = () => {

        //if currently unliked, we are trying to add like
        if(!likedByCurrentUser)
        {
            setLikedByCurrentUser(!likedByCurrentUser);
            addLike(setMsg, currentUser, postId);
            // addLike(setMsg, currentUser, postId).then(() => {
            //     setLikedByCurrentUser(!likedByCurrentUser);
            // });
        }
        //if currently liked, we are trying to remove like
        else
        {
            setLikedByCurrentUser(!likedByCurrentUser);
            removeLike(setMsg, currentUser, postId);
            // removeLike(setMsg, currentUser, postId).then(() => {
            //     setLikedByCurrentUser(!likedByCurrentUser);
            // });
        }
    };

    return (
        <>
            {/* can't like post if not logged in */}
            {currentUser != null ? 
                <IconButton 
                    onClick={handleLikeClick}
                    sx={{
                        '&:focus': {
                            outline: 'none',
                            boxShadow: 'none',
                        },
                    }}
                >
                    <FavoriteIcon color={likedByCurrentUser ? 'error' : 'inherit'} />
                </IconButton>
            :
                <IconButton disabled >
                    <FavoriteIcon/>
                </IconButton>
            }
        </>
    );
}
