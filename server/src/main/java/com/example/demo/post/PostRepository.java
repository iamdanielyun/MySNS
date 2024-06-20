package com.example.demo.post;

import com.example.demo.user.User;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
    List<Post> findByUser(User user);

    @Query("SELECT p FROM Post p ORDER BY p.timestamp DESC")
    List<Post> findAllByOrderByTimestampDesc();

    @Query("SELECT p FROM Post p WHERE p.user = :user ORDER BY p.timestamp DESC")
    List<Post> findByUserOrderByTimestampDesc(@Param("user") User user);
}
