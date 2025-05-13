package com.esuggestion.suggestion.controller;

import com.esuggestion.suggestion.dto.FeedbackDTO;
import com.esuggestion.suggestion.model.Feedback;
import com.esuggestion.suggestion.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin("*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping(value = "/readFeedback")
    public ResponseEntity<List<FeedbackDTO>> readFeedback() {   
            return ResponseEntity.ok(feedbackService.readAllFeedback());  
    }

    @GetMapping("/readFeedbackById/{id}")
    public ResponseEntity<?> readFeedbackById(@PathVariable UUID id) {
        return ResponseEntity.ok(feedbackService.readFeedbackById(id));
    }

    @PostMapping(value = "/createFeedback", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        feedbackService.createFeedback(feedbackDTO);
        return ResponseEntity.ok("Feedback Created");
    }
    

    

    @DeleteMapping(value = "/deleteFeedback/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable UUID id) {
        String feedback = feedbackService.deleteFeedback(id);
    
        if (feedback.equals("Feedback deleted successfully")) {
            return ResponseEntity.ok(feedback);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(value = "/changeFeedback/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> changeFeedback(@PathVariable UUID id, @RequestBody Feedback feedback) {
    String result = feedbackService.changeSuggestion(id, feedback);

        if (result.equals("FeedBack Changed")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }    
}
