 package com.familyflashback.familyflashback.models.data;

 import com.familyflashback.familyflashback.models.Person;
 import org.springframework.data.repository.CrudRepository;
 import org.springframework.stereotype.Repository;

 @Repository
 public interface PersonRepository extends CrudRepository<Person, Integer> {
 }
