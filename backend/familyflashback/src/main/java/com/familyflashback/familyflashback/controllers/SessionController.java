package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Session;
import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.SessionRepository;
import com.familyflashback.familyflashback.models.data.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Map<String, String>> validateUser(@Valid @RequestBody User user) {

        List<User> users = (List<User>) userRepository.findAll();
        User foundUser;

        Map<String, String> createdResponse = new HashMap<>();

        for (User u : users) {
            if(u.getEmail().equals(user.getEmail())) {
                if(u.isMatchingPassword(user.getPassword())) {
                    String createdSession = setUserInSession(u);
                    createdResponse.put("session", createdSession);

                    return new ResponseEntity<>(createdResponse, HttpStatus.ACCEPTED);
                }
                break;
            }
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserFromSession(@CookieValue(name = "session", required = true) String cookieValue) {
        if (isSessionActive(cookieValue)) {
            Optional<User> user = sessionRepository.findUserById(cookieValue);
            return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/logout/{id}")
    public ResponseEntity<String> removeUserFromSession(@PathVariable("id") String sessionId) {
        sessionRepository.deleteById(sessionId);

        return ResponseEntity.ok("User Logged Out");
    }

    @GetMapping("/sessions")
    public ResponseEntity<String> viewSessions() {
        return ResponseEntity.ok("Test endpoint hit");
    }
}
