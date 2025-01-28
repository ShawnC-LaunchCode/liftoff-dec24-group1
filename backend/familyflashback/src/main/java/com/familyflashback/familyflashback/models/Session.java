package com.familyflashback.familyflashback.models;

import jakarta.persistence.*;

@Entity

public class Session extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Session() {}

    public Session(User user) {
        this.user = user;
    }

    public User getUserID() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Session{" +
                "session=" + this.getId() +
                "user=" + user +
                '}';
    }
}
