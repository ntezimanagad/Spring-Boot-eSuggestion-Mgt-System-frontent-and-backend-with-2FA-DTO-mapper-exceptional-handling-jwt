package com.esuggestion.suggestion.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Blacklist {
    @Id
    private String token;
    private Instant blacklistedAt;
    public Blacklist() {
    }
    public Blacklist(String token, Instant blacklistedAt) {
        this.token = token;
        this.blacklistedAt = blacklistedAt;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public Instant getBlacklistedAt() {
        return blacklistedAt;
    }
    public void setBlacklistedAt(Instant blacklistedAt) {
        this.blacklistedAt = blacklistedAt;
    }
    
}
