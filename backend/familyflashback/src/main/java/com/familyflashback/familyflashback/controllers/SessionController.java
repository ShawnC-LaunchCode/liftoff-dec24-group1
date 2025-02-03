package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Session;
import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.SessionRepository;
import com.familyflashback.familyflashback.models.data.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("auth")
public class SessionController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    SessionRepository sessionRepository;

    public String setUserInSession(User user) {
        Session addedSession = new Session(user);
        sessionRepository.save(addedSession);

        return addedSession.getId();
    }

    public boolean isSessionActive(String sessionId) {
        Optional<Session> session = sessionRepository.findById(sessionId);
        return session.isPresent();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> validateUser(@Valid @RequestBody User user, HttpServletResponse response, @CookieValue(name = "session", required = false) String cookieValue) {

        Map<String, String> createdResponse = new HashMap<>();

        if(cookieValue != null) {
            if (sessionRepository.findById(cookieValue).isPresent()) {
                createdResponse.put("error", "session already exists");
                return new ResponseEntity<>(createdResponse, HttpStatus.BAD_REQUEST);
            }
        }

        List<User> users = (List<User>) userRepository.findAll();

        for (User u : users) {
            if(u.getEmail().equals(user.getEmail())) {
                if(u.isMatchingPassword(user.getPassword())) {
                    u.setLastLogin(LocalDateTime.now());
                    String createdSession = setUserInSession(u);
                    Cookie newCookie = new Cookie("session", createdSession);
                    newCookie.setPath("/");
                    response.addCookie(newCookie);

                    return new ResponseEntity<>(createdResponse, HttpStatus.ACCEPTED);
                }
                createdResponse.put("error", "passwords do not match");
                return new ResponseEntity<>(createdResponse, HttpStatus.BAD_REQUEST);
            }
        }

        createdResponse.put("error", "incorrect email");
        return new ResponseEntity<>(createdResponse, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserFromSession(@CookieValue(name = "session", required = true) String cookieValue, HttpServletRequest request) {
        if (isSessionActive(cookieValue)) {
            System.out.println(request.getAttribute("userId"));
            Optional<User> user = sessionRepository.findUserById(cookieValue);
            return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> removeUserFromSession(@CookieValue(name = "session", required = true) String cookieValue) {
        sessionRepository.deleteById(cookieValue);

        return ResponseEntity.ok("User Logged Out");
    }

    @GetMapping("/sessions")
    public ResponseEntity<String> viewSessions() {
        return ResponseEntity.ok("Test endpoint hit");
    }
}