package com.familyflashback.familyflashback_backend.controllers;


import com.familyflashback.familyflashback_backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    UserRepository userRepository;


}
