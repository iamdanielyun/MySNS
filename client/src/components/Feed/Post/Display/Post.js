import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { red, blue, orange, green, yellow, purple, brown } from '@mui/material/colors';
import useGetLikesByPost from '../../../../api/Feed/Like/useGetLikesByPost';
import useGetCommentsByPost from '../../../../api/Feed/Comment/useGetCommentsByPost';
import PostHeader from './PostHeader';
import Comments from './Comments';
import AddComment from './AddComment';
import AddLike from './AddLike';

export default function Post({ postId, currentUser, username, description, imageUrl, timestamp }) {
    const comments = useGetCommentsByPost(postId);
    const likes = useGetLikesByPost(postId);
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);

    useEffect(() => {
        if (likes.length > 0) {
            const initialLiked = likes.some(like => like.user.username === currentUser);
            setLikedByCurrentUser(initialLiked);
        }
    }, [likes, currentUser]);

    const profileColors = [red, blue, orange, green, yellow, purple, brown];
    const profileColor = profileColors[(username.length % 7)];

    const date = new Date(timestamp);
    const month = date.getMonth() + 1;  
    const day = date.getDate();
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes.toString().padStart(2, '0');
    var hours = date.getHours();
    var amPm = "am";
    if (hours >= 12) {
        if(hours !== 12)
            hours -= 12;
        amPm = "pm";
    }
    const formattedDate = `${month}/${day}/${year} ${hours}:${formattedMinutes} ${amPm}`;

    return (
        <Card sx={{ width: "50%", height: "auto" }}>
            
            {/* Post header */}
            <PostHeader postId={postId} currentUser={currentUser} username={username} profileColor={profileColor} formattedDate={formattedDate} />
            
            {/* Post body */}
            <CardMedia
                component="img"
                height="auto"
                image={imageUrl}
                alt="Oops!"
            />
            <CardContent>
                <Typography variant="body">
                    {description}
                </Typography>
            </CardContent>
            <Comments comments={comments} />
            <CardActions disableSpacing>
                <AddLike currentUser={currentUser} postId={postId} likedByCurrentUser={likedByCurrentUser} setLikedByCurrentUser={setLikedByCurrentUser} />
                <AddComment currentUser={currentUser} postId={postId} />
            </CardActions>
        </Card>
    );
}
