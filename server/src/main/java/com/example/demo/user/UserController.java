package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users/")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsersService();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping(path = "add")
    public ResponseEntity<String> addUser(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String confirmation
    ) {
        userService.addUserService(username.trim(), password.trim(), confirmation.trim());
        return new ResponseEntity<>("User added", HttpStatus.OK);
    }

    @PutMapping(path = "update/{userId}")
    public ResponseEntity<String> updateUser(
            @PathVariable("userId") Long userId,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String password
    ) {
        userService.updateUserService(userId, username, password);
        return new ResponseEntity<>("User updated", HttpStatus.OK);
    }

    @DeleteMapping(path = "delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUserService(userId);
        return new ResponseEntity<>("User deleted", HttpStatus.OK);
    }
}
