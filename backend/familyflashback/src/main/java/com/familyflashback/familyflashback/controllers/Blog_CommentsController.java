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
//        List<Blog_Comments> comments = blog_commentsRepository.findAllByUserId(id);
//        if (!comments.isEmpty()) {
//            return ResponseEntity.ok(comments);
//        }
//        return ResponseEntity.notFound().build();
        System.out.println("ENDPOINT ACCESSED");
//        if (cookieValue != null) {
//            System.out.println("Cookie value: " + cookieValue);
//        } else {
//            System.out.println("no cookie found");
//        }
        return ResponseEntity.ok(new ArrayList<>());
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
