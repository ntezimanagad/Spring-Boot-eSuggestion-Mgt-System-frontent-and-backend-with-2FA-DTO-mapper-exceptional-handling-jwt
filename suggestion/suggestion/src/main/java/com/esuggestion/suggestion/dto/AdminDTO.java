package com.esuggestion.suggestion.dto;

import java.util.List;
import java.util.UUID;

import com.esuggestion.suggestion.model.Role;

public class AdminDTO {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private Role role;
    private String otp;
    private List<FeedbackDTO> feedbackDTOs;
    public AdminDTO() {
    }
    public AdminDTO(String name, String email, String password, Role role, String otp, List<FeedbackDTO> feedbackDTOs) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.otp = otp;
        this.feedbackDTOs = feedbackDTOs;
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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    }
    public List<FeedbackDTO> getFeedbackDTOs() {
        return feedbackDTOs;
    }
    public void setFeedbackDTOs(List<FeedbackDTO> feedbackDTOs) {
        this.feedbackDTOs = feedbackDTOs;
    }
    
}
