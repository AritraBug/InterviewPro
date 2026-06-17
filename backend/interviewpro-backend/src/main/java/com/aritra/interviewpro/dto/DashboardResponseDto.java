package com.aritra.interviewpro.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DashboardResponseDto {

    private Long totalCandidates;

    private Long totalInterviews;

    private Long totalFeedbacks;

    private Long selectedInterviews;

    private Long rejectedInterviews;

    private Long scheduledInterviews;
}