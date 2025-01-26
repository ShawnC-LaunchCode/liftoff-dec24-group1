package com.familyflashback.familyflashback.models.data;

import com.familyflashback.familyflashback.models.Session;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


@Repository
public interface SessionRepository extends CrudRepository<Session, String> {

    @Query("SELECT session FROM Session session WHERE user.id =:userId")
    List<Session> findByUserId(String userId);
}
