package com.familyflashback.familyflashback.models;
import jakarta.persistence.*;


@Entity
public class Image extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "url")
    private String url;

    @Column(name = "person_id")
    private String personId;

    public Image() {}

    public Image(String url, User user, String personId) {
        this.url = url;
        this.user = user;
        this.personId = personId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    @Override
    public String toString() {
        return "Image{" +
                "user=" + user +
                ", url='" + url + '\'' +
                ", personId='" + personId + '\'' +
                '}';
    }
}
