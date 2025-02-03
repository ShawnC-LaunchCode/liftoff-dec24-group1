package com.familyflashback.familyflashback.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
public class Blog extends AbstractEntity {


    @Column(name = "user_id")
    private String userId;

    @Size(max = 50, message = "Cannot exceed 50 characters")
    @NotNull
    private String header;

    @Size(max = 5000, message = "Cannot exceed 5000 characters")
    @NotNull
    private String body;

    @Size(max = 248, message = "Cannot exceed 248 characters")
    @Column(name = "image_url")
    private String imgUrl;

    public Blog() {}

    public Blog(String userId, String header, String body, String imgUrl) {
        this.userId = userId;
        this.header = header;
        this.body = body;
        this.imgUrl = imgUrl;
    }

    public @Size(max = 248, message = "Cannot exceed 248 characters") String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(@Size(max = 248, message = "Cannot exceed 248 characters") String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public @Size(max = 5000, message = "Cannot exceed 5000 characters") @NotNull String getBody() {
        return body;
    }

    public void setBody(@Size(max = 5000, message = "Cannot exceed 5000 characters") @NotNull String body) {
        this.body = body;
    }

    public @Size(max = 50, message = "Cannot exceed 50 characters") @NotNull String getHeader() {
        return header;
    }

    public void setHeader(@Size(max = 50, message = "Cannot exceed 50 characters") @NotNull String header) {
        this.header = header;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Blog blog = (Blog) o;
        return Objects.equals(getUserId(), blog.getUserId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getUserId());
    }

    @Override
    public String toString() {
        return "Blog{" +
                "userId='" + userId + '\'' +
                ", header='" + header + '\'' +
                ", body='" + body + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                '}';
    }
}
