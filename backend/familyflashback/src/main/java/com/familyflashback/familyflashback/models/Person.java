package com.familyflashback.familyflashback.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;


@Entity
public class Person extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotBlank(message = "Name is required.")
    @Size(max = 50, message = "Name cannot exceed 50 characters")
    private String name;

    @Size(max = 1, message = "Gender must be a single character")
    private String gender;

    private LocalDate birthDate;

    private LocalDate deathDate;

    @Size(max = 50, message = "Location cannot exceed 50 characters")
    private String birthTown;

    @Size(max = 500, message = "Bio cannot exceed 500 characters")
    private String bio;

    private Integer generationLevel;


    public Person() {}

    public Person(String bio, String birthTown, LocalDate deathDate, LocalDate birthDate, String name, User user, String gender, Integer generationLevel) {
        this.bio = bio;
        this.birthTown = birthTown;
        this.deathDate = deathDate;
        this.birthDate = birthDate;
        this.name = name;
        this.user = user;
        this.gender = gender;
        this.generationLevel = generationLevel;
    }


    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getBirthTown() {
        return birthTown;
    }

    public void setBirthTown(String birthTown) {
        this.birthTown = birthTown;
    }

    public LocalDate getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(LocalDate deathDate) {
        this.deathDate = deathDate;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getGenerationLevel() {
        return generationLevel;
    }

    public void setGenerationLevel(Integer generationLevel) {
        this.generationLevel = generationLevel;
    }

    @Override
    public String toString() {
        return "Person{" +
                ", user=" + user +
                ", name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", birthDate=" + birthDate +
                ", deathDate=" + deathDate +
                ", birthTown='" + birthTown + '\'' +
                ", bio='" + bio + '\'' +
                ", generationLevel=" + generationLevel +
                '}';
    }
}
