package com.aritra.interviewpro.service;

import com.aritra.interviewpro.dto.InterviewRequestDto;
import com.aritra.interviewpro.dto.InterviewResponseDto;
import com.aritra.interviewpro.dto.InterviewStatusUpdateDto;
import com.aritra.interviewpro.entity.Candidate;
import com.aritra.interviewpro.entity.Interview;
import com.aritra.interviewpro.enums.InterviewStatus;
import com.aritra.interviewpro.exception.CandidateNotFoundException;
import com.aritra.interviewpro.exception.InvalidStatusTransitionException;
import com.aritra.interviewpro.repository.CandidateRepository;
import com.aritra.interviewpro.repository.InterviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<InterviewResponseDto> getAllInterviews() {

        return interviewRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
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

        return mapToResponseDto(savedInterview);
    }

    public List<InterviewResponseDto> getInterviewsByCandidateId(
            Long candidateId
    ) {

        candidateRepository.findById(candidateId)
                .orElseThrow(() ->
                        new CandidateNotFoundException(
                                "Candidate not found"));

        return interviewRepository
                .findByCandidateId(candidateId)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public InterviewResponseDto updateInterviewStatus(
            Long interviewId,
            InterviewStatusUpdateDto requestDto
    ) {

        Interview interview = interviewRepository
                .findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Interview not found"));

        InterviewStatus currentStatus =
                interview.getStatus();

        InterviewStatus newStatus =
                requestDto.getStatus();

        validateStatusTransition(
                currentStatus,
                newStatus
        );

        interview.setStatus(newStatus);

        Interview savedInterview =
                interviewRepository.save(interview);

        return mapToResponseDto(savedInterview);
    }

    public List<InterviewResponseDto> getInterviewsByStatus(
            InterviewStatus status
    ) {

        return interviewRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public List<InterviewResponseDto> getInterviewsByInterviewer(
            String interviewer
    ) {

        return interviewRepository
                .findByInterviewerContainingIgnoreCase(
                        interviewer
                )
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    private void validateStatusTransition(
            InterviewStatus currentStatus,
            InterviewStatus newStatus
    ) {

        if (currentStatus ==
                InterviewStatus.SCHEDULED) {

            if (newStatus ==
                    InterviewStatus.COMPLETED
                    ||
                    newStatus ==
                            InterviewStatus.CANCELLED) {
                return;
            }
        }

        if (currentStatus ==
                InterviewStatus.COMPLETED) {

            if (newStatus ==
                    InterviewStatus.SELECTED
                    ||
                    newStatus ==
                            InterviewStatus.REJECTED) {
                return;
            }
        }

        throw new InvalidStatusTransitionException(
                "Invalid status transition from "
                        + currentStatus
                        + " to "
                        + newStatus
        );
    }

    private InterviewResponseDto mapToResponseDto(
            Interview interview
    ) {

        return InterviewResponseDto.builder()
                .id(interview.getId())
                .title(interview.getTitle())
                .interviewer(interview.getInterviewer())
                .scheduledAt(interview.getScheduledAt())
                .status(interview.getStatus())
                .mode(interview.getMode())
                .meetingLink(interview.getMeetingLink())
                .location(interview.getLocation())
                .notes(interview.getNotes())
                .candidateId(
                        interview.getCandidate().getId()
                )
                .build();
    }
}