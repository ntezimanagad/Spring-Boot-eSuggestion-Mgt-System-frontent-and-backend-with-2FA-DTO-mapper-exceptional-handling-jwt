package com.esuggestion.suggestion.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.esuggestion.suggestion.dto.AdminDTO;
import com.esuggestion.suggestion.dto.FeedbackDTO;
import com.esuggestion.suggestion.model.Admin;
import com.esuggestion.suggestion.model.Feedback;

public class AdminMapper {
    private static AdminDTO toDto(Admin admin){
        AdminDTO dto = new AdminDTO();
        dto.setId(admin.getId());
        dto.setName(admin.getName());
        dto.setEmail(admin.getEmail());
        dto.setPassword(admin.getPassword());
        dto.setRole(admin.getRole());

        List<FeedbackDTO> feedbackDTOs = admin.getFeedbacks() != null   
            ? admin.getFeedbacks().stream()
                .map(FeedbackMapper::toDto)
                .collect(Collectors.toList())
            : new ArrayList<>();
        dto.setFeedbackDTOs(feedbackDTOs);
        return dto;
    }
    private static Admin toEntity(AdminDTO adminDTO){
        Admin dto = new Admin();
        dto.setId(adminDTO.getId());
        dto.setName(adminDTO.getName());
        dto.setEmail(adminDTO.getEmail());
        dto.setPassword(adminDTO.getPassword());
        dto.setRole(adminDTO.getRole());

        List<FeedbackDTO> feedbackDTOs = adminDTO.getFeedbackDTOs() != null   
            ? adminDTO.getFeedbackDTOs()
            : new ArrayList<>();

        List<Feedback> feedbacks = feedbackDTOs.stream()
            .map(AdminMapper::toMapFeedback)
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
