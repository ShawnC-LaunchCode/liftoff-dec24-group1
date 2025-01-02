 package com.familyflashback.familyflashback.controllers;

 import com.familyflashback.familyflashback.models.Person;
 import com.familyflashback.familyflashback.models.User;
 import com.familyflashback.familyflashback.models.data.PersonRepository;
 import com.familyflashback.familyflashback.models.data.UserRepository;
 import jakarta.validation.Valid;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

 import java.util.HashMap;
 import java.util.Map;
 import java.util.Optional;

 @RestController
 @RequestMapping("user")
 public class UserController {

      @Autowired
      UserRepository userRepository;

      @Autowired
     PersonRepository personRepository;

      @PostMapping
      public ResponseEntity<Map<String, Object>> createUser(@Valid @RequestBody User user) {
            User createdUser = userRepository.save(user);
            Person personCopy = new Person();
            personCopy.setName(user.getName());
            personCopy.setUser(user);
            Person createdPerson = personRepository.save(personCopy);

          Map<String, Object> createdResponse = new HashMap<>();
          createdResponse.put("createdUser", createdUser);
          createdResponse.put("createdPerson", createdPerson);

            return new ResponseEntity<>(createdResponse, HttpStatus.CREATED);
      }

      @GetMapping("/{id}")
      public ResponseEntity<User> getUser(@PathVariable("id") String Id) {
          Optional<User> user = userRepository.findById(Id);
          return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
      }

      @PutMapping("/{id}")
      public ResponseEntity<User> updateUser(@PathVariable("id") String Id, @Valid @RequestBody User updatedUser) {
          Optional<User> user = userRepository.findById(Id);
          if (user.isPresent()) {
              User existingUser = user.get();
              existingUser.setName(updatedUser.getName());
              existingUser.setPassword(updatedUser.getPassword());
              existingUser.setEmail(existingUser.getEmail());

              User savedUpdatedUser = userRepository.save(existingUser);
              return new ResponseEntity<>(savedUpdatedUser, HttpStatus.OK);
          } else {
              return ResponseEntity.notFound().build();
          }
      }

     @GetMapping("/test")
     public ResponseEntity<String> testEndpoint() {
         return ResponseEntity.ok("Test endpoint hit");
     }

}
