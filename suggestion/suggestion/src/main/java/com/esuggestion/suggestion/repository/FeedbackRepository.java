package com.esuggestion.suggestion.repository;

import com.esuggestion.suggestion.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface FeedbackRepository extends JpaRepository<Feedback, UUID> {
    List<Feedback> findBySuggestionId(UUID suggestionId);
    List<Feedback> findByAdminId(UUID adminId);
    
}
