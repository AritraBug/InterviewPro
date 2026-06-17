package com.aritra.interviewpro.controller;

import com.aritra.interviewpro.dto.FeedbackRequestDto;
import com.aritra.interviewpro.dto.FeedbackResponseDto;
import com.aritra.interviewpro.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
@RestController
@RequestMapping("/api/interviews")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(
            FeedbackService feedbackService
    ) {
        this.feedbackService = feedbackService;
    }
    @PreAuthorize(
            "hasRole('INTERVIEWER') or hasRole('ADMIN')"
    )
    @PostMapping("/{id}/feedback")
    public FeedbackResponseDto submitFeedback(
            @PathVariable Long id,
            @Valid @RequestBody
            FeedbackRequestDto requestDto
    ) {

        return feedbackService.submitFeedback(
                id,
                requestDto
        );
    }
    @PutMapping("/feedbacks/{id}")
    public FeedbackResponseDto updateFeedback(
            @PathVariable Long id,
            @Valid @RequestBody
            FeedbackRequestDto requestDto
    ) {

        return feedbackService.updateFeedback(
                id,
                requestDto
        );
    }

    @DeleteMapping("/feedbacks/{id}")
    public void deleteFeedback(
            @PathVariable Long id
    ) {

        feedbackService.deleteFeedback(id);
    }
    @PreAuthorize(
            "hasRole('ADMIN') or hasRole('RECRUITER') or hasRole('INTERVIEWER')"
    )
    @GetMapping("/feedbacks")
    public List<FeedbackResponseDto> getAllFeedbacks() {

        return feedbackService.getAllFeedbacks();
    }
    @GetMapping("/{id}/feedbacks")
    public List<FeedbackResponseDto> getInterviewFeedbacks(
            @PathVariable Long id
    ) {

        return feedbackService
                .getFeedbacksByInterviewId(id);
    }
}