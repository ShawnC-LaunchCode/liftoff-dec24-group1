package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.Image;
import com.familyflashback.familyflashback.models.User;
import com.familyflashback.familyflashback.models.data.ImageRepository;
import com.familyflashback.familyflashback.models.data.Person_ImageRepository;
import com.familyflashback.familyflashback.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping("images")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Person_ImageRepository person_imageRepository;

    @Value("${image.upload.dir}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<Map<String, String>> addImage(@RequestParam("file") MultipartFile file, @RequestParam String userId, @RequestParam String personId) {
        Map<String, String> response = new HashMap<>();
        try {
            String filePath = saveImage(file);
            Path path = Path.of(filePath);
            System.out.println("Path is " + path);

            Resource resource = new UrlResource(path.toUri());
            System.out.println("Url resource is " + resource);

            Image image = new Image();
            Optional<User> user = userRepository.findById(userId);
            if(user.isEmpty()){
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            image.setPersonId(personId);
            image.setUrl(filePath);
            image.setUser(user.get());
            imageRepository.save(image);

            response.put("filePath", filePath);
            response.put("message", "Image uploaded successfully");
            response.put("resourceUrl", resource.getURL().toString());
            response.put("resourceUri", resource.getURI().toString());
            response.put("resourceName", resource.getFilename());

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("message", "Error uploading image");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private String saveImage(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toString();
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

    @GetMapping("/")
    public ResponseEntity<String> getImage(@RequestParam String imgId) {
        Optional<Image> image = imageRepository.findById(imgId);

        if(image.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        String path = image.get().getUrl();
        Path filePath = Path.of(path);
        String fileName;
        try {
            Resource resource = new UrlResource(filePath.toUri());
            fileName = resource.getFilename();
            String server = "http://localhost:8080/uploads/";
            String url = server + fileName;
            return ResponseEntity.ok(url);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllImages(@RequestParam String personId) {
        Map<String, Object> response = new HashMap<>();
        List<Image> images = imageRepository.findAllByPersonId(personId);

        if (images.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<String> imageUrls = new ArrayList<>();

        for (Image image : images) {
            String path = image.getUrl();

            Path filePath = Path.of(path);
            String fileName;
            try {
                Resource resource = new UrlResource(filePath.toUri());
                fileName = resource.getFilename();
                String server = "http://localhost:8080/uploads/";
                String url = server + fileName;
                imageUrls.add(url);

            } catch (IOException e) {
                e.printStackTrace();
                response.put("message", "Error retrieving images");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }
        response.put("message", "Image urls retrieved successfully");
        response.put("allImageUrls", imageUrls);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint hit!!");
    }
}




