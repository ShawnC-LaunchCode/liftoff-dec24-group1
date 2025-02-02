package com.familyflashback.familyflashback.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;


@Entity
public class Blog_Comments extends AbstractEntity {


    @Column(name = "userId")
    private String userId;

    @Size(max = 500, message = "Cannot exceed 500 characters")
    @NotNull
    private String body;

    @Column(name = "update_dt")
    private LocalDateTime dateUpdated;


    public Blog_Comments() {}

    public Blog_Comments(String userId, String body) {
        this.userId = userId;

        this.dateUpdated = LocalDateTime.now();
        this.body = body;

    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }


    public LocalDateTime getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(LocalDateTime dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public @Size(max = 500, message = "Cannot exceed 500 characters") @NotNull String getBody() {
        return body;
    }

    public void setBody(@Size(max = 500, message = "Cannot exceed 500 characters") @NotNull String body) {
        this.body = body;
    }


    @Override
    public String toString() {
        return "Blog_Comments{" +

                ", userId='" + userId + '\'' +

                ", body='" + body + '\'' +
                ", dateUpdated=" + dateUpdated +

                '}';
    }
}
