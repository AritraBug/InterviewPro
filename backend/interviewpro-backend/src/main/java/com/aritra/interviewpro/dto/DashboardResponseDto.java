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

    private Long completedInterviews;
    private Long cancelledInterviews;

    private Long strongHireCount;

    private Long hireCount;

    private Long holdCount;

    private Long rejectCount;
}