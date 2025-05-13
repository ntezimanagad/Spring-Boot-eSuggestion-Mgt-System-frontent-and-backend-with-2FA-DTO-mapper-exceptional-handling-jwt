package com.esuggestion.suggestion.service;

import com.esuggestion.suggestion.model.Admin;
import com.esuggestion.suggestion.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> readAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> readAdminById(UUID id) {
        return adminRepository.findById(id);
    }

    public String createAdmin(Admin admin) {
        Optional<Admin> adm = adminRepository.findByEmail(admin.getEmail());

        if (adm.isPresent()) {
            return "Admin Exist";
        }else{
            adminRepository.save(admin);
            return "Admin success";
        }
    }

    public String deleteAdmin(UUID id) {
        Optional<Admin> s = adminRepository.findById(id);
        if (s.isPresent()) {
            adminRepository.deleteById(id);
            return "Admin Deleted";
        }else{
            return "failed to delete";
        }
    }

    public String changeAdmin( UUID id, Admin admin){
        Optional<Admin> s = adminRepository.findById(id);
        if (s.isPresent()) {
            Admin ss = s.get();
            ss.setName(admin.getName());
            ss.setEmail(admin.getEmail());
            ss.setPassword(admin.getPassword());
            adminRepository.save(ss);
            return "Admin Changed";
        }else{
            return "Admin Not Changed";
        }
    }
    
    
}
