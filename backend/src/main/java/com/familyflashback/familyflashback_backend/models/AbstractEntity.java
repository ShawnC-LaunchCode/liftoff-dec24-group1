package com.familyflashback.familyflashback_backend.models;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

@MappedSuperClass
public class AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //private int id; //Need NanoId
    @Autowired
    private NanoIdService id;

    public int getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbstractEntity that = (AbstractEntity) o;
        return getId() == that.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
