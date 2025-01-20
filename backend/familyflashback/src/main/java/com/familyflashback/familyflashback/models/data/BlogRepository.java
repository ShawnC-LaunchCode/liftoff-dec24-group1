package com.familyflashback.familyflashback.models.data;

import com.familyflashback.familyflashback.models.Blog;
import com.familyflashback.familyflashback.models.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends CrudRepository<Blog, String> {

}
