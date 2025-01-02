package com.familyflashback.familyflashback.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

import java.io.Serializable;
import java.util.Objects;

@Entity
@IdClass(Person_Person.CompositeKey.class)
public class Person_Person {

    @Id
    private String rootPerson;

    @Id
    private String relatedPerson;

    private String relationship;

    public Person_Person() {}

    public Person_Person(String relationship, String rootPerson, String relatedPerson) {
        this.relationship = relationship;
        this.rootPerson = rootPerson;
        this.relatedPerson = relatedPerson;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public String getRelatedPerson() {
        return relatedPerson;
    }

    public void setRelatedPerson(String relatedPerson) {
        this.relatedPerson = relatedPerson;
    }

    public String getRootPerson() {
        return rootPerson;
    }

    public void setRootPerson(String rootPerson) {
        this.rootPerson = rootPerson;
    }

    @IdClass(CompositeKey.class)
    public static class CompositeKey implements Serializable {

        private String rootPerson;

        private String relatedPerson;

        public CompositeKey() {}

        public CompositeKey(String rootPerson, String relatedPerson) {
            this.rootPerson = rootPerson;
            this.relatedPerson = relatedPerson;
        }

        public String getRelatedPerson() {
            return relatedPerson;
        }

        public void setRelatedPerson(String relatedPerson) {
            this.relatedPerson = relatedPerson;
        }

        public String getRootPerson() {
            return rootPerson;
        }

        public void setRootPerson(String rootPerson) {
            this.rootPerson = rootPerson;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            CompositeKey that = (CompositeKey) o;
            return Objects.equals(getRootPerson(), that.getRootPerson()) && Objects.equals(getRelatedPerson(), that.getRelatedPerson());
        }

        @Override
        public int hashCode() {
            return Objects.hash(getRootPerson(), getRelatedPerson());
        }

        @Override
        public String toString() {
            return "CompositeKey{" +
                    "rootPerson='" + rootPerson + '\'' +
                    ", relatedPerson='" + relatedPerson + '\'' +
                    '}';
        }
    }

}
