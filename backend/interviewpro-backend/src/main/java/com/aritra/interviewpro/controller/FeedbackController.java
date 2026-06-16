package com.aritra.interviewpro.controller;

import com.aritra.interviewpro.dto.FeedbackRequestDto;
import com.aritra.interviewpro.dto.FeedbackResponseDto;
import com.aritra.interviewpro.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/interviews")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(
            FeedbackService feedbackService
    ) {
        this.feedbackService = feedbackService;
    }

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