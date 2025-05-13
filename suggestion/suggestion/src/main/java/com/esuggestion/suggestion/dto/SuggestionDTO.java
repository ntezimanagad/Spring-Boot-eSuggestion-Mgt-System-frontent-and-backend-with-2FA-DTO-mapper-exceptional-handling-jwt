package com.esuggestion.suggestion.dto;

import java.util.List;
import java.util.UUID;

public class SuggestionDTO {
    private UUID id;
    private String title;
    private String description;
    private String status;
    private String comments;
    private UUID suggestionTypeId;
    private UUID employeeId;
    private List<FeedbackDTO> feedbackDTOs;

    

    public SuggestionDTO(String title, String description, String status, String comments, UUID suggestionTypeId,
            UUID employeeId, List<FeedbackDTO> feedbackDTOs) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.comments = comments;
        this.suggestionTypeId = suggestionTypeId;
        this.employeeId = employeeId;
        this.feedbackDTOs = feedbackDTOs;
    }

    public SuggestionDTO() {
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UUID getSuggestionTypeId() {
        return suggestionTypeId;
    }

    public void setSuggestionTypeId(UUID suggestionTypeId) {
        this.suggestionTypeId = suggestionTypeId;
    }

    public UUID getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(UUID employeeId) {
        this.employeeId = employeeId;
    }

    public List<FeedbackDTO> getFeedbackDTOs() {
        return feedbackDTOs;
    }

    public void setFeedbackDTOs(List<FeedbackDTO> feedbackDTOs) {
        this.feedbackDTOs = feedbackDTOs;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}

