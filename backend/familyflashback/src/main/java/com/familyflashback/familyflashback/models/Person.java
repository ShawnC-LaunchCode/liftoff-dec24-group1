package com.familyflashback.familyflashback.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Person extends AbstractEntity {

    @ManyToMany
    private List<Image> images = new ArrayList<>();

    @ManyToOne
    private User user;

    @ManyToMany
    private List<Person> persons = new ArrayList<>();

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

    public Person(List<Image> images, List<Person> persons, User user, String name, LocalDate birthDate, LocalDate deathDate, String birthTown, String bio) {
        this.images = images;
        this.persons = persons;
        this.user = user;
        this.name = name;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.birthTown = birthTown;
        this.bio = bio;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
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

    public List<Person> getPersons() {
        return persons;
    }

    public void setPersons(List<Person> persons) {
        this.persons = persons;
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
                "images=" + images +
                ", user=" + user +
                ", persons=" + persons +
                ", name='" + name + '\'' +
                ", birthDate=" + birthDate +
                ", deathDate=" + deathDate +
                ", birthTown='" + birthTown + '\'' +
                ", bio='" + bio + '\'' +
                '}';
    }
}
