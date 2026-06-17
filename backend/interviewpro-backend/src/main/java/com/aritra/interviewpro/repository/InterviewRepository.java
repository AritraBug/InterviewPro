package com.aritra.interviewpro.repository;

import com.aritra.interviewpro.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.aritra.interviewpro.enums.InterviewStatus;
import java.util.List;
@Repository
public interface InterviewRepository
        extends JpaRepository<Interview, Long> {

    List<Interview> findByCandidateId(
            Long candidateId
    );

    List<Interview> findByStatus(
            InterviewStatus status
    );
    List<Interview> findByInterviewerContainingIgnoreCase(
            String interviewer
    );
    long countByStatus(
            InterviewStatus status
    );
}