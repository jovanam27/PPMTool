package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.Project;
import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.exceptions.ProjectNotFoundException;
import com.example.ppmtool.repositories.BacklogRepository;
import com.example.ppmtool.repositories.ProjectRepository;
import com.example.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

        try {
            //PTs to be added to a specific project, project != null, BL exists
            Backlog backlog=backlogRepository.findByProjectIdentifier(projectIdentifier);
            //set the bl to pt
            projectTask.setBacklog(backlog);
            //we want our project sequence to be like this:IDPRO-1, IDPRO-2...
            //a ako se obrise 2, sledeci ce svakako biti 3, nece zauzeti 2...
            Integer BacklogSequence= backlog.getPTSequence();
            //Update the BL SEQUENCE
            BacklogSequence++;
            backlog.setPTSequence(BacklogSequence);

            //Add Sequence to project task
            projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);

            projectTask.setProjectIdentifier(projectIdentifier);
            //INITIAL priority when priority null
            if(projectTask.getPriority()==0 || projectTask.getPriority()==null){
                projectTask.setPriority(3);
            }
            //INITIAL status when status is null
            if(projectTask.getStatus()==null || projectTask.getStatus()==""){
                projectTask.setStatus("TO_DO");
            }
            return projectTaskRepository.save(projectTask);

        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not Found");
        }



    }

    public Iterable<ProjectTask> findBacklogById(String id) {
        Project project=projectRepository.findByProjectIdentifier(id);
        if(project==null){
            throw new ProjectNotFoundException("Project with ID: '"+id+"' doesn't exist.");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String sequence){

        //make sure we are searching on an existing backlog
        Backlog backlog=backlogRepository.findByProjectIdentifier(backlog_id);
        if(backlog==null){
            throw new ProjectNotFoundException("Project with ID: '"+backlog_id+"' doesn`t exist.");
        }
        //make sure that our task exists
        ProjectTask projectTask=projectTaskRepository.findByProjectSequence(sequence);
        if(projectTask==null){
            throw new ProjectNotFoundException("Project task '"+sequence+"' not found");
        }

        //make sure that the backlog/project id in the path corrsponds to the right project

        if(!projectTask.getProjectIdentifier().equals(backlog_id)){
            throw new ProjectNotFoundException("Project task: '"+sequence+"' doesn`t exist in project: '"+backlog_id+"'");
        }
        return projectTask;
    }

    public ProjectTask updateBySequence(ProjectTask updatedTask, String backlog_id, String sequence){
        //update project task

        //1. find existing project task
        //2. replace it with updated task
        //3. save update
        ProjectTask projectTask=findPTByProjectSequence(backlog_id, sequence);
        projectTask=updatedTask;
        return projectTaskRepository.save(projectTask);
    }

    public void deletePTByProjectSequence(String backlog_id, String sequence){
        ProjectTask projectTask=findPTByProjectSequence(backlog_id,sequence);
//        Backlog backlog=projectTask.getBacklog();
//        List<ProjectTask> projectTasks=backlog.getProjectTasks();
//        projectTasks.remove(projectTask);
//        backlogRepository.save(backlog);
        projectTaskRepository.delete(projectTask);
    }


}
