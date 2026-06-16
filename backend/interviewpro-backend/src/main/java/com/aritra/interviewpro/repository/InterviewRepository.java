package com.aritra.interviewpro.repository;

import com.aritra.interviewpro.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewRepository
        extends JpaRepository<Interview, Long> {

}