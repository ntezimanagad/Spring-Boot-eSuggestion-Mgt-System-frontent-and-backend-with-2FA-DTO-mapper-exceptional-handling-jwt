package com.esuggestion.suggestion.dto;

import java.util.UUID;

public class FeedbackDTO {
    private UUID id;
    private String comments;
    private String decision;
    private UUID suggestionId;
    private UUID adminid;
    public FeedbackDTO() {
    }
    public FeedbackDTO(String comments, String decision, UUID suggestionId, UUID adminid) {
        this.comments = comments;
        this.decision = decision;
        this.suggestionId = suggestionId;
        this.adminid = adminid;
    }
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }
    public String getDecision() {
        return decision;
    }
    public void setDecision(String decision) {
        this.decision = decision;
    }
    public UUID getSuggestionId() {
        return suggestionId;
    }
    public void setSuggestionId(UUID suggestionId) {
        this.suggestionId = suggestionId;
    }
    public UUID getAdminid() {
        return adminid;
    }
    public void setAdminid(UUID adminid) {
        this.adminid = adminid;
    }
    
}
