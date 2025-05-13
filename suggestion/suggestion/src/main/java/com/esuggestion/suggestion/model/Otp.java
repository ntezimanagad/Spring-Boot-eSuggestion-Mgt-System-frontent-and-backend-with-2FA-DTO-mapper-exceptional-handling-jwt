package com.esuggestion.suggestion.model;

import java.time.Instant;

import jakarta.persistence.*;

@Entity
public class Otp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String otpCode;
    private Instant createdAt;
    private Instant expiredAt;
    private String purpose;
    
    public Otp() {
    }
    
    public Otp(String email, String otpCode, Instant createdAt, Instant expiredAt, String purpose) {
        this.email = email;
        this.otpCode = otpCode;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.purpose = purpose;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getOtpCode() {
        return otpCode;
    }
    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }
    public Instant getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
    public Instant getExpiredAt() {
        return expiredAt;
    }
    public void setExpiredAt(Instant expiredAt) {
        this.expiredAt = expiredAt;
    }
    public String getPurpose() {
        return purpose;
    }
    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
}
