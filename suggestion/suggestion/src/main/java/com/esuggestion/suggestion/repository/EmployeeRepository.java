package com.esuggestion.suggestion.repository;

import com.esuggestion.suggestion.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByName(String name);
    List<Employee> findAll();
}
