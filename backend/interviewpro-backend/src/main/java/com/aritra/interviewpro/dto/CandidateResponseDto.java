package com.aritra.interviewpro.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CandidateResponseDto {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String college;

    private String skills;
}