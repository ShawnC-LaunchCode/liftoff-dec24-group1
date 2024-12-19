package com.familyflashback.familyflashback_backend.models.data;

import com.familyflashback.familyflashback_backend.models.Person;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer> {
}
