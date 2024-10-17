package com.brandlogo.logo_java.service;

import com.brandlogo.logo_java.model.ImageExample;
import com.brandlogo.logo_java.repository.ImageExampleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ImageExampleService {
    private ImageExampleRepository imageExampleRepository;

    public List<ImageExample> getExampleImageList() {
        return imageExampleRepository.findAll();
    }
}
