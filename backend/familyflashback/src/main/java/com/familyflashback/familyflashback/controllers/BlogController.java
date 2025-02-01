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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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


    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkBlogExists(@CookieValue(name = "session", required = true) String cookieValue) {
        boolean blogExists = false;

        if (cookieValue != null) {
            System.out.println("Cookie value: " + cookieValue);

            Optional<User> user = sessionRepository.findUserById(cookieValue);
            if (user.isPresent()) {
                String userId = user.get().getId();
                blogExists = blogRepository.existsByUserId(userId);
            } else {
                System.out.println("User not found for session ID: " + cookieValue);
            }
        } else {
            System.out.println("No cookie found");
        }

        return ResponseEntity.ok(blogExists);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getBlogsByUserId(@PathVariable String userId, @CookieValue(name = "session", required = true) String cookieValue) {

        Map<String, Object> response = new HashMap<>();

        if (cookieValue != null) {
            System.out.println("Cookie value: " + cookieValue);

            Optional<User> user = sessionRepository.findUserById(cookieValue);
            if (user.isPresent()) {
                // Adding blogs to the response
                List<Blog> blogs = blogRepository.findAllByUserId(userId);
                response.put("blogs", blogs);
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
    public ResponseEntity<Blog> createBlog(@Valid @RequestBody Blog blog, @CookieValue(name = "session", required = true) String cookieValue) {
        Optional<User> user = sessionRepository.findUserById(cookieValue);
        if (user.isPresent()) {
            blog.setUserId(user.get().getId());
            Blog createdBlog = blogRepository.save(blog);
            return new ResponseEntity<>(createdBlog, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog (@PathVariable String id){
        Optional<Blog> blog = blogRepository.findById(id);
        if(blog.isPresent()){
            blogRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteBlogsByUserId(@PathVariable String userId) {
        List<Blog> blogs = blogRepository.findAllByUserId(userId);
        if (!blogs.isEmpty()) {
            blogRepository.deleteAll(blogs);
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
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint(){
        return ResponseEntity.ok("test endpoint success");
    }
}
