package com.aritra.interviewpro.dto;

import com.aritra.interviewpro.enums.Recommendation;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequestDto {

    @NotBlank(message = "Interviewer name is required")
    private String interviewerName;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer technicalScore;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer communicationScore;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer problemSolvingScore;

    @NotNull(message = "Recommendation is required")
    private Recommendation recommendation;

    private String comments;
}