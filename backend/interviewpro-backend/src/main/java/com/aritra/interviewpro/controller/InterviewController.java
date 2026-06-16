package com.aritra.interviewpro.controller;

import com.aritra.interviewpro.dto.InterviewRequestDto;
import com.aritra.interviewpro.dto.InterviewResponseDto;
import com.aritra.interviewpro.service.InterviewService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(
            InterviewService interviewService
    ) {
        this.interviewService = interviewService;
    }

    @PostMapping
    public InterviewResponseDto scheduleInterview(
            @Valid @RequestBody
            InterviewRequestDto requestDto
    ) {

        return interviewService
                .scheduleInterview(requestDto);
    }
}