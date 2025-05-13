package com.esuggestion.suggestion.dto;

import java.util.List;
import java.util.UUID;

public class SuggestionTypeDTO {
    private UUID id;
    private String name;
    private List<SuggestionDTO> suggestionDTOs;
    public SuggestionTypeDTO() {
    }
    public SuggestionTypeDTO(String name, List<SuggestionDTO> suggestionDTOs) {
        this.name = name;
        this.suggestionDTOs = suggestionDTOs;
    }
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<SuggestionDTO> getSuggestionDTOs() {
        return suggestionDTOs;
    }
    public void setSuggestionDTOs(List<SuggestionDTO> suggestionDTOs) {
        this.suggestionDTOs = suggestionDTOs;
    }
    
}
