package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("")
    public ResponseEntity<User> validateUser(@Valid @RequestBody User user) {

        List<User> users = (List<User>) userRepository.findAll();
        User foundUser;

        for (User u : users) {
            if(u.getEmail().equals(user.getEmail())) {
                if(u.getPassword().equals(user.getPassword())) {
                    return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
                }
                break;
            }
        }

        return ResponseEntity.notFound().build();
    }
}
