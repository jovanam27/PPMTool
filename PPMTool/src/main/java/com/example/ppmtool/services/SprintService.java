package com.example.ppmtool.services;

import com.example.ppmtool.domain.Project;
import com.example.ppmtool.domain.Sprint;
import com.example.ppmtool.domain.SprintStatus;
import com.example.ppmtool.exceptions.ProjectIdException;
import com.example.ppmtool.exceptions.SprintDateException;
import com.example.ppmtool.exceptions.SprintIdException;
import com.example.ppmtool.exceptions.SprintStatusException;
import com.example.ppmtool.repositories.ProjectRepository;
import com.example.ppmtool.repositories.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;



@Service
public class SprintService {

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Sprint addNewSprint(Sprint sprint){
//        if(sprint.getEndDate().before(sprint.getStartDate())){
//            throw new SprintDateException("End date has to be after the start date.");
//        }
        sprintDateVerification(sprint);
        Project existingProject=projectRepository.findByProjectIdentifier(sprint.getProjectIdentifier());
        if (existingProject == null) {
            throw new ProjectIdException("Project ID '" + sprint.getProjectIdentifier() + "' doesn't exist");
        }
        if(existingProject.getSprintNumber()==null && existingProject.getHasActiveSprint()==null){
            existingProject.setSprintNumber(0);
            existingProject.setHasActiveSprint(false);
        }
        sprint.setStatus(SprintStatus.PLANNED);
        sprint.setProject(existingProject);
        Integer sequence=existingProject.getSprintNumber();
        sequence++;
        existingProject.setSprintNumber(sequence);
        sprint.setSprintSequence(sprint.getProjectIdentifier()+"-S"+sequence);
        return sprintRepository.save(sprint);
    }

    public Iterable<Sprint> findAllSprints(){
        return sprintRepository.findAll();
    }

    public Sprint findBySprintSequence(String s_id){
        Sprint sprint=sprintRepository.findBySprintSequence(s_id);
        if(sprint==null){
            throw new SprintIdException("Sprint with id: "+s_id+" doesn't exist.");
        }
        return sprint;
    }

    public void deleteSprintById(String s_id){
        Sprint sprint=sprintRepository.findBySprintSequence(s_id);
        if(sprint==null){
            throw  new SprintIdException("Cannot delete Sprint with id: "+s_id+" because it doesn't exist.");
        }
        sprintRepository.delete(sprint);
    }


    public Sprint updateBySprintSequence(String s_id, Sprint sprint){
        Sprint existingSprint=sprintRepository.findBySprintSequence(s_id);
        if(existingSprint==null){
            throw new SprintIdException("Sprint with id: "+s_id+" doesn't exist.");
        }

//        if(sprint.getEndDate().before(sprint.getStartDate())){
//            throw new SprintDateException("End date has to be after the start date.");
//        }
        sprintDateVerification(sprint);

        if(existingSprint.getStatus()==SprintStatus.COMPLETED && sprint.getStatus()!=SprintStatus.COMPLETED){
            throw new SprintStatusException("If sprint has the status COMPLETED, it cannot be updated.");
        }
        if(sprint.getStatus()==SprintStatus.ACTIVE){
            if(existingSprint.getStatus()!=SprintStatus.ACTIVE){
                if(existingSprint.getProject().getHasActiveSprint()){
                    throw new SprintStatusException("This project already has one ACTIVE sprint.");
                }else{
                    existingSprint.getProject().setHasActiveSprint(true);
                }
            }
        }

        if(existingSprint.getStatus()==SprintStatus.ACTIVE && sprint.getStatus()!=SprintStatus.ACTIVE){
            existingSprint.getProject().setHasActiveSprint(false);
        }
        sprint.setProject(existingSprint.getProject());
        return sprintRepository.save(sprint);
    }

    private void sprintDateVerification(Sprint sprint){
        if(sprint.getEndDate().before(sprint.getStartDate())) {
            throw new SprintDateException("End date has to be after the start date.");
        }
    }
}
