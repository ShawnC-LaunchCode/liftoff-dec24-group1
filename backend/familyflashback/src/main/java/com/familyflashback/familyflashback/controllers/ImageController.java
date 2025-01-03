 package com.familyflashback.familyflashback.controllers;

 import com.familyflashback.familyflashback.models.Image;
 import com.familyflashback.familyflashback.models.data.ImageRepository;
 import jakarta.validation.Valid;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;

 import org.springframework.web.bind.annotation.*;

 import java.util.Optional;

 @RestController
 @RequestMapping("images")
 public class ImageController {

     @Autowired
     private ImageRepository imageRepository;

     @PostMapping
     public ResponseEntity<Image> addImage(@Valid @RequestBody Image image) {
         Image addedImage = imageRepository.save(image);
         return new ResponseEntity<>(addedImage, HttpStatus.CREATED);
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Image> deleteImage(@PathVariable("id") String Id) {
         Optional<Image> image = imageRepository.findById(Id);
         if (image.isPresent()) {
             imageRepository.deleteById(Id);
             return ResponseEntity.noContent().build();
         } else {
             return ResponseEntity.notFound().build();
         }
     }

     @GetMapping("/{id}")
     public ResponseEntity<Image> getImage(@PathVariable("id") String Id) {
         Optional<Image> image = imageRepository.findById(Id);
         return image.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
     }

     @GetMapping("/test")
     public ResponseEntity<String> testEndpoint() {
         return ResponseEntity.ok("Test endpoint hit!!");
     }



 }


