package com.familyflashback.familyflashback.models.data;

import com.familyflashback.familyflashback.models.Session;
import com.familyflashback.familyflashback.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


@Repository
public interface SessionRepository extends CrudRepository<Session, String> {

    @Query("SELECT session FROM Session session WHERE id =:sessionId")
    Optional<Session> findByUserId(String sessionId);

    @Query("SELECT user FROM Session session WHERE id =:sessionId")
    Optional<User> findUserById(String sessionId);
}
