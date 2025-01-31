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
@RequestMapping("comments")
public class Blog_CommentsController {

    @Autowired
    Blog_CommentsRepository blog_commentsRepository;

    @GetMapping("")
    public ResponseEntity<List<Blog_Comments>> getAllComments () {
        System.out.println("=== START: GET /comments endpoint accessed ===");
        
        try {
            System.out.println("=== PROCESSING: About to return response ===");
            return ResponseEntity.ok(new ArrayList<>());
        } catch (Exception e) {
            System.out.println("=== ERROR: " + e.getMessage() + " ===");
            return ResponseEntity.internalServerError().build();
        } finally {
            System.out.println("=== END: GET /comments endpoint completed ===");
        }
    }

    @PostMapping
    public ResponseEntity<Blog_Comments> addComment (@Valid @RequestBody Blog_Comments blog_comment){

        Blog_Comments comment = blog_commentsRepository.save(blog_comment);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test (){
        return ResponseEntity.ok("Test endpoint success");
    }
}
