package com.familyflashback.familyflashback.models.data;

import com.familyflashback.familyflashback.models.Blog_Comments;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Blog_CommentsRepository extends CrudRepository<Blog_Comments, String> {

    @Query("SELECT comments FROM Blog_Comments comments WHERE comments.userId = :userId")
    List<Blog_Comments> findAllByUserId(String userId);

    @Query("SELECT comments FROM Blog_Comments comments WHERE comments.blog.id = :blogId")
    List<Blog_Comments> findAllByBlogId(String blogId);
}
