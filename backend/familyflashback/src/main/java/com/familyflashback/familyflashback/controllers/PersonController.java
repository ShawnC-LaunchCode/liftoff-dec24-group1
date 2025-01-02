 package com.familyflashback.familyflashback.controllers;

 import com.familyflashback.familyflashback.models.Person;
 import com.familyflashback.familyflashback.models.data.PersonRepository;
 import jakarta.validation.Valid;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

 import java.util.Optional;

 @RestController
 @RequestMapping("persons")
 public class PersonController {

     @Autowired
     private PersonRepository personRepository;

     @PostMapping("/create")
     public ResponseEntity<Person> createPerson(@Valid @RequestBody Person person) {
         Person createdPerson = personRepository.save(person);
         return new ResponseEntity<>(createdPerson, HttpStatus.CREATED);
     }

     @PutMapping("/{id}")
     public ResponseEntity<Person> updatePerson(@PathVariable("id") String Id, @Valid @RequestBody Person updatedPerson) {
         Optional<Person> person = personRepository.findById(Id);
         if (person.isPresent()) {
             Person existingPerson = person.get();
             existingPerson.setName(updatedPerson.getName());
             existingPerson.setBio(updatedPerson.getBio());
             existingPerson.setBirthTown(updatedPerson.getBirthTown());
             existingPerson.setBirthDate(updatedPerson.getBirthDate());
             existingPerson.setDeathDate(updatedPerson.getDeathDate());

             Person savedUpdatedPerson = personRepository.save(existingPerson);
             return new ResponseEntity<>(savedUpdatedPerson, HttpStatus.OK);
         } else {
             return ResponseEntity.notFound().build();
         }
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Person> deletePerson(@PathVariable("id") String Id) {
         Optional<Person> person = personRepository.findById(Id);
         if (person.isPresent()) {
             personRepository.deleteById(Id);
             return ResponseEntity.noContent().build();
         } else {
             return ResponseEntity.notFound().build();
         }
     }

     @GetMapping("/{id}")
     public ResponseEntity<Person> getPerson(@PathVariable("id") String Id) {
         Optional<Person> person = personRepository.findById(Id);
         return person.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
     }

     @GetMapping("/test")
     public ResponseEntity<String> testEndpoint() {
         return ResponseEntity.ok("Test endpoint hit!!");
     }


 }