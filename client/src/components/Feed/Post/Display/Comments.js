import { useState } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { red, blue, orange, green, yellow, purple, brown } from '@mui/material/colors';
import ProfileLink from '../../../User/ProfileLink';

export default function Comments({ comments }) {
    const [viewComments, setViewComments] = useState(false);
    const profileColors = [red, blue, orange, green, yellow, purple, brown];

    return (
        <>
            <CardActions>
                <Button 
                    onClick={() => setViewComments(!viewComments)} 
                    sx={{
                        color: "text.secondary", 
                        textTransform: "lowercase", 
                        fontSize: "1.0rem",
                        '&:focus': {
                            outline: 'none',
                            boxShadow: 'none',
                        },
                    }}>
                    {viewComments ? 'hide comments' : 'view comments'}
                </Button>
            </CardActions>
            
            <Collapse in={viewComments} timeout="auto" unmountOnExit>
                <CardContent>
                    <List sx={{ maxWidth: "90%", bgcolor: 'background.paper' }}>
                        {comments && comments.length > 0 ? (
                            comments.map((comment, index) => {
                                const user = comment.user;
                                if (!user) {
                                    console.error('Comment missing user:', comment);
                                    return null;  
                                }

                                const username = user.username;
                                const description = comment.description;
                                const profileColor = profileColors[(username.length % profileColors.length)];

                                return (
                                    <div key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <ProfileLink username={username} profileColor={profileColor} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={username}
                                                secondary={description}
                                                sx={{
                                                    maxWidth: "100%",
                                                    wordWrap: "break-word",
                                                    whiteSpace: "pre-wrap",
                                                }}
                                            />
                                        </ListItem>
                                    </div>
                                );
                            })
                        ) : (
                            <ListItem>
                                <ListItemText primary="No comments yet" />
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Collapse>
        </>
    );
}
