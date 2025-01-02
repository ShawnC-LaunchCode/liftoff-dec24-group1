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

    private LocalDate birthDate;

    private LocalDate deathDate;

    @Size(max = 50, message = "Location cannot exceed 50 characters")
    private String birthTown;

    @Size(max = 500, message = "Bio cannot exceed 500 characters")
    private String bio;


    public Person() {}

    public Person(String bio, String birthTown, LocalDate deathDate, LocalDate birthDate, String name, User user) {
        this.bio = bio;
        this.birthTown = birthTown;
        this.deathDate = deathDate;
        this.birthDate = birthDate;
        this.name = name;
        this.user = user;
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

    @Override
    public String toString() {
        return "Person{" +
                ", user=" + user +
                ", name='" + name + '\'' +
                ", birthDate=" + birthDate +
                ", deathDate=" + deathDate +
                ", birthTown='" + birthTown + '\'' +
                ", bio='" + bio + '\'' +
                '}';
    }
}
