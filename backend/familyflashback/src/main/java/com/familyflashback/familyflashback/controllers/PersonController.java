package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.dto.PersonWithRelationDTO;
import com.familyflashback.familyflashback.models.Person;
import com.familyflashback.familyflashback.models.Person_Person;
import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.PersonRepository;
import com.familyflashback.familyflashback.models.data.Person_PersonRepository;
import com.familyflashback.familyflashback.models.data.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @PostMapping("")
    public ResponseEntity<?> createPersonWithRelation(@Valid @RequestBody PersonWithRelationDTO dto, HttpServletRequest request) {
        try {
            // Create the person
            Person newPerson = new Person();
            newPerson.setName(dto.getName());
            newPerson.setBirthDate(dto.getBirthDate());
            newPerson.setDeathDate(dto.getDeathDate());
            newPerson.setBirthTown(dto.getBirthTown());
            newPerson.setBio(dto.getBio());
            
            // Get userId from request and set the user
            String userId = (String) request.getAttribute("userId");
            System.out.println("USER ID FROM SESSION IS " + userId);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            newPerson.setUser(user);
            
            // Save the person first
            Person savedPerson = personRepository.save(newPerson);
            
            // Create the relationship if rootPersonId is provided
            if (dto.getRootPersonId() != null && !dto.getRootPersonId().isEmpty()) {
                Person_Person relationship = new Person_Person();
                relationship.setRootPerson(dto.getRootPersonId());
                relationship.setRelatedPerson(savedPerson.getId());
                relationship.setRelationship(dto.getRelationship());
                
                person_personRepository.save(relationship);
            }
            
            return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating person: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable("id") String Id, @Valid @RequestBody Person updatedPerson) {
        Optional<Person> person = personRepository.findById(Id);
        if (person.isPresent()) {
            Person existingPerson = person.get();

            if (updatedPerson.getName() != null) {
                existingPerson.setName(updatedPerson.getName());
            }
            if (updatedPerson.getBio() != null) {
                existingPerson.setBio(updatedPerson.getBio());
            }
            if (updatedPerson.getBirthTown() != null) {
                existingPerson.setBirthTown(updatedPerson.getBirthTown());
            }
            if (updatedPerson.getBirthDate() != null) {
                existingPerson.setBirthDate(updatedPerson.getBirthDate());
            }
            if (updatedPerson.getDeathDate() != null) {
                existingPerson.setDeathDate(updatedPerson.getDeathDate());
            }

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

    @GetMapping("/user")
    public ResponseEntity<List<Person>> getAllPersonsForUser(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        List<Person> persons = personRepository.findAllByUserId(userId);
        if (!persons.isEmpty()) {
            return ResponseEntity.ok(persons);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPerson(@PathVariable("id") String Id) {
        Optional<Person> person = personRepository.findById(Id);
        if (person.isPresent()) {
        Person requestedPerson = person.get();
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