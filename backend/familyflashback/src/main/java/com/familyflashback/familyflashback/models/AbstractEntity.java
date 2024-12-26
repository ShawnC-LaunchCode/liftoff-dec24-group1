package com.familyflashback.familyflashback.models;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Id;

import java.util.Objects;

@MappedSuperclass
public class AbstractEntity {
    @Id
    @Column(name = "person_id", insertable=false, updatable=false)
    private String id = NanoIdUtils.randomNanoId();

    public String getId() {
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
