package com.esuggestion.suggestion.mapper;

import com.esuggestion.suggestion.model.Feedback;
import com.esuggestion.suggestion.model.Suggestion;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.esuggestion.suggestion.dto.FeedbackDTO;
import com.esuggestion.suggestion.dto.SuggestionDTO;

public class SuggestionMapper {

    public static SuggestionDTO toDTO(Suggestion suggestion) {
        SuggestionDTO dto = new SuggestionDTO();
        dto.setId(suggestion.getId());
        dto.setTitle(suggestion.getTitle());
        dto.setDescription(suggestion.getDescription());
        dto.setStatus(suggestion.getStatus());
        dto.setComments(suggestion.getComments());
        dto.setSuggestionTypeId(suggestion.getSuggestionType() != null ? suggestion.getSuggestionType().getId() : null);
        dto.setEmployeeId(suggestion.getEmployee() != null ? suggestion.getEmployee().getId() : null);

        List<FeedbackDTO> feedbackDTOs = suggestion.getFeedbacks() != null
            ? suggestion.getFeedbacks().stream()
                .map(FeedbackMapper::toDto)
                .collect(Collectors.toList())
            : new ArrayList<>();
        dto.setFeedbackDTOs(feedbackDTOs);
        return dto;
    }

    public static Suggestion toEntity(SuggestionDTO suggestionDTO) {
        Suggestion dto = new Suggestion();
        dto.setId(suggestionDTO.getId());
        dto.setTitle(suggestionDTO.getTitle());
        dto.setDescription(suggestionDTO.getDescription());
        dto.setStatus(suggestionDTO.getStatus());
        dto.setComments(suggestionDTO.getComments());
        List<FeedbackDTO> feedbackDTOs = suggestionDTO.getFeedbackDTOs() != null
            ? suggestionDTO.getFeedbackDTOs()
            : new ArrayList<>();
        List<Feedback> feedbacks = feedbackDTOs.stream()
            .map(SuggestionMapper::toMapFeedback)
            .collect(Collectors.toList());
        dto.setFeedbacks(feedbacks);
        return dto;
    }
    public static Feedback toMapFeedback(FeedbackDTO feedbackDTO){
        Feedback feedback = new Feedback();
        feedback.setId(feedbackDTO.getId());
        feedback.setComments(feedbackDTO.getComments());
        feedback.setDecision(feedbackDTO.getDecision());
        return feedback;
    }
}

