package com.familyflashback.familyflashback.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends AbstractEntity {

    @OneToMany
    @JoinColumn(name = "person_id")
    private final List<Person> persons = new ArrayList<>();

    @NotBlank(message = "Name is required.")
    @Size(max = 50, message = "Name cannot exceed 50 characters")
    private String name;

    @NotBlank(message = "Email is required.")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+)\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required.")
    @Size(max = 60, message = "Invalid Password")
    private String password;

    private LocalDate lastLogin;

    public User() {}

    public User(LocalDate lastLogin, String name, String email, String password) {
        this.lastLogin = lastLogin;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public List<Person> getPersons() {
        return persons;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDate lastLogin) {
        this.lastLogin = lastLogin;
    }

    @Override
    public String toString() {
        return "User{" +
                "persons=" + persons +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", lastLogin=" + lastLogin +
                '}';
    }
}
