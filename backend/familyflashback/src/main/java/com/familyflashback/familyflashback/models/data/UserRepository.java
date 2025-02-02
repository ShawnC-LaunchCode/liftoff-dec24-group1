 package com.familyflashback.familyflashback.models.data;

 import com.familyflashback.familyflashback.models.User;
 import org.springframework.data.repository.CrudRepository;
 import org.springframework.stereotype.Repository;
 import org.springframework.data.jpa.repository.Query;

 import java.util.Optional;

 @Repository
 public interface UserRepository extends CrudRepository<User, String> {

  @Query("SELECT user FROM User user WHERE email =:userEmail")
  Optional<User> findByEmail(String userEmail);

 }
