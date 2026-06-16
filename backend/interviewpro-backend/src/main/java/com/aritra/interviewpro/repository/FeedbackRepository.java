package com.aritra.interviewpro.repository;

import com.aritra.interviewpro.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {
    List<Feedback> findByInterviewId(Long interviewId);
}