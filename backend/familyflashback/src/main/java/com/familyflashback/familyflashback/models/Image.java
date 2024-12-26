 package com.familyflashback.familyflashback.models;

 import jakarta.persistence.*;
 import jakarta.validation.constraints.NotBlank;
 import jakarta.validation.constraints.Size;


 @Entity
 public class Image extends AbstractEntity {


     @OneToOne
     @JoinColumn(name = "user_id")
     private User user;

     @NotBlank(message = "Url is required")
     @Size(max = 248, message = "Cannot exceed 248 characters")
     private String url;

     public Image() {}

     public Image(User user, String url) {
         this.user = user;
         this.url = url;
     }

     public String getUrl() {
         return url;
     }

     public void setUrl(String url) {
         this.url = url;
     }

     @Override
     public String toString() {
         return "Image{" +
                 "user=" + user +
                 ", url='" + url + '\'' +
                 '}';
     }
 }
