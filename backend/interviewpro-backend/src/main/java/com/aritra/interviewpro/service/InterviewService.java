package com.aritra.interviewpro.service;

import com.aritra.interviewpro.dto.InterviewRequestDto;
import com.aritra.interviewpro.dto.InterviewResponseDto;
import com.aritra.interviewpro.entity.Candidate;
import com.aritra.interviewpro.entity.Interview;
import com.aritra.interviewpro.exception.CandidateNotFoundException;
import com.aritra.interviewpro.repository.CandidateRepository;
import com.aritra.interviewpro.repository.InterviewRepository;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final CandidateRepository candidateRepository;

    public InterviewService(
            InterviewRepository interviewRepository,
            CandidateRepository candidateRepository
    ) {
        this.interviewRepository = interviewRepository;
        this.candidateRepository = candidateRepository;
    }

    public InterviewResponseDto scheduleInterview(
            InterviewRequestDto requestDto
    ) {

        Candidate candidate = candidateRepository
                .findById(requestDto.getCandidateId())
                .orElseThrow(() ->
                        new CandidateNotFoundException(
                                "Candidate not found"));

        Interview interview = new Interview();

        interview.setTitle(requestDto.getTitle());
        interview.setInterviewer(requestDto.getInterviewer());
        interview.setScheduledAt(requestDto.getScheduledAt());
        interview.setStatus(requestDto.getStatus());
        interview.setMode(requestDto.getMode());
        interview.setMeetingLink(requestDto.getMeetingLink());
        interview.setLocation(requestDto.getLocation());
        interview.setNotes(requestDto.getNotes());

        interview.setCandidate(candidate);

        Interview savedInterview =
                interviewRepository.save(interview);

        return InterviewResponseDto.builder()
                .id(savedInterview.getId())
                .title(savedInterview.getTitle())
                .interviewer(savedInterview.getInterviewer())
                .scheduledAt(savedInterview.getScheduledAt())
                .status(savedInterview.getStatus())
                .mode(savedInterview.getMode())
                .meetingLink(savedInterview.getMeetingLink())
                .location(savedInterview.getLocation())
                .notes(savedInterview.getNotes())
                .candidateId(
                        savedInterview.getCandidate().getId()
                )
                .build();
    }
}