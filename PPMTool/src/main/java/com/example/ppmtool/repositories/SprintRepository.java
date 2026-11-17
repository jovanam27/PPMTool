package com.example.ppmtool.repositories;

import com.example.ppmtool.domain.Sprint;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SprintRepository extends CrudRepository<Sprint, Long> {
    public List<Sprint> findAll();
    public Sprint findBySprintSequence(String s_id);


}
