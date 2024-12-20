package com.familyflashback.familyflashback.controllers;

import com.familyflashback.familyflashback.models.data.ImageRepository;
import com.familyflashback.familyflashback.models.data.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("images")
public class ImageController {
    @Autowired
    private PersonRepository eventRepository;

    @Autowired
    private ImageRepository eventCategoryRepository;


}


