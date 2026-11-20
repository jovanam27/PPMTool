package com.example.ppmtool.repositories;

import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.domain.Sprint;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
    List<ProjectTask> findByProjectIdentifierOrderByPriority (String id);
    ProjectTask findByProjectSequence(String sequence);
    List<ProjectTask> findByProjectIdentifierAndSprintIsNullAndStatusNot(String projectIdentifier, String status);
    List<ProjectTask> findBySprint(Sprint sprint);

}
