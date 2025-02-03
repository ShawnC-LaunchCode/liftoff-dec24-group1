package com.familyflashback.familyflashback.models.data;

import com.familyflashback.familyflashback.models.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends CrudRepository<Person, String> {

  @Query("SELECT person FROM Person person WHERE person.id =:userPersonId")
  Optional<Person> findByUsersPersonId(String userPersonId);

  @Query("SELECT persons FROM Person persons WHERE persons.user.id =:userId")
  List<Person> findAllByUserId(String userId);

  @Query("SELECT DISTINCT p.birthTown FROM Person p WHERE p.birthTown IS NOT NULL AND p.user.id = :userId")
  List<String> findDistinctBirthTownByUserId(String userId);

}
