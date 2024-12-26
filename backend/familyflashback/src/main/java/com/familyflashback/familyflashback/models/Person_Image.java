 package com.familyflashback.familyflashback.models;


 import jakarta.persistence.Entity;
 import jakarta.persistence.Id;
 import jakarta.persistence.IdClass;

 import java.io.Serializable;
 import java.util.Objects;

 @Entity
 @IdClass(Person_Image.CompositeKey.class)
 public class Person_Image {

     @Id
     private String rootPerson;

     @Id
     private String relatedImage;

     private String value;

     public Person_Image() {}

     public Person_Image(String relatedImage, String value, String rootPerson) {
         this.relatedImage = relatedImage;
         this.value = value;
         this.rootPerson = rootPerson;
     }

     public String getValue() {
         return value;
     }

     public void setValue(String value) {
         this.value = value;
     }

     public String getRelatedImage() {
         return relatedImage;
     }

     public void setRelatedImage(String relatedImage) {
         this.relatedImage = relatedImage;
     }

     public String getRootPerson() {
         return rootPerson;
     }

     public void setRootPerson(String rootPerson) {
         this.rootPerson = rootPerson;
     }

     public static class CompositeKey implements Serializable {

         private String rootPerson;

         private String relatedImage;

         public CompositeKey() {}

         public CompositeKey(String rootPerson, String relatedImage) {
             this.rootPerson = rootPerson;
             this.relatedImage = relatedImage;
         }

         public String getRootPerson() {
             return rootPerson;
         }

         public void setRootPerson(String rootPerson) {
             this.rootPerson = rootPerson;
         }

         public String getRelatedImage() {
             return relatedImage;
         }

         public void setRelatedImage(String relatedImage) {
             this.relatedImage = relatedImage;
         }

         @Override
         public boolean equals(Object o) {
             if (this == o) return true;
             if (o == null || getClass() != o.getClass()) return false;
             CompositeKey that = (CompositeKey) o;
             return Objects.equals(getRootPerson(), that.getRootPerson()) && Objects.equals(getRelatedImage(), that.getRelatedImage());
         }

         @Override
         public int hashCode() {
             return Objects.hash(getRootPerson(), getRelatedImage());
         }

         @Override
         public String toString() {
             return "CompositeKey{" +
                     "rootPerson='" + rootPerson + '\'' +
                     ", relatedImage='" + relatedImage + '\'' +
                     '}';
         }
     }
 }
