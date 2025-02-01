package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Blog_Comments;
import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.Blog_CommentsRepository;
import com.familyflashback.familyflashback.models.data.SessionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;


@RestController
@RequestMapping("/comments")
public class Blog_CommentsController {

    @Autowired
    Blog_CommentsRepository blog_commentsRepository;
    @Autowired
    SessionRepository sessionRepository;

    // Get all comments
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllComments(@CookieValue(name = "session", required = true) String cookieValue) {
        Map<String, Object> response = new HashMap<>();
        if (cookieValue != null) {
            System.out.println("Cookie value: " + cookieValue);
            Optional<User> user = sessionRepository.findUserById(cookieValue);
            if (user.isPresent()) {
                String userId = user.get().getId();
                // Adding comments to the response (you can replace with actual comments)
                List<Blog_Comments> comments = blog_commentsRepository.findAllByUserId(userId);
                response.put("comments", comments);
            } else {
                System.out.println("User not found for session ID: " + cookieValue);
                response.put("error", "User not found");
            }
        } else {
            System.out.println("No cookie found");
            response.put("error", "No cookie found");
        }
        return ResponseEntity.ok(response);
    }

    // Get by userId
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getCommentsByUserId(@PathVariable String userId, @CookieValue(name = "session", required = true) String cookieValue) {
        Map<String, Object> response = new HashMap<>();
        if (cookieValue != null) {
            System.out.println("Cookie value: " + cookieValue);
            Optional<User> user = sessionRepository.findUserById(cookieValue);
            if (user.isPresent()) {
                List<Blog_Comments> comments = blog_commentsRepository.findAllByUserId(userId);
                response.put("comments", comments);
            } else {
                System.out.println("User not found for session ID: " + cookieValue);
                response.put("error", "User not found");
            }
        } else {
            System.out.println("No cookie found");
            response.put("error", "No cookie found");
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Blog_Comments> addComment (@Valid @RequestBody Blog_Comments blog_comment){
        Blog_Comments comment = blog_commentsRepository.save(blog_comment);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Blog_Comments> updateComments(@Valid @RequestBody Blog_Comments updatedComments, @PathVariable("id") String id) {
        Optional<Blog_Comments> comments = blog_commentsRepository.findById(id);
        if (comments.isPresent()) {
            Blog_Comments existingComments = comments.get();
            if (updatedComments.getBody() != null) {
                existingComments.setBody(updatedComments.getBody());
            }
            Blog_Comments savedUpdatedComments = blog_commentsRepository.save(existingComments);
            return new ResponseEntity<>(savedUpdatedComments, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComments(@PathVariable("id") String id) {
        Optional<Blog_Comments> comments = blog_commentsRepository.findById(id);

        if (comments.isPresent()) {
            blog_commentsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/test")
    public ResponseEntity<String> test (){
        System.out.println("\n\n=== TEST endpoint accessed ===\n\n");
        return ResponseEntity.ok("Test endpoint success");
    }
}
