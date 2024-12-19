package com.familyflashback.familyflashback_backend.models.data;

import com.familyflashback.familyflashback_backend.models.Image;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends CrudRepository<Image, Integer> {
}
