package com.esuggestion.suggestion.repository;

import com.esuggestion.suggestion.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface AdminRepository extends JpaRepository<Admin, UUID> {
    Optional<Admin> findByEmail(String email);
}
