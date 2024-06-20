package com.example.demo.like;

import com.example.demo.apiResponse.ApiResponse;
import com.example.demo.post.Post;
import com.example.demo.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/likes/")
public class LikeController {

    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping(path = "post/{postId}")
    public ResponseEntity<ApiResponse<List<Like>>> getLikesByPost(@PathVariable("postId") Long postId) {
        List<Like> likes = likeService.getLikesByPostService(postId);
        return ResponseEntity.ok(new ApiResponse<List<Like>>(likes, 200));
    }

    @PostMapping(path = "add")
    public ResponseEntity<ApiResponse<String>> addLike(
            @RequestParam String username,
            @RequestParam Long postId
    ) {
        likeService.addLikeService(username, postId);
        return ResponseEntity.ok(new ApiResponse<String>("Like created", 200));
    }

    @DeleteMapping(path = "delete")
    public ResponseEntity<ApiResponse<String>> deleteLike(
            @RequestParam String username,
            @RequestParam Long postId
    ) {
        likeService.deleteLikeService(username, postId);
        return ResponseEntity.ok(new ApiResponse<String>("Like deleted", 200));
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<ApiResponse<String>> deleteLike2(
            @PathVariable("id") Long id
    ) {
        likeService.deleteLikeByIdService(id);
        return ResponseEntity.ok(new ApiResponse<String>("Like deleted", 200));
    }
}
