package com.esuggestion.suggestion.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.esuggestion.suggestion.dto.SuggestionDTO;
import com.esuggestion.suggestion.dto.SuggestionTypeDTO;
import com.esuggestion.suggestion.model.Suggestion;
import com.esuggestion.suggestion.model.SuggestionType;

public class SuggestionTypeMapper {
    public static SuggestionTypeDTO toDto(SuggestionType suggestionType){
        SuggestionTypeDTO dto = new SuggestionTypeDTO();
        dto.setId(suggestionType.getId());
        dto.setName(suggestionType.getName());
        
        List<SuggestionDTO> suggestionDTOs = suggestionType.getSuggestions() != null
            ? suggestionType.getSuggestions().stream()
                .map(SuggestionMapper::toDTO)
                .collect(Collectors.toList())
            : new ArrayList<>();
        dto.setSuggestionDTOs(suggestionDTOs);
        return dto;
    }
    public static SuggestionType toEntity(SuggestionTypeDTO suggestionTypeDTO){
        SuggestionType dto = new SuggestionType();
        dto.setId(suggestionTypeDTO.getId());
        dto.setName(suggestionTypeDTO.getName());
        
        List<SuggestionDTO> suggestionDTOs = suggestionTypeDTO.getSuggestionDTOs() != null
            ? suggestionTypeDTO.getSuggestionDTOs()
            : new ArrayList<>();
        List<Suggestion> suggestions = suggestionDTOs.stream()
            .map(SuggestionTypeMapper::toMapSuggestion)
            .collect(Collectors.toList());
        dto.setSuggestions(suggestions);
        return dto;
    }
    public static Suggestion toMapSuggestion(SuggestionDTO suggestionDTO){
        Suggestion suggestion = new Suggestion();
        suggestion.setId(suggestionDTO.getId());
        suggestion.setTitle(suggestionDTO.getTitle());
        suggestion.setDescription(suggestionDTO.getDescription());
        suggestion.setStatus(suggestionDTO.getStatus());
        return suggestion;
    }
}
