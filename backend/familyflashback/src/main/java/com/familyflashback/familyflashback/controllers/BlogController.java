package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Blog;
import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.BlogRepository;
import com.familyflashback.familyflashback.models.data.SessionRepository;
import com.familyflashback.familyflashback.models.data.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("blog")
public class BlogController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    SessionRepository sessionRepository;

    @Autowired
    BlogRepository blogRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlog (@PathVariable("id") String id){
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isPresent()){
            Blog requestedBlog = blog.get();
            return new ResponseEntity<>(requestedBlog, HttpStatus.OK);
        } else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Blog> createBlog(@Valid @RequestBody Blog blog, @CookieValue(name = "session", required = true) String cookieValue) {

        Optional<User> user = sessionRepository.findUserById(cookieValue);

        if (user.isPresent()) {
            blog.setUserId(user.get().getId()); // Set the current user's ID
            Blog createdBlog = blogRepository.save(blog);
            return new ResponseEntity<>(createdBlog, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Handle case where user is not found
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Blog> deleteBlog (@PathVariable String id){
        Optional<Blog> blog = blogRepository.findById(id);
        if(blog.isPresent()){
            blogRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Blog> updateBlog (@Valid @RequestBody Blog updatedBlog, @PathVariable("id") String id){

        Optional<Blog> blog = blogRepository.findById(id);

        if(blog.isPresent()){
            Blog existingBlog = blog.get();

            if (updatedBlog.getHeader() != null){
                existingBlog.setHeader(updatedBlog.getHeader());
            }
            if (updatedBlog.getBody() != null){
                existingBlog.setBody(updatedBlog.getBody());
            }
            if(updatedBlog.getImgUrl() != null){
                existingBlog.setImgUrl(updatedBlog.getImgUrl());
            }
            Blog savedUpdatedBlog = blogRepository.save(existingBlog);

            return new ResponseEntity<>(savedUpdatedBlog, HttpStatus.OK);

        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint(){
        return ResponseEntity.ok("test endpoint success");
    }
}
