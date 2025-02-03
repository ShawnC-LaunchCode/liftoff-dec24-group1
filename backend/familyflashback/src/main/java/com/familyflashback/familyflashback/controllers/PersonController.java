package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Person;
import com.familyflashback.familyflashback.models.data.PersonRepository;
import com.familyflashback.familyflashback.models.data.Person_PersonRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("persons")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private Person_PersonRepository person_personRepository;

    // Authenticated endpoint to create a new person
    @PostMapping
    public ResponseEntity<Person> createPerson(@Valid @RequestBody Person person, HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Unauthorized access
        }

        // Assign the userId to the person if not already set
//        person.setUserId(userId);

        Person createdPerson = personRepository.save(person);
        return new ResponseEntity<>(createdPerson, HttpStatus.CREATED);
    }

    // Authenticated endpoint to update a person's details
    @PatchMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable("id") String Id, @Valid @RequestBody Person updatedPerson, HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Unauthorized access
        }

        Optional<Person> person = personRepository.findById(Id);
        if (person.isPresent()) {
            Person existingPerson = person.get();

            // Ensure the person belongs to the current authenticated user
            if (!existingPerson.getUser().getId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Forbidden access
            }

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

    // Authenticated endpoint to delete a person
    @DeleteMapping("/{id}")
    public ResponseEntity<Person> deletePerson(@PathVariable("id") String Id, HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Unauthorized access
        }

        Optional<Person> person = personRepository.findById(Id);
        if (person.isPresent()) {
            Person existingPerson = person.get();

            // Ensure the person belongs to the current authenticated user
            if (!existingPerson.getUser().getId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Forbidden access
            }

            personRepository.deleteById(Id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Authenticated endpoint to get all persons of the authenticated user
    @GetMapping()
    public ResponseEntity<List<Person>> getAllPersons(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Unauthorized access
        }

        List<Person> persons = personRepository.findAllByUserId(userId);
        if (!persons.isEmpty()) {
            return ResponseEntity.ok(persons);
        }
        return ResponseEntity.notFound().build();
    }

    // Authenticated endpoint to get a person by ID
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPerson(@PathVariable("id") String Id, HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Unauthorized access
        }

        Optional<Person> person = personRepository.findById(Id);
        if (person.isPresent()) {
            Person requestedPerson = person.get();

            // Ensure the person belongs to the current authenticated user
            if (!requestedPerson.getUser().getId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Forbidden access
            }

            return ResponseEntity.ok(requestedPerson);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint hit!!");
    }
}