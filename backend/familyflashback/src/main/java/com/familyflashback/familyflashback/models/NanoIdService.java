package com.familyflashback.familyflashback.models;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import org.springframework.stereotype.Service;

@Service
public class NanoIdService {
    // Default method to generate a NanoID with a length of 21 characters
    public String generateNanoId() {
        return NanoIdUtils.randomNanoId();
    }
}
