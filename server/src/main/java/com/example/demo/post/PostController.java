package com.example.demo.post;

import com.example.demo.apiResponse.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/posts/")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Post>>> getPosts() {
        List<Post> posts = postService.getAllPostsService();
        return ResponseEntity.ok(new ApiResponse<List<Post>>(posts, 200));
    }

    @GetMapping(path = "user/{username}")
    public ResponseEntity<ApiResponse<List<Post>>> getPostsByUser(@PathVariable("username") String username) {
        List<Post> posts = postService.getPostsByUserService(username);
        return ResponseEntity.ok(new ApiResponse<List<Post>>(posts, 200));
    }

    @PostMapping(path = "add")
    public ResponseEntity<ApiResponse<String>> addPost(
            @RequestParam String username,
            @RequestParam String description,
            @RequestParam String imageUrl
    ) {
        postService.addPostService(username, description, imageUrl);
        return ResponseEntity.ok(new ApiResponse<String>("Post created", 200));
    }

    @DeleteMapping(path = "delete/{postId}")
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable("postId") Long postId, HttpServletRequest request) {

        //Get the current user (session)
        UserDetails userDetails = (UserDetails) request.getSession().getAttribute("user");
        if (userDetails != null) {
            String username = userDetails.getUsername();
            postService.deletePostService(postId, username);
            return ResponseEntity.ok(new ApiResponse<String>("Post deleted", 200));
        } else {
            System.out.println("trying to delete post but no session");
            return ResponseEntity.ok(new ApiResponse<String>("User trying to delete the post is not the poster", 401));
        }
    }
}
