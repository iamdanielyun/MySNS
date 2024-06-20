package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import java.util.List;
import java.util.Random;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In loadUserByUsername");
        Optional<User> user = userRepository.findByUsername(username);
        System.out.println("OK: Optional<User> user = userRepository.findByUsername(username);");
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        return new CustomUserDetails(user.get());
    }

    /*
        @param none
        @effects none
        @returns a list of all the users
        @throws none
     */
    public List<User> getUsersService() {
        return userRepository.findAll();
    }

    /*
        @param username - username of new user
        @param password - password of new user
        @param confirmation - password confirm
        @effects adds new user if username is unique
        @returns new User object
        @throws IllegalStateException if username is taken
        @throws IllegalArgumentException if password != confirmation
     */
    @Transactional
    public User addUserService(String username, String password, String confirmation) {
        boolean userExists = userRepository.findByUsername(username).isPresent();
        if (userExists) {
            throw new IllegalStateException("Username already exists");
        }

        //check if password == confirmation
        if (!password.equals(confirmation)) {
            throw new IllegalArgumentException("Password does not match confirmation");
        }

        // Encode the password
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(username, encodedPassword);
        userRepository.save(user);
        return user;
    }


    /*
        @param none
        @effects adds new guest user
        @returns guest username
        @throws none
     */
    @Transactional
    public String addGuestUserService() {
        String guestUsername;
        Random random = new Random();
        int randomNumber = 10000000 + random.nextInt(90000000);
        guestUsername = "Guest" + randomNumber;

        //keep trying if this guest number is taken (this would be very rare)
        boolean userExists = userRepository.findByUsername(guestUsername).isPresent();
        while(userExists)
        {
            randomNumber = 10000000 + random.nextInt(90000000);
            guestUsername = "Guest" + randomNumber;
            userExists = userRepository.findByUsername(guestUsername).isPresent();
        }

        //Use random 8 digit number as password
        String password = "" + 10000000 + random.nextInt(90000000);

        // Encode the password
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(guestUsername, encodedPassword);
        userRepository.save(user);
        return guestUsername;
    }

    /*
        @param userId - the id of the user to update
        @param newUsername - the new username
        @param newPassword - the new password
        @effects updates existing user object
        @returns none
        @throws IllegalStateException if user doesnt exist or new username is taken
     */
    @Transactional
    public void updateUserService(Long userId, String newUsername, String newPassword) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new IllegalStateException("User with id " + userId + " does not exist"));

        if (newUsername != null && !newUsername.trim().isEmpty()) {
            boolean newUsernameTaken = userRepository.findByUsername(newUsername).isPresent();
            if (newUsernameTaken) {
                throw new IllegalStateException("This username already exists");
            }
            user.setUsername(newUsername);
        }

        if (newPassword != null && !newPassword.trim().isEmpty()) {
            // Encode the new password
            user.setPassword(passwordEncoder.encode(newPassword));
        }

        userRepository.save(user);
    }

    /*
        @param userId - the id of the user to delete
        @effects deletes existing user object
        @returns none
        @throws IllegalStateException if user doesnt exist
     */
    @Transactional
    public void deleteUserService(Long userId) {
        boolean userExists = userRepository.existsById(userId);
        if (!userExists) {
            throw new IllegalStateException("User with id " + userId + " does not exist");
        }
        userRepository.deleteById(userId);
    }
}
