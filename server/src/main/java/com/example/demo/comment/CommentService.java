package com.example.demo.comment;

import com.example.demo.post.Post;
import com.example.demo.post.PostRepository;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    /*
        @param postId - the id of the post
        @effects none
        @returns a list of all the comments of a post
        @throws IllegalStateException if the post doesn't exist
     */
    public List<Comment> getCommentsByPostService(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() ->
                new IllegalStateException("Post does not exist"));
        return commentRepository.findByPost(post);
    }

    /*
        @oaram description - the actual content of the comment
        @param username - the username of the user who commented
        @param postId - the id of the post the user is trying to comment on
        @effects creates a new comment object that ties this user and post
        @returns none
        @throws IllegalStateException if the user and/or post doesn't exist
     */
    public Comment addCommentService(String description, String username, Long postId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found with username: " + username));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalStateException("Post not found with id: " + postId));

        Comment comment = new Comment(user, post, description, LocalDateTime.now());
        commentRepository.save(comment);
        return comment;
    }

    /*
        @param commentId - the id of the comment to be deleeted
        @effects deletes existing comment object
        @returns none
        @throws IllegalStateException if the comment object does not exist
     */
    public void deleteCommentService(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalStateException(("Comment with id " + commentId + " does not exist")));
        commentRepository.delete((comment));
    }
}
