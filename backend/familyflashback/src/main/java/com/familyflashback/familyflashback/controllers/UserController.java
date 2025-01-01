 package com.familyflashback.familyflashback.controllers;


 import com.familyflashback.familyflashback.models.User;
 import com.familyflashback.familyflashback.models.data.UserRepository;
 import jakarta.validation.Valid;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

 import java.util.Optional;

 @RestController
 @RequestMapping("user")
 public class UserController {

      @Autowired
      UserRepository userRepository;

      @PostMapping
      public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
            System.out.println("Creating User");
            User createdUser = userRepository.save(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
      }

      @GetMapping("/{id}")
      public ResponseEntity<User> getUser(@PathVariable("id") String Id) {
          Optional<User> user = userRepository.findById(Id);
          return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
      }

     @GetMapping("/test")
     public ResponseEntity<String> testEndpoint() {
         return ResponseEntity.ok("Test endpoint hit");
     }

}
