 package com.familyflashback.familyflashback.models.data;

 import com.familyflashback.familyflashback.models.Person;
 import org.springframework.data.jpa.repository.Query;
 import org.springframework.data.repository.CrudRepository;
 import org.springframework.stereotype.Repository;

 import java.util.Optional;

 @Repository
 public interface PersonRepository extends CrudRepository<Person, String> {

  @Query("SELECT person FROM Person person WHERE person.id =:userPersonId")
  Optional<Person> findByUsersPersonId(String userPersonId);

 }
