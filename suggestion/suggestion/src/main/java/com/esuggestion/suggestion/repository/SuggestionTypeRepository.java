package com.esuggestion.suggestion.repository;

import com.esuggestion.suggestion.model.SuggestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SuggestionTypeRepository extends JpaRepository<SuggestionType, UUID> {
    Optional<SuggestionType> findByName(String name);
}
