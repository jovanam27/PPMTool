package com.example.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer PTSequence=0;       //Project Task Sequence"
    private String projectIdentifier;

    //OneToOne with project
    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="project_id", nullable=false)
    @JsonIgnore
    private Project project;

    //OneToMany projectTasks
    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.REFRESH, mappedBy= "backlog", orphanRemoval = true)
    private List<ProjectTask> projectTasks=new ArrayList<>();


    public Backlog() {
    }

    public Integer getPTSequence() {
        return PTSequence;
    }

    public void setPTSequence(Integer PTSequence) {
        this.PTSequence = PTSequence;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Project getProject() {
        return project;
    }

    public List<ProjectTask> getProjectTasks() {
        return projectTasks;
    }

    public void setProjectTasks(List<ProjectTask> projectTasks) {
        this.projectTasks = projectTasks;
    }
}
