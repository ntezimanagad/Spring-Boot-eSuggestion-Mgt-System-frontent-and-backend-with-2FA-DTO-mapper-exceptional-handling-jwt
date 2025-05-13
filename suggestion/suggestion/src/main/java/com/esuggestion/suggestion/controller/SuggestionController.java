package com.esuggestion.suggestion.controller;

import com.esuggestion.suggestion.dto.SuggestionDTO;
import com.esuggestion.suggestion.mapper.SuggestionMapper;
import com.esuggestion.suggestion.model.Employee;
import com.esuggestion.suggestion.model.Suggestion;
import com.esuggestion.suggestion.repository.EmployeeRepository;
import com.esuggestion.suggestion.repository.SuggestionRepository;
import com.esuggestion.suggestion.service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/suggestions")
@CrossOrigin("*")
public class SuggestionController {

    @Autowired
    private SuggestionService suggestionService;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private SuggestionRepository suggestionRepository;

    @GetMapping(value = "/readSuggestion")
    public ResponseEntity<List<SuggestionDTO>> readSuggestion(){ 
            return ResponseEntity.ok(suggestionService.readAllSuggestions());   
    }
    @GetMapping(value = "/readSuggestionById/{id}")
    public ResponseEntity<?> readSuggestionById(@PathVariable UUID id){  
            return ResponseEntity.ok(suggestionService.readSuggestionById(id));  
    }
    @GetMapping(value = "/status/{status}")
    public ResponseEntity<List<Suggestion>> readSuggestionByStatus(@PathVariable String sugge){
        List<Suggestion> s = suggestionService.readSuggestionsByStatus(sugge);     
            return ResponseEntity.ok(s);   
    }
    @GetMapping(value = "/readSuggestionByEmpId/{id}")
    public ResponseEntity<List<Suggestion>> readSuggestionByEmpId(@PathVariable UUID id){
        List<Suggestion> s = suggestionService.readSuggestionsByEmployeeId(id);     
            return ResponseEntity.ok(s);   
    }
    @GetMapping(value = "/paginate")
    public ResponseEntity<Page<SuggestionDTO>> getBypage(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "4") int size
    ){
        Pageable pageable = PageRequest.of(page, size);
        Page<SuggestionDTO> suggestion = suggestionService.getSuggestionByPage(pageable);
        return ResponseEntity.ok(suggestion);
    }

    @PostMapping(value = "/createSuggestion", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createSuggestion(@RequestBody SuggestionDTO sugge) {
        suggestionService.createSuggestion(sugge);
            return ResponseEntity.ok("created");
    }

    @DeleteMapping(value = "/removeSuggestionById/{id}")
    public ResponseEntity<?> removeSuggestionById(@PathVariable UUID id){
        String s = suggestionService.deleteSuggestion(id);
        if (s.equals("Suggestion Deleted")) {
            return ResponseEntity.ok(s);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(value = "/changeSuggestion/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeSuggestion(@PathVariable UUID id,@RequestBody Suggestion sugge){
        String s = suggestionService.changeSuggestion(id, sugge);
        if (s.equals("Suggestion Changed")) {
            return ResponseEntity.ok(s);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping(value = "/userInfo")
    public String useInfo(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return "Hello " + username;
    }



    @GetMapping(value = "/getInfo")
public ResponseEntity<?> getInfo() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String name = authentication.getName(); 

    // Fetch employee from the database
    Optional<Employee> employeeOpt = employeeRepository.findByName(name);
    if (employeeOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
    }

    Employee employee = employeeOpt.get();

    // Fetch suggestions related to this employee
    List<Suggestion> suggestions = suggestionRepository.findByEmployeeId(employee.getId());

    // Convert to DTO for proper serialization
    // List<SuggestionDTO> suggestionDTOs = suggestions.stream()
    // .map(s -> new SuggestionDTO(
    //     s.getId(),
    //     s.getTitle(),
    //     s.getDescription(),
    //     s.getStatus(),
    //     s.getSuggestionType(),
    //     s.getEmployee(),  // Fixed: now using employee
    //     s.getFeedbacks()
    // ))
    // .collect(Collectors.toList());
     List<SuggestionDTO> suggestionDTOs = suggestions.stream()
        .map(SuggestionMapper::toDTO)
        .collect(Collectors.toList());


    return ResponseEntity.ok(suggestionDTOs);
}

//     @GetMapping(value = "/getInfo")
// public ResponseEntity<?> getInfo() {
//     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//     String name = authentication.getName(); // this is usually the email/username from JWT

//     // Use your service/repo to fetch the employee by email
//     Optional<Employee> employeeOpt = employeeRepository.findByName(name);
//     if (employeeOpt.isEmpty()) {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
//     }

//     Employee employee = employeeOpt.get();

//     // Fetch suggestions related to this employee
//     List<Suggestion> suggestions = suggestionRepository.findByEmployeeId(employee.getId());
//     System.out.println("Number of suggestions found: " + suggestions.size());

//     // Optional: Create a response DTO that includes both employee and suggestions
//     // Map<String, Object> response = new HashMap<>();
//     // response.put("employee", employee);
//     // response.put("suggestions", suggestions);

//     return ResponseEntity.ok(suggestions);
// }

@GetMapping(value = "/getEmpInfo")
public ResponseEntity<?> getEmpInfo() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName(); // this is usually the email/username from JWT

    // Use your service/repo to fetch the employee by email
    Optional<Employee> employeeOpt = employeeRepository.findByName(email);
    if (employeeOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
    }

    Employee employee = employeeOpt.get();

    // Fetch suggestions related to this employee
    //Optional<Employee> employees = employeeRepository.findById(employee.getId());

    // Optional: Create a response DTO that includes both employee and suggestions
    // Map<String, Object> response = new HashMap<>();
    // response.put("employee", employee);
    // response.put("suggestions", suggestions);

    return ResponseEntity.ok(Map.of("id", employee.getId()));
}


    
}
