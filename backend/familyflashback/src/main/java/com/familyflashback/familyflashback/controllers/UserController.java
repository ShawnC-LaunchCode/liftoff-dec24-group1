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

      @Autowired
      SessionController sessionController;

      @PostMapping("/create")
      public ResponseEntity<Map<String, Object>> createUser(@Valid @RequestBody User user, @CookieValue(name = "session", required = false) String cookieValue) {

          Map<String, Object> createdResponse = new HashMap<>();

          if(cookieValue != null) {
              if (sessionController.sessionRepository.findById(cookieValue).isPresent()) {
                  createdResponse.put("error", "session already exists");
                  return new ResponseEntity<>(createdResponse, HttpStatus.BAD_REQUEST);
              }
          }

          if(userRepository.findByEmail(user.getEmail()).isPresent()) {
              createdResponse.put("error", "email already in use");
              return new ResponseEntity<>(createdResponse, HttpStatus.BAD_REQUEST);
          }

            user.hashPass();
            User createdUser = userRepository.save(user);
            Person personCopy = new Person();
            personCopy.setName(user.getName());
            personCopy.setUser(user);
            Person createdPerson = personRepository.save(personCopy);
            System.out.println("Person Id for user " + createdUser.getId() + " is " + createdPerson.getId());

            createdUser.setPersonID(createdPerson.getId());
            userRepository.save(createdUser);
            String sessionId = sessionController.setUserInSession(createdUser);

            createdResponse.put("createdUser", createdUser);
            createdResponse.put("createdPerson", createdPerson);
            createdResponse.put("session", sessionId);

            return new ResponseEntity<>(createdResponse, HttpStatus.CREATED);
      }

      @GetMapping("/{id}")
      public ResponseEntity<User> getUser(@PathVariable("id") String Id) {
          if (sessionController.isSessionActive(Id)) {
              Optional<User> user = userRepository.findById(Id);
              return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
          }

          return ResponseEntity.notFound().build();
      }

      @PatchMapping("/{id}")
      public ResponseEntity<Map<String, Object>> updateUser(@Valid @RequestBody User updatedUser, @CookieValue(name = "session", required = false) String cookieValue) {
          Optional<User> user = userRepository.findById(Id);

          if (user.isPresent()) {
              User existingUser = user.get();
              Optional<Person> person = personRepository.findByUsersPersonId(existingUser.getPersonID());
              Person existingPerson = person.get();

              if (updatedUser.getName() != null) {
                  existingUser.setName(updatedUser.getName());
                  existingPerson.setName(updatedUser.getName());
              }
              if (updatedUser.getPassword() != null) {
                  existingUser.setPassword(updatedUser.getPassword());
              }
              if (updatedUser.getEmail() != null) {
                  existingUser.setEmail(updatedUser.getEmail());
              }

              User savedUpdatedUser = userRepository.save(existingUser);
              Person savedUpdatedPerson = personRepository.save(existingPerson);

              Map<String, Object> updatedResponse = new HashMap<>();
              updatedResponse.put("updatedUser", savedUpdatedUser);
              updatedResponse.put("updatedPerson", savedUpdatedPerson);

              return new ResponseEntity<>(updatedResponse, HttpStatus.OK);
          } else {
              System.out.println("User " + Id + " does not exist.");
              return ResponseEntity.notFound().build();
          }
      }

     @DeleteMapping("/{id}")
     public ResponseEntity<User> deleteUser(@PathVariable("id") String Id) {
         Optional<User> user = userRepository.findById(Id);
         if (user.isPresent()) {
             userRepository.deleteById(Id);
             return ResponseEntity.noContent().build();
         } else {
             System.out.println("User " + Id + " does not exist.");
             return ResponseEntity.notFound().build();
         }
     }

     @GetMapping()
     public ResponseEntity<String> testEndpoint() {
         return ResponseEntity.ok("Test endpoint hit");
     }

}
