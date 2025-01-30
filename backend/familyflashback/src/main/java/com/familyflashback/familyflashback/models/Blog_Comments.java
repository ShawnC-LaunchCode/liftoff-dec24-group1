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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "parentId", nullable = true)
    private Integer parentId;

    @Column(name = "userId")
    private String userId;

    @Size(max = 500, message = "Cannot exceed 500 characters")
    @NotNull
    private String body;

    @Column(name = "createdAt")
    private LocalDateTime dateUpdated;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "name")
    private User user;

    public Blog_Comments() {}

    public Blog_Comments(String userId, User user, String body, Integer parentId) {
        this.userId = userId;
        this.user = user;
        this.dateUpdated = LocalDateTime.now();
        this.body = body;
        this.parentId = parentId;
    }

    public int getCommentId() { return id; }

    public void setCommentId(int id) { this.id = id; }

    public Integer getParentId() { return parentId; }

    public void setParentId(Integer parentId) { this.parentId = parentId; }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public String getName() { return user.getName(); }

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
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", name='" + getName() + '\'' +
                ", body='" + body + '\'' +
                ", dateUpdated=" + dateUpdated +
                ", parentId=" + parentId +
                '}';
    }
}
