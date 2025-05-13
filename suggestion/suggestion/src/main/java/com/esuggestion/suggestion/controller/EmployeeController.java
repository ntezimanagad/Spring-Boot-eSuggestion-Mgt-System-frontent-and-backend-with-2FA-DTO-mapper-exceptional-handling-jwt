package com.esuggestion.suggestion.controller;

import com.esuggestion.suggestion.dto.EmployeeDTO;
import com.esuggestion.suggestion.model.Employee;
import com.esuggestion.suggestion.service.EmployeeService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.*;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping(value = "/readEmployee")
    public ResponseEntity<List<Employee>> readEmployee(){
        List<Employee> s = employeeService.readAllEmployees();     
            return ResponseEntity.ok(s);   
    }
    @GetMapping(value = "/readEmployeeById/{id}")
    public ResponseEntity<?> readEmployeeById(@PathVariable UUID id){
        Optional<Employee> s = employeeService.readEmployeeById(id);     
            return s.isPresent() ? ResponseEntity.ok(s) : ResponseEntity.notFound().build();   
    }

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
       employeeService.createEmployee(employeeDTO);
       return ResponseEntity.ok("OTP send to Your email");
    }
    @PostMapping(value = "/validateEmployeeRegister")
    public ResponseEntity<?> validateEmployeeRegister(@RequestParam String email, @RequestParam String otpCode) {
       employeeService.validateRegister(email, otpCode);
       return ResponseEntity.ok("Account Activated");
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginEmployee(@RequestBody EmployeeDTO employeeDTO) {
        employeeService.loginEmployee(employeeDTO);
        return ResponseEntity.ok("OTP to login Sent To your email");
    }
    @PostMapping(value = "/validateEmployeeLogin")
    public ResponseEntity<?> validateEmployeeLogin(@RequestParam String email, @RequestParam String otpCode) {
       return ResponseEntity.ok(employeeService.validateLoginOtp(email, otpCode));
    }
    @PostMapping(value = "/logout", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logout(HttpServletRequest request) {
       String token = request.getHeader("Authorization");
       if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            employeeService.logout(token);
            //return ResponseEntity.ok("Failled to log out");
       }
       return ResponseEntity.ok("Logout successful");
       //return ResponseEntity.ok("Failled to log out");
    }

    @DeleteMapping(value = "/removeEmployeeById/{id}")
    public ResponseEntity<?> removeEmployeeById(@PathVariable UUID id){
        String s = employeeService.deleteEmployee(id);
        if (s.equals("Employee Deleted")) {
            return ResponseEntity.ok(s);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(value = "/changeEmployee/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeEmployee(@PathVariable UUID id,@RequestBody Employee employee){
        String s = employeeService.changeEmployee(id, employee);
        if (s.equals("Employee Changed")) {
            return ResponseEntity.ok(s);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping(value = "/reset", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeEmployee(@RequestBody EmployeeDTO employeeDTO){
        employeeService.resetPassword(employeeDTO);
            return ResponseEntity.ok("Otp sent");
    }
    @PostMapping(value = "/validatePassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> validatePassword(@RequestBody EmployeeDTO employeeDTO){
        employeeService.validatePasswordReset(employeeDTO);
            return ResponseEntity.ok("verfied");
    }
    @PutMapping(value = "/updatePassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updatePassword(@RequestBody EmployeeDTO employeeDTO){
        employeeService.updatePassword(employeeDTO);
            return ResponseEntity.ok("Pasword Changed");
    }
    
}
