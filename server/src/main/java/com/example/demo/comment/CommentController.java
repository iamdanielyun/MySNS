package com.example.demo.comment;

import com.example.demo.apiResponse.ApiResponse;
import com.example.demo.like.Like;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/comments/")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) { this.commentService = commentService; }

    @GetMapping(path = "post/{postId}")
    public ResponseEntity<ApiResponse<List<Comment>>> getCommentsByPost(@PathVariable("postId") Long postId) {
        List<Comment> comments = commentService.getCommentsByPostService(postId);
        return ResponseEntity.ok(new ApiResponse<List<Comment>>(comments, 200));
    }

    @PostMapping(path = "add")
    public ResponseEntity<ApiResponse<Comment>> addComment(
            @RequestParam String description,
            @RequestParam String username,
            @RequestParam Long postId
    ) {
        Comment comment = commentService.addCommentService(description, username, postId);
        return ResponseEntity.ok(new ApiResponse<Comment>(comment, 200));
    }

    @DeleteMapping(path = "delete/{commentId}")
    public ResponseEntity<ApiResponse<String>> deleteComment(@PathVariable("commentId") Long commentId) {
        commentService.deleteCommentService(commentId);
        return ResponseEntity.ok(new ApiResponse<String>("Comment deleted", 200));
    }
}
