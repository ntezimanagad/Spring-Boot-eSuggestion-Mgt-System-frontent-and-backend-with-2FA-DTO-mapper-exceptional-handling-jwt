package com.esuggestion.suggestion.repository;

import com.esuggestion.suggestion.model.Suggestion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SuggestionRepository extends JpaRepository<Suggestion, UUID> {
    List<Suggestion> findByStatus(String status);
    List<Suggestion> findByEmployeeId(UUID employeeId);
    Optional<Suggestion> findBytitle(String title);
    Page<Suggestion> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);
    
}
