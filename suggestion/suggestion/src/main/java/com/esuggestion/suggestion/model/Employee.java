package com.esuggestion.suggestion.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;


    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Suggestion> suggestions;

    
    public Employee() {
    }

    
    public Employee(String name, String email, String password, Role role, List<Suggestion> suggestions) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.suggestions = suggestions;
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


    public List<Suggestion> getSuggestions() {
        return suggestions;
    }


    public void setSuggestions(List<Suggestion> suggestions) {
        this.suggestions = suggestions;
    }


    public Role getRole() {
        return role;
    }


    public void setRole(Role role) {
        this.role = role;
    }

    
    
}
