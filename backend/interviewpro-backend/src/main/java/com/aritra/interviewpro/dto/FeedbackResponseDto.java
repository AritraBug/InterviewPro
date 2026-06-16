package com.aritra.interviewpro.dto;

import com.aritra.interviewpro.enums.Recommendation;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FeedbackResponseDto {

    private Long id;

    private String interviewerName;

    private Integer technicalScore;

    private Integer communicationScore;

    private Integer problemSolvingScore;

    private Recommendation recommendation;

    private String comments;

    private LocalDateTime submittedAt;

    private Long interviewId;
}