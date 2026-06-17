package com.aritra.interviewpro.repository;

import com.aritra.interviewpro.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.aritra.interviewpro.enums.Recommendation;
@Repository
public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {

    List<Feedback> findByInterviewId(
            Long interviewId
    );

    Long countByRecommendation(
            Recommendation recommendation
    );
}