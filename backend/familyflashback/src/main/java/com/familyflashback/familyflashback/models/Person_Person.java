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

    private String value;

    public Person_Person() {}

    public Person_Person(String value, String relatedPerson, String rootPerson) {
        this.value = value;
        this.relatedPerson = relatedPerson;
        this.rootPerson = rootPerson;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
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

    public static class CompositeKey implements Serializable {

        private String rootPerson;

        private String relatedPerson;

        public CompositeKey() {}

        public CompositeKey(String relatedPerson, String rootPerson) {
            this.relatedPerson = relatedPerson;
            this.rootPerson = rootPerson;
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
