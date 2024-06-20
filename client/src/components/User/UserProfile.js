import { useParams } from "react-router-dom"
import { red, blue, orange, green, yellow, purple, brown, grey } from '@mui/material/colors';
import { CircularProgress } from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useGetCurrentUser from "../../api/Auth/useGetCurrentUser";
import useGetProfileFeed from "../../api/Feed/useGetProfileFeed";
import Post from "../Feed/Post/Display/Post";

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));



export default function UserProfile() {

    //Username
    const { username } = useParams();
    const { posts, code } = useGetProfileFeed(username);

    //Currently logged in user
    const currentUser = useGetCurrentUser();

    const profileColors = [red, blue, orange, green, yellow, purple, brown];
    const profileColor = profileColors[(username.length % 7)];

    const profileName = username === currentUser ? (username + " (me)") : username;

    //if valid user
    if(code !== 409)
    {
        return (
            <>
                <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Stack 
                        spacing={{ xs: 5, sm: 2 }} 
                        direction="row" 
                        sx={{ marginBottom: "5%", width: "50%", justifyContent: 'flex-start', alignItems: 'center' }}
                    >
                        <Avatar sx={{ bgcolor: profileColor[500], width: 80, height: 80, fontSize: "50px", left: "0" }}>
                            {username[0]}
                        </Avatar>
                        <h2>{profileName}</h2>
                    </Stack>

                    {/* posts */}
                    <div className="feed-container">
                        {posts ? posts.map(post => (
                            <Post
                                key={post.id} 
                                postId={post.id}
                                currentUser={currentUser}
                                username={post.user.username}
                                description={post.description}
                                imageUrl={post.imageUrl}
                                timestamp={post.timestamp}
                            />
                        )) : <CircularProgress />
                        }
                    </div>
                </Box>
            </>
        );
    }
    else
    {
        return (
            <>
                <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Stack 
                        spacing={{ xs: 5, sm: 2 }} 
                        direction="row" 
                        sx={{ marginTop: "-40%", width: "50%", justifyContent: 'flex-start', alignItems: 'center' }}
                    >
                        <Avatar sx={{ bgcolor: grey[500], width: 80, height: 80, fontSize: "50px", left: "0" }}>
                            
                        </Avatar>
                        <h2>{username} does not exist!</h2>
                    </Stack>
                </Box>
            </>
        );
    }
}