package com.esuggestion.suggestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esuggestion.suggestion.model.Blacklist;

public interface TokenBlacklist extends JpaRepository<Blacklist, String>{
    boolean existsByToken(String token);
}