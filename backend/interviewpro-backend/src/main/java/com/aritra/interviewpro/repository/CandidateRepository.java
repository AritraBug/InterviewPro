package com.aritra.interviewpro.repository;

import com.aritra.interviewpro.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface CandidateRepository
        extends JpaRepository<Candidate, Long> {

    List<Candidate> findByNameContainingIgnoreCase(
            String name
    );
}