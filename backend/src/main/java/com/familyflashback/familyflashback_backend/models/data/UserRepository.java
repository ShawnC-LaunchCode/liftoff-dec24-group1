package com.familyflashback.familyflashback_backend.models.data;

import com.familyflashback.familyflashback_backend.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
