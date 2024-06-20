package com.example.demo.like;

import com.example.demo.post.Post;
import com.example.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    List<Like> findByPost(Post post);
    Optional<Like> findByUserAndPost(User user, Post post);
}
