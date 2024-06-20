import { CircularProgress } from "@mui/material";
import useGetExploreFeed from "../../api/Feed/useGetExploreFeed";
import useGetCurrentUser from "../../api/Auth/useGetCurrentUser";
import Post from "./Post/Display/Post";

export default function ExploreFeed() {
    const posts = useGetExploreFeed();
    const currentUser = useGetCurrentUser();

    if(posts)
    {
        return (
            <div className="feed-container">
                {posts && posts.map(post => (
                    <Post
                        key={post.id} 
                        postId={post.id}
                        currentUser={currentUser}
                        username={post.user.username}
                        description={post.description}
                        imageUrl={post.imageUrl}
                        timestamp={post.timestamp}
                    />
                ))}
            </div>
        );
    }
    else
    {
        return (
            <div className="feed-container">
                <center>
                    <CircularProgress />
                </center>
            </div>
        )
    }
    
}
