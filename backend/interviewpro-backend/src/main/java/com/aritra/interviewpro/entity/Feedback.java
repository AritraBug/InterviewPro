package com.aritra.interviewpro.entity;

import com.aritra.interviewpro.enums.Recommendation;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String interviewerName;

    @Min(1)
    @Max(10)
    private Integer technicalScore;

    @Min(1)
    @Max(10)
    private Integer communicationScore;

    @Min(1)
    @Max(10)
    private Integer problemSolvingScore;

    @Enumerated(EnumType.STRING)
    private Recommendation recommendation;

    private String comments;

    private LocalDateTime submittedAt;

    @ManyToOne
    @JoinColumn(name = "interview_id")
    private Interview interview;
}