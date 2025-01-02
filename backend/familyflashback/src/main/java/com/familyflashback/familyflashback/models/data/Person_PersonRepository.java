package com.familyflashback.familyflashback.models.data;

import com.familyflashback.familyflashback.models.Person_Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Person_PersonRepository extends CrudRepository<Person_Person, Person_Person.CompositeKey> {
}
