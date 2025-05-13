package com.esuggestion.suggestion.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "comments")
    private String comments;
    @Column(name = "decision")
    private String decision;

    @ManyToOne
    @JoinColumn(name = "suggestion_id")
    private Suggestion suggestion;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

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

    public Suggestion getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(Suggestion suggestion) {
        this.suggestion = suggestion;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    
}
