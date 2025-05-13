package com.esuggestion.suggestion.service;

import com.esuggestion.suggestion.model.SuggestionType;
import com.esuggestion.suggestion.repository.SuggestionTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SuggestionTypeService {

    @Autowired
    private SuggestionTypeRepository suggestionTypeRepository;

    public List<SuggestionType> readAllTypes() {
        return suggestionTypeRepository.findAll();
    }

    public Optional<SuggestionType> readTypeById(UUID id) {
        return suggestionTypeRepository.findById(id);
    }

    public String createType(SuggestionType type) {
        Optional<SuggestionType> typ = suggestionTypeRepository.findByName(type.getName());

        if (typ.isPresent()) {
            return "SuggestionType Exist";
        }else{
            suggestionTypeRepository.save(type);
            return "SuggestionType success";
        }
        //return suggestionTypeRepository.save(type);
    }

    public String deleteType(UUID id) {
        Optional<SuggestionType> s = suggestionTypeRepository.findById(id);
        if (s.isPresent()) {
            suggestionTypeRepository.deleteById(id);
            return "SuggestionType Deleted";
        }else{
            return "failed to delete";
        }
        //suggestionTypeRepository.deleteById(id);
    }
    public String changeType( UUID id, SuggestionType type){
        Optional<SuggestionType> s = suggestionTypeRepository.findById(id);
        if (s.isPresent()) {
            SuggestionType ss = s.get();
            ss.setName(type.getName());
            suggestionTypeRepository.save(ss);
            return "SuggestionType Changed";
        }else{
            return "SuggestionType Not Changed";
        }
    }
    
}
