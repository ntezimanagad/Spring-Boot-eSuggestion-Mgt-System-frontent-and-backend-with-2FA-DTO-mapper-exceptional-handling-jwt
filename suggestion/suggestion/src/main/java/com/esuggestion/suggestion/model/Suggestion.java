package com.esuggestion.suggestion.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Suggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "status")
    private String status;
    private String comments;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "suggestionType_id")
    private SuggestionType suggestionType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @OneToMany(mappedBy = "suggestion", fetch = FetchType.EAGER)
    private List<Feedback> feedbacks;


    
    public Suggestion() {
    }

    

    public Suggestion(String title, String description, String status, String comments, SuggestionType suggestionType,
            Employee employee, List<Feedback> feedbacks) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.comments = comments;
        this.suggestionType = suggestionType;
        this.employee = employee;
        this.feedbacks = feedbacks;
    }



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

    public SuggestionType getSuggestionType() {
        return suggestionType;
    }

    public void setSuggestionType(SuggestionType suggestionType) {
        this.suggestionType = suggestionType;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public List<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    
    
}
