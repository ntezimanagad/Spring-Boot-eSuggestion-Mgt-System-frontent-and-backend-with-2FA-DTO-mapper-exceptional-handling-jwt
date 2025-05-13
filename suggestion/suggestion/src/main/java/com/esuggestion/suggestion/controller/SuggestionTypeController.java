package com.esuggestion.suggestion.controller;

import com.esuggestion.suggestion.model.SuggestionType;
import com.esuggestion.suggestion.service.SuggestionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/suggestion-types")
@CrossOrigin("*")
public class SuggestionTypeController {

    @Autowired
    private SuggestionTypeService suggestionTypeService;

    @GetMapping(value = "/readSuggestionType")
    public ResponseEntity<List<SuggestionType>> readSuggestionType(){
        List<SuggestionType> s = suggestionTypeService.readAllTypes();     
            return ResponseEntity.ok(s);   
    }
    @GetMapping(value = "/readSuggestionTypeById/{id}")
    public ResponseEntity<?> readSuggestionTypeById(@PathVariable UUID id){
        Optional<SuggestionType> s = suggestionTypeService.readTypeById(id);     
            return s.isPresent() ? ResponseEntity.ok(s) : ResponseEntity.notFound().build();   
    }

    @PostMapping(value = "/createSuggestionType", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createSuggestionType(@RequestBody SuggestionType type) {

        String saveSuggestionType = suggestionTypeService.createType(type);

        if (saveSuggestionType.equals("SuggestionType success")) {
            return new ResponseEntity<>(saveSuggestionType, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(saveSuggestionType, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/removeSuggestionTypeById/{id}")
    public ResponseEntity<?> removeSuggestionTypeById(@PathVariable UUID id){
        String s = suggestionTypeService.deleteType(id);
        if (s.equals("SuggestionType Deleted")) {
            return ResponseEntity.ok(s);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(value = "/changeSuggestionType/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeSuggestionType(@PathVariable UUID id,@RequestBody SuggestionType type){
        String s = suggestionTypeService.changeType(id, type);
        if (s.equals("SuggestionType Changed")) {
            return ResponseEntity.ok(s);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    
}
