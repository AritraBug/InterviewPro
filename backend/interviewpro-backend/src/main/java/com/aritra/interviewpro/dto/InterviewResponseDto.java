package com.aritra.interviewpro.dto;

import com.aritra.interviewpro.enums.InterviewMode;
import com.aritra.interviewpro.enums.InterviewStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class InterviewResponseDto {

    private Long id;

    private String title;

    private String interviewer;

    private LocalDateTime scheduledAt;

    private InterviewStatus status;

    private InterviewMode mode;

    private String meetingLink;

    private String location;

    private String notes;

    private Long candidateId;
}