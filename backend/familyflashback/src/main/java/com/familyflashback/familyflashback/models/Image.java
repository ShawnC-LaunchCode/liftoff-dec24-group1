 package com.familyflashback.familyflashback.models;

 import jakarta.persistence.*;
 import jakarta.validation.constraints.NotBlank;
 import jakarta.validation.constraints.Size;


 @Entity
 public class Image extends AbstractEntity {

     @ManyToOne
     @JoinColumn(name = "user_id")
     private User user;

     @NotBlank(message = "Url is required")
     @Size(max = 248, message = "Cannot exceed 248 characters")
     private String url;

     public Image() {}

     public Image(String url, User user) {
         this.url = url;
         this.user = user;
     }

     public User getUser() {
         return user;
     }

     public void setUser(User user) {
         this.user = user;
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
