package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Image;
import com.familyflashback.familyflashback.models.Person_Image;
import com.familyflashback.familyflashback.models.data.ImageRepository;
import com.familyflashback.familyflashback.models.data.Person_ImageRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("person-images")
public class Person_ImageController {

    @Autowired
    private Person_ImageRepository person_imageRepository;

    @Autowired
    private ImageRepository imageRepository;

    @PostMapping
    public ResponseEntity<Person_Image> addImage(@Valid @RequestBody Person_Image person_image) {
        Person_Image.CompositeKey compositeKey = new Person_Image.CompositeKey(person_image.getRootPerson(), person_image.getRelatedImage());
        Optional<Person_Image> image = person_imageRepository.findById(compositeKey);

        if (image.isEmpty()) {
            Person_Image addedImage = person_imageRepository.save(person_image);
            return new ResponseEntity<>(addedImage, HttpStatus.CREATED);
        }else {
            System.out.println(person_image.getRootPerson() + " is trying to add a image that already exists at " + person_image.getRelatedImage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{rootPersonId}/{relatedImageId}")
    public ResponseEntity<Person_Image> deleteImage(@PathVariable("rootPersonId") String rootId, @PathVariable("relatedImageId") String relatedId) {
        Person_Image.CompositeKey compositeKey = new Person_Image.CompositeKey(rootId, relatedId);
        Optional<Person_Image> image = person_imageRepository.findById(compositeKey);

        if (image.isPresent()) {
            person_imageRepository.deleteById(compositeKey);
            return ResponseEntity.noContent().build();
        } else {
            System.out.println("Image " + compositeKey + " does not exist.");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{rootPersonId}/{relatedImageId}")
    public ResponseEntity<Image> getImage(@PathVariable("rootPersonId") String rootId, @PathVariable("relatedImageId") String relatedId) {
        Person_Image.CompositeKey compositeKey = new Person_Image.CompositeKey(rootId, relatedId);
        Optional<Person_Image> personImage = person_imageRepository.findById(compositeKey);

        if (personImage.isPresent()) {
            Optional<Image> foundImage = imageRepository.findById(relatedId);
            Image image = foundImage.get();
            return new ResponseEntity<>(image, HttpStatus.OK);
        } else {
            System.out.println("Image " + compositeKey + " does not exist.");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint hit");
    }
}
