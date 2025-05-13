package com.esuggestion.suggestion.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.esuggestion.suggestion.dto.EmployeeDTO;
import com.esuggestion.suggestion.dto.SuggestionDTO;
import com.esuggestion.suggestion.model.Employee;
import com.esuggestion.suggestion.model.Suggestion;

public class EmployeeMapper {
    public static EmployeeDTO toDto(Employee employee){
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());
        dto.setPassword(employee.getPassword());
        dto.setRole(employee.getRole());
        
        List<SuggestionDTO> suggestionDTOs = employee.getSuggestions() != null
            ? employee.getSuggestions().stream()
                .map(SuggestionMapper::toDTO)
                .collect(Collectors.toList())
            : new ArrayList<>();    
        dto.setSuggestionDTOs(suggestionDTOs); 
        return dto;
    }
    public static Employee toEntity(EmployeeDTO employeeDTO){
        Employee dto = new Employee();
        dto.setId(employeeDTO.getId());
        dto.setName(employeeDTO.getName());
        dto.setEmail(employeeDTO.getEmail());
        dto.setPassword(employeeDTO.getPassword());
        dto.setRole(employeeDTO.getRole());
        
        List<SuggestionDTO> suggestionDTOs = employeeDTO.getSuggestionDTOs() != null
            ? employeeDTO.getSuggestionDTOs()
            : new ArrayList<>(); 
        List<Suggestion> suggestions = suggestionDTOs.stream()
            .map(EmployeeMapper::toMapSuggestion)
            .collect(Collectors.toList()); 
          
        dto.setSuggestions(suggestions);
        return dto;
    }

    public static Suggestion toMapSuggestion(SuggestionDTO suggestionDTO){
        Suggestion suggestion = new Suggestion();
        suggestion.setId(suggestionDTO.getId());
        suggestion.setTitle(suggestionDTO.getTitle());
        suggestion.setDescription(suggestionDTO.getDescription());
        suggestion.setStatus(suggestionDTO.getStatus());
        return suggestion;
    }
}
