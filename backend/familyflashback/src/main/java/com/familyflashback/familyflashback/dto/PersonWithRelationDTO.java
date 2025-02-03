package com.familyflashback.familyflashback.dto;

import java.time.LocalDate;

public class PersonWithRelationDTO {
    private String name;
    private LocalDate birthDate;
    private LocalDate deathDate;
    private String birthTown;
    private String bio;
    private String userId;
    
    // Relationship fields
    private String rootPersonId;  // The ID of the person this new person is related to
    private String relationship;  // The relationship type

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
    
    public LocalDate getDeathDate() { return deathDate; }
    public void setDeathDate(LocalDate deathDate) { this.deathDate = deathDate; }
    
    public String getBirthTown() { return birthTown; }
    public void setBirthTown(String birthTown) { this.birthTown = birthTown; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getRootPersonId() { return rootPersonId; }
    public void setRootPersonId(String rootPersonId) { this.rootPersonId = rootPersonId; }
    
    public String getRelationship() { return relationship; }
    public void setRelationship(String relationship) { this.relationship = relationship; }
} 