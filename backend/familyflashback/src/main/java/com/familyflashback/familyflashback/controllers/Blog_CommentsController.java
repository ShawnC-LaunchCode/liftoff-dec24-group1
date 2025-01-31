package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Blog_Comments;
import com.familyflashback.familyflashback.models.data.Blog_CommentsRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/comments")
public class Blog_CommentsController {

    public Blog_CommentsController() {
        System.out.println("\n\n=== Blog_CommentsController initialized ===\n\n");
    }

    @Autowired
    Blog_CommentsRepository blog_commentsRepository;

    @GetMapping
    public ResponseEntity<List<Blog_Comments>> getAllComments(@CookieValue(name = "session", required = true) String cookieValue) {
        if (cookieValue != null) {
            System.out.println("Cookie value: " + cookieValue);
            // Pass the cookieValue (session ID) to findUserById
            String userId = findUserById(cookieValue);
            System.out.println("User ID: " + userId);
        } else {
            System.out.println("no cookie found");
        }
        return ResponseEntity.ok(new ArrayList<>());
    }

    @PostMapping
    public ResponseEntity<Blog_Comments> addComment (@Valid @RequestBody Blog_Comments blog_comment){

        Blog_Comments comment = blog_commentsRepository.save(blog_comment);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test (){
        System.out.println("\n\n=== TEST endpoint accessed ===\n\n");
        return ResponseEntity.ok("Test endpoint success");
    }

    @GetMapping("/print")
    public ResponseEntity<String> testPrint() {
        System.out.println("\n\n=== PRINT TEST ===\n\n");
        return ResponseEntity.ok("Check your console!");
    }
}
