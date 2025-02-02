 package com.familyflashback.familyflashback.models.data;

 import com.familyflashback.familyflashback.models.Image;

 import com.familyflashback.familyflashback.models.Person;
 import org.springframework.data.jpa.repository.Query;
 import org.springframework.data.repository.CrudRepository;
 import org.springframework.stereotype.Repository;

 import java.util.List;

 @Repository
 public interface ImageRepository extends CrudRepository<Image, String> {

  @Query("SELECT images FROM Image images WHERE images.user.id =:userId")
  List<Image> findAllByUserId(String userId);

  @Query("SELECT images FROM Image images WHERE images.personId =:personId")
  List<Image> findAllByPersonId(String personId);
 }


