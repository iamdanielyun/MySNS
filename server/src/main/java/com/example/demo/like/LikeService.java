package com.example.demo.like;

import com.example.demo.post.Post;
import com.example.demo.post.PostRepository;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    /*
        @param postId - the id of the post
        @effects none
        @returns a list of all the likes of a post
        @throws IllegalStateException if the post doesn't exist
     */
    public List<Like> getLikesByPostService(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() ->
                new IllegalStateException("Post does not exist"));
        return likeRepository.findByPost(post);
    }

    /*
        @param username - the username of the user who liked the post
        @param postId - the id of the post the user is trying to like
        @effects creates a new like object that ties this user and post
        @returns none
        @throws IllegalStateException if the user and/or post doesn't exist
     */
    @Transactional
    public void addLikeService(String username, Long postId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found with username: " + username));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post not found with id: " + postId));

        // Check if like already exists
        likeRepository.findByUserAndPost(user, post).ifPresent(like -> {
            throw new IllegalStateException("Like already exists for user: " + username + " and post id: " + postId);
        });

        // If no like exists, create and save a new like
        Like like = new Like(user, post);
        likeRepository.save(like);

        // Add the like to the post's likes set and save the post
//        post.getLikes().add(like);
//        postRepository.save(post);
    }

    /*
        @param username - the user who liked the post
        @param postId - the id of the post the user is trying to unlike
        @effects deletes existing like object
        @returns none
        @throws IllegalStateException if the user and/or post doesn't exist
     */
    @Transactional
    public void deleteLikeService(String username, Long postId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found with username: " + username));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post not found with id: " + postId));

        Like like = likeRepository.findByUserAndPost(user, post)
                .orElseThrow(() -> new IllegalStateException("Like not found with username: " + username + " and post id " + postId));

        likeRepository.delete(like);

        // Remove the like from the post's likes set and save the post
//        post.getLikes().remove(like);
//        postRepository.save(post);
    }

    public void deleteLikeByIdService(Long id) {
        Like like = likeRepository.findById(id).orElseThrow();
        likeRepository.delete(like);
    }
}
