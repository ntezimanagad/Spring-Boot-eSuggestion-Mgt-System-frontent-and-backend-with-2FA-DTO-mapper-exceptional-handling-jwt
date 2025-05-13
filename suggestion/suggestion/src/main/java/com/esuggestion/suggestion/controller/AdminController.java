package com.esuggestion.suggestion.controller;

import com.esuggestion.suggestion.model.Admin;
import com.esuggestion.suggestion.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping(value = "/readAdmin")
    public ResponseEntity<List<Admin>> readAdmin(){
        List<Admin> s = adminService.readAllAdmins();     
            return ResponseEntity.ok(s);   
    }
    @GetMapping(value = "/readAdminById/{id}")
    public ResponseEntity<?> readAdminById(@PathVariable UUID id){
        Optional<Admin> s = adminService.readAdminById(id);     
            return s.isPresent() ? ResponseEntity.ok(s) : ResponseEntity.notFound().build();   
    }

    @PostMapping(value = "/createAdmin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {

        String saveAdmin = adminService.createAdmin(admin);

        if (saveAdmin.equals("Admin success")) {
            return new ResponseEntity<>(saveAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(saveAdmin, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/removeAdminById/{id}")
    public ResponseEntity<?> removeAdminById(@PathVariable UUID id){
        String s = adminService.deleteAdmin(id);
        if (s.equals("Admin Deleted")) {
            return ResponseEntity.ok(s);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(value = "/changeAdmin/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeAdmin(@PathVariable UUID id,@RequestBody Admin admin){
        String s = adminService.changeAdmin(id, admin);
        if (s.equals("Admin Changed")) {
            return ResponseEntity.ok(s);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    
}
