package com.familyflashback.familyflashback.models.data;
import com.familyflashback.familyflashback.models.Blog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends CrudRepository<Blog, String> {
    boolean existsByUserId(String userId);
    Optional<Blog> findByUserId(String userId);
}
