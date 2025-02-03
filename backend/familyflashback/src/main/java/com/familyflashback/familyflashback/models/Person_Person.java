package com.familyflashback.familyflashback.models;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Column;

import java.io.Serializable;
import java.util.Objects;

@Entity
@IdClass(Person_Person.CompositeKey.class)
public class Person_Person {

    @Id
    private String personId;

    @Id
    private String relativeId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RelationshipType relationshipType;

    public enum RelationshipType {
        parent,
        child,
        spouse,
        sibling
    }

    public Person_Person() {}

    public Person_Person(String relationship, String rootPerson, String relatedPerson) {
        this.relationshipType = RelationshipType.valueOf(relationship);
        this.personId = rootPerson;
        this.relativeId = relatedPerson;
    }

    public String getRelationship() {
        return relationshipType.name();
    }

    public void setRelationship(String relationship) {
        this.relationshipType = RelationshipType.valueOf(relationship.toLowerCase());
    }

    public String getRelatedPerson() {
        return relativeId;
    }

    public void setRelatedPerson(String relatedPerson) {
        this.relativeId = relatedPerson;
    }

    public String getRootPerson() {
        return personId;
    }

    public void setRootPerson(String rootPerson) {
        this.personId = rootPerson;
    }

    @IdClass(CompositeKey.class)
    public static class CompositeKey implements Serializable {

        private String personId;

        private String relativeId;

        public CompositeKey() {}

        public CompositeKey(String personId, String relativeId) {
            this.personId = personId;
            this.relativeId = relativeId;
        }

        public String getRelatedPerson() {
            return relativeId;
        }

        public void setRelatedPerson(String relatedPerson) {
            this.relativeId = relatedPerson;
        }

        public String getRootPerson() {
            return personId;
        }

        public void setRootPerson(String rootPerson) {
            this.personId = rootPerson;
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
                    "rootPerson='" + personId + '\'' +
                    ", relatedPerson='" + relativeId + '\'' +
                    '}';
        }
    }

}
