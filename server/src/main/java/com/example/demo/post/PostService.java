package com.example.demo.post;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    /*
        @param none
        @effects none
        @returns a list of all the posts
        @throws none
     */
    public List<Post> getAllPostsService() {
        return postRepository.findAllByOrderByTimestampDesc();
    }

    /*
        @param userId - the id of the user
        @effects none
        @returns a list of all the posts of a user
        @throws IllegalStateException if the user doesn't exist
     */
    public List<Post> getPostsByUserService(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() ->
            new IllegalStateException("User does not exist"));
        return postRepository.findByUserOrderByTimestampDesc(user);
    }

    /*
        @param userId - the id of the user who is creating this post
        @param description - the content of the post
        @param imageUrl - the image to go along with the content
        @effects creates a new post
        @returns none
        @throws IllegalStateException if the user doesn't exist
     */
    @Transactional
    public void addPostService(String username, String description, String imageUrl) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found with username: " + username));
        Post post = new Post(user, description, imageUrl, LocalDateTime.now());
        postRepository.save(post);
    }

    /*
        @param postId - the id of the post to delete
        @param currentUser - the currently logged in user
        @effects deletes existing post object
        @returns none
        @throws IllegalStateException if post doesnt exist or currentUser is not the poster
     */
    @Transactional
    public void deletePostService(Long postId, String currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post with id " + postId + " does not exist"));

        //check if the person deleting the post == owner of the post
        if(!currentUser.equals(post.getUser().getUsername()))
            throw new IllegalStateException("User trying to delete the post is not the owner of the post");
        postRepository.delete(post);
    }
}
