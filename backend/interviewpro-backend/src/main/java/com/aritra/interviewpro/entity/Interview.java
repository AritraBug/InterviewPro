package com.aritra.interviewpro.entity;

import com.aritra.interviewpro.enums.InterviewMode;
import com.aritra.interviewpro.enums.InterviewStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String interviewer;

    private LocalDateTime scheduledAt;

    @Enumerated(EnumType.STRING)
    private InterviewStatus status;

    @Enumerated(EnumType.STRING)
    private InterviewMode mode;

    private String meetingLink;

    private String location;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
}