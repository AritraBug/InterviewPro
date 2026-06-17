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
import java.util.List;
import java.util.stream.Collectors;

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

        return mapToResponseDto(savedFeedback);
    }

    public List<FeedbackResponseDto> getAllFeedbacks() {

        return feedbackRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public List<FeedbackResponseDto> getFeedbacksByInterviewId(
            Long interviewId
    ) {

        Interview interview = interviewRepository
                .findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Interview not found"));

        return feedbackRepository
                .findByInterviewId(interview.getId())
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }
    public FeedbackResponseDto updateFeedback(
            Long id,
            FeedbackRequestDto requestDto
    ) {

        Feedback feedback =
                feedbackRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Feedback not found"
                                ));

        feedback.setInterviewerName(
                requestDto.getInterviewerName()
        );

        feedback.setTechnicalScore(
                requestDto.getTechnicalScore()
        );

        feedback.setCommunicationScore(
                requestDto.getCommunicationScore()
        );

        feedback.setProblemSolvingScore(
                requestDto.getProblemSolvingScore()
        );

        feedback.setRecommendation(
                requestDto.getRecommendation()
        );

        feedback.setComments(
                requestDto.getComments()
        );

        Feedback updatedFeedback =
                feedbackRepository.save(
                        feedback
                );

        return mapToResponseDto(
                updatedFeedback
        );
    }
    public void deleteFeedback(
            Long id
    ) {

        Feedback feedback =
                feedbackRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Feedback not found"
                                ));

        feedbackRepository.delete(
                feedback
        );
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

    private FeedbackResponseDto mapToResponseDto(
            Feedback feedback
    ) {

        return FeedbackResponseDto.builder()
                .id(feedback.getId())
                .interviewerName(
                        feedback.getInterviewerName())
                .technicalScore(
                        feedback.getTechnicalScore())
                .communicationScore(
                        feedback.getCommunicationScore())
                .problemSolvingScore(
                        feedback.getProblemSolvingScore())
                .recommendation(
                        feedback.getRecommendation())
                .comments(
                        feedback.getComments())
                .submittedAt(
                        feedback.getSubmittedAt())
                .interviewId(
                        feedback.getInterview().getId())
                .build();
    }
}