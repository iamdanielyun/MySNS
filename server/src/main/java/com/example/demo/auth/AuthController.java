package com.example.demo.auth;

import com.example.demo.user.User;
import com.example.demo.user.UserService;
import com.example.demo.apiResponse.ApiResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @GetMapping("/currentUser")
    public ResponseEntity<ApiResponse<String>> getCurrentUser(HttpServletRequest request) {
        UserDetails userDetails = (UserDetails) request.getSession().getAttribute("user");
        if (userDetails != null) {
            String username = userDetails.getUsername();
            System.out.println("userDetails: " + username);
            return ResponseEntity.ok(new ApiResponse<>(username, 200));
        } else {
            System.out.println("no current user right now");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(null, 401));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestParam String username, @RequestParam String password, HttpServletRequest request) {
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
            Authentication authentication = authenticationManager.authenticate(token);
            System.out.println("OK: Authentication authentication = authenticationManager.authenticate(token);");
            UserDetails userDetails = userService.loadUserByUsername(username);
            System.out.println("OK: UserDetails userDetails = userService.loadUserByUsername(username);");
            request.getSession().setAttribute("user", userDetails);
            System.out.println("OK: request.getSession().setAttribute(\"user\", userDetails);");
            return ResponseEntity.ok(new ApiResponse<String>("Success", 200));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<String>("Invalid credentials", 400));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String confirmation,
            HttpServletRequest request) {

        User user = userService.addUserService(username, password, confirmation);
        UserDetails userDetails = userService.loadUserByUsername(username);
        request.getSession().setAttribute("user", userDetails);
        return ResponseEntity.ok(new ApiResponse<String>("Success", 200));
    }

    @PostMapping("/guestRegister")
    public ResponseEntity<ApiResponse<String>> guestRegister(HttpServletRequest request) {
        String guestUsername = userService.addGuestUserService();
        UserDetails userDetails = userService.loadUserByUsername(guestUsername);
        request.getSession().setAttribute("user", userDetails);
        return ResponseEntity.ok(new ApiResponse<String>("Success", 200));
    }
}