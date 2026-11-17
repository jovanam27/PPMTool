package com.example.ppmtool.web;

import com.example.ppmtool.domain.Sprint;
import com.example.ppmtool.services.MapValidationErrorService;
import com.example.ppmtool.services.SprintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sprint")
public class SprintController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    @Autowired
    private SprintService sprintService;

    @PostMapping
    public ResponseEntity<?> addNewSprint(@Valid @RequestBody Sprint sprint, BindingResult result){
        ResponseEntity<?> errorMap=mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) {
            return errorMap;
        }
        Sprint sprint1=sprintService.addNewSprint(sprint);
        return new ResponseEntity<>(sprint1,HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Sprint> getAllSprints(){
        return sprintService.findAllSprints();
    }

    @GetMapping("/{s_id}")
    public ResponseEntity<?> getBySprintSequence(@PathVariable String s_id){
        Sprint sprint1=sprintService.findBySprintSequence(s_id);
        return new ResponseEntity<Sprint>(sprint1, HttpStatus.OK);
    }

    @DeleteMapping("/{s_id}")
    public ResponseEntity<?> deleteSprint(@PathVariable String s_id){
        sprintService.deleteSprintById(s_id);
        return new ResponseEntity<String>("Sprint with id: "+ s_id+" is deleted successfully.", HttpStatus.OK);
    }

    @PatchMapping("/{s_id}")
    public ResponseEntity<?> updateBySprintSequence(@Valid @RequestBody Sprint sprint, BindingResult result, @PathVariable String s_id){
        ResponseEntity<?> errorMap=mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null){
            return errorMap;
        }
        Sprint updatedSprint=sprintService.updateBySprintSequence(s_id, sprint);
        return new ResponseEntity<Sprint>(updatedSprint, HttpStatus.OK);
    }

}
