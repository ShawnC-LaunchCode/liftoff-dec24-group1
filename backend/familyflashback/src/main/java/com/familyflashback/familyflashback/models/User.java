package com.familyflashback.familyflashback.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;


@Entity
@JsonIgnoreProperties(value = { "password" }, allowSetters = true)
public class User extends AbstractEntity {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private String name;

    @NotBlank(message = "Email is required.")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+)\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required.")
    @Size(max = 60, message = "Invalid Password")
    private String password;

    @Column(name = "person_id")
    private String personID;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    public User() {}

    public User(String password, String name, String email) {
        this.lastLogin = LocalDateTime.now();
        this.password = encoder.encode(password);
        this.name = name;
        this.email = email;
    }

    public String getPersonID() {
        return personID;
    }

    public void setPersonID(String personID) {
        this.personID = personID;
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

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    @Override
    public String toString() {
        return "User{" +
                ", email='" + email + '\'' +
                ", lastLogin=" + lastLogin +
                '}';
    }

    public void hashPass() {
        this.password = encoder.encode(this.password);
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, this.password);
    }
}