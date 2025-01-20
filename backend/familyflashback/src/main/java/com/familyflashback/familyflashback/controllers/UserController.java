 package com.familyflashback.familyflashback.controllers;

 import com.familyflashback.familyflashback.models.Person;
 import com.familyflashback.familyflashback.models.User;
 import com.familyflashback.familyflashback.models.data.PersonRepository;
 import com.familyflashback.familyflashback.models.data.UserRepository;
 import jakarta.servlet.http.HttpServletRequest;
 import jakarta.validation.Valid;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

 import java.util.HashMap;
 import java.util.Map;
 import java.util.Optional;

 import static com.familyflashback.familyflashback.controllers.AuthController.setUserInSession;

 @RestController
 @RequestMapping("user")
 public class UserController {

      @Autowired
      UserRepository userRepository;

      @Autowired
      PersonRepository personRepository;

      @PostMapping
      public ResponseEntity<Map<String, Object>> createUser(@Valid @RequestBody User user, HttpServletRequest request) {
            user.hashPass();
            User createdUser = userRepository.save(user);
            Person personCopy = new Person();
            personCopy.setName(user.getName());
            personCopy.setUser(user);
            Person createdPerson = personRepository.save(personCopy);
            System.out.println("Person Id for user " + createdUser.getId() + " is " + createdPerson.getId());

            createdUser.setPersonID(createdPerson.getId());
            userRepository.save(createdUser);
            setUserInSession(request.getSession(), createdUser);

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
      public ResponseEntity<Map<String, Object>> updateUser(@PathVariable("id") String Id, @Valid @RequestBody User updatedUser) {
          Optional<User> user = userRepository.findById(Id);

          if (user.isPresent()) {
              User existingUser = user.get();
              existingUser.setName(updatedUser.getName());
              existingUser.setPassword(updatedUser.getPassword());
              existingUser.setEmail(existingUser.getEmail());
              User savedUpdatedUser = userRepository.save(existingUser);

              Optional<Person> person = personRepository.findByUsersPersonId(existingUser.getPersonID());
              Person existingPerson = person.get();
              existingPerson.setName(updatedUser.getName());
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

     @GetMapping("/test")
     public ResponseEntity<String> testEndpoint() {
         return ResponseEntity.ok("Test endpoint hit");
     }

}
