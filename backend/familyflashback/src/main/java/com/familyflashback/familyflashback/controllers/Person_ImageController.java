package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Person_Image;
import com.familyflashback.familyflashback.models.data.Person_ImageRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("person-images")
public class Person_ImageController {

    @Autowired
    private Person_ImageRepository person_imageRepository;

    @PostMapping("/add")
    public ResponseEntity<Person_Image> addImage(@Valid @RequestBody Person_Image person_image) {
        Person_Image addedImage = person_imageRepository.save(person_image);
        return new ResponseEntity<>(addedImage, HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint hit");
    }
}
