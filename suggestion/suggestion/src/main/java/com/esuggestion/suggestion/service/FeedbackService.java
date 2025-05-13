package com.esuggestion.suggestion.service;

import com.esuggestion.suggestion.dto.FeedbackDTO;
import com.esuggestion.suggestion.mapper.FeedbackMapper;
import com.esuggestion.suggestion.model.Admin;
import com.esuggestion.suggestion.model.Feedback;
import com.esuggestion.suggestion.model.Suggestion;
import com.esuggestion.suggestion.repository.AdminRepository;
import com.esuggestion.suggestion.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private com.esuggestion.suggestion.repository.SuggestionRepository suggestionRepository;
    @Autowired
    private AdminRepository adminRepository;

    public List<FeedbackDTO> readAllFeedback() {
        return feedbackRepository.findAll()
                .stream()
                .map(FeedbackMapper::toDto)
                .collect(Collectors.toList());
    }

    public FeedbackDTO readFeedbackById(UUID id) {
        Feedback feedback = feedbackRepository.findById(id)
            .orElseThrow(()->new RuntimeException("Id not found"));
        return FeedbackMapper.toDto(feedback);
    }


public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {
    Feedback feedback = FeedbackMapper.toEntity(feedbackDTO);
    if (feedbackDTO.getSuggestionId() != null) {
        Suggestion suggestion = suggestionRepository.findById(feedbackDTO.getSuggestionId())
            .orElseThrow(()-> new RuntimeException("Suggestion not found"));
        feedback.setSuggestion(suggestion);
    }
    if (feedbackDTO.getAdminid() != null) {
        Admin admin = adminRepository.findById(feedbackDTO.getAdminid())
            .orElseThrow(()-> new RuntimeException("Admin not found"));
        feedback.setAdmin(admin);
    }
    Optional<Suggestion> sug = suggestionRepository.findById(feedbackDTO.getSuggestionId());
    if (sug.isPresent()) {
        Suggestion ss = sug.get();
        ss.setStatus(feedbackDTO.getDecision());
        ss.setComments(feedbackDTO.getComments());
        suggestionRepository.save(ss);
    }
    Feedback saved = feedbackRepository.save(feedback);
    return FeedbackMapper.toDto(saved);
}


    public String deleteFeedback(UUID id) {
        try {
            feedbackRepository.deleteById(id);
            return "Feedback deleted successfully";
        } catch (Exception e) {
            return "Error deleting feedback: " + e.getMessage();
        }
    }

    public String changeSuggestion( UUID id, Feedback feedback){
        Optional<Feedback> s = feedbackRepository.findById(id);
        if (s.isPresent()) {
            Feedback ss = s.get();
            ss.setComments(feedback.getComments());
            ss.setDecision(feedback.getDecision());
            ss.setAdmin(feedback.getAdmin());
            ss.setSuggestion(feedback.getSuggestion());
            feedbackRepository.save(ss);
            return "FeedBack Changed";
        }else{
            return "FeedBack Not Changed";
        }
    }
    
    
}
