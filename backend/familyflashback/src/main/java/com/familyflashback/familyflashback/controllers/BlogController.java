package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Blog;
import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.BlogRepository;
import com.familyflashback.familyflashback.models.data.SessionRepository;
import com.familyflashback.familyflashback.models.data.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("blog")
public class BlogController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    BlogRepository blogRepository;
    @Autowired
    private SessionController sessionController;


    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkBlogExists(@CookieValue(name = "session", required = true) String cookieValue) {
        boolean blogExists = false;

        try {
            if (cookieValue != null) {
                System.out.println("Cookie value: " + cookieValue);

                Optional<User> user = sessionRepository.findUserById(cookieValue);
                if (user.isPresent()) {
                    String userId = user.get().getId();
                    System.out.println("User ID: " + userId);
                    blogExists = blogRepository.existsByUserId(userId);
                    System.out.println("Blog exists: " + blogExists);
                } else {
                    System.out.println("User not found for session ID: " + cookieValue);
                }
            } else {
                System.out.println("No cookie found");
            }

            return ResponseEntity.ok(blogExists);
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        Iterable<Blog> blogsIterable = blogRepository.findAll();
        List<Blog> blogs = StreamSupport.stream(blogsIterable.spliterator(), false)
                .collect(Collectors.toList());

        if (blogs.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(blogs);
        }
    }

    @GetMapping
    public ResponseEntity<Blog> getBlogByUserId(@CookieValue(name = "session", required = true) String cookieValue, HttpServletRequest request) {
        if (cookieValue != null) {
           // System.out.println("Cookie value: " + cookieValue);

            Optional<User> user = sessionRepository.findUserById(cookieValue);
            if (user.isPresent()) {
                String userId = (String) request.getAttribute("userId");
               // System.out.println(request.getAttribute("userId"));
                Optional<Blog> blogOptional = blogRepository.findByUserId(userId);
                if (blogOptional.isPresent()) {
                    return ResponseEntity.ok(blogOptional.get());
                } else {
                    System.out.println("No blog found for user ID: " + userId);
                    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
                }
            } else {
                System.out.println("User not found for session ID: " + cookieValue);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            System.out.println("No cookie found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/session")
    public ResponseEntity<User> getUserFromSession(@CookieValue(name = "session", required = true) String cookieValue, HttpServletRequest request) {
        if (sessionController.isSessionActive(cookieValue)) {
            String userId = (String) request.getAttribute("userId");
//            System.out.println("User ID: " + userId);
            Optional<User> user = sessionRepository.findUserById(cookieValue);
            return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }

        return ResponseEntity.notFound().build();
    }


    @PostMapping
    public ResponseEntity<Blog> createBlog(@Valid @RequestBody Blog blog, @CookieValue(name = "session", required = true) String cookieValue, HttpServletRequest request) {
        Optional<User> user = sessionRepository.findUserById(cookieValue);
        if (user.isPresent()) {
            String userId = (String) request.getAttribute("userId");
            // Check if a blog already exists for this user
        System.out.println("Received blog: " + blog);
       // System.out.println("User ID: " + userId);
            if (blogRepository.existsByUserId(userId)) {
                System.out.println("A blog already exists for this user");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            blog.setUserId(userId);
            Blog createdBlog = blogRepository.save(blog);
            return new ResponseEntity<>(createdBlog, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteBlogByUserId(@PathVariable String userId) {
        Optional<Blog> blogOptional = blogRepository.findByUserId(userId);
        if (blogOptional.isPresent()) {
            blogRepository.delete(blogOptional.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

@GetMapping("/{id}")
public ResponseEntity<Blog> getBlogById(@PathVariable("id") String id) {
    System.out.println("Fetching blog with id: " + id);
        Optional<Blog> blog = blogRepository.findById(id);
    if (blog.isPresent()) {
        System.out.println("Found blog: " + blog.get());
        return ResponseEntity.ok(blog.get());
    } else {
        System.out.println("Blog not found");
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
