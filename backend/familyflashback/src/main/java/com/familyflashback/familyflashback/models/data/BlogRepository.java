package com.familyflashback.familyflashback.models.data;

import com.familyflashback.familyflashback.models.Blog;
import com.familyflashback.familyflashback.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends CrudRepository<Blog, String> {
}
