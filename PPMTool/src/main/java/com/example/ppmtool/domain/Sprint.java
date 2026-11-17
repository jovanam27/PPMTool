package com.example.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Please use maximum 100 characters.")
    private String name;
    @Size(max = 1000, message = "Please use maximum 1000 characters.")
    private String goal;
    @NotNull(message = "Start date is required")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date startDate;
    @NotNull(message = "End date is required")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date endDate;
    //@NotBlank(message = "Status is required")
    private SprintStatus status;

    @Column(updatable = false, unique = true)
    private String sprintSequence;


    //ManyToOne with project
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="project_id", updatable = false, nullable = false)
    @JsonIgnore
    private Project project;

    @NotBlank(message = "You have to choose project identifier. ")
    private String projectIdentifier;

    //OneToMany with ProjectTask
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, mappedBy = "sprint", orphanRemoval = true)
    private List<ProjectTask> tasks=new ArrayList<>();

    public Sprint() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public SprintStatus getStatus() {
        return status;
    }

    public void setStatus(SprintStatus status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<ProjectTask> getTasks() {
        return tasks;
    }

    public void setTasks(List<ProjectTask> tasks) {
        this.tasks = tasks;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public String getSprintSequence() {
        return sprintSequence;
    }

    public void setSprintSequence(String sprintSequence) {
        this.sprintSequence = sprintSequence;
    }
}
