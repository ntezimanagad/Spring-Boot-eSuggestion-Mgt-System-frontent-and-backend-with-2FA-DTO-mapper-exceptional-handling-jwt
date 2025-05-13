package com.esuggestion.suggestion.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esuggestion.suggestion.model.Otp;

public interface OtpRepository extends JpaRepository<Otp, Long>{
    Optional<Otp> findByEmailAndPurpose(String email, String purpose);
}
