package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
public class AuthController {

    @Autowired
    UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        String userId = (String) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    protected static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    @GetMapping
    public ResponseEntity<String> viewSessions(HttpServletRequest request) {
        String userID = (String) request.getSession().getAttribute("user");
        return ResponseEntity.ok(userID);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> validateUser(@Valid @RequestBody User user, HttpServletRequest request) {

        List<User> users = (List<User>) userRepository.findAll();
        User foundUser;

        Map<String, String> createdResponse = new HashMap<>();

        for (User u : users) {
            if(u.getEmail().equals(user.getEmail())) {
                if(u.isMatchingPassword(user.getPassword())) {
                    setUserInSession(request.getSession(), u);
                    createdResponse.put("user", u.getId());

                    return new ResponseEntity<>(createdResponse, HttpStatus.ACCEPTED);
                }
                break;
            }
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint hit");
    }
}
