package com.familyflashback.familyflashback_backend.models;

@Service
public class NanoIdService {
    // Default method to generate a NanoID with a length of 21 characters
    public String generateNanoId() {
        return NanoIdUtils.randomNanoId();
    }
}
