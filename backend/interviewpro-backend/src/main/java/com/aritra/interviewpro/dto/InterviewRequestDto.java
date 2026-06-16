package com.aritra.interviewpro.dto;

import com.aritra.interviewpro.enums.InterviewMode;
import com.aritra.interviewpro.enums.InterviewStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class InterviewRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Interviewer is required")
    private String interviewer;

    @NotNull(message = "Scheduled date is required")
    private LocalDateTime scheduledAt;

    @NotNull(message = "Status is required")
    private InterviewStatus status;

    @NotNull(message = "Mode is required")
    private InterviewMode mode;

    private String meetingLink;

    private String location;

    private String notes;

    @NotNull(message = "Candidate ID is required")
    private Long candidateId;
}