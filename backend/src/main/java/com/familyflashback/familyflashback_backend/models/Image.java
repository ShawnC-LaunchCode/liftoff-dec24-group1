package com.familyflashback.familyflashback_backend.models;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Image extends AbstractEntity {

    @ManyToMany
    private List<Person> persons = new ArrayList<>();

    @NotBlank(message = "Url is required")
    @Size(max = 248, message = "Cannot exceed 248 characters")
    private String url;

    public Image() {}

    public Image(String url, List<Person> somePersons) {
        this.url = url;
        this.persons = somePersons;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Image{" +
                "persons=" + persons +
                ", url='" + url + '\'' +
                '}';
    }
}
