package com.aritra.interviewpro.dto;

import com.aritra.interviewpro.enums.InterviewStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterviewStatusUpdateDto {

    @NotNull(message = "Status is required")
    private InterviewStatus status;
}