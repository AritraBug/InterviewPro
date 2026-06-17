package com.aritra.interviewpro.service;

import com.aritra.interviewpro.dto.DashboardResponseDto;
import com.aritra.interviewpro.enums.InterviewStatus;
import com.aritra.interviewpro.repository.CandidateRepository;
import com.aritra.interviewpro.repository.FeedbackRepository;
import com.aritra.interviewpro.repository.InterviewRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final CandidateRepository candidateRepository;
    private final InterviewRepository interviewRepository;
    private final FeedbackRepository feedbackRepository;

    public DashboardService(
            CandidateRepository candidateRepository,
            InterviewRepository interviewRepository,
            FeedbackRepository feedbackRepository
    ) {
        this.candidateRepository = candidateRepository;
        this.interviewRepository = interviewRepository;
        this.feedbackRepository = feedbackRepository;
    }

    public DashboardResponseDto getDashboardStats() {

        return DashboardResponseDto.builder()
                .totalCandidates(
                        candidateRepository.count())
                .totalInterviews(
                        interviewRepository.count())
                .totalFeedbacks(
                        feedbackRepository.count())
                .selectedInterviews(
                        interviewRepository.countByStatus(
                                InterviewStatus.SELECTED))
                .rejectedInterviews(
                        interviewRepository.countByStatus(
                                InterviewStatus.REJECTED))
                .scheduledInterviews(
                        interviewRepository.countByStatus(
                                InterviewStatus.SCHEDULED))
                .completedInterviews(
                        interviewRepository.countByStatus(
                                InterviewStatus.COMPLETED))
                .build();
    }
}