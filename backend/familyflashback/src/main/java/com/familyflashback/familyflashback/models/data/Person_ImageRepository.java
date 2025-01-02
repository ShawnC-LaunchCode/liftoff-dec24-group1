package com.familyflashback.familyflashback.models.data;

import com.familyflashback.familyflashback.models.Person_Image;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Person_ImageRepository extends CrudRepository<Person_Image, Person_Image.CompositeKey> {
}
