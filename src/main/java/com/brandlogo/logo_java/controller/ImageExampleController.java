package com.brandlogo.logo_java.controller;

import com.brandlogo.logo_java.model.ImageExample;
import com.brandlogo.logo_java.service.ImageExampleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
public class ImageExampleController {
    private final ImageExampleService imageExampleService;

    @GetMapping(value = "/exampleImage")
    public List<ImageExample> getExampleImageList() {
        return imageExampleService.getExampleImageList();
    }
}
