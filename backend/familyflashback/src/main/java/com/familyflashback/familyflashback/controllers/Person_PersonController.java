package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Image;
import com.familyflashback.familyflashback.models.Person_Person;
import com.familyflashback.familyflashback.models.data.Person_PersonRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("relation")
public class Person_PersonController {

    @Autowired
    private Person_PersonRepository person_personRepository;

    @PostMapping
    public ResponseEntity<Person_Person> addRelation(@Valid @RequestBody Person_Person person_person) {
        Person_Person addedRelation = person_personRepository.save(person_person);
        return new ResponseEntity<>(addedRelation, HttpStatus.CREATED);
    }

    @PutMapping("/{rootPersonId}/{relatedPersonId}")
    public ResponseEntity<Person_Person> updateRelation(@PathVariable("rootPersonId") String rootId, @PathVariable("relatedPersonId") String relatedId, @Valid @RequestBody Person_Person updatedRelation){

        Person_Person.CompositeKey compositeKey = new Person_Person.CompositeKey(rootId, relatedId);

        Optional<Person_Person> relation = person_personRepository.findById(compositeKey);
        if (relation.isPresent()) {
            Person_Person existingRelation = relation.get();
            existingRelation.setRelationship(updatedRelation.getRelationship());

            Person_Person savedUpdatedRelation = person_personRepository.save(existingRelation);
            return new ResponseEntity<>(savedUpdatedRelation, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{rootPersonId}/{relatedPersonId}")
    public ResponseEntity<String> getRelation(@PathVariable("rootPersonId") String rootId, @PathVariable("relatedPersonId") String relatedId) {
        Person_Person.CompositeKey compositeKey = new Person_Person.CompositeKey(rootId, relatedId);
        Optional<Person_Person> relation = person_personRepository.findById(compositeKey);

        if (relation.isPresent()) {
            String relationship = relation.get().getRelationship();
            return new ResponseEntity<>(relationship, HttpStatus.OK);
        } else {
            System.out.println("Resource " + compositeKey + " does not exist.");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint hit!!");
    }

}
