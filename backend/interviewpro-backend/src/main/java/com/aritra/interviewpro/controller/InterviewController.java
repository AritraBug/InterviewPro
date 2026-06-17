package com.aritra.interviewpro.controller;

import com.aritra.interviewpro.dto.InterviewRequestDto;
import com.aritra.interviewpro.dto.InterviewResponseDto;
import com.aritra.interviewpro.dto.InterviewStatusUpdateDto;
import com.aritra.interviewpro.service.InterviewService;
import jakarta.validation.Valid;
import com.aritra.interviewpro.enums.InterviewStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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
    @PutMapping("/{id}")
    public InterviewResponseDto updateInterview(
            @PathVariable Long id,
            @Valid @RequestBody
            InterviewRequestDto requestDto
    ) {

        return interviewService
                .updateInterview(
                        id,
                        requestDto
                );
    }
    @DeleteMapping("/{id}")
    public void deleteInterview(
            @PathVariable Long id
    ) {

        interviewService.deleteInterview(
                id
        );
    }
    @GetMapping
    public List<InterviewResponseDto> getAllInterviews() {

        return interviewService.getAllInterviews();
    }
    @PatchMapping("/{id}/status")
    public InterviewResponseDto updateInterviewStatus(
            @PathVariable Long id,
            @Valid @RequestBody
            InterviewStatusUpdateDto requestDto
    ) {

        return interviewService
                .updateInterviewStatus(
                        id,
                        requestDto
                );
    }
    @GetMapping("/status/{status}")
    public List<InterviewResponseDto>
    getInterviewsByStatus(
            @PathVariable InterviewStatus status
    ) {

        return interviewService
                .getInterviewsByStatus(status);
    }
    @GetMapping("/interviewer/{name}")
    public List<InterviewResponseDto>
    getInterviewsByInterviewer(
            @PathVariable String name
    ) {

        return interviewService
                .getInterviewsByInterviewer(name);
    }
}