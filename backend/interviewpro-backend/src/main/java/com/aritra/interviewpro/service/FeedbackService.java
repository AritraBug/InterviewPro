package com.aritra.interviewpro.service;

import com.aritra.interviewpro.dto.FeedbackRequestDto;
import com.aritra.interviewpro.dto.FeedbackResponseDto;
import com.aritra.interviewpro.entity.Feedback;
import com.aritra.interviewpro.entity.Interview;
import com.aritra.interviewpro.enums.InterviewStatus;
import com.aritra.interviewpro.repository.FeedbackRepository;
import com.aritra.interviewpro.repository.InterviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final InterviewRepository interviewRepository;

    public FeedbackService(
            FeedbackRepository feedbackRepository,
            InterviewRepository interviewRepository
    ) {
        this.feedbackRepository = feedbackRepository;
        this.interviewRepository = interviewRepository;
    }

    public FeedbackResponseDto submitFeedback(
            Long interviewId,
            FeedbackRequestDto requestDto
    ) {

        Interview interview = interviewRepository
                .findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Interview not found"));

        validateInterviewStatus(interview);

        Feedback feedback = new Feedback();

        feedback.setInterviewerName(
                requestDto.getInterviewerName());

        feedback.setTechnicalScore(
                requestDto.getTechnicalScore());

        feedback.setCommunicationScore(
                requestDto.getCommunicationScore());

        feedback.setProblemSolvingScore(
                requestDto.getProblemSolvingScore());

        feedback.setRecommendation(
                requestDto.getRecommendation());

        feedback.setComments(
                requestDto.getComments());

        feedback.setSubmittedAt(
                LocalDateTime.now());

        feedback.setInterview(interview);

        Feedback savedFeedback =
                feedbackRepository.save(feedback);

        return FeedbackResponseDto.builder()
                .id(savedFeedback.getId())
                .interviewerName(
                        savedFeedback.getInterviewerName())
                .technicalScore(
                        savedFeedback.getTechnicalScore())
                .communicationScore(
                        savedFeedback.getCommunicationScore())
                .problemSolvingScore(
                        savedFeedback.getProblemSolvingScore())
                .recommendation(
                        savedFeedback.getRecommendation())
                .comments(
                        savedFeedback.getComments())
                .submittedAt(
                        savedFeedback.getSubmittedAt())
                .interviewId(
                        savedFeedback.getInterview().getId())
                .build();
    }

    private void validateInterviewStatus(
            Interview interview
    ) {

        InterviewStatus status =
                interview.getStatus();

        if (status == InterviewStatus.SCHEDULED
                || status == InterviewStatus.CANCELLED) {

            throw new RuntimeException(
                    "Feedback can only be submitted for completed interviews");
        }
    }
}