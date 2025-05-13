package com.esuggestion.suggestion.mapper;

import com.esuggestion.suggestion.dto.FeedbackDTO;
import com.esuggestion.suggestion.model.Feedback;

public class FeedbackMapper {
    public static FeedbackDTO toDto(Feedback feedback){
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setComments(feedback.getComments());
        dto.setDecision(feedback.getDecision());
        dto.setSuggestionId(feedback.getSuggestion() != null ? feedback.getSuggestion().getId() : null);
        dto.setAdminid(feedback.getAdmin() != null ? feedback.getAdmin().getId() : null);
        return dto;
    }
    public static Feedback toEntity(FeedbackDTO feedbackDTO){
        Feedback dto = new Feedback();
        dto.setId(feedbackDTO.getId());
        dto.setComments(feedbackDTO.getComments());
        dto.setDecision(feedbackDTO.getDecision());
        return dto;
    }
}
